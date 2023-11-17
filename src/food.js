import { randomFoodPosition } from "./grid.js";
import { expandSnake, onSnake } from "./snake.js";

let food = {
  x: 10,
  y: 15
};
const expansionRate = 1;

export function update() {
  console.log("food");
  if (onSnake(food)) {
    expandSnake(expansionRate);
    food = getRandomFoodPosition();
  }
}

export function draw(gameBoard) {
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  gameBoard.appendChild(foodElement);
}

function getRandomFoodPosition() {
  let newFoodPosition;

  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomFoodPosition();
  }

  return newFoodPosition;
}
