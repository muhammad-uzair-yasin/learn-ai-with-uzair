# gen_char.py — Pixar-style cartoon characters for Agent School, built procedurally in Blender (bpy 5.2).
# Rigid-part rig: mesh parts are parented to EMPTY "joints" (Hips, Chest, Head, ShoulderL, ElbowL, ...), so three.js
# can pose them by rotating those nodes. Face parts for animation: LidL/LidR (blink: rotate X), Mouth (talk: scale Z),
# BrowL/BrowR (raise: position Z). Front of the character = -Y in Blender (= +Z in glTF/three).
# usage: python3 gen_char.py -- <spec.json> <out.glb> [preview.png]
import bpy, bmesh, sys, os, json, math
from mathutils import Vector, Matrix
args = sys.argv[sys.argv.index('--') + 1:]
SPEC = json.load(open(args[0])); OUT = args[1]; PREV = args[2] if len(args) > 2 else None
HERE = os.path.dirname(os.path.abspath(args[0]))
S = {  # defaults = the teacher
    "skin": [0.78, 0.50, 0.34], "hair": [0.035, 0.03, 0.03], "beard": True, "shirt": [0.04, 0.04, 0.045], "pants": [0.10, 0.22, 0.36],
    "shoes": [0.93, 0.92, 0.88], "eye": [0.30, 0.17, 0.08], "hairStyle": "swept", "height": 1.0, "build": 1.0, "female": False,
    "sleeve": "short", "glasses": False,
}
S.update(SPEC)
bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
H = Vector((0, 0, 1.60))  # head centre

def mat(name, col, rough=0.5, sss=0.0, spec=0.4, emit=None, img=None):
    m = bpy.data.materials.get(name)
    if m: return m
    m = bpy.data.materials.new(name); m.use_nodes = True
    b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (*col, 1); b.inputs['Roughness'].default_value = rough
    if 'Specular IOR Level' in b.inputs: b.inputs['Specular IOR Level'].default_value = spec
    if sss: b.inputs['Subsurface Weight'].default_value = sss; b.inputs['Subsurface Radius'].default_value = (0.9, 0.35, 0.2)
    if emit: b.inputs['Emission Color'].default_value = (*emit, 1); b.inputs['Emission Strength'].default_value = 1.0
    if img:
        t = m.node_tree.nodes.new('ShaderNodeTexImage'); t.image = bpy.data.images.load(img); m.node_tree.links.new(t.outputs[0], b.inputs['Base Color'])
    return m
SKIN = mat('Skin', S['skin'], 0.48, sss=0.12)
HAIR = mat('Hair', S['hair'], 0.42, spec=0.6)
BEARD = mat('Beard', [c * 1.1 for c in S['hair']], 0.85)
SHIRT = mat('Shirt', S['shirt'], 0.85, spec=0.2)
PANTS = mat('Pants', S['pants'], 0.9, spec=0.15)
SHOE = mat('Shoes', S['shoes'], 0.55)
SOLE = mat('Sole', [0.97, 0.97, 0.95], 0.6)
MOUTH = mat('MouthIn', [0.22, 0.04, 0.05], 0.6)
TEETH = mat('Teeth', [0.95, 0.94, 0.9], 0.3)
BROW = mat('Brow', [c * 1.0 for c in S['hair']], 0.8)
DARK = mat('Frame', [0.03, 0.03, 0.035], 0.25)
HL = mat('EyeHL', [1, 1, 1], 0.1, emit=(1, 1, 1))

def finish(o, m, sub=2, smooth=True):
    if m: o.data.materials.clear(); o.data.materials.append(m)
    if smooth:
        for p in o.data.polygons: p.use_smooth = True
    if sub:
        md = o.modifiers.new('sub', 'SUBSURF'); md.levels = sub; md.render_levels = sub
    return o
def active(o):
    bpy.ops.object.select_all(action='DESELECT'); o.select_set(True); bpy.context.view_layer.objects.active = o
def apply_mods(o):
    active(o)
    for md in list(o.modifiers): bpy.ops.object.modifier_apply(modifier=md.name)

