/**
 * @providesModule TicTacToeAI
 * @flow
 */
'use strict'

class TicTacToeAI{
  grid: Array<Array<number>>;

  constructor(grid) {
    this.grid = grid
  }

  nextPlayer(player): number {
    return player === 1 ? 2 : 1
  }

  winner(): number {
    //HORIZONTAL
    for (let i = 0; i < 3; i++) {
      if (this.grid[i][0] !== 0 && this.grid[i][0] === this.grid[i][1] &&
          this.grid[i][0] === this.grid[i][2]) {
        return this.grid[i][0]
      }
    }
    //VERTICAL
    for (let i = 0; i < 3; i++) {
      if (this.grid[0][i] !== 0 && this.grid[0][i] === this.grid[1][i] &&
          this.grid[0][i] === this.grid[2][i]) {
        return this.grid[0][i]
      }
    }

    //DIAGONAL TOP TO BOTTOM
    if (this.grid[0][0] !== 0 && this.grid[0][0] === this.grid[1][1] &&
        this.grid[0][0] === this.grid[2][2]) {
      return this.grid[0][0]
    }

    //DIAGONAL BOTTOM TO TOP
    if (this.grid[0][2] !== 0 && this.grid[0][2] === this.grid[1][1] &&
        this.grid[0][2] === this.grid[2][0]) {
      return this.grid[0][2]
    }

    return 0
  }

  score(player, depth): number{
    let winner = this.winner()

    if (winner == player){
      return 100 - depth
    }else if (winner == this.nextPlayer(player)){
      return depth - 100
    }else{
      return 0
    }
  }

  negamaxSearch(player, depth, alpha, beta){
    var size = 100
    var intelligence = 6
    var min = -size, max, value, next
    let score = this.score(player, depth)

    if (score !== 0){
      return score
    }
    if (intelligence > depth){
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          if (this.grid[i][j] == 0) {
            this.grid[i][j] = player
            value = -this.negamaxSearch(this.nextPlayer(player), depth + 1, -beta, -alpha)
            this.grid[i][j] = 0
            if (max === undefined || value > max) max = value
            if (value > alpha) alpha = value
            if (alpha >= beta) return alpha
            if (max > min){ min = max; next = [i,j] }
          }
        }   
      }
    }
    return depth ? max || 0 : next
  }
}

module.exports = TicTacToeAI;