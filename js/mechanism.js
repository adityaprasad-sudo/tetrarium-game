

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
const staker = []
const lastpos = new THREE.Vector3(0, 0, 0)
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
        
        this.walkspeed = 0.07
        this.run = 0.15
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
            const chesy = new THREE.Vector3(this.mesh.position.x, this.mesh.position.y +1, this.mesh.position.z
            )
            const away = new THREE.Vector3(-dx,0,-dz).normalize()
            const angles = [0, Math.PI/4, -Math.PI/4, Math.PI/2, -Math.PI/2, Math.PI*3/4, -Math.PI*3/4, Math.PI]
            let fleedir = away.clone()
            for(const angle of angles){
                const test = away.clone().applyAxisAngle(new THREE.Vector3(0,1,0), angle)
                const ray = new THREE.Raycaster(chesy, test, 0, 8)
                if(ray.intersectObjects(collide, true).length === 0){
                    fleedir = test
                    break
                }
            }
            const trag = new THREE.Vector3(this.mesh.position.x + fleedir.x *10, this.mesh.position.y, this.mesh.position.z + fleedir.z *10)
            this.dumb(this.run, trag, true)
            return "alive"
        }
        if (this.currentstatee === 'flee') {
        this.currentstatee = null 
        this.changestate('idle', 'idle')
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
    dumb(speed, target = null, skip = false) {
        const chesy = new THREE.Vector3(this.mesh.position.x, this.mesh.position.y +1, this.mesh.position.z)
        const front = new THREE.Vector3(0, 0, 1).applyQuaternion(this.mesh.quaternion).normalize();
        let dir = front.clone()
        let targ = false
        if(target){
            const targches = new THREE.Vector3(target.x, target.y +1, target.z )
            const dirpla = new THREE.Vector3().subVectors(targches, chesy).normalize()
            const displa = chesy.distanceTo(targches)
            const losray = new THREE.Raycaster(chesy, dirpla, 0, displa)
            if(losray.intersectObjects(collide, true).length === 0){
                dir = dirpla
                targ = true
            }
        }
        if(!targ && !skip && staker.length >0 ){
            for(let i = staker.length -1; i >= 0; i--){
                    const stalk = staker[i]
                    const stalkches = new THREE.Vector3(stalk.x, stalk.y, stalk.z )
                    const dirsta = new THREE.Vector3().subVectors(stalkches, chesy).normalize()
                    const dissta = chesy.distanceTo(stalkches)
                    if(dissta > 0.5) {
                    const losray = new THREE.Raycaster(chesy, dirsta, 0, dissta)
                    if(losray.intersectObjects(collide, true).length === 0){
                        dir = dirsta
                        targ = true
                        break
                    }
                }
            }
        }
        const rightof = new THREE.Vector3(3.5,0,0).applyQuaternion(this.mesh.quaternion)
        const leftof = new THREE.Vector3(-3.5,0,0).applyQuaternion(this.mesh.quaternion)
        const rightsho = chesy.clone().add(rightof)
        const leftsho = chesy.clone().add(leftof)
        const hitcent = new THREE.Raycaster(chesy, front, 0, 4).intersectObjects(collide, true)
        const hitright = new THREE.Raycaster(rightsho, front, 0, 4).intersectObjects(collide, true)
        const hitleft = new THREE.Raycaster(leftsho, front, 0, 4).intersectObjects(collide, true)
        if(hitcent.length> 0 && hitright.length> 0 && hitleft.length> 0){
            const force = new THREE.Vector3()
            if(hitleft.length > 0 && hitright.length > 0){
                force.add(front.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2))
            } else if(hitright.length > 0 && hitleft.length === 0){
                force.add(front.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2))
            } else {
                force.add(front.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI))
            }
            dir.add(force.normalize().multiplyScalar(1.5).normalize())
        }
        const trag = chesy.clone().add(dir)
        const qwate = this.mesh.quaternion.clone()
        this.mesh.lookAt(trag.x, this.mesh.position.y, trag.z)
        const tragqwate = this.mesh.quaternion.clone()
        this.mesh.quaternion.copy(qwate)
        this.mesh.quaternion.slerp(tragqwate, 0.15)
        this.mesh.updateMatrixWorld()
        const fidir = new THREE.Vector3(0,0,1).applyQuaternion(this.mesh.quaternion).normalize()
        const checkcent = new THREE.Raycaster(chesy, fidir, 0, speed +3).intersectObjects(collide, true)
        if(checkcent.length === 0){ this.mesh.translateZ(speed)}
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
    
    if(player.position.distanceTo(lastpos) > 2){
        staker.push(player.position.clone())
        lastpos.copy(player.position)
        if(staker.length > 20){
            staker.shift()
        }
    }
}
anim()