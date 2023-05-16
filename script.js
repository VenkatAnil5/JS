// Stop Watch

const timeDisplay = document.querySelector("#timeDisplay");
const startButton = document.querySelector("#startButton");
const stopButton = document.querySelector("#stopButton");
const resetButton = document.querySelector("#resetButton");

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalid;
let hrs=0;
let mins=0;
let secs=0;

startButton.addEventListener("click", () => {
    if(paused){
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalid = setInterval(updateTime,75);
    }
});
stopButton.addEventListener("click",() => {
    if(!paused){
        paused = false;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalid);
    }
});
resetButton.addEventListener("click",() => {
    startTime = 0;
    clearInterval(intervalid);
    elapsedTime = 0;
    currentTime = 0;
    paused = true;
    hrs=0;
    mins=0;
    secs=0;
    timeDisplay.textContent = "00:00:00";
});

function updateTime(){
    elapsedTime = Date.now() - startTime;

    secs = Math.floor((elapsedTime/1000) % 60);
    mins = Math.floor((elapsedTime/(1000 * 60)) % 60);
    hrs = Math.floor((elapsedTime/(1000 * 60 * 60)) % 60);

    secs = pad(secs);
    mins = pad(mins);
    hrs = pad(hrs);

    timeDisplay.textContent = `${hrs}:${mins}:${secs}`;

    function pad(unit){
        return (("0") + unit).length > 2 ? unit : "0" + unit;
    }
}



// Rock Paper Scissor
const rockPaperScissorText = document.querySelector("#playerText");
const computerText = document.querySelector("#computerText");
const resultText = document.querySelector("#resultText");
const choiceButton = document.querySelectorAll(".choiceButton");

let player;
let computer;
let result;

choiceButton.forEach(button => button.addEventListener("click", () => {
    player = button.textContent;
    computer = computerTurn();
    console.log(player)
    console.log(computer)
    rockPaperScissorText.textContent = `Player Choice : ${player}`;
    computerText.textContent = `Computer Choice : ${computer}`;
    resultText.textContent = RPSWinner();
}));

function computerTurn(){
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    switch(randomNumber){
        case 1:
            computer = "Rock";
            break;
        case 2:
            computer = "Paper";
            break;
        case 3:
            computer = "Scissor";
            break;
    }
    return computer;
}
function RPSWinner(){
    if(player === computer){
        return "Draw!";
    }
    else if(computer == "Rock"){
        return (player == "Paper") ? "You Win!" : "You Lose!";
    }
    else if(computer == "Paper"){
        return (player == "Scissor") ? "You Win!" : "You Lose!";
    }
    else if(computer == "Scissor"){
        return (player == "Rock") ? "You Win!" : "You Lose!";
    }
}



// Tic Tac Toe

const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartButton = document.querySelector("#restartButton");
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let options = ["","","","","","","","",""];
let currentPlayer = "X";
let running = false;

initializeGame();


function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartButton.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true; 
}
function cellClicked(){
    const cellIndex = this.getAttribute('cellIndex');
    if(options[cellIndex] != "" || !running){
        return;
    }
    updateCell(this,cellIndex);
    checkWinner();
}
function updateCell(cell,index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}
function checkWinner(){
    let roundWon = false;
    for(let i = 0 ; i < winConditions.length ; i++){
        const conditions = winConditions[i];
        const cellA = options[conditions[0]];
        const cellB = options[conditions[1]];
        const cellC = options[conditions[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }
    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }

}
function restartGame(){
    currentPlayer = "X";
    options = ["","","","","","","","",""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}