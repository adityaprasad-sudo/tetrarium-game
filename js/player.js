const walkingsimulator = {
    mesh: null,
    velo: new THREE.Vector3(0,0,0),
    grounded: false,
    speed : 0.10,
    yaw: 0,
    pitch: 0,
    jumpforce: 0.5,
    gravity: -0.05,
    sprint : 0.4,
    lastx : null,
    lastz : null,
    keys : {w: false, a: false, s: false, d: false, shift: false, space: false},
    init: function(scene,startX, startY, startZ){
        const playerdim = new  THREE.BoxGeometry(0.6,1.8,0.6); //steve reference?
        const playermat = new THREE.MeshBasicMaterial({color: '#e74c3c', colorWrite: false, depthWrite: false});
        this.mesh = new THREE.Mesh(playerdim, playermat);
        this.mesh.position.set(startX, startY, startZ);

        this.mesh.castShadow = true;
        scene.add(this.mesh);
        window.addEventListener('keydown', (e) => {
            if(e.key.toLowerCase() === 'w') walkingsimulator.keys.w = true;
            if(e.key.toLowerCase() === 'a') walkingsimulator.keys.a = true;
            if(e.key.toLowerCase() === 's') walkingsimulator.keys.s = true;
            if(e.key.toLowerCase() === 'd') walkingsimulator.keys.d = true;
            if(e.key.toLowerCase() === 'shift') walkingsimulator.keys.shift = true;
            if(e.key.toLowerCase() === ' ') walkingsimulator.keys.space = true;
        });
   
        window.addEventListener('keyup', (e) => {
            if (e.key.toLowerCase() === 'w') walkingsimulator.keys.w = false;
            if (e.key.toLowerCase() === 'a') walkingsimulator.keys.a = false;
            if (e.key.toLowerCase() === 's') walkingsimulator.keys.s = false;
            if (e.key.toLowerCase() === 'd') walkingsimulator.keys.d = false;
            if (e.key === ' ') this.keys.space = false;
            if (e.key.toLowerCase() === 'shift') walkingsimulator.keys.shift = false;
        });
        document.addEventListener('mousemove', (e) => {
            if(document.pointerLockElement){
                if (Math.abs(e.movementX) > 100 || Math.abs(e.movementY) > 100) return;
                walkingsimulator.yaw -= e.movementX * 0.002;
                walkingsimulator.pitch -= e.movementY * 0.002;
                const pi_2 = Math.PI / 2 - 0.01;
                walkingsimulator.pitch = Math.max(-pi_2, Math.min(pi_2, walkingsimulator.pitch));
        }});
    
    },
        update: function(camera, renderedblocks, basePlane, coordsText,  renderchiggas){
            if(!this.mesh) return;
            let dx = 0; let dz = 0;
            if(this.keys.w){
                dx -= Math.sin(this.yaw) * this.speed;
                dz -= Math.cos(this.yaw) * this.speed;
            };
            if (this.keys.s) {
            dx += Math.sin(this.yaw) * this.speed;
            dz += Math.cos(this.yaw) * this.speed;
        }
        if (this.keys.a) {
            dx -= Math.cos(this.yaw) * this.speed;
            dz += Math.sin(this.yaw) * this.speed;
        }
        if (this.keys.d) {
            dx += Math.cos(this.yaw) * this.speed;
            dz -= Math.sin(this.yaw) * this.speed;
        }
            
            
                this.velo.y += this.gravity;
                this.mesh.position.y += this.velo.y;
                const currentx = Math.round(this.mesh.position.x);
                const currentz = Math.round(this.mesh.position.z);
                const floorblock = renderedblocks[`${currentx},${currentz}`];
                let floorheight = 0;
                if(floorblock) floorheight = floorblock.scale.y;
                if(this.mesh.position.y - 0.9 <= floorheight) {
                    this.mesh.position.y = floorheight + 0.9;
                    this.velo.y = 0;
                    this.grounded = true;
                } else {
                    this.grounded = false;
                }
                if(this.keys.space && this.grounded){
                    this.velo.y = this.jumpforce;
                    this.grounded = false;
                }   
                
        const checkTreeWall = (checkX, checkZ) => {
            if (!renderchiggas) return false;
            let feet = this.mesh.position.y - 0.9;
            let head = this.mesh.position.y + 0.9;

            for (let key in renderchiggas) {
                let parts = renderchiggas[key];
                for (let i = 0; i < parts.length; i++) {
                    let part = parts[i];
                    if (part.userData.gridX === checkX && part.userData.gridZ === checkZ) {
                        let blockBottom = part.position.y - 0.5;
                        let blockTop = part.position.y + 0.5;
                        if (blockTop > feet + 0.1 && blockBottom < head) return true;
                    }
                }
            }
            return false;
        };

        
        if(dx !== 0){
            const nextx = Math.round(this.mesh.position.x + dx);
            const blockx = renderedblocks[`${nextx},${currentz}`];
            let heightx = blockx ? blockx.scale.y : 0;
            
            if (checkTreeWall(nextx, currentz)) heightx = 100;
            
            if(heightx < this.mesh.position.y - 0.5) {
                this.mesh.position.x += dx;
            }
        }
        
        if (dz !== 0) {
            const nextz = Math.round(this.mesh.position.z + dz);
            const blockz = renderedblocks[`${currentx},${nextz}`];
            let heightz = blockz ? blockz.scale.y : 0;
            
            if (checkTreeWall(currentx, nextz)) heightz = 100;
            
            if (heightz < this.mesh.position.y - 0.5) {
                this.mesh.position.z += dz;
            }
        }
                camera.position.set(this.mesh.position.x, this.mesh.position.y + 0.6 , this.mesh.position.z);
                camera.rotation.y = this.yaw;
                camera.rotation.order = 'YXZ';
                camera.rotation.x = this.pitch;

        basePlane.position.x = this.mesh.position.x;
        basePlane.position.z = this.mesh.position.z;
        if(currentx !== this.lastx || currentz !== this.lastz) {
            updateWorld(currentx, currentz);
            this.lastx = currentx;
            this.lastz = currentz;
            if(coordsText) coordsText.textContent = `Coords: ${currentx}, ${currentz}`;

        }
}
};