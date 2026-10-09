class ship {
  constructor() {
    this.size = Math.floor(Math.random() * (6 - 2) + 2);
    this.damage = 0;
    this.name = ["Destroyer", "Submarine", "Cruiser", "Battleship", "Carrier"];
    this.name = this.name[this.size-2]
    this.damageArr = new Array(5).fill(0)
  }
  hit() {
    this.damage++;
    this.isSunk();
  }
  isSunk() {
    if (this.damage === this.size) {
      return `${this.name[this.size - 2]} sunk`
    }
    return
  }
}

class gameboard {
  max = [10,10];
  min = [0,0];
  receiveAttack(n1,n2){

  }
  placeShip(n1,n2,cShip){
    if(n1!== n2 && n2 >= this.min[1] && n2 <= this.max[1] && n1 >= this.min[0] && n1 <= this.max[0]){
      cShip.damageArr[0] = [n1,n2]
      // add to board
    }
  }
}

class player {
  constructor(){
    this.board = new gameboard()
  }
  turn(n1,n2){
    let cShip = new ship()
    this.board.placeShip(n1,n2,cShip)
  }

}

const board = new gameboard();
const bob = new ship();
const rob = new player()
bob.hit();
bob.hit();

rob.turn(1,2)