import Sudoku from "./sudoku-class.js";

let selectedNumber;
let message;
let mistakesCount = 0;

let time = {
  seconds: 0,
  minutes: 0,
  hours: 0,
};
let timeMessage;
let scoreLog = JSON.parse(localStorage.getItem("score")) || [];
let timeup;
let fetchedLog = false;

const cells = document.querySelectorAll(".js-cell");
const buttons = document.querySelectorAll(".button-container button");
const messageEl = document.querySelector(".message");
const mistakesEl = document.querySelector(".mistakes");
const restartBtn = document.querySelector(".restart");
const timeEl = document.querySelector(".time");
const scoreListEl = document.querySelector(".score-list");
const highScoreBtn = document.querySelector(".high-score-btn");

function init() {
  timeEl.textContent = "00:00:00";
  timeup = setInterval(timeCountUp, 1000);
  mistakesText();
}
init();

function timeCountUp() {
  let seconds;
  let minutes;
  let hours;

  time.seconds++;

  if (time.seconds === 60) {
    time.minutes++;
    time.seconds = 0;
  }

  if (time.minutes === 60) {
    time.hours++;
    time.minutes = 0;
  }

  if (time.seconds <= 9) {
    seconds = `0${time.seconds}`;
  } else {
    seconds = `${time.seconds}`;
  }

  if (time.minutes <= 9) {
    minutes = `0${time.minutes}`;
  } else {
    minutes = `${time.minutes}`;
  }

  if (time.hours <= 9) {
    hours = `0${time.hours}`;
  } else {
    hours = `${time.hours}`;
  }

  timeMessage = `${hours}:${minutes}:${seconds}`;
  timeEl.textContent = timeMessage;
}

function saveScoreList(timeMessage) {
  scoreLog.push(timeMessage);
  localStorage.setItem("score", JSON.stringify(scoreLog));
}

function fetchScoreList() {

  if (scoreLog.length !== 0) {
    scoreListEl.textContent = "";
    scoreLog.forEach((log) => {
      let list = document.createElement("p");
      list.textContent = log;
      let hrElement = document.createElement("hr")
      hrElement.style.marginLeft = "10px"
      scoreListEl.appendChild(list);
      scoreListEl.appendChild(hrElement)
    });
  } else {
    scoreListEl.textContent = "Empty";
    scoreListEl.style.fontSize = "14px";
    scoreListEl.style.padding = "10px";
  }
}

function mistakesText() {
  mistakesEl.textContent = `🔴 ${mistakesCount} / 4`;
}

function showWinMessage() {
  if (message === "You Win!") {
    messageEl.textContent = message;
    messageEl.style.color = "green";
    restartBtn.classList.remove("hidden");
    clearInterval(timeup);
    saveScoreList(timeMessage);
    disableButtons();
  }
}

function showLoseMessage() {
  if (mistakesCount === 4) {
    disableButtons();
    clearInterval(timeup);
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

highScoreBtn.addEventListener("click", () => {
  fetchScoreList();

  const isHidden = getComputedStyle(scoreListEl).display === "none";

  scoreListEl.style.display = isHidden ? "block" : "none";
});

restartBtn.addEventListener("click", () => {
  window.location.reload();
});
