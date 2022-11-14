
let grid = [
'', '', '',
'', '', '',
'', '', ''
];



const gridScreen = document.getElementById('grid');
const spots = document.querySelectorAll(".element");

let playerOneInput = document.getElementById('playerOneName')
let playerTwoInput = document.getElementById('playerTwoName')
let playerOneHeader = document.getElementById('playerOneHeader');
let playerTwoHeader = document.getElementById('playerTwoHeader');
let gameStart = false;
let startGameButton = document.getElementById('startGameButton');

let turn = false;



function changeTurn(){
    turn = turn !== true;
}

function updateGrid(){

    for (let i = 0; i < spots.length; i++){

        let symbol = grid[i]; 

        if (symbol == 'x'){
            spots[i].innerHTML = '<img src=\"./x_icon.png\" width="100%" height="100%">'
        }else if (symbol == 'o'){
            spots[i].innerHTML= '<img src=\"./0_icon.jpeg\" width="100%" height="100%">'

        }else{
            spots[i].innerHTML = ''
        }
        
    }

};




const Player = (name, playerTurn, symbol) => {
   
    const playerMove = (element) =>{
        elementNum = element.id;
        if (grid[elementNum] == ''){
            grid[elementNum] = symbol;
            updateGrid()
            checkWin()
            checkTie()
            changeTurn()   
        };


    
    };

    return {name, playerTurn, playerMove}
}

const PlayerOne = Player('Player 1', false, 'x');
const PlayerTwo = Player('Player 2', true, 'o')



function beginGame(){
    
  
    let playerOneName = playerOneInput.value;
    let playerTwoName = playerTwoInput.value;


    if (playerOneName == ''){
        playerOneName = 'Player 1'
    }
    if (playerTwoName == ''){
        playerTwoName = 'Player 2'
    }

    PlayerOne.name = playerOneName

    PlayerTwo.name = playerTwoName

 
    playerOneHeader.innerHTML = playerOneName;
    playerTwoHeader.innerHTML = playerTwoName;


    gameStart = true

    playerOneInput.disabled = true;
    playerTwoInput.disabled = true;

    startGameButton.disabled = true;

}

function resetGame(){
    gameStart = false
    turn = false
    playerOneHeader.innerHTML = 'Player 1'
    playerTwoHeader.innerHTML = 'Player 2'
    PlayerOne.name = 'Player 1'
    PlayerTwo.name = 'Player 2'

    playerOneInput.value = ''
    playerTwoInput.value = ''


    playerOneInput.disabled = false;
    playerTwoInput.disabled = false;

    startGameButton.disabled = false;
    
    gridScreen.replaceChildren(...spots)
    gridScreen.classList.remove('winScreen')


 
    for (let i = 0; i < grid.length; i++){
        grid[i] = ''
    };

    updateGrid()

    


}

function checkTie(){
    let count = 0;
    for (let i = 0; i < grid.length; i++){
        if (grid[i] == ''){
            count += 1
        }
    };
    if (count == 0 && gameStart == true){
        let tieResult = document.createElement('div');
        tieResult.classList.add('winningText');
        tieResult.textContent = "It's a tie!"
        gridScreen.classList.add('winScreen');
        gridScreen.appendChild(tieResult)
        gameStart = false

    }


}



function checkWin(){

    
    function checkLines(numbers, symbol, playerName){
        let total = 0
        for (let i = 0; i < numbers.length; i++){
            if (grid[numbers[i]] == symbol){
                total += 1;
            }

        }
        if (total == 3){
            let congratulations = document.createElement('div');
            congratulations.classList.add('winningText');
            congratulations.textContent = 'Game Over! ' + playerName + " has won!"
            gridScreen.classList.add('winScreen');
            gridScreen.appendChild(congratulations)
            gameStart = false
        }
    }

    checkLines([0,1,2], 'x', PlayerOne.name)
    checkLines([0,1,2], 'o', PlayerTwo.name)

    checkLines([3,4,5], 'x', PlayerOne.name)
    checkLines([3,4,5], 'o', PlayerTwo.name)

    checkLines([6,7,8], 'x', PlayerOne.name)
    checkLines([6,7,8], 'o', PlayerTwo.name)

    checkLines([0,3,6], 'x', PlayerOne.name)
    checkLines([0,3,6], 'o', PlayerTwo.name)

    checkLines([1,4,7], 'x', PlayerOne.name)
    checkLines([1,4,7], 'o', PlayerTwo.name)

    checkLines([2,5,8], 'x', PlayerOne.name)
    checkLines([2,5,8], 'o', PlayerTwo.name)
 
    checkLines([0,4,8], 'x', PlayerOne.name)
    checkLines([0,4,8], 'o', PlayerTwo.name)

    checkLines([2,4,6], 'x', PlayerOne.name)
    checkLines([2,4,6], 'o', PlayerTwo.name)


}



function nextTurn(element){
  
    if (gameStart == true){
        if (PlayerOne.playerTurn == turn){
            PlayerOne.playerMove(element)
        }else if (PlayerTwo.playerTurn == turn){
            PlayerTwo.playerMove(element)
        }

    }else if (gameStart == false){

    }



};