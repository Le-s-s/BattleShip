import dom from "./dom.js";
import bShip from "./bShip.js";
const handler = (function () {
  const start = async function () {
    console.log(confirm);
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
  function p2Turn(p1, p2) {
    alert("p2 turn");
    if (p2.target.size === 100) return "Impossible";
    if (p1.target.size === 100) return "Impossible";
    let select = document.querySelectorAll(".eCard");

    let p2Result;

    dom.populateBoard(p2.board, p1.board);
    select = document.querySelectorAll(".eCard");
    select.forEach((card) => {
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
          p2Result = handleAttack(p2, p1, x, y);
          if (p2Result === "Ship hit") {
          } else if (p2Result?.includes("sunk")) {
          } else if (p2Result === "Game over") {
            return `p1 loses`;
          } else if (p2Result === "Already fired in this location") {
            p2Turn(p1, p2);
          } else if (p2Result === "Stay in bounds") {
            p2Turn(p1, p2);
          }
          turn(p1, p2);
        },
        { once: true },
      );
    });
  }
  function cpuTurn(p1, p2) {
    let p2Result;
    let min = p2.board.min;
    let max = p2.board.max;
    let attacked = false;
    let vert = false;
    let iterate = Array.from(p2.target.entries());

    if (iterate.length === 0) {
      p2Result = handleAttack(p2, p1);
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
                if (yCur > hitY || yCur < hitY) vert = true;
                attacked = true;
                p2Result = handleAttack(p2, p1, xCur, yCur, true);
                if (p2Result === "Ship hit") {
                } else if (p2Result?.includes("sunk")) {
                } else if (p2Result === "Game over") {
                  alert("p1 loses");
                  return `p1 loses`;
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
        p2Result = handleAttack(p2, p1);
      }
    }
    turn(p1, p2);
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
              return `p2 loses`;
            } else if (Result === "Already fired in this location") {
              turn(p1, p2);
            } else if (Result === "Stay in bounds") {
              turn(p1, p2);
            }
            if (p2.player === true) {
              p2Turn(p1, p2);
            }
            if (p2.player !== true) {
              cpuTurn(p1, p2);
            }
          },
          { once: true },
        );
      }
    });
  }
  function handleAttack(a, d, x = -1, y = -1, b = false) {
    let Result;
    if (a.player === false && b === false && x < 0) {
      let w, h;

      while (true) {
        w = Math.floor(Math.random() * 10);
        h = Math.floor(Math.random() * 10);

        if (!a.target.has(`${w} ${h}`)) {
          Result = handleAttack(a, d, w, h, true);
          console.log(`${w} ${h}: ${Result}`);
          if (Result?.includes("sunk")) {
            a.target.set(`${x} ${y}`, "hit");
            //a.target.clear();
          } else if (Result === "Ship hit") {
            a.target.set(`${x} ${y}`, "hit");
          }
          if (Result === "Already fired in this location") {
            continue;
          }

          return Result;
        }
      }
    } else {
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
  }
  // function p2Attack(a, d, w = 0, h = 0) {
  //   if (a.player === true) {
  //     let Result = d.board.receiveAttack(w, h);
  //     if (Result === "Ship hit") {
  //       a.target.set(`${w} ${h}`, "hit");
  //     } else if (Result === "Ship missed") {
  //       a.target.set(`${w} ${h}`, "missed");
  //     } else if (Result === "Already fired in this location") {
  //       return Result;
  //     } else if (Result.includes("sunk")) {
  //       alert("Sunk");
  //     }
  //     return Result;
  //   } else {
  //     let x, y;

  //     while (true) {
  //       x = Math.floor(Math.random() * 10);
  //       y = Math.floor(Math.random() * 10);

  //       if (!a.target.has(`${x} ${y}`)) {
  //         let result = handleAttack(a, d, x, y);
  //         console.log(`${x} ${y}: ${result}`);

  //         if (result === "Already fired in this location") {
  //           continue;
  //         }

  //         return result;
  //       }
  //     }
  //   }
  // }

  return { start };
})();

export default handler;
