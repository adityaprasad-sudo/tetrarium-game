const crafting = {
    ratatuouille: {
        'woodaxe': {
            requires: { wood: 10 },
            name: 'Wooden Axe',
            desc: "Double Wood Yield"
        },
        'woodpic':{
            requires: { wood: 15 },
            name: 'Wooden Pickaxe',
            desc: "Can mine Rocks"
        },
        'stonepic':{
            requires: { wood: 5, stone: 15 },
            name: 'Stone Pickaxe',
            desc: "Double Stone yield"
        },
        'ironpic': { 
            requires: { wood: 10, iron: 15 }, name: "Iron Pickaxe", desc: "Triple Stone Yield" 
        },
        'diamondpick': { 
            requires: { wood: 10, diamond: 5 }, name: "Diamond Pickaxe", desc: "Maximum Yield!" 
        }
    },
      craft: function(toolID, mechobj){
        const recipe = this.ratatuouille[toolID];
        if (!recipe) return false;
        if(mechobj.tools[toolID]){
            alert("You already have this tool!");
            return false;
        }
        for(const item in recipe.requires){
            if(mechobj.inventory[item] < recipe.requires[item]){
                alert("Not enough " + item + " to craft " + recipe.name);
                return false;
            }
        }
        for(const item in recipe.requires){
            mechobj.inventory[item] -= recipe.requires[item];
        }
        mechobj.tools[toolID] = true;
        mechobj.updateUI();
        console.log("Crafted " + recipe.name);
        return true;
    }
};