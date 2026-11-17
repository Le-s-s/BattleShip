import dom from "./dom.js";
import bShip from "./bShip.js";
const handler = (function () {
  const start = async function () {
    dom.playerChoice();
    let onePlayer = document.querySelector(".one");
    let twoPlayer = document.querySelector(".two");
    onePlayer.addEventListener(
      "click",
      (e) => {
        startGame(false);
      },
      { once: true },
    );
    twoPlayer.addEventListener(
      "click",
      (e) => {
        startGame(true);
      },
      { once: true },
    );
  };
  function startGame(player) {
    dom.createDom();
    let p2;
    let p1 = bShip.startGame(true);
    if (player === true) {
      p2 = bShip.startGame(true);
    } else {
      p2 = bShip.startGame(false);
    }
    turn(p1, p2);
  }

  function cpuTurn(p1, p2) {
    let p2Result;
    let min = p2.board.min;
    let max = p2.board.max;
    let attacked = false;
    let iterate = Array.from(p2.target.entries());

    if (iterate.length === 0) {
      p2Result = cpuAttack(p2, p1);
    } else if (iterate.length > 0) {
      for (let i = iterate.length - 1; i >= 0; i--) {
        if (iterate[i][1] === "hit") {
          let hitX;
          let hitY;
          [hitX, hitY] = iterate[i][0].split(" ").map(Number);
          console.log(`${hitX} ${hitY + 1}`);
          let options = [
            `${hitX} ${hitY + 1}`,
            `${hitX} ${hitY - 1}`,
            `${hitX + 1} ${hitY}`,
            `${hitX - 1} ${hitY}`,
          ];
          for (let opt of options) {
            let xCur;
            let yCur;
            [xCur, yCur] = opt.split(" ").map(Number);
            if (
              yCur >= min[1] &&
              yCur <= max[1] &&
              xCur >= min[0] &&
              xCur <= max[0]
            ) {
              if (!p2.target.has(opt)) {
                attacked = true;
                p2Result = handleAttack(p2, p1, xCur, yCur);
                if (p2Result === "Ship hit") {
                } else if (p2Result?.includes("sunk")) {
                } else if (p2Result === "Game over") {
                  alert("p1 loses");
                  return gameOver(p1, p2);
                } else if (p2Result === "Already fired in this location") {
                  p2Result = undefined;
                  continue;
                } else if (p2Result === "Stay in bounds") {
                  p2Result = undefined;
                  continue;
                }
                break;
              }
              continue;
            } else {
              continue;
            }
          }
          if (p2Result !== undefined) break;
        } else continue;
      }
      if (attacked === false) {
        p2Result = cpuAttack(p2, p1);
      }
    }
    turn(p1, p2);
  }
  function p2Turn(p1, p2) {
    if (p2.target.size === 100) return "Impossible";
    if (p1.target.size === 100) return "Impossible";
    alert("p2 turn");
    dom.populateBoard(p2.board, p1.board);
    let select = document.querySelectorAll(".eCard");
    select.forEach((card) => {
      if (
        !card.classList.toString().includes("eMissed") &&
        !card.classList.toString().includes("eHit")
      ) {
        card.addEventListener(
          "click",
          (e) => {
            let x = card.classList
              .toString()
              .replaceAll(/[^0-9]/g, "")
              .split("")[0];
            let y = card.classList
              .toString()
              .replaceAll(/[^0-9]/g, "")
              .split("")[1];

            let Result = handleAttack(p2, p1, x, y);
            if (Result === "Ship hit") {
              alert(Result);
            } else if (Result?.includes("sunk")) {
              alert(Result);
            } else if (Result === "Game over") {
              alert("p1 loses");

              return gameOver(p1, p2);
            } else if (Result === "Already fired in this location") {
              return p2Turn(p1, p2);
            } else if (Result === "Stay in bounds") {
              return p2Turn(p1, p2);
            }
            turn(p1, p2);
          },
          { once: true },
        );
      }
    });
  }
  function turn(p1, p2) {
    if (p2.target.size === 100) return "Impossible";
    if (p1.target.size === 100) return "Impossible";
    alert("p1 turn");
    dom.populateBoard(p1.board, p2.board);
    let select = document.querySelectorAll(".eCard");
    select.forEach((card) => {
      if (
        !card.classList.toString().includes("eMissed") &&
        !card.classList.toString().includes("eHit")
      ) {
        card.addEventListener(
          "click",
          (e) => {
            let x = card.classList
              .toString()
              .replaceAll(/[^0-9]/g, "")
              .split("")[0];
            let y = card.classList
              .toString()
              .replaceAll(/[^0-9]/g, "")
              .split("")[1];

            let Result = handleAttack(p1, p2, x, y);
            if (Result === "Ship hit") {
              alert(Result);
            } else if (Result?.includes("sunk")) {
              alert(Result);
            } else if (Result === "Game over") {
              alert("p2 loses");
              return gameOver(p1, p2);
            } else if (Result === "Already fired in this location") {
              return turn(p1, p2);
            } else if (Result === "Stay in bounds") {
              return turn(p1, p2);
            }
            if (p2.player === false) {
              cpuTurn(p1, p2);
            } else p2Turn(p1, p2);
          },
          { once: true },
        );
      }
    });
  }
  function handleAttack(a, d, x, y) {
    let Result;

    Result = d.board.receiveAttack(x, y);
    if (Result === "Ship hit") {
      a.target.set(`${x} ${y}`, "hit");
    } else if (Result === "Ship missed") {
      a.target.set(`${x} ${y}`, "missed");
    } else if (Result?.includes("sunk")) {
      a.target.set(`${x} ${y}`, "hit");
    }
    return Result;
  }

  function cpuAttack(a, d) {
    if (a.target.size >= 100) return;
    let w, h;

    while (true) {
      w = Math.floor(Math.random() * 10);
      h = Math.floor(Math.random() * 10);

      if (!a.target.has(`${w} ${h}`)) {
        let Result = handleAttack(a, d, w, h);
        if (Result === "Already fired in this location") {
          continue;
        }
        if (Result === "Stay in bounds") {
          continue;
        }
        console.log(Result);
        return Result;
      }
    }
  }
  function gameOver(p1, p2) {
    let body = document.querySelector("body");
    body.innerHTML = "";
    p2 = null;
    p1 = null;
    start()
  }

  return { start };
})();

export default handler;
