/**
 * Listicos
 * @providesModule CatToePlay
 * @flow
 */
'use strict'

import React from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import TicTacToeAI from 'TicTacToeAI'
import Board from 'Board'
import BoardCell from 'BoardCell'
import GameEndOverlay from 'GameEndOverlay'
import CatToeColors from 'CatToeColors'

var CatToePlay = React.createClass({
  getInitialState() {
    return { board: new Board(), player: this.props.player}
  },

  onBack(){
    this.props.navigator.popToTop(0)
  },

  restartGame() {
    this.setState(this.getInitialState())
  },

  nextPlayer(): number {
    return this.state.player === 1 ? 2 : 1
  },

  handleCellPress(row: number, col: number) {
    if (this.state.board.hasMark(row, col)) {
      return;
    }
    let lastPlayer = this.state.player
    var newBoard = this.state.board.mark(row, col, lastPlayer)
    
    if (this.props.mode == 2){
      if (!newBoard.end()){
        let nextMove = newBoard.ai.negamaxSearch(this.nextPlayer(), 0, -100, 100)
        newBoard = this.state.board.mark(nextMove[0], nextMove[1], this.nextPlayer())
      }

      this.setState({
        board: newBoard,
        player: lastPlayer
      })
    }else{
      this.setState({
        board: newBoard,
        player: this.nextPlayer()
      })
    }
  },

  render() {
    var rows = this.state.board.grid.map((cells, row) =>
      <View key={'row' + row} style={styles.row}>
        {cells.map((player, col) =>
          <BoardCell
            key={'cell' + col}
            player={player}
            onPress={this.handleCellPress.bind(this, row, col)}
          />
        )}
      </View>
    );

    return (
      <LinearGradient 
        start={[0.7, 0.5]} end={[1, 1]}
        colors={CatToeColors.primary.background}
        style={styles.container}>
        <Text style={styles.title}>TIC TAC TOE</Text>
        <View style={styles.board}>
          {rows}
        </View>
        <GameEndOverlay
          board={this.state.board}
          onRestart={this.restartGame}
          onBack={this.onBack}
        />
      </LinearGradient>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  title: {
    fontFamily: 'Chalkduster',
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    fontSize: 39,
    marginBottom: 20,
  },
  board: {
    padding: 5,
    backgroundColor: '#47525d',
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
  }
});

module.exports = CatToePlay