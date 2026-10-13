class ship {
  constructor(n1, n2, s) {
    this.size = s;
    this.damage = 0;
    this.name = ["Destroyer", "Submarine", "Cruiser", "Battleship", "Carrier"];
    this.name = this.name[this.size - 2];
  }
  hit() {
    this.damage++;
  }
  isSunk() {
    if (this.damage === this.size) {
      return `You sunk a battleship`;
    }
    return "Ship hit";
  }
}

class gameboard {
  max = [10, 10];
  min = [0, 0];
  constructor() {
    this.board = new Map();
  }

  receiveAttack(n1, n2) {
    if (this.board.get(`${n1} ${n2}`) === "fired") {
      return "Already fired in this location";
    }
    if (
      n2 >= this.min[1] &&
      n2 <= this.max[1] &&
      n1 >= this.min[0] &&
      n1 <= this.max[0]
    ) {
      if (this.board.has(`${n1} ${n2}`)) {
        let ship = this.board.get(`${n1} ${n2}`);

        ship.hit();
        this.board.set(`${n1} ${n2}`, "fired");
        return ship.isSunk();
      } else return "Ship missed";
    }
    // check each ship in board if match, then damage if match
  }
  placeShip(n1, n2, s) {
    if (
      n2 >= this.min[1] &&
      n2 <= this.max[1] &&
      n1 >= this.min[0] &&
      n1 <= this.max[0]
    ) {
      let vertical = true;
      let cShip = new ship(n1, n2, s);
      if (vertical === true) {
        for (let i = 0; i < cShip.size; i++) {
          this.board.set(`${n1} ${n2 - i}`, cShip);
        }
      } else {
        for (let i = 0; i < cShip.size; i++) {
          this.board.set(`${n1 - i} ${n2}`, cShip);
        }
      }
      // use bfs logic to ensure the ship will fit
      //cShip.damageArr[0] = [n1, n2];
      // add to board
      return "Ship placed";
    } else return "Out of bounds";
  }
}

class player {
  constructor() {
    this.board = new gameboard();
  }
}
export { ship, gameboard, player };
