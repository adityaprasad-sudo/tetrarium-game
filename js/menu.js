const mainmenu = document.getElementById('menu')
const settingsmenu = document.getElementById('settingmenu')
const loaidngcr = document.getElementById('loadingscr')
const hud = document.getElementById('hud')
const btnplay = document.getElementById('btnplay')
const btnsettings = document.getElementById('settings')
const backbtnsett = document.getElementById('backbtn')
btnplay.addEventListener('click', () =>{
    mainmenu.style.display = 'none'
    loaidngcr.style.display = 'flex'
    setTimeout(() => {
        loaidngcr.style.display = 'none'
        hud.style.display = 'flex'
        if(typeof window.startgame === 'function') window.startgame()
    }, 5000)
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