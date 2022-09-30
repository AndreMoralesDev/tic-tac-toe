const d = document;
let items = new Array(9).fill("").map((e,i)=> d.getElementById(`item${++i}`));
let continuar = true;
let player = "ellipse-outline"
let maquina = "close-outline"
const $btnStartGame = d.getElementById("btn-start-game");
const $grid = d.querySelector("main");
const $btnInGame = d.getElementById("btn-in-game");
const $btnBack = d.getElementById("btn-back");
const $btnRetry = d.getElementById("btn-retry");
const $btnOnePlayer = d.getElementById("btn-one-player")
const $btnTwoPlayers = d.getElementById("btn-two-players")
let onePlayer = false;
let attempPlayer = 0;

const ganador = () => {
    let res = items.map(e => e.getAttribute("name"));
    if (
        (res[0] === player && res[1] === player && res[2] === player) ||
        (res[3] === player && res[4] === player && res[5] === player) ||
        (res[6] === player && res[7] === player && res[8] === player) ||
        (res[0] === player && res[3] === player && res[6] === player) ||
        (res[1] === player && res[4] === player && res[7] === player) ||
        (res[2] === player && res[5] === player && res[8] === player) ||
        (res[0] === player && res[4] === player && res[8] === player) ||
        (res[2] === player && res[4] === player && res[6] === player)
        ) return "Ha ganado el jugador";
    else if (
        (res[0] === maquina && res[1] === maquina && res[2] === maquina) ||
        (res[3] === maquina && res[4] === maquina && res[5] === maquina) ||
        (res[6] === maquina && res[7] === maquina && res[8] === maquina) ||
        (res[0] === maquina && res[3] === maquina && res[6] === maquina) ||
        (res[1] === maquina && res[4] === maquina && res[7] === maquina) ||
        (res[2] === maquina && res[5] === maquina && res[8] === maquina) ||
        (res[0] === maquina && res[4] === maquina && res[8] === maquina) ||
        (res[2] === maquina && res[4] === maquina && res[6] === maquina)
        ) return "Ha ganado la máquina";
    return false;
}

const validarGanador = () =>{
    if (ganador()) {
        deshabilitarOpciones();
        attempPlayer = 0;
        continuar = false;
        if (ganador() === "Ha ganado el jugador") 
            d.querySelector("body").style.backgroundColor = "#2c2";
        else
            d.querySelector("body").style.backgroundColor = "#c22";
    }
}

const reiniciarControles = () => {
    d.querySelector("body").style.backgroundColor = "#cdd86f";
    res = [...d.getElementsByClassName("grid-item")]
    res.map(e=>{
        e.removeChild(e.querySelector("ion-icon"))
    })
    for (let i = 1; i <= 9; i++) {
        let ionIcon = d.createElement("ion-icon");
        ionIcon.classList.add("option")
        ionIcon.setAttribute("id",`item${i}`)
        res[i-1].appendChild(ionIcon);
    }
    items = new Array(9).fill("").map((e,i)=> d.getElementById(`item${++i}`));
    continuar = true;
}

const deshabilitarOpciones = () => items.forEach(e => e.style.pointerEvents = "none")

const turnoMaquina = () => {
    let opcion;
    do opcion = items[Math.round(Math.random() * 8)] 
    while (opcion.getAttribute("name") !== null)
    opcion.setAttribute("name","close-outline");
    opcion.style.pointerEvents = "none";
}

d.addEventListener("click", e => {
    if (items.includes(e.target)){
        if (onePlayer){
            let option = items[items.indexOf(e.target)];
            option.setAttribute("name","ellipse-outline");
            option.style.pointerEvents = "none";
            option.style.cursor = "default";
            validarGanador();
            if (continuar) turnoMaquina();
            validarGanador();
        } else {
            let option = items[items.indexOf(e.target)];
            if (attempPlayer % 2 === 0){
                option.setAttribute("name","ellipse-outline");
                option.style.pointerEvents = "none";
                option.style.cursor = "default";
                attempPlayer ++;
            } else {
                option.setAttribute("name","close-outline");
                option.style.pointerEvents = "none";
                option.style.cursor = "default";
                attempPlayer ++;
            }
            validarGanador();
        }
    }
    res = items.filter(e=>e.getAttribute("name") === null).length;
    if (res === 1) continuar = false;
    if(e.target === $btnStartGame){
        $btnStartGame.classList.add("display-none");
        $btnOnePlayer.classList.remove("display-none");
        $btnTwoPlayers.classList.remove("display-none");
    }
    if(e.target === $btnOnePlayer){
        $btnInGame.classList.replace("display-none","btn-in-game-container");
        $grid.classList.remove("display-none");
        $btnOnePlayer.classList.add("display-none");
        $btnTwoPlayers.classList.add("display-none");
        onePlayer = true;
        turnoMaquina();
    }
    if(e.target === $btnTwoPlayers){
        $btnInGame.classList.replace("display-none","btn-in-game-container");
        $grid.classList.remove("display-none");
        $btnOnePlayer.classList.add("display-none");
        $btnTwoPlayers.classList.add("display-none");
    }
    if(e.target === $btnBack){
        $btnInGame.classList.replace("btn-in-game-container","display-none");
        $grid.classList.add("display-none");
        $btnOnePlayer.classList.remove("display-none");
        $btnTwoPlayers.classList.remove("display-none");
        reiniciarControles();
        onePlayer = false;
    }
    if(e.target === $btnRetry){
        reiniciarControles();
        if (onePlayer) turnoMaquina();
    }
})