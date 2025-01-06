const cells=document.querySelectorAll('.cell')
const history=document.querySelector('.history ul')
const scoreO=document.getElementById('scoreO')
const scoreX=document.getElementById('scoreX')
const start= document.querySelector('.start')
const restart= document.querySelector('.restart')

let cp ='O'    //Current Player
let initialboard =['','','','','','','','',''] // Initial state of the board
let isActive = false 
let gametimer
let timer=60
let scores={O:0,X:0}

function checkwin(){
    const winpatt=[[0,1,2],[3,4,5],[6,7,8],[2,5,6],[1,4,7],[0,3,6],[0,4,8],[2,4,6]]
    for(let i=0;i<winpatt.length;i++){
        const patt=winpatt[i]
        if(initialboard[patt[0]]===cp &&
            initialboard[patt[1]]===cp &&
            initialboard[patt[2]]===cp 
           
        ){
        return true;
        }

    }
    return false;

}

function endgame(popup){
    isActive=false
    clearInterval(gametimer)
    alert(popup)
    addhistory(popup)

}

function addhistory(result){
    const list =document.createElement('li')
    list.textContent="Game: "+result
    history.appendChild(list)
}

function updatescore(){
    scoreO.textContent=scores['O']
    scoreX.textContent=scores['X']

}

function handleclick(e){
    const index = e.target.dataset.index
    if(initialboard[index]==='' && isActive){
        initialboard[index]=cp
        e.target.textContent =cp
        if(checkwin()){
            endgame(cp+" wins!!!")
            scores[cp]+=1
            updatescore()
        }
        else {
            filled = true
            for(let i=0;i<initialboard.length;i++){
                if(initialboard[i]==''){
                    filled = false
                    break
                }
            }
            if(filled){
                endgame("It's a Draw!!")
            }
            else{
                cp = cp === 'O' ? 'X':'O'
            }


    }
}
}

function Startgame(){
    const startButton = document.querySelector('.start');
    if (startButton) {
    startButton.remove();
    }

    const existingGameInfo = document.querySelector('.game-info');
    if (existingGameInfo) {
        existingGameInfo.remove();
    }
    if(!isActive){
        isActive=true
        timer=60
        cp='O'
        initialboard.fill('')
        cells.forEach(function(cell){
            cell.textContent=''
            cell.addEventListener('click',handleclick)
        })
        const gameInfo = document.createElement('div')
        gameInfo.className = 'game-info'
        gameInfo.innerHTML=`
        <p id="time">"Timer: "+timer+"s"</p>
        <p id="message">Click on a square to make a move</p>
        `
        document.querySelector('.game-container h1').after(gameInfo)

        gametimer=setInterval(function(){
            timer--
            const element=document.getElementById('time')
            if(element){
            element.textContent="Timer: "+timer+"s"
            }
            if(timer<=0){
                clearInterval(gametimer)
                endgame("Time's up!!")
            }
        },1000)


    }

}

function restartgame(){
    isActive=false
    clearInterval(gametimer)
    const gameInfo = document.querySelector('.game-info')
    if (gameInfo) {
        gameInfo.remove()
    }
    let existingStartButton = document.querySelector('.start');
    if (existingStartButton) {
        existingStartButton.remove();
    }
    const startButton = document.createElement('button')
    startButton.className = 'start'
    startButton.textContent = 'Game Start'
    const gameInfoContainer = document.createElement('div');
    gameInfoContainer.className = 'game-info';
    gameInfoContainer.appendChild(startButton);
    document.querySelector('.game-container h1').after(gameInfoContainer)

    document.querySelector('.start').addEventListener('click',Startgame)

    initialboard.fill('')
    cells.forEach(function(cell){
        cell.textContent=''
        cell.removeEventListener('click',handleclick)

    })
}

document.querySelector('.start').addEventListener('click',Startgame)
restart.addEventListener("click",restartgame)
