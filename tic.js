let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newBtn = document.querySelector("#new");
let msgContainer=document.querySelector(".msg-container");
let msg= document.querySelector("#msg")
let playVsPlayerBtn = document.querySelector("#play-vs-player");
let playVsAIBtn = document.querySelector("#play-vs-ai");
let count = 0;
let turnO= true;
let isVsAI= false;
const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

playVsPlayerBtn.addEventListener("click",()=>{
    isVsAI=false;
    playVsAIBtn.classList.remove("active-mode");
    playVsPlayerBtn.classList.add("active-mode")
    boxes.forEach((box)=>{
        box.classList.remove("hideBox");
    });
    resetBtn.classList.remove("hideReset");
    resetGame();
});
playVsAIBtn.addEventListener("click",()=>{
    isVsAI=true;
    playVsAIBtn.classList.add("active-mode");
    playVsPlayerBtn.classList.remove("active-mode")
    boxes.forEach((box)=>{
        box.classList.remove("hideBox");
    });
    resetBtn.classList.remove("hideReset");
    resetGame();
});
const resetGame=()=>{
    turnO=true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");
};
const aiMove=()=>{
    let emptyBoxes=[];
    boxes.forEach((box)=>{
        if (box.innerText === "") {
            emptyBoxes.push(box);
        }
    });
    if (emptyBoxes.length > 0) {
        let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        randomBox.innerText = "X"; 
        randomBox.disabled = true;
        turnO = true; 
        count++;

        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    }
}
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO){
            box.innerText="O";
            turnO= false;
        }else{
            box.innerText = "X";
            turnO= true;
        }
        box.disabled = true;
        count++;
        let isWinner = checkWinner();
        if(count ===9 && !isWinner){
            gameDraw();
        }
        if(isVsAI && !isWinner && count<9 && !turnO){
            aiMove()
        }
    });
});

const gameDraw=()=>{
    msg.innerText = `Game was a draw`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
};
const disabledBoxes = ()=>{
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText= "";
    }
};

const showWinner=(winner)=>{
    msg.innerText=`Congratulations,Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
};

const checkWinner=() =>{
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
                showWinner(pos1Val);
                return true;
            }
        }
    }
};

newBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);