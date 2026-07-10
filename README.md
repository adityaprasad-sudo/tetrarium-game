# Welcome
First of all sorry for my messy code but after a lot of all nighters and hard work i present you a backrooms game fully web based Now thats HELL YEAH!!
This is a Project for #horizons 

# How did i make it?
I used Three js libraries to gnerate all the 3d models in the canvas and also used it to apply special effects like bloom, anti aliashing, etc.
Used Blender to squish all the animations in a single armature so we couldd use that data as an array later.
I also used mixamo from adobe to animate and rig my base meshes
______________________________________________________________________
# What all things did i use?

- Three JS
- HTML
- JAVASCRIPT
- Blender
- mixamo(Adobe)
- VS code
- Vercel(for web hosting)
______________________________________________________________________
## first lets talk about how did i implement the animations and 3D models

1. ### First We Rig the 3D models using Mixamo

    Convert Your 3d models to .fbx, .obj or .zip file then upload them on mixamo
    ![export fbx](https://github.com/adityaprasad-sudo/tetrarium-game/blob/main/tutorial/Screenshot%202026-07-09%20112233.png?raw=true)
    ![export fbx](https://github.com/adityaprasad-sudo/tetrarium-game/blob/main/tutorial/Screenshot%202026-07-09%20113047.png?raw=true)

2. ### Align the body parts as per mixamo.
   ![export fbx](https://github.com/adityaprasad-sudo/tetrarium-game/blob/main/tutorial/Screenshot%202026-07-09%20113358.png?raw=true)
     ![export fbx](https://github.com/adityaprasad-sudo/tetrarium-game/blob/main/tutorial/Screenshot%202026-07-09%20113620.png?raw=true)

3. ### download all the run, walk, idle, attack, and death animations.
    ![export fbx](https://github.com/adityaprasad-sudo/tetrarium-game/blob/main/tutorial/Screenshot%202026-07-09%20113915.png?raw=true)


4. ### Use NLA editor in blender to squish all animations in a single amature so we can use the animations as an array later in our javascript.
    - first upload all animations in one blender file or whatever 3d software you are using
    ![export fbx](https://github.com/adityaprasad-sudo/tetrarium-game/blob/main/tutorial/Screenshot%202026-07-09%20123603.png?raw=true)
    ![export fbx](https://github.com/adityaprasad-sudo/tetrarium-game/blob/main/tutorial/Screenshot%202026-07-09%20123731.png?raw=true)
    - after that hide them all just keep one visible and open dope sheet(action mode) and then nla editor in a new op window
    ![export fbx](https://github.com/adityaprasad-sudo/tetrarium-game/blob/main/tutorial/Screenshot%202026-07-09%20123916.png?raw=true)
    here you can see that i already have an animation in it so just push the small icon besides the track in the nla editor to squish it in the armature
    - finally it should look exactly like this for whatever character you wanna implement
    ![export fbx](https://github.com/adityaprasad-sudo/tetrarium-game/blob/main/tutorial/Screenshot%202026-07-09%20124120.png?raw=true)

5. ### export the file in .glb format.
   -   Then just export the file in .glb format as it is faster for browsers and well optimized.

**NOTE**:- While exporting select your current mesh and armature visible in view port and then export only the selected objects in the export settings.
___________________________________________________________________
# THE CODE

I know after looking at my code you cant understand probably beacuse of my lazy variable naming and structure

But if you only wanna implement a new monster heres how to do it.
- Have a .glb file with all the animations squished into one armature (we did that already)
- link it into the mechanism.js file using the deafult three js gltf loader
```
let clark = null
loader.load('./models/clark/clark.glb', (gltf) => {
    gltf.scene.add(clarkgrowl)
    gltf.scene.add(clarkidle)
    gltf.scene.add(clarkrun)
    clark = new cronpc(scene, gltf, 70, 30)
    clark.growl= clarkgrowl
    clark.ideal = clarkidle
    clark.runaud = clarkrun
}, undefined, (error) => console.error(error))
```
the clark.growl, clark.ideal, clark.runaud are the ambient audios that these monsters make.

**NOTE** - Be sure to attach the cronpc cronsturctor to your glb since it handles all the npc logic (**EXTREMLY IMPORTANT**)

How to add audio ?

To add audio we use three js positional audio since we want the stereo experience we use,
```
const listen = new THREE.AudioListener()
camera.add(listen)
const clarkrun = new THREE.PositionalAudio(listen)
const clarkidle = new THREE.PositionalAudio(listen)
const clarkgrowl = new THREE.PositionalAudio(listen)
loader2.load('./audio/clark/scream.mp3', (buffer) => {
        clarkrun.setBuffer(buffer)
        clarkrun.setRefDistance(10)
        clarkrun.setMaxDistance(200)
        clarkrun.setDistanceModel('linear')
        clarkrun.setLoop(true)
        clarkrun.setVolume(2)
})
```
**look how we add the camera to the listen it makes our ears act act as a listening source here**

the setRefDistance() and setMaxDistance() here are the minimum and maximum range that we hear the sound of the monster 

you have to add three sounds while adding a new monster
- a idle sound
- a growling sound
- a fleeing sound (since when we equip powerball in the game they should fear US)
_________________________________________________
# How does the npc logic work?

Basically when the monster is chasing you it shoots a raycaster from its chest towards you and if a wall comes in bettween it follows the hidden coordinates left by you to keep on chasing assumning you wont hit any wall the chasing mechanism works perfectly without ever hitting a wall

but now how does the fleeeing mechanism work in this mechanism it shoots three raycaster one from the chest and two from both the sholders as it could get stuck in the corners that why we use the sholder raycasters to spin the monster around so its able to flee properly.

the raycasters are 
```
const chesy = new THREE.Vector3(this.mesh.position.x, this.mesh.position.y +1, this.mesh.position.z)
const front = new THREE.Vector3(0, 0, 1).applyQuaternion(this.mesh.quaternion).normalize();
const rightof = new THREE.Vector3(3.5,0,0).applyQuaternion(this.mesh.quaternion)
const leftof = new THREE.Vector3(-3.5,0,0).applyQuaternion(this.mesh.quaternion)
const rightsho = chesy.clone().add(rightof)
const leftsho = chesy.clone().add(leftof)
const hitcent = new THREE.Raycaster(chesy, front, 0, 4).intersectObjects(collide, true)
const hitright = new THREE.Raycaster(rightsho, front, 0, 4).intersectObjects(collide, true)
const hitleft = new THREE.Raycaster(leftsho, front, 0, 4).intersectObjects(collide, true)
```

Hopefully its understandable.
_________________________________________
# _**AI USAGE**_

I have used AI to debug the code and also i used inline suggestions in VS code
ai has not been used to generate any images or audio
the audio in the ending of the game is my own voice but with a voice changer(darth vader)
also i used ai to make a custom fisheye shader 
_____________________________________________________________________________________
## how to adjust player speed, monster speed ,attack radius , how many chocolate, bottles etc. should spawn ?

1. to adjust Player variables edit these from line (610 - 638) -
```
{
    ativeslot: 0,
    position: new THREE.Vector3(0, 1.6, 0),
    velocity: new THREE.Vector3(0, 0, 0),
    yaw: 0,
    pitch: 0,
    speed: 0.15,
    inventory : [null, null, null],
    walkspeed: 0.1,
    sprintspeed: 0.17,
    cooldown: 0,
    stamina: 200,
    maxstamina: 200,
    bob: 0,
    gravity: -0.05,
    jumpforce: 0.6,
    ground: false,
    dis: 0,
    ishide: false,
    actloc: null,
    alter: true,
    timelas:0,
    key: {
        w: false,
        a: false,
        s: false,
        d: false,
        space: false
    },
```

**IMP** - If you edit the stamina, maxstamina or health variable be sure to change them also in the floatingshit cronstructor also!

2. TO adjust the monster variables head to line (310 - 361) - 
```
this.walkspeed = 0.05
        this.run = 0.18
        this.radius = 10
        this.attradi = 2
        this.gravity = -0.05
        this.velocityy = 0
        this.died = false
        this.dietime = 2.5
        this.muff = listen.context.createBiquadFilter()
       this.muff.type = 'lowpass'
         this.muff.frequency.value = 22000
        this.appfilter = false
```
3. to adjust how many chocolates, bottles, powerballs, and terariums spawn edit these lines

**For chocolate** 
```
const choco = []
loader.load('./models/chocolate/Untitled.glb', (gltf) => {
    const toatal= 50
    const mp = 300
    for(let i = 0; i < toatal; i++){
        const item = gltf.scene.clone()
        item.scale.set(3, 3, 3)
        item.position.set((Math.random() * mp) - mp/2,0, (Math.random() * mp) - mp/2)
        scene.add(item)
        choco.push(item)
    }
})
```
**EDIT THE TOATAL VARIABLE IN THIS**

**FOR POWERBALLS**
```
const powerball = []
loader.load('./models/powerball.glb', (gltf) => {
    const toatal= 2
    const mp = 300
    for(let i = 0; i < toatal; i++){
        const item = gltf.scene.clone()
        item.scale.set(0.07, 0.07, 0.07)
        item.position.set((Math.random() * mp) - mp/2,0, (Math.random() * mp) - mp/2)
        scene.add(item)
        powerball.push(item)
    } 
})
```
**EDIT THE TOATAL VARIABLE IN THIS**

**FOR TERRARIUMS AND TO THE MAKE THE GAME AFTER COLLECTING LESS TERARRIUMS**
```
const terra = []
loader.load('./models/terrarium.glb', (gltf) => {
    const toatal = 10
    const mp = 300
    for(let i = 0; i < toatal; i++){
        const item = gltf.scene.clone()
        item.scale.set(0.5, 0.5, 0.5)
        item.position.set((Math.random() * mp) - mp/2,0, (Math.random() * mp) - mp/2)
        scene.add(item)
        terra.push(item)
    }
})
```
**Edit the toatal variable here too**
**to make the game end in less terarriums**
reduce the value in the if staement.
```
else if (type === 'terra') {
            terra.splice(terra.indexOf(item), 1);
            scene.remove(item);
            earned++;
            if (earned >= 10(LESSEN THIS VALUE) && typeof window.ending === 'function') window.ending();
        } 
```

_______________________________________________________________________
# CHEAT CODES ;>

if you want to just watch the ending type 
```
earned = 10
```
in the console bar of your developer tool of browser and try to collect just one terarriums and the game will end

Speed hack type this into console
```
player.speed = 1
```
always dayum mode type this
```
dayum = true 
```
__________________________________________________________________________________________
# Things i learned
1. Dont drink too much coffee(I am serious)
2. Export the glb while only selecting the mesh and armature with all the animations 
3. Use Raycasterhelphers of THREE js while working with raycasters otherwise you could be wasting time on a bug that doesnt even exist.
4. use different foot sound for left and right so it doesnt sound repetative
5. I love THREE JS
6. Use Good naming on variables(i suffered since i didnt do this Personal experience __~-~__)
7. Use a lerp enigine on the flashlight so it doesnt look like its attached to the hand basically i want realism
8. try to name or add a prefix to items in the map whilling adding stuff in the map in blender since it becomes easier to target the props(locker in my case) to add mechanisms too
9. Dont try to quit a project because it has too many errors or too hard to make JUST DO IT
______________________________________________________________________________________________________
# Thank you

Thank you for reading this much!!!