def sphere(name, loc, size, m, seg=32, sub=1, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=seg, ring_count=seg // 2, radius=1, location=loc, rotation=rot)
    o = bpy.context.object; o.name = name; o.scale = size; return finish(o, m, sub)
def capsule(name, a, b, r, m, r2=None):
    a, b = Vector(a), Vector(b); d = b - a
    bpy.ops.mesh.primitive_cylinder_add(vertices=24, radius=1, depth=1, location=(a + b) / 2)
    o = bpy.context.object; o.name = name
    o.rotation_mode = 'QUATERNION'; o.rotation_quaternion = Vector((0, 0, 1)).rotation_difference(d.normalized())
    o.scale = (r, r, d.length)
    # round the ends with spheres joined in
    parts = [o]
    for p, rr in ((a, r), (b, r2 or r)):
        bpy.ops.mesh.primitive_uv_sphere_add(segments=24, ring_count=12, radius=rr, location=p); parts.append(bpy.context.object)
    if r2:
        o.scale = (1, 1, 1)
        bm = bmesh.new(); bmesh.ops.create_cone(bm, cap_ends=True, segments=24, radius1=r, radius2=r2, depth=d.length)
        bm.to_mesh(o.data); bm.free()
    bpy.ops.object.select_all(action='DESELECT')
    for q in parts: q.select_set(True)
    bpy.context.view_layer.objects.active = o; bpy.ops.object.join()
    return finish(o, m, 1)
def rbox(name, loc, dims, m, bevel=0.02):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc); o = bpy.context.object; o.name = name; o.scale = dims
    bpy.ops.object.transform_apply(scale=True)
    md = o.modifiers.new('bev', 'BEVEL'); md.width = bevel; md.segments = 4
    return finish(o, m, 1)
def metaball(name, elems, m, res=0.006):
    mb = bpy.data.metaballs.new(name); mb.resolution = res; mb.render_resolution = res; mb.threshold = 0.6
    o = bpy.data.objects.new(name, mb); sc.collection.objects.link(o)
    for e in elems:
        el = mb.elements.new(); el.co = e['co']; el.radius = e['r']; el.stiffness = e.get('k', 2.0)
        if 'size' in e: el.type = 'ELLIPSOID'; el.size_x, el.size_y, el.size_z = e['size']
        if e.get('neg'): el.use_negative = True
    active(o); bpy.ops.object.convert(target='MESH'); o = bpy.context.object; o.name = name
    return finish(o, m, 0)

def rel(v): return H + Vector(v)

# ================= HEAD =================
fem = S['female']
head = metaball('Head', [
    {'co': rel((0, 0, 0.025)), 'r': 0.15, 'size': (0.92, 0.95, 1.06)},
    {'co': rel((0, -0.012, -0.055)), 'r': 0.12, 'size': (0.98, 0.95, 0.8) if not fem else (0.9, 0.9, 0.78)},
    {'co': rel((0.06, -0.065, -0.035)), 'r': 0.055, 'k': 2.5}, {'co': rel((-0.06, -0.065, -0.035)), 'r': 0.055, 'k': 2.5},
    {'co': rel((0, -0.075, -0.105)), 'r': 0.05, 'k': 2.5},
    {'co': rel((0, -0.128, -0.012)), 'r': 0.038, 'k': 3.5},            # nose tip (bulbous)
    {'co': rel((0, -0.118, 0.025)), 'r': 0.022, 'k': 3.0},             # nose bridge
    {'co': rel((0.025, -0.118, -0.022)), 'r': 0.02, 'k': 3.0}, {'co': rel((-0.025, -0.118, -0.022)), 'r': 0.02, 'k': 3.0},  # nostril wings
], SKIN)
# ears
for s in (1, -1):
    e = sphere(f'Ear{"L" if s > 0 else "R"}', rel((s * 0.128, 0.005, 0.0)), (0.018, 0.034, 0.048), SKIN, rot=(0, 0, math.radians(s * 20)))
    inner = sphere(f'EarIn{"L" if s > 0 else "R"}', rel((s * 0.136, 0.0, 0.0)), (0.008, 0.02, 0.03), mat('EarIn', [c * 0.75 for c in S['skin']], 0.6), sub=1)

