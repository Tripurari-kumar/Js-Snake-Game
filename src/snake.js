import { getInputDirection } from "./input.js";

export const SNAKE_SPEED = 5;
const snakeBody = [{ x: 11, y: 11 }];
let newSegments = 0;
// approach move the children elemenets
// just to where its successor
// was head->next will move to head's earlier postion
export function update() {
  const inputDirection = getInputDirection();

  // loop over till second last element as last one will dissappear
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    // for avaoiding reference problems
    snakeBody[i + 1] = { ...snakeBody[i] };
  }

  //now updating the x in the direction its moving
  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}

export function draw(gameBoard) {
  addSegmenst();
  snakeBody.forEach((segment) => {
    const snakeElement = document.createElement("div");
    // assigning snake to grid
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add("snake");
    gameBoard.appendChild(snakeElement);
  });
}

export function expandSnake(amount) {
  newSegments += amount;
}

export function onSnake(position, ingoreHead = false) {
  return snakeBody.some((segments, index) => {
    if (ingoreHead === true && index === 0) {
      return false;
    }
    return equalPositions(segments, position);
  });
}

function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegmenst() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }
  newSegments = 0;
}

export function getSnakeHead() {
  return snakeBody[0];
}

export function getSnakeIntersection() {
  //second Param ingoreHead
  return onSnake(snakeBody[0], true);
}
