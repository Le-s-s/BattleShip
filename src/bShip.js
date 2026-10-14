class ship {
  constructor(n1, n2, s) {
    this.size = s;
    this.damage = 0;
    this.name = ["Destroyer", "Submarine", "Cruiser", "Battleship", "Carrier"];
    if (s > this.name.length || s < 2)
      throw new Error(`Please enter a number between 2 and ${this.name.length}`);
    this.name = this.name[this.size - 2];
    this.sunk = false;
  }
  hit() {
    this.damage++;
  }
  isSunk() {
    if (this.damage >= this.size) {
      this.sunk = true;
      return `${this.name} sunk`;
    }
    return "Ship hit";
  }
}

class gameboard {
  max = [9, 9];
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
      } else {
        this.board.set(`${n1} ${n2}`, "fired");
        return "Ship missed";
      }
    } else return "Stay in bounds";
    // check each ship in board if match, then damage if match
  }
  displayBoard() {
    return this.board;
  }
  placeShip(n1, n2, s, vertical = true) {
    if (this.board.has(`${n1} ${n2}`)) {
      return "Ship already placed here";
    }
    if (
      n2 >= this.min[1] &&
      n2 <= this.max[1] &&
      n1 >= this.min[0] &&
      n1 <= this.max[0]
    ) {
      let cShip = new ship(n1, n2, s);
      let i = 0;
      let pos = [];
      let neg = true;
      while (i < s) {
        if (vertical === true) {
          if (neg === true) {
            if (n2 - s + 1 >= this.min[1]) {
              if (!this.board.has(`${n1} ${n2 - i}`)) {
                pos.push(`${n1} ${n2 - i}`);
                i++;
              } else if (this.board.has(`${n1} ${n2 - i}`)) {
                i = 0;
                pos = [];
                neg = false;
              }
            } else {
              i = 0;
              neg = false;
            }
          } else if (neg === false) {
            if (n2 + s - 1 <= this.max[1]) {
              if (!this.board.has(`${n1} ${n2 + i}`)) {
                pos.push(`${n1} ${n2 + i}`);
                i++;
              } else if (this.board.has(`${n1} ${n2 + i}`)) {
                pos = [];
                break;
              }
            } else {
              pos = [];
              break;
            }
          }
        } else if (vertical === false) {
          if (neg === true) {
            if (n1 - s + 1 >= this.min[0]) {
              if (!this.board.has(`${n1 - i} ${n2}`)) {
                pos.push(`${n1 - i} ${n2}`);
                i++;
              } else if (this.board.has(`${n1 - i} ${n2}`)) {
                i = 0;
                pos = [];
                neg = false;
              }
            } else {
              i = 0;
              neg = false;
            }
          } else if (neg === false) {
            if (n1 + s - 1 <= this.max[0]) {
              if (!this.board.has(`${n1 + i} ${n2}`)) {
                pos.push(`${n1 + i} ${n2}`);
                i++;
              } else if (this.board.has(`${n1 + i} ${n2}`)) {
                pos = [];
                break;
              }
            } else {
              pos = [];
              break;
            }
          }
        }
      }
      if (pos.length === 0) return "No possible moves";
      for (let i = 0; i < pos.length; i++) {
        this.board.set(pos[i], cShip);
      }
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

//old

// if (vertical === true) {
// }
// if (
//   n2 >= this.min[1] &&
//   n2 <= this.max[1] &&
//   n1 >= this.min[0] &&
//   n1 <= this.max[0]
// ) {
//   let cShip = new ship(n1, n2, s);
//   if (vertical === true) {
//     const v = [`${n1} ${n2 - i}`, `${n1} ${n2 + i}`];
//     if (n2 - s >= this.min[1] || n2 + s <= this.max[1]) {
//       v.forEach((element) => {
//         const pos = [];
//         for (let i = 0; i < s; i++) {
//           if (this.board().has(element)) {
//             continue;
//           }
//           pos.push(element);
//           if (i === s) {
//             for (let j = 0; j < pos.length; j++) {
//               this.board.set(pos[j], cShip);
//             }
//           }
//         }
//       });
//     }
//   } else {
//     if (n1 - s >= this.min[0] || n1 + s <= this.max[0]) {
//       for (let i = 0; i < s; i++) {
//         const h = [`${n1 - i} ${n2}`, `${n1 + i} ${n2}`];
//         for (const element of h) {
//           const pos = [];
//           if (this.board().has(element)) {
//             continue;
//           }
//           pos.push(element);
//           if (i === s) {
//             for (let j = 0; j < pos.length; j++) {
//               this.board.set(pos[j], cShip);
//             }
//           }
//         }
//       }
//     }
//   }
//   // use bfs logic to ensure the ship will fit
//   //cShip.damageArr[0] = [n1, n2];
//   // add to board
//   return "Ship placed";
// }

let testPlace = new gameboard();
testPlace.placeShip(9, 9, 3, true);
testPlace.placeShip(0, 0, 3, true);
testPlace.placeShip(8, 7, 3, false);
testPlace.placeShip(9, 9, 3, true);
console.log(testPlace.displayBoard());
