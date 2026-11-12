import "./style.css";
const dom = (function () {
  const playerChoice = function () {
    const body = document.querySelector("body");
    body.innerHTML = "";
    const container = document.createElement("div");
    const playerContainer = document.createElement("div");
    const instruct = document.createElement("h1");
    instruct.textContent = "How man players?";
    const onePlayer = document.createElement("button");
    onePlayer.textContent = "One";
    onePlayer.classList.add("one");
    const twoPlayer = document.createElement("button");
    twoPlayer.textContent = "Two";
    twoPlayer.classList.add("two");
    container.classList.add("container");
    container.appendChild(instruct);
    playerContainer.appendChild(onePlayer);
    playerContainer.appendChild(twoPlayer);
    container.appendChild(playerContainer);
    body.appendChild(container);
  };

  const createDom = function () {
    const body = document.querySelector("body");
    body.innerHTML = "";
    const container = document.createElement("div");
    container.classList.add("container");

    const ui = document.createElement("div");
    ui.classList.add("ui");

    const board = document.createElement("div");
    board.classList.add("wholeBoard");
    const boardShotsSection = document.createElement("div");
    boardShotsSection.classList.add("boardShot");
    const boardSection = document.createElement("div");
    boardSection.classList.add("board");
    const pickShip = document.createElement("div");
    pickShip.classList.add("pickShip");

    body.appendChild(container);
    container.appendChild(ui);
    board.appendChild(boardShotsSection);
    board.appendChild(boardSection);
    container.appendChild(board);
    container.appendChild(pickShip);
  };
  const populateBoard = function (board, eBoard) {
    let boardSection = document.querySelector(".board");
    let boardShot = document.querySelector(".boardShot");
    boardSection.innerHTML = "";
    boardShot.innerHTML = "";
    let x = 0;
    let y = 0;

    while (true) {
      let title = `${y}${x}`;
      const card = document.createElement("div");
      const test = document.createElement("b");
      test.textContent = title;
      card.appendChild(test);
      card.classList.add("card");
      card.classList.add(title);

      boardSection.appendChild(card);
      if (x === 9 && y === 9) {
        break;
      } else if (x !== 9 && y === 9) {
        x++;
        y = 0;
      } else y++;
    }
    board.board.forEach((item, key) => {
      let rep = document.querySelector(`[class~="${key.replaceAll(" ", "")}"]`);
      if (item.shipNum) rep.classList.add(`ship-${item.shipNum}`);

      let test;
      if (item === "missed") {
        rep.classList.add(`missed`);
        test = document.createElement("b");
        test.textContent = `missed`;
        rep.appendChild(test);
      }
      if (item === "hit") {
        rep.classList.add(`hit`);
        test = document.createElement("b");
        test.textContent = `hit`;
        rep.appendChild(test);
      }
      test = document.createElement("b");
      rep.appendChild(test);
      console.log(item, key);
    });
    x = 0;
    y = 0;
    while (true) {
      let title = `s${y}${x}`;
      const eCard = document.createElement("div");
      const test = document.createElement("b");
      test.textContent = title;
      eCard.appendChild(test);
      eCard.classList.add("eCard");
      eCard.classList.add(title);

      boardShot.appendChild(eCard);
      if (x === 9 && y === 9) {
        break;
      } else if (x !== 9 && y === 9) {
        x++;
        y = 0;
      } else y++;
    }
    eBoard.board.forEach((item, key) => {
      let rep = document.querySelector(
        `[class~="s${key.replaceAll(" ", "")}"]`,
      );
      console.log(item);
      if (item === "hit") {
        rep.classList.add(`eHit`);
        const test = document.createElement("b");
        test.textContent = `hit`;
        rep.appendChild(test);
      }
      if (item === "missed") {
        rep.classList.add(`eMissed`);
        const test = document.createElement("b");
        test.textContent = `missed`;
        rep.appendChild(test);
      }
    });
  };
  const takeDamage = function (x, y) {
    let title = `${x}${y}`;
    let rep = document.querySelector(`[class~="${title}"]`);
    rep.classList.add("missed");
  };
  return { createDom, populateBoard, takeDamage, playerChoice };
})();

export default dom;
