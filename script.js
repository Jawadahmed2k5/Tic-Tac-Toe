let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetbutton");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true;
const winPatterns = [
  [0,1,2], [0,3,6], [0,4,8], [1,4,7], [2,5,8],
  [2,4,6], [3,4,5], [6,7,8]
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.style.color = "#ffea00"; 
    } else {
      box.innerText = "X";
      box.style.color = "#ff004f";
    }
    turnO = !turnO;
    box.disabled = true;
    checkWinner();
  });
});

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    let posVal1 = boxes[a].innerText;
    let posVal2 = boxes[b].innerText;
    let posVal3 = boxes[c].innerText;

    if (posVal1 !== "" && posVal1 === posVal2 && posVal2 === posVal3) {
      showWinner(posVal1, pattern);
      return;
    }
  }
};

const showWinner = (winner, pattern) => { 
  msg.innerText = `🎉 Congratulations! ${winner} Wins!`;
  msgContainer.classList.remove("hide");

  // Highlight winning boxes
  pattern.forEach(index => {
    boxes[index].style.boxShadow = "0 0 20px #00ffea"; 
    boxes[index].style.background = "#222"; 
  });

  disableBoxes();
};

const disableBoxes = () => {
  boxes.forEach(box => box.disabled = true);
};

const enableBoxes = () => {
  boxes.forEach(box => {
    box.disabled = false;
    box.innerText = "";
    box.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.3)"; 
    box.style.background = "#111"; 
  });
};

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