# eyes: sclera/iris/pupil texture on a UV sphere whose pole looks forward
eye_img = os.path.join(HERE, 'eye_tex.png')
if not os.path.exists(eye_img):
    from PIL import Image, ImageDraw
    W, Hh = 512, 256; im = Image.new('RGB', (W, Hh), (246, 244, 240)); d = ImageDraw.Draw(im)
    ec = tuple(int(c * 255) for c in S['eye'])
    for y in range(Hh):
        t = y / Hh
        if t < 0.085: col = (8, 6, 6)
        elif t < 0.20: k = (t - 0.085) / 0.115; col = tuple(int(c * (1.25 - 0.5 * k)) for c in ec)
        elif t < 0.225: col = tuple(int(c * 0.45) for c in ec)
        else: g = int(246 - 18 * max(0, (t - 0.6) / 0.4)); col = (g, g - 2, g - 6)
        d.line([(0, y), (W, y)], fill=col)
    im.save(eye_img)
EYE = mat('Eye', [1, 1, 1], 0.08, spec=0.9, img=eye_img)
ER = 0.040
eyeL = Vector((0.054, -0.096, 0.03)); eyeR = Vector((-0.054, -0.096, 0.03))
eyes = []
for nm, c in (('EyeL', eyeL), ('EyeR', eyeR)):
    o = sphere(nm, rel(c), (ER, ER, ER), EYE, seg=48, sub=0, rot=(math.radians(90), 0, 0)); eyes.append(o)
    # glint
    sphere(nm + 'HL', rel(c + Vector((0.012 * (1 if c.x > 0 else 1), -ER * 0.93, 0.014))), (0.006, 0.003, 0.006), HL, sub=0)
    # upper eyelid (skin shell), pivot at eye centre; rotate X to blink
    bpy.ops.mesh.primitive_uv_sphere_add(segments=40, ring_count=20, radius=ER * 1.07, location=(0, 0, 0))
    lid = bpy.context.object; lid.name = 'Lid' + nm[-1]
    bm = bmesh.new(); bm.from_mesh(lid.data)
    bmesh.ops.delete(bm, geom=[v for v in bm.verts if v.co.z < ER * 0.42], context='VERTS')  # keep top cap only (open eye)
    bm.to_mesh(lid.data); bm.free()
    md = lid.modifiers.new('sol', 'SOLIDIFY'); md.thickness = 0.004
    lid.location = rel(c); lid.rotation_euler = (math.radians(-38), 0, 0)
    finish(lid, SKIN, 1)
# brows
for nm, c in (('BrowL', eyeL), ('BrowR', eyeR)):
    s = 1 if c.x > 0 else -1
    pts = [rel(c + Vector((s * dx, -0.032 - 0.004 * (1 - abs(dx) * 20), 0.055 + dz))) for dx, dz in ((-0.032, -0.006), (0.0, 0.006), (0.034, 0.0))]
    cu = bpy.data.curves.new(nm, 'CURVE'); cu.dimensions = '3D'; cu.bevel_depth = 0.0105 if not fem else 0.006; cu.bevel_resolution = 4
    sp = cu.splines.new('BEZIER'); sp.bezier_points.add(len(pts) - 1)
    for bp, p in zip(sp.bezier_points, pts): bp.co = p; bp.handle_left_type = bp.handle_right_type = 'AUTO'
    o = bpy.data.objects.new(nm, cu); sc.collection.objects.link(o); o.data.materials.append(BROW)
    active(o); bpy.ops.object.convert(target='MESH'); o = bpy.context.object; o.name = nm
    bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY')
    finish(o, None, 1)

# mouth: friendly closed smile (dark inner + teeth), scale Z to talk
bpy.ops.mesh.primitive_uv_sphere_add(segments=32, ring_count=16, radius=1, location=rel((0, -0.128, -0.068)))
mouth = bpy.context.object; mouth.name = 'Mouth'; mouth.scale = (0.036, 0.012, 0.011); finish(mouth, MOUTH, 1)
bpy.ops.mesh.primitive_uv_sphere_add(segments=24, ring_count=12, radius=1, location=rel((0, -0.133, -0.063)))
teeth = bpy.context.object; teeth.name = 'Teeth'; teeth.scale = (0.026, 0.006, 0.005); finish(teeth, TEETH, 1)
bpy.ops.mesh.primitive_torus_add(major_radius=0.034, minor_radius=0.0055, location=rel((0, -0.13, -0.066)), rotation=(math.radians(90), 0, 0))
lip = bpy.context.object; lip.name = 'Lips'; lip.scale = (1.0, 0.36, 1.0); finish(lip, mat('Lip', [c * 0.8 for c in S['skin']], 0.45), 1)

