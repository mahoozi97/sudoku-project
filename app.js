import Sudoku from "./sudoku-class.js";

let selectedNumber;
let message;
let mistakesCount = 0;

const cells = document.querySelectorAll(".js-cell");
const buttons = document.querySelectorAll(".button-container button");
const messageEl = document.querySelector(".message");
const mistakesEl = document.querySelector(".mistakes");
const restartBtn = document.querySelector(".restart");

function mistakesText() {
  mistakesEl.textContent = `🔴 ${mistakesCount} / 4`;
}
mistakesText();

function showWinMessage() {
  if (message !== undefined) {
    messageEl.textContent = message;
    messageEl.style.color = "green";
    restartBtn.classList.remove("hidden");
    disableButtons();
  }
}

function showLoseMessage() {
  if (mistakesCount === 4) {
    disableButtons();
    messageEl.textContent = "You Lose!";
    messageEl.style.color = "red";

    restartBtn.classList.remove("hidden");
  }
}

function disableButtons() {
  cells.forEach((cell) => {
    cell.classList.add("disabled");
  });

  buttons.forEach((btn) => {
    btn.classList.add("disabled");
  });
}

buttons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    let eventId = event.target.id;

    buttons.forEach((b) => {
      b.classList.remove("button-shadow");
    });

    message;

    selectedNumber;

    messageEl.textContent = "";
    messageEl.style.color = "";

    selectedNumber = Number(eventId.slice(0, 1));

    btn.classList.add("button-shadow");
  });
});

cells.forEach((cell) => {
  cell.addEventListener("click", (event) => {
    let eventId = event.target.id;
    let alert;

    cell.textContent = selectedNumber;

    if (selectedNumber !== undefined) {
      let sudoku = new Sudoku(eventId, selectedNumber);
      alert = sudoku.checkTheValue();
      message = sudoku.handleWin();
    } else {
      messageEl.textContent = "Select a number first";
      messageEl.style.color = "red";
    }

    if (alert === "Correct") {
      cell.style.color = "green";
      cell.classList.add("disabled");
    } else if (alert === "Wrong") {
      mistakesCount += 1;
      mistakesText();
      showLoseMessage();
      cell.style.color = "red";
    }

    showWinMessage();
  });
});

restartBtn.addEventListener("click", () => {
  window.location.reload();
});
