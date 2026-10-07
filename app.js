let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "pink", "green", "blue"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

let largest = 0;
let h3 = document.createElement("h3");
h3.innerText = `Your score is ${largest}`;
document.body.append(h3);

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game started");
    started = true;
  }
  levelUp();
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 200);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 200);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let ranIdx = Math.floor(Math.random() * btns.length);
  let randColor = btns[ranIdx];
  let randBtn = document.querySelector(`.${randColor}`);

  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `game is Over! your score was <b>${level}</b> <br> start again`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 450);
    highestScore();
    h3.innerText = `highest score is ${largest}`;
    restart();
  }
}

function btnPress() {
  console.log(this);
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtn = document.querySelectorAll(".btn");
for (btn of allBtn) {
  btn.addEventListener("click", btnPress);
}

function restart() {
  started = false;
  userSeq = [];
  gameSeq = [];
  level = 0;
}

function highestScore() {
  if (level > largest) {
    largest = level;
  }
}
