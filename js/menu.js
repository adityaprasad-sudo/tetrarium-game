const mainmenu = document.getElementById('menu')
const loaidngcr = document.getElementById('loadingscr')
const hud = document.getElementById('hud')
const btnplay = document.getElementById('btnplay')
btnplay.addEventListener('click', () =>{
    mainmenu.style.display = 'none'
    loaidngcr.style.display = 'flex'
    setTimeout(() => {
        loaidngcr.style.display = 'none'
        hud.style.display = 'flex'
        startgame()
    }, 3000)
})