# beard / hair shells cut from the head surface
def shell(name, keep, thick, m, extra=None):
    o = head.copy(); o.data = head.data.copy(); o.name = name; sc.collection.objects.link(o)
    bm = bmesh.new(); bm.from_mesh(o.data)
    bmesh.ops.delete(bm, geom=[f for f in bm.faces if not keep(f.calc_center_median())], context='FACES')
    bm.to_mesh(o.data); bm.free()
    md = o.modifiers.new('sol', 'SOLIDIFY'); md.thickness = thick; md.offset = 1
    o.data.materials.clear(); o.data.materials.append(m)
    sub = o.modifiers.new('sub', 'SUBSURF'); sub.levels = 1
    return o
if S['beard']:
    def keep_beard(p):
        q = p - H
        if q.y > 0.045: return False
        if q.z < -0.19: return False
        if abs(q.x) > 0.105 and q.z < 0.03: return True          # sideburns + jaw sides
        if q.z < -0.045: return True                                # jaw, chin, under the mouth
        if q.z < -0.03 and abs(q.x) < 0.045 and q.y < -0.09: return True  # moustache
        return False
    shell('Beard', keep_beard, 0.013, BEARD)
style = S['hairStyle']
def keep_hair(p):
    q = p - H
    front = max(0.0, min(1.0, (-q.y + 0.02) / 0.14))     # 1 at the face, 0 at the back
    line = 0.0 + front * 0.085 if style != 'long' else -0.0 + front * 0.09
    if abs(q.x) > 0.115 and q.z > 0.02 and q.y > -0.06: return True
    return q.z > line
hair = shell('HairShell', keep_hair, 0.022, HAIR)
hair_elems = []
if style == 'swept':      # swept-back volume like the reference
    hair_elems = [{'co': rel((0, -0.05, 0.135)), 'r': 0.11, 'size': (1.05, 1.0, 0.55)}, {'co': rel((0, 0.03, 0.14)), 'r': 0.12, 'size': (1.0, 1.1, 0.5)}]
elif style == 'quiff':
    hair_elems = [{'co': rel((0.02, -0.08, 0.15)), 'r': 0.09, 'size': (1.2, 0.9, 0.7)}, {'co': rel((0, 0.02, 0.135)), 'r': 0.12, 'size': (1, 1.1, 0.5)}]
elif style == 'curly':
    import random; random.seed(4)
    hair_elems = [{'co': rel((math.cos(a) * 0.1 * rr, math.sin(a) * 0.1 * rr - 0.01, 0.1 + 0.05 * (1 - rr))), 'r': 0.05, 'k': 2.0} for a in [i * 0.7 for i in range(18)] for rr in (0.4, 1.0)]
elif style == 'long':
    hair_elems = [{'co': rel((0, 0.0, 0.12)), 'r': 0.13, 'size': (1.05, 1.1, 0.6)}, {'co': rel((0, 0.07, -0.08)), 'r': 0.14, 'size': (1.0, 0.6, 1.4)},
                  {'co': rel((0.11, 0.0, -0.06)), 'r': 0.07, 'size': (0.5, 1.0, 1.6)}, {'co': rel((-0.11, 0.0, -0.06)), 'r': 0.07, 'size': (0.5, 1.0, 1.6)}]
elif style == 'bun':
    hair_elems = [{'co': rel((0, 0.0, 0.13)), 'r': 0.12, 'size': (1.0, 1.05, 0.55)}, {'co': rel((0, 0.07, 0.2)), 'r': 0.065}]
if hair_elems:
    vol = metaball('HairVol', hair_elems, HAIR, res=0.008)
if S.get('glasses'):
    for c in (eyeL, eyeR):
        bpy.ops.mesh.primitive_torus_add(major_radius=0.046, minor_radius=0.0045, location=rel(c + Vector((0, -0.045, 0))), rotation=(math.radians(90), 0, 0))
        finish(bpy.context.object, DARK, 1).name = 'Glasses'

