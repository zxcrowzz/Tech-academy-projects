import React, { useState } from "react";
import "../App.css";
import { motion } from "framer-motion";

const ROWS = 6;
const COLS = 7;

const ConnectFour = () => {
  const [board, setBoard] = useState(Array(ROWS).fill(null).map(() => Array(COLS).fill(null)));
  const [player, setPlayer] = useState("red");
  const [winner, setWinner] = useState(null);

  const dropPiece = (col) => {
    if (winner) return;
    
    for (let row = ROWS - 1; row >= 0; row--) {
      if (!board[row][col]) {
        const newBoard = board.map(row => [...row]);
        newBoard[row][col] = player;
        setBoard(newBoard);
        checkWinner(newBoard);
        setPlayer(player === "red" ? "yellow" : "red");
        break;
      }
    }
  };

  const checkWinner = (board) => {
    const directions = [
      [0, 1], [1, 0], [1, 1], [1, -1]
    ];
    
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (!board[r][c]) continue;
        for (let [dr, dc] of directions) {
          if (checkDirection(board, r, c, dr, dc)) {
            setWinner(board[r][c]);
            return;
          }
        }
      }
    }
  };

  const checkDirection = (board, r, c, dr, dc) => {
    let color = board[r][c];
    for (let i = 1; i < 4; i++) {
      let nr = r + dr * i;
      let nc = c + dc * i;
      if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS || board[nr][nc] !== color) {
        return false;
      }
    }
    return true;
  };

  return (
    <div className="game">
      <h1>Connect Four</h1>
      <div className="board">
        {board.map((row, rIdx) => (
          <div key={rIdx} className="row">
            {row.map((cell, cIdx) => (
              <motion.div 
                key={cIdx} 
                className={`cell ${cell}`} 
                onClick={() => dropPiece(cIdx)}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        ))}
      </div>
      <h2>{winner ? `${winner.toUpperCase()} Wins!` : `Turn: ${player.toUpperCase()}`}</h2>
    </div>
  );
};

export default ConnectFour;
