import { gameboard, ship } from "./bShip.js";

test("ship placed", () => {
  let testPlace = new gameboard();
  expect(testPlace.placeShip(9, 9, 2, true)).toBe("Ship placed");
});

test("Out of bounds", () => {
  let testPlace = new gameboard();
  expect(testPlace.placeShip(11, -4, 2, true)).toBe("Out of bounds");
});

test("receive attack", () => {
  let testPlace = new gameboard();
  testPlace.placeShip(1, 1, 2, true);
  expect(testPlace.receiveAttack(1, 1)).toBe("Ship hit");
});

test("miss attack", () => {
  let testPlace = new gameboard();
  testPlace.placeShip(1, 1, 2, true);
  expect(testPlace.receiveAttack(2, 2)).toBe("Ship missed");
});

test("already hit this ship location", () => {
  let testPlace = new gameboard();
  testPlace.placeShip(1, 1, 2, true);
  testPlace.receiveAttack(1, 1);
  expect(testPlace.receiveAttack(1, 1)).toBe("Already fired in this location");
});

test("Battleship sunk", () => {
  let testPlace = new gameboard();
  testPlace.placeShip(9, 9, 3, true);
  testPlace.receiveAttack(9, 9);
  testPlace.receiveAttack(9, 8);
  expect(testPlace.receiveAttack(9, 7)).toBe("Submarine sunk");
});
test("Ship placed already", () => {
  let testPlace = new gameboard();
  testPlace.placeShip(9, 9, 3, true);
  expect(testPlace.placeShip(9, 9, 3)).toBe("Ship already placed here");
});

test("Conflic", () => {
  let testPlace = new gameboard();
  testPlace.placeShip(9, 9, 3, true);
  testPlace.placeShip(0, 0, 3, true);
  testPlace.placeShip(8, 7, 3, false);
  testPlace.placeShip(9, 9, 3, true);
  testPlace.displayBoard();

  expect(testPlace.placeShip(8, 9, 3, true)).toBe("No possible moves");
});

