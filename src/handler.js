import dom from "./dom.js";
import bShip from "./bShip.js";
const handler = (function () {
  const start = function () {
    console.log(confirm);
    dom.createDom();
    let player = prompt("p2 cpu or player");
    let p2;
    let p1 = bShip.startGame(true);
    if (player === "player") {
      p2 = bShip.startGame(true);
    } else {
      p2 = bShip.startGame(false);
    }
    turn(p1, p2);
  };
  function turn(p1, p2) {
    console.log("p1 turn");
    dom.populateBoard(p1.board,p2.board);

    const button = document.querySelector(".fireButton");
    button.addEventListener(
      "click",
      (e) => {
        let x = document.querySelector(".x").value;
        let y = document.querySelector(".y").value;

        let Result = handleAttack(p1, p2, x, y);
        if (Result === "Ship hit") {
          p1.board.hits.set(`${x} ${y}`, "hit");
        }
        if (Result === "Game over") {
          return `p2 loses`;
        }
        let p2Result;
        if (p2.player === true) {
          alert("Switch players");
          console.log("p2 turn");
          dom.populateBoard(p2.board,p1.board);
          button.addEventListener(
            "click",
            (e) => {
              x = document.querySelector(".x").value;
              y = document.querySelector(".y").value;
              p2Result = handleAttack(p2, p1, x, y);
              if (p2Result === "Ship missed" || Result === "Ship hit") {
                alert("Switch players");
                turn(p1, p2);
              }
              if (p2Result === "Game over") {
                return `p1 loses`;
              }
            },
            { once: true },
          );
        }
        if (p2.player !== true) {
          console.log("p2 turn");
          x = Math.floor(Math.random() * 9);
          y = Math.floor(Math.random() * 9);
          p2Result = handleAttack(p2, p1, x, y);
          if (p2Result === "Ship missed" || Result === "Ship hit") {
            alert("Switch players");
            turn(p1, p2);
          }
          if (p2Result === "Game over") {
            return `p1 loses`;
          }
        }
      },
      { once: true },
    );
  }
  function handleAttack(a, d, x, y) {
    let Result = d.board.receiveAttack(x, y);
    return Result;
  }

  return { start };
})();

export default handler;
