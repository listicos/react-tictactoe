/**
 * Listicos
 * @providesModule GameEndOverlay
 * @flow
 */

'use strict'

import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'

class GameEndOverlay extends React.Component {
  render() {
    var board = this.props.board

    if (!board.end()) {
      return null
    }
    
    var tie = board.tie()
    var winner = board.ai.winner()

    var message
    if (tie) {
      message = 'It\'s a tie!'
    } else {
      message = (winner === 1 ? 'X' : 'O') + ' Wins!'
    }

    return (
      <View style={styles.overlay}>
        <Text style={styles.overlayMessage}>{message}</Text>
        <TouchableHighlight
          onPress={this.props.onRestart}
          underlayColor="transparent"
          activeOpacity={0.5}>
          <View style={styles.newGame}>
            <Text style={styles.newGameText}>NEW GAME</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={this.props.onBack}
          underlayColor="transparent"
          activeOpacity={0.5}>
          <View style={[styles.newGame, styles.mainMenu]}>
            <Text style={styles.newGameText}>MAIN MENU</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}


var styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayMessage: {
    fontSize: 50,
    marginLeft: 20,
    color:'white',
    marginRight: 20,
    fontFamily: 'AvenirNext-DemiBold',
    textAlign: 'center',
  },
  mainMenu:{
    backgroundColor: '#D14F4F'
  },
  newGame: {
    backgroundColor: '#50D050',
    padding: 20,
    borderRadius : 10,
    marginTop: 20,
  },
  newGameText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'AvenirNext-DemiBold',
  },
});

module.exports = GameEndOverlay