# ================= BODY =================
b = S['build']
neck = capsule('Neck', (0, 0.0, 1.33), (0, 0.0, 1.47), 0.052, SKIN)
torso = metaball('Torso', [
    {'co': (0, 0.0, 1.22), 'r': 0.2 * b, 'size': (1.0, 0.62, 0.95) if not fem else (0.9, 0.62, 0.9)},
    {'co': (0, 0.0, 1.02), 'r': 0.18 * b, 'size': (0.95, 0.62, 0.85) if not fem else (0.82, 0.6, 0.85)},
    {'co': (0.17 * b, 0, 1.31), 'r': 0.085}, {'co': (-0.17 * b, 0, 1.31), 'r': 0.085},
], SHIRT)
collar = sphere('Collar', (0, -0.0, 1.355), (0.075, 0.062, 0.02), SHIRT)
pelvis = metaball('Pelvis', [{'co': (0, 0, 0.9), 'r': 0.17 * b, 'size': (1.0, 0.7, 0.55)}], PANTS)
SH = 0.215 * b
arms = {}
for side, s in (('L', 1), ('R', -1)):
    sh = Vector((s * SH, 0, 1.31)); el = Vector((s * (SH + 0.025), 0.01, 1.03)); wr = Vector((s * (SH + 0.035), -0.005, 0.79))
    up = capsule('UpperArm' + side, sh, el, 0.052, SKIN, r2=0.046)
    if S['sleeve'] == 'short':
        sl = capsule('Sleeve' + side, sh, sh + (el - sh) * 0.5, 0.068, SHIRT, r2=0.062)
    else:
        sl = capsule('Sleeve' + side, sh, el + (wr - el) * 0.85, 0.066, SHIRT, r2=0.054)
    fo = capsule('ForeArm' + side, el, wr, 0.046, SKIN, r2=0.038)
    # hand: palm + fingers + thumb
    palm = sphere('Palm' + side, wr + Vector((0, -0.005, -0.055)), (0.026, 0.044, 0.05), SKIN, rot=(0, 0, math.radians(90)))
    parts = [palm]
    for i, dx in enumerate((-0.026, -0.009, 0.009, 0.026)):
        L = (0.062, 0.07, 0.066, 0.052)[i]
        a = wr + Vector((s * 0.0, -0.005 + dx, -0.09)); c = a + Vector((s * 0.008, -0.01, -L))
        parts.append(capsule(f'F{i}{side}', a, c, 0.0105, SKIN))
    parts.append(capsule('Thumb' + side, wr + Vector((s * -0.012, -0.035, -0.05)), wr + Vector((s * -0.02, -0.06, -0.095)), 0.012, SKIN))
    for q in parts: apply_mods(q)
    bpy.ops.object.select_all(action='DESELECT')
    for q in parts: q.select_set(True)
    bpy.context.view_layer.objects.active = palm; bpy.ops.object.join(); hand = bpy.context.object; hand.name = 'Hand' + side
    arms[side] = (sh, el, wr, up, sl, fo, hand)
legs = {}
for side, s in (('L', 1), ('R', -1)):
    hp = Vector((s * 0.088, 0, 0.9)); kn = Vector((s * 0.09, -0.005, 0.5)); an = Vector((s * 0.09, 0.0, 0.11))
    th = capsule('Thigh' + side, hp, kn, 0.082 * b, PANTS, r2=0.07)
    sn = capsule('Shin' + side, kn, an + Vector((0, 0, 0.02)), 0.068, PANTS, r2=0.062)
    shoe = rbox('Shoe' + side, an + Vector((0, -0.045, -0.05)), (0.105, 0.25, 0.085), SHOE, 0.035)
    sole = rbox('Sole' + side, an + Vector((0, -0.045, -0.088)), (0.112, 0.258, 0.025), SOLE, 0.01)
    legs[side] = (hp, kn, an, th, sn, shoe, sole)

# ================= JOINTS (empties) =================
def joint(name, loc, parent=None):
    e = bpy.data.objects.new(name, None); e.empty_display_size = 0.04; e.location = loc; sc.collection.objects.link(e)
    if parent: e.parent = parent; e.matrix_parent_inverse = parent.matrix_world.inverted()
    bpy.context.view_layer.update(); return e
