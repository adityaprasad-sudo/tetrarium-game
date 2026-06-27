

const scene = new THREE.Scene()
scene.background = new THREE.Color('#050505');
scene.fog = new THREE.FogExp2('#050505', 0.04)
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)

const time = new THREE.Clock()
const collide = []
let crocnpc = null

const ambientlight = new THREE.AmbientLight(0xFFFFFF, 0.5);
scene.add(ambientlight)

const flashlight = new THREE.SpotLight(0xffffff,2, 50, Math.PI / 6, 0.5, 1)
flashlight.castShadow = true
flashlight.position.set(0, 0, 0)
camera.add(flashlight)
camera.add(flashlight.target)
flashlight.target.position.set(0, 0, -1)
scene.add(camera)

class cronpc { 
    constructor(scene, gltf, startx, startz) {
        this.mesh = gltf.scene;
     this.mesh.scale.set(5,5,5)   
        this.mesh.position.set(startx, 5, startz);
        this.mesh.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true
                child.receiveShadow = true
            }
        })
        scene.add(this.mesh)
        
        this.mixer = new THREE.AnimationMixer(this.mesh);
        this.animations = gltf.animations; 
        this.actions = { 
            idle: this.mixer.clipAction(this.getanim('idle')),
            walk: this.mixer.clipAction(this.getanim('walk')),
            run: this.mixer.clipAction(this.getanim('run')),
            attack: this.mixer.clipAction(this.getanim('attack'))
        }
        
        this.currentstatee = 'idle'
        this.currentaction = this.actions.idle
        if (this.currentaction) this.currentaction.play()
        
        this.walkspeed = 0.03
        this.run = 0.12
        this.radius = 15
        this.attradi = 5
        this.gravity = -0.05
        this.velocityy = 0
        
        
    }
    
    getanim(name) {
        return this.animations.find(a => a.name.toLowerCase().includes(name.toLowerCase())) || this.animations[0]
    }
    
    changestate(newstate, actionName) {
        if (this.currentstatee === newstate || !this.actions[actionName]) return
        this.currentstatee = newstate
        const prevstate = this.currentaction
        const newact = this.actions[actionName]
this.currentstatee = newstate
        newact.reset()
        newact.setEffectiveTimeScale(1)
        newact.setEffectiveWeight(1)
        
        newact.play()
        if(prevstate){
            prevstate.crossFadeTo(newact, 0.3, true)
            
        }
        
        this.currentaction = newact
    }
    
    applyGravity() {
        const ray = new THREE.Vector3(this.mesh.position.x, this.mesh.position.y + 1, this.mesh.position.z)
        const down = new THREE.Vector3(0, -1, 0)
        const raycast = new THREE.Raycaster(ray, down)
        const hit = raycast.intersectObjects(collide, true)
        
        let height = -100;
        if (hit.length > 0) height = hit[0].point.y
        
        this.velocityy += this.gravity
        this.mesh.position.y += this.velocityy
        
        if (this.mesh.position.y <= height) {
            this.velocityy = 0
            this.mesh.position.y = height
        }
    }
    
    update(chatime, pos) {
        if (this.mixer) this.mixer.update(chatime)
        this.applyGravity()
        
        const dx = pos.x - this.mesh.position.x
        const dz = pos.z - this.mesh.position.z
        const distpl = Math.sqrt(dx * dx + dz * dz)
        if(dayum){
            if(distpl < 4){
                scene.remove(this.mesh);
                return "dead"
            }
            this.changestate('flee', 'run')
            const plax = this.mesh.position.x -dx
            const plaz = this.mesh.position.z -dz
            this.mesh.lookAt(plax, this.mesh.position.y, plaz)
        const dogechallenger = this.dumb(this.run)
            return "alive" 
        }
        switch (this.currentstatee) {
            case 'idle':
                if (Math.random() < 0.01) this.changestate('patrol', 'walk')
                if (distpl < this.radius) this.changestate('chase', 'run')
                break;
            case 'patrol':
                this.dumb(this.walkspeed);
                if (Math.random() < 0.005) this.changestate('idle', 'idle')  
                if (distpl < this.radius) this.changestate('chase', 'run')
                break
            case 'chase':
                this.mesh.lookAt(pos.x, this.mesh.position.y, pos.z);  
                this.dumb(this.run, pos)
                if (distpl < this.attradi) {
                    this.changestate('attack', 'attack')
                } else if (distpl > this.radius * 1.5) {
                    this.changestate('patrol', 'walk');
                }
                break;
            case 'attack':
                this.mesh.lookAt(pos.x, this.mesh.position.y, pos.z);
                if (distpl > this.attradi) {
                    this.changestate('chase', 'run');
                }    
                break;
        }
        return "alive"
    }
    dumb(speed, target = null) {
        let dogechallenger = false
        const front = new THREE.Vector3(0,0,1).applyQuaternion(this.mesh.quaternion).normalize()
        const chesy = new THREE.Vector3(this.mesh.position.x, this.mesh.position.y + 2, this.mesh.position.z -5);
        const rayf = new THREE.Raycaster(chesy, front, 0 , 3)
        const hitf = rayf.intersectObjects(collide, true)
        const rightof = new THREE.Vector3(0.5,0,0).applyQuaternion(this.mesh.quaternion)
        const leftof = new THREE.Vector3(-0.5,0,0).applyQuaternion(this.mesh.quaternion)
        const rightsho = chesy.clone().add(rightof)
        const leftsho = chesy.clone().add(leftof)  
        const raycent = new THREE.Raycaster(chesy, front,0,4)
        const rayright = new THREE.Raycaster(rightsho, front,0,4)
        const rayleft = new THREE.Raycaster(leftsho, front,0,4)
        const hitcent = raycent.intersectObjects(collide, true)
        const hitright = rayright.intersectObjects(collide, true)
        const hitleft = rayleft.intersectObjects(collide, true)  
        const turn = 0.08
        
        
        
        if(hitcent.length > 0 || hitright.length > 0 || hitleft.length > 0){
            dogechallenger = true
            if(hitleft.length > 0 && hitright.length === 0){
                this.mesh.rotateY(turn)

            }else if(hitright.length > 0 && hitleft.length === 0){
                this.mesh.rotateY(-turn)    
            }else{
                this.mesh.rotateY(-turn)
            }
        } else if (target){
            this.mesh.lookAt(target.x, this.mesh.position.y, target.z)  

        }
        const finaldir = new THREE.Vector3(0,0,1).applyQuaternion(this.mesh.quaternion).normalize()
        const getottatheway = new THREE.Raycaster(chesy, finaldir, 0 , speed + 0.5).intersectObjects(collide, true)
        const risho = new THREE.Raycaster(rightsho, finaldir, 0 , speed + 0.5).intersectObjects(collide, true)
        const lefsho = new THREE.Raycaster(leftsho, finaldir, 0 , speed + 0.5).intersectObjects(collide, true)
        if(getottatheway.length === 0 && risho.length === 0 && lefsho.length === 0){
            this.mesh.translateZ(speed)
        }
        return dogechallenger
    }
}
const terreriums = []
let earned = 0
const player = {
    
    position: new THREE.Vector3(0, 0, 0),
    velocity: new THREE.Vector3(0, 0, 0),
    yaw: 0,
    pitch: 0,
    speed: 0.15,
    gravity: -0.05,
    jumpforce: 0.6,
    ground: false,
    key: {
        w: false,
        a: false,
        s: false,
        d: false,
        space: false
    },
    
    init: function() {
        renderer.domElement.addEventListener('click', () => {
            document.body.requestPointerLock();
        });
        document.addEventListener('mousemove', (e) => {
            if (document.pointerLockElement) {
                this.yaw -= e.movementX * 0.002;
                this.pitch -= e.movementY * 0.002;
                this.pitch = Math.max(-1.5, Math.min(1.5, this.pitch));
            }
        });
        window.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 'w') this.key.w = true
            if (e.key.toLowerCase() === 'a') this.key.a = true
            if (e.key.toLowerCase() === 's') this.key.s = true
            if (e.key.toLowerCase() === 'd') this.key.d = true
            if (e.key === ' ') this.key.space = true; 
        });
        window.addEventListener('keyup', (e) => {
            if (e.key.toLowerCase() === 'w') this.key.w = false
            if (e.key.toLowerCase() === 'a') this.key.a = false;
            if (e.key.toLowerCase() === 's') this.key.s = false
            if (e.key.toLowerCase() === 'd') this.key.d = false;
            if (e.key === ' ') this.key.space = false
        });
    },
    
    update: function() {
        let dx = 0, dz = 0;
        if (this.key.w) { dx -= Math.sin(this.yaw) * this.speed; dz -= Math.cos(this.yaw) * this.speed }
        if (this.key.s) { 
            dx += Math.sin(this.yaw) * this.speed; dz += Math.cos(this.yaw) * this.speed}
        if (this.key.a) {
             dx -= Math.cos(this.yaw) * this.speed; dz += Math.sin(this.yaw) * this.speed }
        if (this.key.d) { 
            dx += Math.cos(this.yaw) * this.speed; dz -= Math.sin(this.yaw) * this.speed }
        const dez = Math.sqrt(dx * dx + dz * dz)
        if(dez>0){
            const dez2 = new THREE.Vector3(dx, 0, dz).normalize()
            const brepos = new THREE.Vector3(this.position.x, this.position.y + 0.5, this.position.z)
            const raywa = new THREE.Raycaster(brepos, dez2, 0 , dez + 0.4)
            const hits = raywa.intersectObjects(collide, true)
            if(hits.length === 0){
this.position.x += dx
        this.position.z += dz
            }
        }
        
        

        const rayorg = new THREE.Vector3(this.position.x, this.position.y + 1, this.position.z)
        const downvec = new THREE.Vector3(0, -1, 0);
        const raycaster = new THREE.Raycaster(rayorg, downvec)
        const hit = raycaster.intersectObjects(collide, true)
        
        let height = -2.1
    
        if (hit.length > 0) height = hit[0].point.y
        
        this.velocity.y += this.gravity
        this.position.y += this.velocity.y
        
        if (this.position.y - 1.6 <= height) {
            this.velocity.y = 0
            this.position.y = height + 1.6
            this.ground = true
        } else {
            this.ground = false
        }
        
        if (this.key.space && this.ground) {
            this.velocity.y = this.jumpforce
            this.ground = false;
        }
        
        camera.position.copy(this.position)
        camera.rotation.set(this.pitch, this.yaw, 0, 'YXZ')
    }
};

