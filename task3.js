let currentPlayer = 1;
let cells = document.querySelectorAll('.cell');
let modal = document.getElementById('modal');
let winnerText = document.getElementById('modalText');
let currentPlayerDisplay = document.getElementById('currentPlayer');
let player1Name = '';
let player2Name = '';

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let pattern of winPatterns) {
    if (
      cells[pattern[0]].innerHTML !== '' &&
      cells[pattern[0]].innerHTML === cells[pattern[1]].innerHTML &&
      cells[pattern[1]].innerHTML === cells[pattern[2]].innerHTML
    ) {
      return true;
    }
  }
  return false;
}

function playerMove(index) {
  if (cells[index].innerHTML === '') {
    cells[index].innerHTML = currentPlayer === 1 ? 'X' : 'O';
    
    if (checkWin()) {
      askToContinue();
    } else if ([...cells].every(cell => cell.innerHTML !== '')) {
      askToContinue();
    } else {
      currentPlayer = currentPlayer === 1 ? 2 : 1;
      currentPlayerDisplay.innerText = `${currentPlayer === 1 ? player1Name : player2Name}'s Turn`;
    }
  }
}

function askToContinue() {
  displayModal(`Game Over! ${checkWin() ? `Congratulations ${currentPlayer === 1 ? player1Name : player2Name}! You win!` : 'It\'s a Draw!'}`);
  document.getElementById('continueBtn').addEventListener('click', resetAndContinue);
  document.getElementById('goBackBtn').addEventListener('click', goBackToStartScreen);
}

function displayModal(text) {
  modal.style.display = 'flex';
  winnerText.innerText = text;
}

function resetAndContinue() {
  modal.style.display = 'none';
  resetGame();
  currentPlayerDisplay.innerText = `${player1Name}'s Turn`;
}

function goBackToStartScreen() {
  modal.style.display = 'none';
  document.querySelector('.game').style.display = 'none';
  document.querySelector('.start-screen').style.display = 'block';
  resetGame();
}

function closeModal() {
  modal.style.display = 'none';
  resetGame();
}

function resetGame() {
  currentPlayer = 1;
  cells.forEach(cell => cell.innerHTML = '');
  currentPlayerDisplay.innerText = `${player1Name}'s Turn`;
}

document.getElementById('startBtn').addEventListener('click', function() {
  player1Name = document.getElementById('player1Name').value || 'Rohan';
  player2Name = document.getElementById('player2Name').value || 'Rohit';

  document.querySelector('.start-screen').style.display = 'none';
  document.querySelector('.game').style.display = 'block';
  currentPlayerDisplay.innerText = `${player1Name}'s Turn`;
});

document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', function() {
    playerMove(parseInt(this.getAttribute('data-index')));
  });
});

document.getElementById('closeModal').addEventListener('click', askToContinue);