def attach(o, j):
    mw = o.matrix_world.copy(); o.parent = j; o.matrix_parent_inverse = j.matrix_world.inverted(); bpy.context.view_layer.update()
root = joint('Root', (0, 0, 0)); hips = joint('Hips', (0, 0, 0.92), root); chest = joint('Chest', (0, 0, 1.12), hips)
neckJ = joint('NeckJ', (0, 0, 1.38), chest); headJ = joint('HeadJ', (0, 0, 1.47), neckJ)
for o in (torso, collar): attach(o, chest)
attach(pelvis, hips); attach(neck, neckJ)
for nm in ('Head', 'EarL', 'EarR', 'EarInL', 'EarInR', 'EyeL', 'EyeR', 'EyeLHL', 'EyeRHL', 'Mouth', 'Teeth', 'Lips', 'Beard', 'HairShell', 'HairVol', 'BrowL', 'BrowR', 'Glasses', 'Glasses.001'):
    o = bpy.data.objects.get(nm)
    if o: attach(o, headJ)
for nm in ('LidL', 'LidR'):
    o = bpy.data.objects[nm]; attach(o, headJ)
for side in ('L', 'R'):
    sh, el, wr, up, sl, fo, hand = arms[side]
    jS = joint('Shoulder' + side, sh, chest); jE = joint('Elbow' + side, el, jS); jW = joint('Wrist' + side, wr, jE)
    attach(up, jS); attach(sl, jS); attach(fo, jE); attach(hand, jW)
    hp, kn, an, th, sn, shoe, sole = legs[side]
    jH = joint('Hip' + side, hp, hips); jK = joint('Knee' + side, kn, jH); jA = joint('Ankle' + side, an, jK)
    attach(th, jH); attach(sn, jK); attach(shoe, jA); attach(sole, jA)

# apply modifiers on all meshes (export-ready)
for o in list(sc.objects):
    if o.type == 'MESH' and o.modifiers: apply_mods(o)

# ================= EXPORT =================
bpy.ops.object.select_all(action='SELECT')
bpy.ops.export_scene.gltf(filepath=OUT, export_format='GLB', use_selection=True, export_yup=True, export_animations=False, export_image_format='JPEG')
print('EXPORTED', OUT, os.path.getsize(OUT) // 1024, 'KB')

if PREV:
    cam = bpy.data.objects.new('cam', bpy.data.cameras.new('cam')); sc.collection.objects.link(cam); sc.camera = cam
    view = SPEC.get('_view', 'full')
    if view == 'face': cam.data.lens = 85; cam.location = (0.55, -1.25, 1.62); target = Vector((0, 0, 1.58))
    else: cam.data.lens = 50; cam.location = (1.1, -3.6, 1.05); target = Vector((0, 0, 0.9))
    d = target - cam.location; cam.rotation_euler = d.to_track_quat('-Z', 'Y').to_euler()
    for (loc, e, sz) in [((2.0, -2.5, 3.0), 4.5, 2.5), ((-2.5, -1.5, 2.0), 1.6, 3), ((0.5, 2.5, 3.0), 3.0, 1.5)]:
        L = bpy.data.objects.new('l', bpy.data.lights.new('l', 'AREA')); L.data.energy = e * 150; L.data.size = sz; L.location = loc
        L.rotation_euler = (target - Vector(loc)).to_track_quat('-Z', 'Y').to_euler(); sc.collection.objects.link(L)
    sc.world = bpy.data.worlds.new('w'); sc.world.use_nodes = True
    sc.world.node_tree.nodes['Background'].inputs[0].default_value = (0.86, 0.86, 0.86, 1); sc.world.node_tree.nodes['Background'].inputs[1].default_value = 0.6
    sc.render.engine = 'CYCLES'; sc.cycles.samples = 40; sc.cycles.device = 'CPU'
    sc.view_settings.view_transform = 'AgX'
    sc.render.resolution_x = 640; sc.render.resolution_y = 960 if view != 'face' else 700; sc.render.filepath = PREV
    bpy.ops.render.render(write_still=True)
    print('PREVIEW', PREV)
