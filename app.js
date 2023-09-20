const gameboard = document.querySelector('.game__board'),
  messageTurn = document.querySelector('.game__turn'),
  endGame = document.querySelector('.endgame'),
  endGameResult = document.querySelector('.endgame__result'),
  buttonReset = document.querySelector('.endgame__button'),
  maxTurn = 9;

let isTurnX = true,
  turn = 0,
  players = {
    x: 'cross',
    o: 'circle',
  };

const winnigPosition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

startGame();

function startGame() {
  createBoard();
  messageTurn.textContent = isTurnX ? 'X' : 'O';
  isTurnX = true;
  turn = 0;

  endGame.classList.remove('show');
}

function createBoard() {
  const cells = 9;

  while (gameboard.firstElementChild) {
    gameboard.firstElementChild.remove();
  }

  for (let i = 0; i < cells; i++) {
    const div = document.createElement('div');
    div.classList.add('cell');
    div.addEventListener('click', handleGame, { once: true });

    gameboard.append(div);
  }
}

function handleGame(e) {
  const currentCell = e.currentTarget;
  const currentTurn = isTurnX ? players.x : players.o;

  turn++;
  drawShape(currentCell, currentTurn);

  if (checkWinner(currentTurn)) {
    return;
  }

  if (turn === maxTurn) {
    showEndGame(false);
  }

  changeTurn();
}

function drawShape(element, newClass) {
  element.classList.add(newClass);
}

function changeTurn() {
  isTurnX = !isTurnX;
  messageTurn.textContent = isTurnX ? 'X' : 'O';
}

function checkWinner(currentPlayer) {
  const cells = document.querySelectorAll('.cell');

  const winner = winnigPosition.some((array) => {
    return array.every((position) => {
      return cells[position].classList.contains(currentPlayer);
    });
  });

  if (!winner) {
    return;
  }

  showEndGame(true);
  return true;
}

function showEndGame(winner) {
  endGame.classList.add('show');

  if (winner) {
    endGameResult.textContent = `¡${isTurnX ? 'X' : 'O'} ha ganado el juego!`;
  } else {
    endGameResult.textContent = `¡El juego se ha empatado!`;
  }
}

buttonReset.addEventListener('click', startGame);
