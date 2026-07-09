
let gamestart = false
window.isdead = false
window.pause = false
const scene = new THREE.Scene()
class floatingshit{
                        constructor(){
                                this.layer = document.getElementById('hudlay')
                                this.healthbar = document.getElementById('healthbar')
                                this.staminabar = document.getElementById('staminabar')
                                this.healthpan = document.getElementById('healthpan')
                                this.healthstat = document.getElementById('healthstat')
                                this.staminapan = document.getElementById('staminapan')
                                this.staminastat = document.getElementById('staminastat')
                                this.glass = document.getElementById('glass')
                                this.time = 0 
                                this.x = 0
                                this.y = 0
                                this.rotx = 0
                                this.roty = 0
                                this.targrotx = 0
                                this.targroty = 0
                                this.health = 100
                                this.maxstamia =200
                                
                                this.maxheath = 100
                                this.staminalevel = 200
                                this.init()
                        }
                        init(){
                        }
                        healthup(amount){
                            if (typeof dayum !== 'undefined' && dayum && amount < 0) return;
                                this.health = Math.max(0, Math.min(this.maxheath, this.health + amount))
                                this.healthbar.style.width = `${this.health / this.maxheath * 100}%`
                                if(this.health <=0){
                                    if(typeof window.death === 'function' && !window.isdead) {window.death()}
                                }
                                if(this.health <= 25){
                                        this.healthpan.classList.add('critical')
                                        this.healthpan.classList.add('glitchy')
                                        this.healthstat.innerText = 'STATUS: Critical Failure'
                                        if (!healwarn2.isPlaying) healwarn2.play();
                                        if (!healwarn.isPlaying) healwarn.play();
                                        if(this.glass){
                                            this.glass.style.display = 'block'
                                            this.glass.style.opacity = '1'
                                        }
                                }else if(this.health <= 50){
                                        this.healthpan.classList.remove('critical')
                                        this.healthpan.classList.add('glitchy')
                                        this.healthstat.innerText = 'STATUS: Compromised'
                                        if (healwarn2.isPlaying) healwarn2.pause();
                                        if (healwarn.isPlaying) healwarn.pause();
                                        if(this.glass){
                                            this.glass.style.display = 'block'
                                            this.glass.style.opacity = '0.2'
                                        }
                                }else{
                                        this.healthpan.classList.remove('critical')
                                        this.healthpan.classList.remove('glitchy')
                                        this.healthstat.innerText = 'STATUS: Normal'
                                        if (healwarn2.isPlaying) healwarn2.pause();
                                        if (healwarn.isPlaying) healwarn.pause();
                                        if(this.glass){
                                            this.glass.style.display = 'none'
                                        }
                                }
                        }
                        stamina(delta, sprint, ismove){
                            if (typeof dayum !== 'undefined' && dayum) {
            this.staminalevel = this.maxstamia;
        }
                            if(this.staminalevel <= 0){
    if (!stawarn.isPlaying) stawarn.play();
}else{
    if (stawarn.isPlaying) stawarn.pause();
}
                            
                                if(sprint && ismove && this.staminalevel > 0 && !player.ishide ){
                                        this.staminalevel -= 25 * delta
                                        this.cooldown = 2
                                        this.staminastat.innerText = 'STATUS: Sprinting'
                                        this.staminastat.style.color = ''
                                        this.layer.style.filter = `blur(${Math.random() * 2}px)`
                                        
                            }

                                else{
                                    if(this.cooldown > 0 ){
                                        this.cooldown -= delta
                                    
                                    }else if (this.staminalevel < this.maxstamia) {
                                    this.staminalevel += 15 * delta
                                     }if (this.staminalevel <= 0) {
                                    this.staminastat.innerText = 'STATUS: Battery overload'
                                    this.staminastat.style.color = '#ff0000'
                                } else if (this.staminalevel > 0 && this.staminalevel < 50) {
                                    this.staminastat.innerText = 'STATUS: Recharging'
                                    this.staminastat.style.color = '#ccaa00'
                                } else {
                                    this.staminastat.innerText = 'STATUS: Normal'
                                    this.staminastat.style.color = '#00ff00'
                                }
                                this.layer.style.filter = `blur(0px)`
                            }
                                this.staminalevel = Math.max(0, Math.min(this.maxstamia, this.staminalevel))
                            this.staminabar.style.width = `${this.staminalevel / this.maxstamia * 100}%`
                            
                            if (this.staminalevel < 40) {
                                this.staminabar.style.backgroundColor = '#ccaa00'
                            } else {
                                this.staminabar.style.backgroundColor = '#00ff00'
                            }
                        }
                        floatphy(delta){
                                this.time += delta
                                this.targrotx = (this.x * 25)
                                this.targroty = -(this.y * 25)
                                this.rotx += ((this.targrotx - this.rotx) * 0.1)
                                this.roty += ((this.targroty - this.roty) * 0.1)
                                this.layer.style.transform = `translate3d(0px,0px, 0px) rotateX(${this.rotx}deg) rotateY(${this.roty}deg)`;
                        }

                        
                        anim(lastimothy = performance.now()){
                                requestAnimationFrame((time) => {
                                        const delta = (time - lastimothy) / 1000
                                        this.floatphy(delta)
                                        this.stamina(delta, window.sprinting)
                                        this.anim(time)
                                })
                        }
                }

const playerhud = new floatingshit()
THREE.DefaultLoadingManager.onProgress = function (url, loaded, total) {
    const prog = loaded / total * 100
    const loadingbar = document.getElementById('loadingbar')
    if(loadingbar) loadingbar.style.width = prog + '%'

}
THREE.DefaultLoadingManager.onLoad = function (url, loaded, total) {
    const btnplay = document.getElementById('btnplay')
    if(btnplay){
        btnplay.disabled = false
        btnplay.innerText = 'PLAY'
    }
}

