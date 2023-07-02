const n = 10;
let array = []
let audio = null

init()

function init(){
    for(let i = 0;i<n;i++){
        array[i] = Math.random()
    }
    showBars()
}

function playNote(freq){
    if(audio==null){
        audio = new(AudioContext || webkitAudioContext || window.webkitAudioContext)()
    }
    const dur = 0.1;
    const osc = audio.createOscillator()
    osc.frequency.value = freq
    osc.start()
    osc.stop(audio.currentTime+dur)
    const node = audio.createGain()
    node.gain.value = 0.1
    node.gain.linearRampToValueAtTime(0,audio.currentTime+dur)
    osc.connect(node)
    node.connect(audio.destination)
}

function showBars(move){
    container.innerHTML = ""
    for(let i = 0; i<array.length;i++){
        const bar = document.createElement("div");
        bar.style.height =array[i] *100+"%"
        bar.classList.add("bar")
        if(move && move.indicies.includes(i)){
            bar.style.backgroundColor = move.type == "swap" ? "red" : "blue"
        }
        container.appendChild(bar)
    }
}

function play(){
    const copy = [...array]
    const moves = bubbleSort(copy)
    animate(moves)
}

function animate(moves){
    if(moves.length == 0){
        showBars()
    }else{
        const move = moves.shift()
        let [i,j] = move.indicies
        if(move.type == "swap"){
            let temp = array[i] 
            array[i] = array[j]
            array[j] = temp
        }
        playNote(100+array[i]*300)
        playNote(100+array[j]*300)
        showBars(move);
        setTimeout(()=>{
            animate(moves)
        },100)
    }
}

function bubbleSort(array){
    const moves = []
    for(let i = 0;i<array.length;i++){
        for(let j = 0;j<array.length-1;j++){
            moves.push({indicies:[j+1,j],type:"comp"})
            if(array[j] > array[j+1]){
                temp = array[j+1]
                array[j+1] = array[j]
                array[j] = temp
                moves.push({indicies:[j+1,j],type:"swap"})
            }
        }
    }
    return moves
}

