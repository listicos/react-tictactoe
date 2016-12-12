/**
 * Listicos
 * @providesModule MainMenu
 * @flow
 */
'use strict'

import React from 'react'
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import CatToeButton from 'CatToeButton'
import CatToeColors from 'CatToeColors'

var MainMenu = React.createClass({
  getInitialState() {
    return { mode: 0 }
  },
  componentWillMount(){
    this.setState({
      mode: 0,
      modeSelected: 0
    })
  },
  play(player){
    this.props.navigator.push({
      play: true,
      player: player,
      mode: this.state.modeSelected
    })
    setTimeout(()=>{
      this.setState({
        mode: 0
      })
    }, 800)
  },
  players(modeSelected){
    this.setState({
      mode: 1,
      modeSelected: modeSelected
    })
  },
  render() {
    var buttons;
    if (this.state.mode == 0){
      buttons = (
        <View style={styles.board}>
          <Text style={styles.subtitle}>CHOOSE MODE</Text>
          <CatToeButton style={styles.button} onPress={this.players.bind(this, 1)} caption="Two players" />
          <CatToeButton style={styles.button} onPress={this.players.bind(this, 2)} caption="Impossible" />
        </View>)
    }else{
      buttons = (
        <View style={styles.board}>
          <Text style={styles.subtitle}>CHOOSE PLAYER</Text>
          <CatToeButton onPress={this.play.bind(this, 1)} style={styles.button} caption="X" />
          <CatToeButton onPress={this.play.bind(this, 2)} style={styles.button} caption="O" />
        </View>)
    }
    return (
      <LinearGradient 
        start={[0.7, 0.5]} end={[1, 1]}
        colors={CatToeColors.primary.background}
        style={styles.container}>
        <StatusBar
          translucent={false}
          backgroundColor="rgba(0, 0, 0, 0.2)"
          barStyle="light-content"
         />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>TIC TAC TOE</Text>
        </View>
        <View style={styles.boardContainer}>
          {buttons}
        </View>
      </LinearGradient>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center'
  },
  titleContainer:{
    flex: 0.2,
  },
  subtitle:{
    fontFamily: 'Chalkduster',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    color:'#FFFFFF',
  },
  button:{
    marginBottom: 10
  },
  boardContainer:{
    flex: 0.3
  },
  board: {
    height: 230,
    backgroundColor: '#c16605',
    padding: 20,
    borderRadius : 10,
    borderWidth: 5,
    borderColor: '#FFFFFF'
  },
  title: {
    flex: 1,
    marginTop: 100,
    fontFamily: 'Chalkduster',
    fontSize: 39,
    color:'#FFFFFF',
    marginBottom: 20,
  }
});

module.exports = MainMenu