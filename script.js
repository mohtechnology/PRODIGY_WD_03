document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    // Create the game board cells dynamically
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index", i);
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    }

    function handleCellClick(event) {
        const clickedCell = event.target;
        const cellIndex = clickedCell.getAttribute("data-index");

        // Check if the cell is already occupied or the game is over
        if (gameBoard[cellIndex] === "" && !isGameOver()) {
            gameBoard[cellIndex] = currentPlayer;
            updateBoard();
            switchPlayer();
            if (isGameOver()) {
                alert(`Player ${currentPlayer} wins!`);
                resetGame();
            } else if (gameBoard.every(cell => cell !== "")) {
                alert("It's a tie!");
                resetGame();
            }
        }
    }

    function updateBoard() {
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell, index) => {
            cell.textContent = gameBoard[index];
        });
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }

    function isGameOver() {
        // Check rows, columns, and diagonals for a winner
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
            [0, 4, 8], [2, 4, 6]              // Diagonals
        ];

        return winningCombinations.some(combination =>
            combination.every(index => gameBoard[index] === currentPlayer)
        );
    }

    function resetGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        updateBoard();
    }
});