scene.background = new THREE.Color('#050505');
scene.fog = new THREE.FogExp2('#050505', 0.04)
const camera = new THREE.PerspectiveCamera(135, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({ antialias: false })

const rentarg = new THREE.WebGLMultisampleRenderTarget(
    window.innerHeight,
    window.innerWidth,
    { format: THREE.RGBAFormat}
)
rentarg.samples = 4
const comp = new THREE.EffectComposer(renderer, rentarg)
comp.addPass(new THREE.RenderPass(scene, camera))
const bloompass =new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.6, 0.4, 0.1)
comp.addPass(bloompass)


const fisheye = {
    uniforms: {
        "tDiffuse": { value: null },
        "strength": { value: 0.1 }, 
        "aspect": { value: window.innerWidth / window.innerHeight }
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float strength;
        uniform float aspect;
        varying vec2 vUv;
        void main() {
            vec2 uv = vUv;
            vec2 p = uv - 0.5;
            p.x *= aspect; 

            float r = dot(p, p);
            
           
            float fR = 1.0 + r * (strength + 0.1); 
            float fG = 1.0 + r * strength;
            float fB = 1.0 + r * (strength - 0.1);

            vec2 uvR = p * fR; uvR.x /= aspect; uvR += 0.5;
            vec2 uvG = p * fG; uvG.x /= aspect; uvG += 0.5;
            vec2 uvB = p * fB; uvB.x /= aspect; uvB += 0.5;

            vec4 color;
            
            if (uvG.x < 0.0 || uvG.x > 1.0 || uvG.y < 0.0 || uvG.y > 1.0) {
                color = vec4(0.0, 0.0, 0.0, 1.0);
            } else {
                color.r = texture2D(tDiffuse, uvR).r;
                color.g = texture2D(tDiffuse, uvG).g;
                color.b = texture2D(tDiffuse, uvB).b;
                color.a = 1.0;
            }
            gl_FragColor = color;
        }
    `
};
const fisheyepass = new THREE.ShaderPass(fisheye);
comp.addPass(fisheyepass)
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)

const time = new THREE.Clock()
const collide = []
let crocnpc = null
window.updategraph = function(settings){
    const pixrat = window.devicePixelRatio * (settings.resolution/100)
    renderer.setPixelRatio(pixrat)
    if(typeof comp!== 'undefined') comp.setPixelRatio(pixrat)
        if(bloompass){
            if(settings.bloom){
                bloompass.strength = settings.bloomintensity
            }else{
                bloompass.strength = 0
            }
        }
    camera.far = settings.renderdistance
    camera.updateProjectionMatrix()
    
    if(settings.aa !== undefined && rentarg !== 'undefined'){
        if(settings.aa == 0){
            rentarg.samples = 0
        }else{
            rentarg.samples = Math.pow(2, settings.aa)
        }
    }
}
const ambientlight = new THREE.AmbientLight(0xFFFFFF, 0.5);
scene.add(ambientlight)
function fade(audio, targetvol, dura, stopatend = false){
    if(audio.fadeInterval) clearInterval(audio.fadeInterval);
    if(!audio.isPlaying && targetvol >0){
        audio.setVolume(0)
        audio.play()
    }
    const startvol = audio.getVolume()
    const steps = 30
    const steptime = (dura * 1000) /steps
    const volstep = (targetvol - startvol) / steps
    let current = 0
    audio.fadeInterval = setInterval(() => {
        current++
        let Mathvol = startvol + (volstep * current)
        if(Mathvol < 0 ) Mathvol = 0;
        audio.setVolume(Mathvol)
        if(current >= steps){
            clearInterval(audio.fadeInterval)
            audio.setVolume(targetvol)
            if(stopatend) audio.pause()
        }
    }, steptime)

}
function safety(audio){
    if(audio && audio.isPlaying){
        if( audio.source !== null){
            audio.stop()
        }else{
            audio.isPlaying = false
        }
    }
}
const flashlight = new THREE.SpotLight(0xffffff,2, 50, Math.PI / 6, 0.5, 1)
flashlight.castShadow = true
flashlight.position.set(0, 0, 0)
scene.add(flashlight)
scene.add(flashlight.target)
scene.add(camera)
const staker = []
const lastpos = new THREE.Vector3(6, 0, 0)
function safespawn(array){
    if(collide.length === 0) return;
    for(let i = 0; i < array.length; i++){
        let item = array[i]
        if(!item.issafe){
            let checkpos = new THREE.Vector3(item.position.x, 1, item.position.z)
            item.visible = false
            let hitwall = false
            const dirs = [
                new THREE.Vector3(1,0,0), new THREE.Vector3(-1,0,0),
                new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,-1)
            ]
            for(let dir of dirs){
                const ray = new THREE.Raycaster(checkpos, dir,0, 1.5)
                if(ray.intersectObjects(collide, true).length > 0){
                    hitwall = true; 
                    break
                }
            }
            if(!hitwall){
                item.issafe = true
                item.visible = true
            }else{
                item.position.x = (Math.random() * 300) - 150
                item.position.z = (Math.random() * 300) - 150
            }
            }
        }
    }
class cronpc { 
    constructor(scene, gltf, startx, startz) {
        this.mesh = gltf.scene;
     this.mesh.scale.set(5,5,5)   
        this.mesh.position.set(startx, 5, startz);
        this.mesh.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true
                child.receiveShadow = true
                child.frustumCulled = false
            }
        })
        scene.add(this.mesh)
        
        this.mixer = new THREE.AnimationMixer(this.mesh);
        this.animations = gltf.animations; 
        this.actions = { 
            idle: this.mixer.clipAction(this.getanim('idle')),
            walk: this.mixer.clipAction(this.getanim('walk')),
            run: this.mixer.clipAction(this.getanim('run')),
            attack: this.mixer.clipAction(this.getanim('attack')),
            death: this.mixer.clipAction(this.getanim('death'))
        }
        if(this.actions.death){
            this.actions.death.setLoop(THREE.LoopOnce)
            this.actions.death.clampWhenFinished = true
        }
        
        this.currentstatee = 'idle'
        this.currentaction = this.actions.idle
        if (this.currentaction) this.currentaction.play()
        
        this.walkspeed = 0.05
        this.run = 0.14
        this.radius = 10
        this.attradi = 3
        this.gravity = -0.05
        this.velocityy = 0
        this.died = false
        this.dietime = 2.5
        this.muff = listen.context.createBiquadFilter()
       this.muff.type = 'lowpass'
         this.muff.frequency.value = 22000
        this.appfilter = false
    }
    getanim(name) {
        return this.animations.find(a => a.name.toLowerCase().includes(name.toLowerCase())) || this.animations[0]
    }
    changestate(newstate, actionName) {
        if (this.currentstatee === newstate || !this.actions[actionName]) return;
        if (newstate === 'chase' || newstate === 'attack') {
            if (this.currentstatee !== 'chase' && this.currentstatee !== 'attack') {
                fade(chasemu, 0.6, 0.5, false);
                if (this.growl && !this.growl.isPlaying) this.growl.play();
                if (this.ideal) safety(this.ideal);
            }
        }
        if (newstate === 'patrol' || newstate === 'idle') {
            fade(chasemu, 0, 2.5, false);
            if (this.growl) safety(this.growl);
            if (this.runaud) safety(this.runaud); 
            if (newstate === 'patrol' && this.ideal && !this.ideal.isPlaying) this.ideal.play();
        }

        if (newstate === 'flee') {
            fade(chasemu, 0, 2.5, true);
            if (this.growl) safety(this.growl);
            if (this.ideal) safety(this.ideal);
            if (this.runaud && !this.runaud.isPlaying) this.runaud.play();
        }

        this.currentstatee = newstate;
        const prevstate = this.currentaction;
        const newact = this.actions[actionName];
        
        newact.reset();
        newact.setEffectiveTimeScale(1);
        newact.setEffectiveWeight(1);
        newact.play();

        if (prevstate) {
            prevstate.crossFadeTo(newact, 0.3, true);
        }
        
        this.currentaction = newact;
    } 
    applyGravity(timesc) {
        const ray = new THREE.Vector3(this.mesh.position.x, this.mesh.position.y + 1, this.mesh.position.z)
        const down = new THREE.Vector3(0, -1, 0)
        const raycast = new THREE.Raycaster(ray, down)
        const hit = raycast.intersectObjects(collide, true)
        let height = -100;
        if (hit.length > 0) height = hit[0].point.y
        
        this.velocityy += this.gravity * timesc
        this.mesh.position.y += this.velocityy * timesc
        
        if (this.mesh.position.y <= height) {
            this.velocityy = 0
            this.mesh.position.y = height
        }
    }
    update(chatime, pos) {
        if (this.mixer) {this.mixer.update(chatime)};
            const timesc = chatime *60
            const walkcun = this.walkspeed * timesc
            const runcun = this.run * timesc
            if(this.died){
                this.dietime -= chatime
                this.applyGravity(timesc)
                if(this.dietime <= 0){
                    return "dead"
                }
                return "alive"
            }
        this.applyGravity(timesc)
        const dx = pos.x - this.mesh.position.x
        const dz = pos.z - this.mesh.position.z
        let distpl = Math.sqrt(dx * dx + dz * dz)
        if(player.ishide){
            distpl = 9999
            if(!dayum && this.currentstatee !== 'flee'){
                this.changestate('idle', 'idle')
            }
            if(this.currentstatee === 'chase' || this.currentstatee === 'attack'){
                this.changestate('patrol', 'walk' )
                this.mesh.rotateY(Math.PI)
            }
            this.dumb(walkcun)
            
                return "alive"
        }
        if(dayum){
            if(distpl < 4){
                if(!this.died){
                    this.died = true
                    if(this.growl) safety(this.growl);
                    if(this.runaud) safety(this.runaud);
                    if(this.ideal) safety(this.ideal);
                    this.changestate('dead', 'death')
                }
                return "alive"
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
            this.dumb(runcun, trag, true)
            return "alive"
        }
        const chestdis = new THREE.Vector3(this.mesh.position.x, this.mesh.position.y + 1, this.mesh.position.z)
        const heasd = new THREE.Vector3(pos.x, pos.y, pos.z)
        const distopla = new THREE.Vector3().subVectors(heasd, chestdis).normalize()
        const truedis = chestdis.distanceTo(heasd)
        const soundray = new THREE.Raycaster(chestdis, distopla, 0 , truedis)
        const walls = soundray.intersectObjects(collide, true)
        const targfrq = walls.length > 0 ? 400 : 22000;
        this.muff.frequency.value += (targfrq - this.muff.frequency.value) * 0.1
        if(!this.appfilter && this.growl && this.runaud){
            this.growl.setFilter(this.muff)
            this.runaud.setFilter(this.muff)
            if(this.ideal) this.ideal.setFilter(this.muff);
            this.appfilter = true
        }
        if (!dayum && this.currentstatee === 'flee') {
        if(this.runaud) safety(this.runaud)
        this.changestate('idle', 'idle')
         }
        switch (this.currentstatee) {
            case 'idle':
                if (Math.random() < 0.01) this.changestate('patrol', 'walk')
                if (distpl < this.radius) this.changestate('chase', 'run')
                break;
            case 'patrol':
                this.dumb(walkcun);
                if (Math.random() < 0.005) this.changestate('idle', 'idle')  
                if (distpl < this.radius) this.changestate('chase', 'run')
                    if(Math.random() < 0.5 && this.ideal && !this.ideal.isPlaying) this.ideal.play();
                break
            case 'chase':
                  
                this.dumb(runcun, pos)
                if (distpl < this.attradi) {
                    this.changestate('attack', 'attack')
                } else if (distpl > this.radius * 1.5) {
                    this.changestate('patrol', 'walk');
                }
                break;
            case 'attack':
                this.mesh.lookAt(pos.x, this.mesh.position.y, pos.z);
                playerhud.healthup(-30 * chatime)
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
                    if(dissta > 0.5 && dissta < 30) {
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
        if(checkcent.length === 0){ this.mesh.translateZ(speed)}else{
            this.mesh.rotateY((Math.PI/2) + (Math.random() * 0.5))
        }
}

}
function echo(audio){
    audio.currentTime = 0
    audio.volume = 1
    audio.play()
    setTimeout(() => {
        const echo1 = audio.cloneNode()
        echo1.volume = 0.5
        echo1.play().catch(e => {})
    }, 250)
    setTimeout(() => {
        const echo2 = audio.cloneNode()
        echo2.volume = 0.1
        echo2.play().catch(e => {})
    }, 500)
}
const terreriums = []
let earned = 0
const footsteps2 = new Audio('./audio/walk2.mp3')
const footsteps = new Audio('./audio/walk.mp3')
const player = {
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
    
    init: function() {
        renderer.domElement.addEventListener('click', () => {
            document.body.requestPointerLock();
        });
        let skip = false
        document.addEventListener('pointerlockchange', () => {
            if(document.pointerLockElement){
                skip = true
            }
        })
        document.addEventListener('mousemove', (e) => {
    if(document.pointerLockElement){
        if(skip){
            skip = false
            return
        }
        const maxdelta = 100
const movx = Math.max(-maxdelta, Math.min(maxdelta, e.movementX))
const movy = Math.max(-maxdelta, Math.min(maxdelta, e.movementY))
        const sens = window.gamesettings.sensitivity
        this.yaw -= movx * sens
        this.pitch -= movy * sens
        this.pitch = Math.max(-1.5, Math.min(1.5, this.pitch))
        playerhud.x -= movx * 0.015
        playerhud.y -= movy * 0.015
        playerhud.x = Math.max(-1, Math.min(1, playerhud.x))
        playerhud.y = Math.max(-1, Math.min(1, playerhud.y))
    }
})
        window.addEventListener('keydown', (e) => {
            

            if (e.key.toLowerCase() === 'w') this.key.w = true
            if (e.key.toLowerCase() === 'a') this.key.a = true
            if (e.key.toLowerCase() === 's') this.key.s = true
            if (e.key.toLowerCase() === 'd') this.key.d = true
            if (e.key === 'Shift') this.key.shift = true;
            if (e.key === ' ') this.key.space = true; 
            if(e.key.toLowerCase() === 'e'){
                if(this.ishide){
                    this.ishide = false
                    const forw = new THREE.Vector3(0,0,-2).applyAxisAngle(new THREE.Vector3(0,1,0), this.yaw)
                    this.position.add(forw)
                }else if(this.actloc){
                    this.ishide = true
                    staker.length = 0
                    const truepos = new THREE.Vector3()
                    this.actloc.getWorldPosition(truepos)
                    this.position.set(truepos.x, this.position.y, truepos.z)
                }
            }
        });
        window.addEventListener('keyup', (e) => {
            if (e.key.toLowerCase() === 'w') this.key.w = false
            if (e.key.toLowerCase() === 'a') this.key.a = false;
            if (e.key.toLowerCase() === 's') this.key.s = false
            if (e.key.toLowerCase() === 'd') this.key.d = false;
            if (e.key === 'Shift') this.key.shift = false;
            if (e.key === ' ') this.key.space = false
        });
        const moveit = document.getElementById('moveit')
        const lookit = document.getElementById('lookit')
        const sprint = document.getElementById('sprint')
        const interact = document.getElementById('interact')
        if(moveit && lookit){
            let touchx, touchy 
            lookit.addEventListener('touchstart', (e) => {
                touchx = e.targetTouches[0].clientX
                touchy = e.targetTouches[0].clientY
            }, {passive: false})
            lookit.addEventListener('touchmove', (e) => {
                    e.preventDefault()
                    if(!e.targetTouches.length) return;
                    const movx = e.targetTouches[0].clientX
                    const movy = e.targetTouches[0].clientY
                    const sens = window.gamesettings.sensitivity * 2.5
                    this.yaw -= (movx - touchx) * sens
                    this.pitch -= (movy - touchy) * sens
                    this.pitch = Math.max(-1.5, Math.min(1.5, this.pitch))
                    touchx = movx
                    touchy = movy
            }, {passive: false})
            const nob = document.getElementById('nob')
            let strmx ,strmy
            moveit.addEventListener('touchstart', (e) => {
                strmx = e.targetTouches[0].clientX
                strmy = e.targetTouches[0].clientY
                if(nob) nob.style.transition = 'none'
            }, {passive: false})
            moveit.addEventListener('touchmove', (e) => {
                    e.preventDefault()
                    let dx = e.targetTouches[0].clientX - strmx
                    let dy = e.targetTouches[0].clientY - strmy
                    const radii = 70
                    const dis = Math.sqrt(dx * dx + dy * dy)
                    if(dis> radii){
                        dx = Math.cos(Math.atan2(dy, dx)) * radii
                        dy = Math.sin(Math.atan2(dy, dx)) * radii
                    }
                    if(nob) nob.style.transform = `translate(${dx}px, ${dy}px)`
                    this.key.w = this.key.s = this.key.a = this.key.d = false
                    if(dy < -15) this.key.w = true
                    else if(dy > 15) this.key.s = true
                    if(dx < -15) this.key.a = true
                    else if(dx > 15) this.key.d = true
            }, {passive: false})
            moveit.addEventListener('touchend', (e) => {
                this.key.w = this.key.s = this.key.a = this.key.d = false
                if(nob) {nob.style.transition = 'transform 0.2s ease-out';
                    nob.style.transform = 'translate(0px, 0px)';
                }
            })
            sprint.addEventListener('touchstart', (e) => {
                e.preventDefault()
                this.key.shift = true
            })
            sprint.addEventListener('touchend', (e) => {
                e.preventDefault()
                this.key.shift = false
            })
            interact.addEventListener('touchstart', (e) => {
                e.preventDefault()
                if(this.ishide){
                    this.ishide = false
                    const forw = new THREE.Vector3(0,0,-2).applyAxisAngle(new THREE.Vector3(0,1,0), this.yaw)
                    this.position.add(forw)
                }else if (this.actloc){
                    this.ishide = true
                    staker.length = 0
                    const truepos = new THREE.Vector3()
                    this.actloc.getWorldPosition(truepos)
                    this.position.set(truepos.x, this.position.y, truepos.z)
                }
            })
        }
    },
    update: function(delta) {
        this.actloc = null
        for(let locker of hidespo){
            const truepos = new THREE.Vector3()
            locker.getWorldPosition(truepos)
            if(this.position.distanceTo(truepos) < 3){
                this.actloc = locker
                break
            }
        }
        if(this.ishide){
            this.key.w = false
            this.key.s = false
            this.key.a = false
            this.key.d = false
            camera.position.copy(this.position)
            camera.rotation.set(this.pitch, this.yaw, 0 , 'YXZ')
            return
        }
        let dx = 0, dz = 0;
        const timesc = delta * 60
        const speedcun = this.speed *  timesc
        if (this.key.w) { dx -= Math.sin(this.yaw) * speedcun; dz -= Math.cos(this.yaw) * speedcun }
        if (this.key.s) { 
            dx += Math.sin(this.yaw) * speedcun; dz += Math.cos(this.yaw) * speedcun}
        if (this.key.a) {
             dx -= Math.cos(this.yaw) * speedcun; dz += Math.sin(this.yaw) * speedcun }
        if (this.key.d) { 
            dx += Math.cos(this.yaw) * speedcun; dz -= Math.sin(this.yaw) * speedcun }
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
        const ismove = (this.key.w || this.key.a || this.key.s || this.key.d)
        
        if(this.key.shift && ismove && this.stamina > 0 && !this.ishide){
            this.speed = this.sprintspeed
            if (typeof dayum === 'undefined' || !dayum) {
                this.stamina -= 25 * delta;
            }
            this.cooldown = 2
            if(this.stamina <= 0 && this.cooldown <= 0){
            this.cooldown = 5
            }
        }else{
            this.speed = this.walkspeed
            if(this.cooldown > 0){
                this.cooldown -= delta
            }
            else if(this.stamina < this.maxstamina){
                this.stamina += 15*delta
            }
        }
        this.stamina = Math.max(0, Math.min(this.maxstamina, this.stamina))
        
        if(this.ground){
            this.dis += dez
            if(this.dis > 6){
                this.dis = 0
                const curren = performance.now()
                this.timelas = curren
                if(curren - this.timelas > 450){
                    
                echo(footsteps)}
                else{
                    echo(footsteps2)
                }
                this.alter = !this.alter
            }
        }else{
            this.dis = 0
        }

        const rayorg = new THREE.Vector3(this.position.x, this.position.y + 1, this.position.z)
        const downvec = new THREE.Vector3(0, -1, 0);
        const raycaster = new THREE.Raycaster(rayorg, downvec)
        const hit = raycaster.intersectObjects(collide, true)
        
        let height = -2.1
    
        if (hit.length > 0) height = hit[0].point.y
        
        this.velocity.y += this.gravity * timesc
        this.position.y += this.velocity.y * timesc
        
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
        if(ismove && this.ground && !this.ishide){
            const bobspeed = (this.speed === this.sprintspeed) ? 18:12;
            const bobhieght = (this.speed === this.sprintspeed) ? 0.15:0.06;
            this.bob += delta * bobspeed
            camera.position.y += Math.sin(this.bob) *bobhieght
        } else{
            this.bob = 0
        }
        
        camera.rotation.set(this.pitch, this.yaw, 0, 'YXZ')
    }
};

player.init();
const hidespo = []
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
            child.castShadow =  false
            child.receiveShadow = false
            if(child.name.toLowerCase().includes('object_6')){
                child.material = child.material.clone()
                child.material.emissiveMap = child.material.map
                child.material.emissive = new THREE.Color(0xffffff)
                child.material.emissiveIntensity = 2
            }
            if(child.name.includes('collide')){
                child.visible = false
                collide.push(child)
                hidespo.push(child)

            }else if( child.name.includes('ignore')){
                child.castShadow = false
                
            }
            else{
                collide.push(child)
            }
        }
    })

    scene.add(mpmodel)
})

const bottles = []
loader.load('./models/bottle/bottle.glb', (gltf) => {
    
    const toatal= 50
    const mp = 300
    for(let i = 0; i < toatal; i++){
        const item = gltf.scene.clone()
        item.scale.set(7, 7, 7)
        item.position.set((Math.random() * mp) - mp/2,0, (Math.random() * mp) - mp/2)
        scene.add(item)
        bottles.push(item)
    }
})
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
let croc = false
let groi = false
let gorilla = null
let clark = null
loader.load('./models/crocodile.glb', (gltf) => {
    gltf.scene.add(crocgrowl)
    gltf.scene.add(crocideal)
    gltf.scene.add(crocrun)

    crocnpc = new cronpc(scene, gltf, -50, -50) 
    crocnpc.growl = crocgrowl
    crocnpc.runaud = crocrun
    crocnpc.ideal = crocideal
}, undefined, (error) => console.error(error))
loader.load('./models/gorilla/gorilla.glb', (gltf) => {
    gltf.scene.add(gorillagrowl)
    gltf.scene.add(gorillaideal)

    gorilla = new cronpc(scene, gltf,50, 50)
    gorilla.growl= gorillagrowl
    gorilla.ideal = gorillaideal
    gorilla.runaud = gorillarun
}, undefined, (error) => console.error(error))
loader.load('./models/clark/clark.glb', (gltf) => {
    gltf.scene.add(clarkgrowl)
    gltf.scene.add(clarkidle)
    gltf.scene.add(clarkrun)
    clark = new cronpc(scene, gltf, 70, 30)
    clark.growl= clarkgrowl
    clark.ideal = clarkidle
    clark.runaud = clarkrun
}, undefined, (error) => console.error(error))
const listen = new THREE.AudioListener()
camera.add(listen)
window.updateMasterVolume = function(vol){
    listen.setMasterVolume(vol)
}
const ambient = new THREE.Audio(listen)
const chasemu = new THREE.Audio(listen)
const loader2 = new THREE.AudioLoader()
loader2.load('./audio/ambience.mp3', (buffer) => {
    ambient.setBuffer(buffer)
    ambient.setLoop(true)
    ambient.setVolume(0.5)
    ambient.play()
})
loader2.load('./audio/chase.mp3', (buffer) => {
    chasemu.setBuffer(buffer)
    chasemu.setLoop(true)
    chasemu.setVolume(0.5)
})
const crocgrowl = new THREE.PositionalAudio(listen)
const gorillagrowl = new THREE.PositionalAudio(listen)
const gorillaideal = new THREE.PositionalAudio(listen)
const gorillarun = new THREE.PositionalAudio(listen)
const clarkrun = new THREE.PositionalAudio(listen)
const clarkidle = new THREE.PositionalAudio(listen)
const clarkgrowl = new THREE.PositionalAudio(listen)
    loader2.load('./audio/scream.mp3', (buffer) => {
    crocgrowl.setBuffer(buffer)
    crocgrowl.setRefDistance(10)
    crocgrowl.setMaxDistance(200)
    crocgrowl.setDistanceModel('linear')
    crocgrowl.setLoop(true)
    crocgrowl.setVolume(2)
})
loader2.load('./models/gorilla/sound/gorillascream.mp3', (buffer) => {
        gorillagrowl.setBuffer(buffer)
        gorillagrowl.setRefDistance(10)
        gorillagrowl.setMaxDistance(200)
        gorillagrowl.setDistanceModel('linear')
        gorillagrowl.setLoop(true)
        gorillagrowl.setVolume(2)
})
loader2.load('./models/gorilla/sound/gorillarun.mp3', (buffer) => {
        gorillarun.setBuffer(buffer)
        gorillarun.setRefDistance(10)
        gorillarun.setMaxDistance(200)
        gorillarun.setDistanceModel('linear')
        gorillarun.setLoop(true)
        gorillarun.setVolume(2)
})
    loader2.load('./models/gorilla/sound/idle.mp3', (buffer) => {
        gorillaideal.setBuffer(buffer)
        gorillaideal.setRefDistance(10)
        gorillaideal.setMaxDistance(200)
        gorillaideal.setDistanceModel('linear')
        gorillaideal.setLoop(true)
        gorillaideal.setVolume(2)
})
     loader2.load('./audio/clark/scream.mp3', (buffer) => {
        clarkrun.setBuffer(buffer)
        clarkrun.setRefDistance(10)
        clarkrun.setMaxDistance(200)
        clarkrun.setDistanceModel('linear')
        clarkrun.setLoop(true)
        clarkrun.setVolume(2)
})
     loader2.load('./audio/clark/idle.mp3', (buffer) => {
        clarkidle.setBuffer(buffer)
        clarkidle.setRefDistance(10)
        clarkidle.setMaxDistance(200)
        clarkidle.setDistanceModel('linear')
        clarkidle.setLoop(true)
        clarkidle.setVolume(2)
})
     loader2.load('./audio/clark/groan.mp3', (buffer) => {
        clarkgrowl.setBuffer(buffer)
        clarkgrowl.setRefDistance(10)
        clarkgrowl.setMaxDistance(200)
        clarkgrowl.setDistanceModel('linear')
        clarkgrowl.setLoop(true)
        clarkgrowl.setVolume(2)
})
loader2.load('./audio/scream.mp3', (buffer) => {
    crocgrowl.setBuffer(buffer)
    crocgrowl.setRefDistance(10)
    crocgrowl.setMaxDistance(200)
    crocgrowl.setDistanceModel('linear')
    crocgrowl.setLoop(true)
    crocgrowl.setVolume(2)
})
const crocideal = new THREE.PositionalAudio(listen)
loader2.load('./audio/growl.mp3', (buffer) => {
    crocideal.setBuffer(buffer)
    crocgrowl.setRefDistance(10)
    crocgrowl.setMaxDistance(200)
    crocgrowl.setDistanceModel('linear')
    crocideal.setLoop(true)
    crocideal.setVolume(5)
})
const crocrun = new THREE.PositionalAudio(listen)
loader2.load('./audio/meme.mp3', (buffer) => {
    crocrun.setBuffer(buffer)
    crocrun.setRefDistance(10)
    crocrun.setMaxDistance(200)
    crocrun.setDistanceModel('linear')
    crocrun.setVolume(1)
})
const stawarn = new THREE.Audio(listen)
loader2.load('./audio/stamina.mp3', (buffer) => {
    stawarn.setBuffer(buffer)
    stawarn.setLoop(true)
    stawarn.setVolume(2)
})
const healwarn2= new THREE.Audio(listen)
loader2.load('./audio/warning/warning2.mp3', (buffer) => {
    healwarn2.setBuffer(buffer)
    healwarn2.setLoop(true)
    healwarn2.setVolume(1)
})
const healwarn = new THREE.Audio(listen)
loader2.load('./audio/warning/waring1.mp3', (buffer) => {
    healwarn.setBuffer(buffer)
    healwarn.setLoop(true)
    healwarn.setVolume(1)
})

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    if(typeof fisheyepass !== 'undefined') fisheyepass.uniforms['aspect'].value = window.innerWidth / window.innerHeight;
    if(typeof antialia !== 'undefined') {
        const pr = renderer.getPixelRatio();
        antialai.material.uniforms['resolution'].value.x = 1 / (window.innerWidth * pr);
        antialai.material.uniforms['resolution'].value.y = 1 / (window.innerHeight * pr);
    }
})
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
const power = []
let dayum = false
function dayummode(dayum){
    if(dayum)
    {
        
    } 
}

let kama = 0
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
let timer = 0
const musicdayum = new Audio('./audio/dayummode.mp3');
const ui = document.getElementById('timothy')

function anim() {
    requestAnimationFrame(anim);
    safespawn(terra)
    safespawn(bottles)
    safespawn(powerball)
    safespawn(choco)

    if(!gamestart || window.isdead || window.pause) {
        if (gamestart) time.getDelta();
        comp.render()
        return};
        const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const delta = time.getDelta();
    if(document.pointerLockElement || mobile){
        const ismove = (player.key.w || player.key.a || player.key.s || player.key.d);
    playerhud.x *= 0.9
    playerhud.y *= 0.9
    playerhud.floatphy(delta)
    playerhud.stamina(delta, player.key.shift, ismove)
    const pickray = new THREE.Raycaster()
    pickray.setFromCamera(new THREE.Vector2(0,0), camera)
    const all = [...terra, ...bottles, ...powerball, ...choco]
    const intersectpick = pickray.intersectObjects(all, true)
    window.hover = null;
    window.hovertype = null
    const handicon = document.getElementById('handicon')
    if(intersectpick.length > 0 && intersectpick[0].distance < 5){
        let hitobj = intersectpick[0].object
        while(hitobj && !all.includes(hitobj)){
            hitobj = hitobj.parent
        }
        if(hitobj){
            window.hover = hitobj
            if (terra.includes(hitobj)) window.hovertype = 'terra';
            if (bottles.includes(hitobj)) window.hovertype = 'bottle';
            if (choco.includes(hitobj)) window.hovertype = 'choco';
            if (powerball.includes(hitobj)) window.hovertype = 'powerball';
            if(handicon) handicon.style.display = 'block'
        }else{
            if(handicon) handicon.style.display = 'none'
        }
    }else{
            if(handicon) handicon.style.display = 'none'
}
    if(dayum){
    timer -= delta
    const chars = "!<>-_\\\\/[]{}—=+*^?#________"
    let randchar = chars[Math.floor(Math.random() * chars.length)]
    ui.innerText = `SYS_OVRFLW [ ${Math.ceil(timer)} ] ${randchar}`;
    ui.classList.add('daytxt', 'glitchy');
    playerhud.healthstat.innerText = 'STATUS: ♾️ FATAL_ERR'
    playerhud.healthstat.classList.add('daytxt')
    playerhud.staminastat.innerText = 'STATUS: ♾️ OVR_FLW'
    playerhud.staminastat.classList.add('daytxt')
    playerhud.healthbar.style.width = '100%'
    playerhud.staminabar.style.width = '100%'
    playerhud.healthbar.style.backgroundColor = '#ff0000'
    playerhud.staminabar.style.backgroundColor = '#ff0000'
    playerhud.healthpan.classList.add('glitchy')
    playerhud.staminapan.classList.add('glitchy')
    document.getElementById('bodycam').classList.add('daymode')
    if(timer <= 0){
        dayum = false
        ui.style.display = 'none'
        musicdayum.pause()
        ui.classList.remove('daytxt', 'glitchy');
        playerhud.healthstat.classList.remove('daytxt')
        playerhud.staminastat.classList.remove('daytxt')
        playerhud.healthpan.classList.remove('glitchy')
        playerhud.staminapan.classList.remove('glitchy')
        document.getElementById('bodycam').classList.remove('daymode')
        playerhud.healthup(0)
    }
}
if(!player.ishide && player.position.distanceTo(lastpos) > 2){
    staker.push(player.position.clone())
    lastpos.copy(player.position)
    if(staker.length > 20){
        staker.shift()
    }
}
    if (crocnpc) { 
        const status = crocnpc.update(delta, player.position)
        
        if (status === "dead") {
            crocnpc = null;
            console.log("crocodile ded :)");
            
            if (typeof crocgrowl !== 'undefined') safety(crocgrowl)
            
            if (typeof chasemu !== 'undefined') {
                fade(chasemu, 0, 1.5, false);
            }
        }
    }
    if(gorilla){
        const statsu = gorilla.update(delta, player.position)
        if(statsu === "dead"){
            gorilla = null
            console.log('gorilla ded :(')
            if(typeof gorillagrowl !== 'undefined') safety(gorillagrowl)
                if(typeof gorillarun !== 'undefined') safety(gorillarun) 
            if(typeof gorillaideal !== 'undefined') safety(gorillaideal)
        }
    }
    if(clark){
        const status = clark.update(delta, player.position)
        if(status === "dead"){
            clark = null
            console.log('clark ded :(')
            if(typeof clarkgrowl !== 'undefined') safety(clarkgrowl)
                if(typeof clarkrun !== 'undefined') safety(clarkrun) 
            if(typeof clarkidle !== 'undefined') safety(clarkidle)
        }
    }
    player.update(delta)
    flashlight.position.copy(camera.position)
    const dirca = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion)
    const targpos = camera.position.clone().add(dirca.multiplyScalar(20))
    flashlight.target.position.lerp(targpos, 10 * delta)
}
    comp.render()
}
window.startgame = function(){
    gamestart = true
    time.start()
}
window.death = function(){
    window.isdead = true
    document.exitPointerLock()
    document.getElementById('hud').style.display = 'none'
    document.getElementById('diescr').style.display = 'flex'
    if(typeof listen !== 'undefined'){
        listen.setMasterVolume(0)
    }
}
window.respawn = function(){
    window.isdead = false
    playerhud.health = 100
    playerhud.healthup(0)
    playerhud.staminalevel = 100
    player.stamina = 100
    player.cooldown = 0
    player.position.set(0,1.6,0)
    player.velocity.set(0,0,0)
    if(crocnpc){
        crocnpc.mesh.position.set(50,5,50)
        crocnpc.changestate('idle', 'idle')
    }
    document.getElementById('hud').style.display = 'block'
    if(typeof listen !== 'undefined'){
        listen.setMasterVolume(window.gamesettings.mastervolume)
    }
    const mobiel = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if(!mobiel){document.body.requestPointerLock()}
}
window.gameend = false;
const personaud = new Audio('./audio/endvoi.mp3');

window.ending = function(){
    window.gameend = true;
    window.pause = true;
    document.exitPointerLock();
    
    document.getElementById('hud').style.display = 'none';
    const pausemenu = document.getElementById('pausemenu');
    if (pausemenu) pausemenu.remove()
    
    if(typeof listen !== 'undefined' && listen.context.state === 'running'){
        listen.context.suspend();
    }
    if(typeof musicdayum !== 'undefined' && !musicdayum.paused) musicdayum.pause();
    
    const endscr = document.getElementById('endscr');
    const virover = document.getElementById('virusove');
    const callingcard = document.getElementById('callingcard');
    const syscorrupt = document.getElementById('syscorrupt');
    const endbtn = document.getElementById('endbtn');

    const giveup = document.getElementById('giveup');
    const selfdestruct = document.getElementById('selfdestruct');
    const endvid = document.getElementById('reboovid');

    if(endscr){
        endscr.style.display = 'flex';
        endscr.classList.remove('virus');
    }
    
    if(virover) virover.style.opacity = '0';
    if(callingcard) callingcard.style.display = 'flex';
    if(syscorrupt) syscorrupt.style.display = 'none';
    if(endbtn) endbtn.style.display = 'none';
    
    personaud.currentTime = 0;
    personaud.play();
    
    setTimeout(() => {
        if(virover) virover.style.opacity = '1';
    }, 500);
    
    personaud.onended = function (){

        if(endscr) endscr.classList.add('virus');
        if(callingcard) callingcard.style.display = 'none';
        if(syscorrupt) syscorrupt.style.display = 'block';
        
        setTimeout(() => {
           if(endbtn) endbtn.style.display = 'flex';
        }, 500);
    };
    if (giveup && selfdestruct) {
        giveup.addEventListener('click', () => { window.location.reload(); });
        selfdestruct.addEventListener('click', () => {
            personaud.pause();
            if(endscr) endscr.style.display = 'none';
            if (endvid) {
                endvid.style.display = 'block';
                endvid.currentTime = 0;
                endvid.play();
            }
        });
    }
};
window.pausetog = function(ispause){
    if(window.gameend) return;
    window.pause = ispause
    if(ispause){
        if(typeof listen !== 'undefined' && listen.context.state === 'running'){
            listen.context.suspend()
        }
        if(typeof musicdayum !== 'undefined' && !musicdayum.paused) musicdayum.pause();
    }else{
        if(typeof listen !== 'undefined' && listen.context.state === 'suspended'){
            listen.context.resume()
        }
        if(typeof musicdayum !== 'undefined' && typeof dayum !== 'undefined' && dayum) musicdayum.play();
    }
}
function pic(){
    if(!window.hover) return; 
        const item = window.hover;
        const type = window.hovertype;
        const handicon = document.getElementById('handicon');
        

        function addToInv(name) {
            for (let i = 0; i < 3; i++) {
                if (player.inventory[i] === null) {
                    player.inventory[i] = name
                    document.getElementById('slot' + (i + 1)).innerText = name;
                    return true
                }
            }
            return false; 
        }

        if (type === 'bottle') {
            if (addToInv('MEDS')) {
                bottles.splice(bottles.indexOf(item), 1)
                scene.remove(item)
            }
        } 
        else if (type === 'choco') {
            if (addToInv('BATT')) {
                choco.splice(choco.indexOf(item), 1)
                scene.remove(item)
            }
        } 
        else if (type === 'terra') {
            terra.splice(terra.indexOf(item), 1)
            scene.remove(item)
            earned++
            if (earned >= 10 && typeof window.ending === 'function') window.ending();
        } 
        else if (type === 'powerball') {

            powerball.splice(powerball.indexOf(item), 1);
            scene.remove(item);
            if (typeof dayum !== 'undefined') {
                dayum = true;
                timer = 53;
                document.getElementById('timothy').style.display = 'block';
                if (typeof musicdayum !== 'undefined') {
                    musicdayum.currentTime = 0;
                    musicdayum.play();
                }
            }
        }
        
        window.hover= null;
        if (handicon) handicon.style.display = 'none';
    
}
document.addEventListener('mousedown', (e) =>{
    if(document.pointerLockElement && window.hover){
        pic()
    }
})
const iconpic = document.getElementById('handicon');
if(iconpic){
    iconpic.addEventListener('touchstart', (e) => {
        e.preventDefault();
        pic()
    })
}
window.addEventListener('keydown', (e) => {
if (window.pause) return;
    let indexuse = -1;

    if (['1', '2', '3'].includes(e.key)) {
        indexuse = parseInt(e.key) - 1;
    } else if (e.key.toLowerCase() === 'q') {
        indexuse = player.ativeslot;
    }

    if (indexuse !== -1) {
        const name = player.inventory[indexuse];
        if (name === 'MEDS') {
            playerhud.healthup(40);
            player.inventory[indexuse] = null;
            document.getElementById('slot' + (indexuse + 1)).innerText = 'EMPTY';
        } else if (name === 'BATT') {
            playerhud.staminalevel = playerhud.maxstamia;
            player.stamina = player.maxstamina;
            player.inventory[indexuse] = null;
            document.getElementById('slot' + (indexuse + 1)).innerText = 'EMPTY';
        }
    }
})
window.addEventListener('wheel', (e) => {
    if(window.pause || !document.pointerLockElement) return;
    document.getElementById('box' + (player.ativeslot + 1)).classList.remove('activeslot');
    
    if(e.deltaY > 0){
        player.ativeslot = (player.ativeslot + 1) % 3;
    } else {
        player.ativeslot = (player.ativeslot - 1 + 3) % 3;
    }
    document.getElementById('box' + (player.ativeslot + 1)).classList.add('activeslot');
});
for (let i = 0; i < 3; i++) {
    const box = document.getElementById('box' + (i + 1));
    if (box) {
        box.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (window.pause) return;

            if (player.ativeslot === i) {
                const name = player.inventory[i];
                if (name === 'MEDS') {
                    playerhud.healthup(40);
                    player.inventory[i] = null;
                    document.getElementById('slot' + (i + 1)).innerText = 'EMPTY';
                } 
                else if (name === 'BATT') {
                    playerhud.staminalevel = playerhud.maxstamia;
                    player.stamina = player.maxstamina;
                    player.inventory[i] = null;
                    document.getElementById('slot' + (i + 1)).innerText = 'EMPTY';
                }
            } 
            else {
                document.getElementById('box' + (player.ativeslot + 1)).classList.remove('activeslot');
                player.ativeslot = i;
                document.getElementById('box' + (player.ativeslot + 1)).classList.add('activeslot');
            }
        });
    }
}
anim()