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
    if (p2.target.size === 100) return "Impossible";
    if (p1.target.size === 100) return "Impossible";
    console.log("p1 turn");
    dom.populateBoard(p1.board, p2.board);
    const button = document.querySelector(".fireButton");
    let select = document.querySelectorAll(".eCard");
    select.forEach((card) => {
      if (!card.classList.toString().includes("eFired")) {
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
              p1.board.hits.set(`${x} ${y}`, "hit");
            }
            if (Result?.includes("sunk")) {
              alert(Result);
              p1.board.hits.set(`${x} ${y}`, "hit");
            }
            if (Result === "Game over") {
              return `p2 loses`;
            }
            dom.populateBoard(p1.board, p2.board);
            let p2Result;
            if (p2.player === true) {
              alert("Switch players");
              console.log("p2 turn");
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
                      alert("Switch players");
                      turn(p1, p2);
                    }
                    if (p2Result === "Ship missed") {
                      alert("Switch players");
                      turn(p1, p2);
                    }
                    if (p2Result === "Game over") {
                      return `p1 loses`;
                    }
                  },
                  { once: true },
                );
              });
            }
            if (p2.player !== true) {
              let min = p2.board.min;
              let max = p2.board.max;
              let attacked = false;
              let vert = false;
              console.log("p2 turn");
              console.log(p2.target.entries());
              let iterate = Array.from(p2.target.entries());

              if (iterate.length === 0) {
                console.log(p2.target.entries());
                p2Result = cpuAttack(p2, p1);
              } else if (iterate.length > 0) {
                let count = 0;
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
                          x = xCur;
                          y = yCur;
                          p2Result = handleAttack(p2, p1, xCur, yCur);
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
              if (p2Result === "Ship hit") {
                turn(p1, p2);
              }
              if (p2Result?.includes("sunk")) {
                let removeShip = Array.from(p2.target.entries());

                // for (let targets of removeShip) {
                //   if (targets[1] === "hit") {
                //     p2.target.delete(targets[0]);
                //   }

                // }
                p2.target.clear();
                //   turn(p1, p2);
                turn(p1, p2);
              }
              if (p2Result === "Ship missed") {
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
    });
  }
  function handleAttack(a, d, x, y) {
    let Result = d.board.receiveAttack(x, y);
    if (Result === "Ship hit") {
      a.target.set(`${x} ${y}`, "hit");
    }
    if (Result === "Ship missed") {
      a.target.set(`${x} ${y}`, "missed");
    }
    return Result;
  }
  function cpuAttack(a, d) {
    let x, y;

    while (true) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);

      if (!a.target.has(`${x} ${y}`)) {
        let result = handleAttack(a, d, x, y);
        console.log(`${x} ${y}: ${result}`);

        if (result === "Already fired in this location") {
          continue;
        }

        return result;
      }
    }
  }

  return { start };
})();

export default handler;

