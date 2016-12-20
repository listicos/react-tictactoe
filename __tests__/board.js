import 'react-native'
import React from 'react'
import Board from 'Board'

describe('Test all the moves', () => {
	let defaultPlayer = 1
	let totalGames = 0
	let totalGamesWon = 0

	let play = (board, player) => {
		let {turn, ai} = board

		if (board.end()){
			totalGames++
			let winner = ai.winner()
			if (winner === ai.nextPlayer(defaultPlayer)){
				totalGamesWon++
			}
			expect(winner).not.toBe(defaultPlayer)
			return
		}

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (board.grid[i][j] == 0) {
					if (player === defaultPlayer){
						board.grid[i][j] = player
						play(board, ai.nextPlayer(player))
						board.grid[i][j] = 0
					}else{
						let nextMoveAI = ai.negamaxSearch(player, 0, -100, 100)
        				board.grid[nextMoveAI[0]][nextMoveAI[1]] = player
        				play(board, ai.nextPlayer(player))
        				board.grid[nextMoveAI[0]][nextMoveAI[1]] = 0
					}
				}
			}
		}
	}

	it('AI test', () => {
		let board = new Board()
		//Test playing with X
		play(board, defaultPlayer)
		
		defaultPlayer = 2
		//Test playing with O
		play(board, defaultPlayer)

		console.log('Total games:'+totalGames)
		console.log('Total won:'+totalGamesWon)
		console.log('Total tie:'+(totalGames-totalGamesWon))
	})
})