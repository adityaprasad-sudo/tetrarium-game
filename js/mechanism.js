const mech = {
    inventory: {wood: 0, stone: 0},
    tools: {woodaxe: false, woodpic: false, stonepic: false},
    obliratedobj: new Set(),
    dyingani: [],
    line: null,
    hoverkey: [],
    
    targetglow: function(scene, hitobj) {
        if (!hitobj) { this.clearline(scene); return; }
        if (this.currentHoverKey === hitobj.uuid) return;
        
        if (this.line) scene.remove(this.line);
        this.currentHoverKey = hitobj.uuid;
        
        this.line = new THREE.BoxHelper(hitobj, 0xffffff);
        this.line.material.transparent = true;
        this.line.material.opacity = 0.5;
        this.line.material.depthTest = false; 
        
        scene.add(this.line);
    },
    clearline: function(scene) {
        if (this.line) {
            scene.remove(this.line);
            this.line = null;
            this.currentHoverKey = null;
        }
    },
    updateUI: function(){
        document.getElementById('woodinv').textContent = this.inventory.wood;
        document.getElementById('stoneinv').textContent = this.inventory.stone;
        if (this.tools.woodaxe) document.getElementById('btnwoodaxe').classList.add('owned');
        if (this.tools.woodpic) document.getElementById('btnwoodpic').classList.add('owned');
        if (this.tools.stonepic) document.getElementById('btnstonepic').classList.add('owned');
    },
    mineTarget: function(x, z, key, clickedBlock, scene, renderchiggas){
        const type = clickedBlock.userData.type;

        
        if (type === 'Log' || type === 'Leaves') {
            scene.remove(clickedBlock); 
            
            
            const parentKey = clickedBlock.userData.parentKey;
            const treeArray = renderchiggas[parentKey];
            if (treeArray) {
                const index = treeArray.indexOf(clickedBlock);
                if (index > -1) treeArray.splice(index, 1); 
                
               
                if (treeArray.length === 0) this.obliratedobj.add(parentKey + '-tree');
            }

            
            if (type === 'Log') {
                let yieldWood = 1;
                if (this.tools.wood_axe) yieldWood *= 2; 
                this.inventory.wood += yieldWood;
                this.updateUI(); 
            }

            this.clearline(scene); 
            return true; 
        }
        
        if (type === 'Stone'|| type === 'SandStone' || type === 'Mountain') {
            this.animateMine(clickedBlock);
            if(!this.tools.woodpic && !this.tools.stonepic){
                alert("You need a Wooden Pickaxe to mine this!");
                return true
            }
            this.obliratedobj.add(key + '-rock');
            let yieldstone = Math.floor(Math.random() * 2) + 1;
            if(this.tools.stonepic) yieldstone *= 2;
            this.inventory.stone += yieldstone;
            this.updateUI();
            this.clearline(scene);
            return true;
        }
        
        return false;
    },
    animateBreak: function(mesh){
        this.dyingani.push({mesh: mesh, type: 'pop'});
    },
    animateMine: function(mesh){
        this.dyingani.push({mesh: mesh, type: 'crush'});
    },
    tickanimations: function(scene){
        for (let i = this.dyingani.length - 1; i >= 0; i--){
            let anim = this.dyingani[i];
            if (anim.type === 'pop') {
                anim.mesh.scale.multiplyScalar(0.8);
                anim.mesh.rotation.x += 0.1;
                anim.mesh.rotation.y += 0.1;
                if (anim.mesh.scale.y < 0.1) {
                    scene.remove(anim.mesh);
                    this.dyingani.splice(i, 1);
                }
            }else if (anim.type === 'crush') {
                anim.mesh.scale.y *= 0.8;
                anim.mesh.position.y = anim.mesh.scale.y / 2;
                if (anim.mesh.scale.y < 0.1){
                    anim.mesh.scale.y = 0.1;
                    anim.mesh.position.y = 0.5;
                    this.dyingani.splice(i, 1);
                }
            }
        }
    }
};
