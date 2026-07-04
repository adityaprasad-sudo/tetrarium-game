const mainmenu = document.getElementById('menu')
const storyscr = document.getElementById('storyscr')
const settingsmenu = document.getElementById('settingmenu')
const loaidngcr = document.getElementById('loadingscr')
const hud1 = document.getElementById('hud')
const aarange = document.getElementById('aarange')
const aaval = document.getElementById('aaval')
const paumenu = document.getElementById('pausemenu')
const btnresume = document.getElementById('btnresume')
const btnquit = document.getElementById('btnquit')
const btnplay = document.getElementById('btnplay')
const btnsettings = document.getElementById('settings')
const backbtnsett = document.getElementById('backbtn')
btnplay.addEventListener('click', () =>{
    const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    if(mobile && document.documentElement.requestFullscreen){
        document.documentElement.requestFullscreen().catch(err => console.log(err))
    }
    mainmenu.style.display = 'none'
    loaidngcr.style.display = 'flex'
    setTimeout(() => {
        loaidngcr.style.display = 'none'
        storyscr.style.display = 'flex'
        const startgm = (e) =>{
            if(e.type === 'touchstart')e.preventDefault()
            window.removeEventListener('keydown', startgm)
        window.removeEventListener('touchstart', startgm)
        window.removeEventListener('touchmove', startgm)
            storyscr.style.display = 'none'
            hud1.style.display = 'block'
            const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
            if(mobile){
                document.getElementById('mobile').style.display = 'block'
                
            }else{
                document.body.requestPointerLock()
            }
            if(typeof window.startgame === 'function') window.startgame()
        }
    window.addEventListener('keydown', startgm)
    window.addEventListener('touchstart', startgm)
    window.addEventListener('touchmove', startgm)
        }, 5000)
})
    const pausem = document.getElementById('pause')
    if(pausem){
        pausem.addEventListener('click', () => {
            document.getElementById('pausemenu').style.display = 'flex'
            window.pause =true
        })
    }
    const btnfs = document.getElementById('btnfs')
    if(btnfs){
        btnfs.addEventListener('click', () => {
            if(!document.fullscreenElement){
                if(document.documentElement.requestFullscreen){
                    document.documentElement.requestFullscreen().catch(err => console.log(err))
                }
            }else {
                if(document.exitFullscreen){
                    document.exitFullscreen()
                }
            }
        })  
    }
    btnresume.addEventListener('click', () => {
        document.getElementById('pausemenu').style.display = 'none'
        const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
        window.pause = false
        if(!mobile){
            document.body.requestPointerLock()
        }
    })
btnsettings.addEventListener('click', () => {
    mainmenu.style.display = 'none'
    settingsmenu.style.display = 'flex'
})
backbtnsett.addEventListener('click', () => {
    mainmenu.style.display = 'flex'
    settingsmenu.style.display = 'none'
})

window.gamesettings = {
    sensitivity: 0.002,
    mastervolume: 1,
    resolution: 100,
    renderdistance: 1000,
    bloomintensity: 0.5,
    aa: 2,
    bloom: true
}
document.getElementById('mousesensin').addEventListener('input', (e) => {
    document.getElementById('mousesens').innerText = e.target.value
    window.gamesettings.sensitivity = (e.target.value /50) * 0.002
})
document.getElementById('mastervolumerange').addEventListener('input', (e) => {
    document.getElementById('mastervolume').innerText = e.target.value
    window.gamesettings.mastervolume = (e.target.value / 100)
    if(typeof window.updatevolume === 'function') window.updatevolume(window.gamesettings.mastervolume)
})
document.getElementById('resolutionrange').addEventListener('input', (e) => {
    document.getElementById('resval').innerText = e.target.value
    window.gamesettings.resolution = e.target.value
    if(typeof window.updategraph === 'function') window.updategraph(window.gamesettings)
})
document.getElementById('renderdistancerange').addEventListener('input', (e) => {
    document.getElementById('distval').innerText = e.target.value
    const actdis = (e.target.value / 100) * 2000
    window.gamesettings.renderdistance = actdis
    if(typeof window.updategraph === 'function') window.updategraph(window.gamesettings)
})
document.getElementById('bloomrange').addEventListener('input', (e) => {
    document.getElementById('bloomval').innerText = e.target.value
    window.gamesettings.bloomintensity = parseFloat(e.target.value)
    if(typeof window.updategraph === 'function') window.updategraph(window.gamesettings)
})

document.addEventListener('pointerlockchange', () => {
    if(typeof gamestart !== 'undefined' &&  gamestart === true){
        if(document.pointerLockElement === document.body){
            paumenu.style.display = 'none'
        }else{
            paumenu.style.display = 'flex'
        }
    }
})
btnresume.addEventListener('click', () => {
    document.body.requestPointerLock()
})
btnquit.addEventListener('click', () => {
    window.location.reload()
})
aarange.addEventListener('input', () => {
    const val = parseInt(aarange.value)
    if(val === 0) aaval.innerText = 'OFF'
    else aaval.innerText = Math.pow(2,val) + "x"
    window.gamesettings.aa = val
    if(typeof window.updategraph === 'function') window.updategraph(window.gamesettings)
})
const bloomchk = document.getElementById('bloomcheck')
bloomchk.addEventListener('change', (e) => {
    window.gamesettings.bloom = e.target.checked
    if(typeof window.updategraph === 'function'){ window.updategraph(window.gamesettings)}
})
const diescr = document.getElementById('diescr')
const respawnbtn = document.getElementById('btnres')
const btnqit = document.getElementById('btndiequit')
const reboovid = document.getElementById('reboovid')

btnqit.addEventListener('click', () => {
    window.location.reload()
})
respawnbtn.addEventListener('click', () => {
    diescr.style.display = 'none'
    reboovid.style.display = 'block'
    reboovid.currentTime = 0
    reboovid.play()
})
reboovid.addEventListener('ended', () => {
    reboovid.style.display = 'none'
    if(typeof window.respawn === 'function') {window.respawn()}
})