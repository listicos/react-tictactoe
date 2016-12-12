/**
 * @providesModule Board
 * @flow
 */
'use strict'

import TicTacToeAI from 'TicTacToeAI'

class Board {
  grid: Array<Array<number>>;
  turn: number;
  ai: TicTacToeAI;

  constructor() {
    var size = 3
    var grid = Array(size)

    for (var i = 0; i < size; i++) {
      var row = Array(size)
      for (var j = 0; j < size; j++) {
        row[j] = 0
      }
      grid[i] = row
    }

    this.grid = grid
    this.turn = 1
    this.ai = new TicTacToeAI(this.grid)
  }

  mark(row: number, col: number, player: number): Board {
    this.grid[row][col] = player;
    return this;
  }

  hasMark(row: number, col: number): boolean {
    return this.grid[row][col] !== 0;
  }

  end(): boolean{
    return this.tie() || this.ai.winner() !== 0
  }

  tie(): boolean {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (this.grid[i][j] == 0) {
          return false;
        }
      }
    }
    
    return this.ai.winner() === 0;
  }
}

module.exports = Board