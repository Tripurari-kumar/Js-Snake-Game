import { SNAKE_SPEED, getSnakeHead, getSnakeIntersection } from "./snake.js";
import { update as updateSnake, draw as drawSnake } from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { outsideGrid } from "./grid.js";

// setup a game loop which will repeat itself over and over on very set interval
let lastRenderTime = 0;
const gameBoard = document.getElementById("game-board");
let gameOver = false;

function main(currentTime) {
  if (gameOver) {
    if (confirm("you lost! want to restart?")) {
      window.location = "/";
    }
    return;
  }

  window.requestAnimationFrame(main);
  const secondsSinceLasterRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLasterRender < 1 / SNAKE_SPEED) return;
  console.log("render");
  lastRenderTime = currentTime;

  update();

  draw();
}

window.requestAnimationFrame(main);

function update() {
  updateSnake();
  updateFood();
  checkDeath();
}

function draw() {
  //removing previous pecies of snake as snake moves
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || getSnakeIntersection();
}
