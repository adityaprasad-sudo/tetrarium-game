# Welcome
First of all sorry for my messy code but after a lot of all nighters and hard work i present you a backrooms game fully web based Now thats HELL YEAH!!

# How did i make it?
I used Three js libraries to gnerate all the 3d models in the canvas and also used it to apply special effects like bloom, anti aliashing, etc.

# What all things did i use?

- Three JS
- HTML
- JAVASCRIPT
- Blender
- mixamo(Adobe)
- VS code
- Vercel(for hosting)

## first lets talk about how did i implement the animations and 3D models

1. First We Rig the 3D models using Mixamo

    Convert Your 3d models to .fbx, .obj or .zip file then upload them on mixamo

2. Align the body parts as per mixamo.

3. download all the run, walk, idle, attack, and death animations.

4. Use NLA editor in blender to squish all animations in a single amature so we can use the animations as an array later in our javascript.

5. export the file in .glb format.