player.init();

const loader = new THREE.GLTFLoader();
loader.load('./models/backrooms_level_0.glb', (gltf) => {
    const mpmodel = gltf.scene
    
    const box = new THREE.Box3().setFromObject(mpmodel)
    const center = box.getCenter(new THREE.Vector3())
    mpmodel.position.x = -center.x
    mpmodel.position.z = -center.z
    mpmodel.position.y = 0
    mpmodel.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
        }
    })

    scene.add(mpmodel)
    collide.push(mpmodel)
})

loader.load('./models/crocodile.glb', (gltf) => {
    console.log(gltf.animations)
    crocnpc = new cronpc(scene, gltf, player.position.x, player.position.z) 
}, undefined, (error) => console.error(error))

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
});
loader.load('./models/terrarium.glb', (gltf) => {
    const spawn =[
        { x: -89.72, z: -150.74 },
        { x: 6, z: -6 },
        { x: -6, z: 6 },
        { x: -6, z: -6 }
    ]
    spawn.forEach((pos) => {
        const item = gltf.scene.clone()
        item.scale.set(0.5, 0.5, 0.5)
        item.position.set(pos.x,-0.3, pos.z)
        scene.add(item)
        terreriums.push(item)
    })
})
const power = []
let dayum = false
function dayummode(dayum){
    if(dayum)
    {
        
    } 
}

