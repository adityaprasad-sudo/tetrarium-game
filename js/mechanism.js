const scene = new THREE.Scene();    
scene.background = new THREE.Color('#050505')
scene.fog = new THREE.FogExp2('#050505', 0.04);
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const time = new THREE.Clock();
const collide = []
let crocnpc = null
const ambietlight = new THREE.AmbientLight(0xFFFFFF, 0.05);
scene.add(ambietlight);
const flashlight = new THREE.SpotLight(0xffffff,2,40,Math.PI/6, 0.5, 1);
flashlight.castshadow = true
flashlight.position.set(0, 0, 0);
camera.add(flashlight.target);
scene.add(camera)
class cronpc{
    constructor(scene,gltf,startx,startz){
        this.mesh = gltf.scene;
        this.mesh.position.set(startx,5 , startz)
        this.mesh.traverse((child) => {
            if(child.ismesh){
                child.castshadow = true
                child.receiveShadow = true
            }
        })
        scene.add(this.mesh)
        this.mixer = new THREE.AnimationMixer(this.mesh)
        this.animations = gltf.animations
        }
    }
