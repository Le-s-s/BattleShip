class ship {
  constructor() {
    this.size = Math.floor(Math.random() * (6 - 2) + 2);
    this.damage = 0;
    this.name = ["Destroyer", "Submarine", "Cruiser", "Battleship", "Carrier"];
  }
  hit() {
    this.damage++;
    isSunk();
  }
  isSunk() {
    if (this.damage === this.size) {
      return console.log(`${this.name[this.size - 2]} sunk`);
    }
    return
  }
}

class gameboard {
  max = [10, 10];
  min = [0, 0];
  constructor() {}
}

const board = new gameboard();
const bob = new ship();
bob.hit();
bob.hit();

console.log(bob);