let kama = 0
loader.load('./models/powerball.glb', (gltf) => {
    const spawn =[
        { x: -89.72, z: -150.74 },
        { x: 6, z: -6 },
        { x: -6, z: 6 },
        { x: -6, z: -6 }
    ]
    spawn.forEach((pos) => {
        const item = gltf.scene.clone()
        item.scale.set(0.01, 0.01, 0.01)
        item.position.set(pos.x,0, pos.z)
        scene.add(item)
        power.push(item)
    })
})
let timer = 0
const musicdayum = new Audio('./audio/dayummode.mp3');
const ui = document.getElementById('timothy')

function anim() {
    requestAnimationFrame(anim);
    const delta = time.getDelta();
    player.update()
    for(let i = terreriums.length -1; i >= 0; i--){
        let item = terreriums[i]
        const dx = player.position.x - item.position.x
        const dz = player.position.z - item.position.z
        const horidis = Math.sqrt(dx * dx + dz * dz)
        
        if(horidis < 2.5){
            terreriums.splice(i, 1)
            scene.remove(item)
            earned ++;
            console.log(earned)
        }
    }
    for(let i = power.length -1; i >= 0; i--){
        let item = power[i]
        const dx = player.position.x - item.position.x
        const dz = player.position.z - item.position.z
        const horidis = Math.sqrt(dx * dx + dz * dz)
        
        if(horidis < 2.5){
            dayum = true
            timer = 53
            ui.style.display = 'block'
            power.splice(i, 1)
            scene.remove(item)
           musicdayum.currentTime = 0;
           musicdayum.play();
        }
    }
    if(dayum){
    timer -= delta
    ui.innerText = "DAYUM: " + Math.ceil(timer)
    if(timer <= 0){
    dayum = false
   ui.style.display = 'none'
    musicdayum.pause();
    }
}
    if (crocnpc) { 
        const status = crocnpc.update(delta, player.position)
        
        if(status === "dead"){
        crocnpc = null
        console.log("crocodile ded :)")
        }
    }
    
    renderer.render(scene, camera)
}
anim()