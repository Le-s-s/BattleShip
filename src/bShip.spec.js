import { gameboard } from "./bShip.js";

test("ship placed", () => {
  let testPlace = new gameboard();
  expect(testPlace.placeShip(10, 10,2)).toBe("Ship placed");
});

test("Out of bounds", () => {
  let testPlace = new gameboard();
  expect(testPlace.placeShip(11, -4,2)).toBe("Out of bounds");
});

test("receive attack", () => {
  let testPlace = new gameboard();
  testPlace.placeShip(1,1,2)
  expect(testPlace.receiveAttack(1,1)).toBe("Ship hit");
});

test("miss attack", () => {
  let testPlace = new gameboard();
  testPlace.placeShip(1,1,2)
  expect(testPlace.receiveAttack(2,2)).toBe("Ship missed");
});

test("already hit this ship location", () => {
  let testPlace = new gameboard();
  testPlace.placeShip(1,1,2)
  testPlace.receiveAttack(1,1)
  expect(testPlace.receiveAttack(1,1)).toBe("Already fired in this location");
});

test("Battleship sunk", () => {
  let testPlace = new gameboard();
  testPlace.placeShip(1,1,3)
  testPlace.receiveAttack(3,1)
  testPlace.receiveAttack(2,1)
  expect(testPlace.receiveAttack(1,1)).toBe("Battleship sunk");
});