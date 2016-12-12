/**
 * Copyright 2016 Listicos
 * @providesModule CatToeNavigator
 * @flow
 */
import React, { Component } from 'react'
import {
  BackAndroid,
  StyleSheet,
  Navigator,
  Text,
  StatusBar,
  Platform,
  View
} from 'react-native'
import CatToePlay from 'CatToePlay'
import MainMenu from 'MainMenu'

var CatToeNavigator = React.createClass({
  _handlers: ([]: Array<() => boolean>),

  componentDidMount: function() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
  },

  componentWillUnmount: function() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
  },

  getChildContext() {
    return {
      addBackButtonListener: this.addBackButtonListener,
      removeBackButtonListener: this.removeBackButtonListener,
    };
  },

  addBackButtonListener: function(listener) {
    this._handlers.push(listener);
  },

  removeBackButtonListener: function(listener) {
    this._handlers = this._handlers.filter((handler) => handler !== listener);
  },

  handleBackButton: function() {
    const {navigator} = this.refs;
    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true;
    }

    if (this.props.tab !== 'home') {
      this.props.dispatch(switchTab('home'));
      return true;
    }
    return false;
  },

  render: function() {
    return (
      <Navigator
        ref="navigator"
        style={styles.container}
        configureScene={(route) => {
          return Navigator.SceneConfigs.FloatFromBottom;
        }}
        initialRoute={{}}
        renderScene={this.renderScene}
      />
    );
  },

  renderScene: function(route, navigator) {
    if (route.play) {
      return (
        <CatToePlay {...route} player={route.player} mode={route.mode} navigator={navigator} />
      );
    }
    return <MainMenu navigator={navigator} />
  },
});

CatToeNavigator.childContextTypes = {
  addBackButtonListener: React.PropTypes.func,
  removeBackButtonListener: React.PropTypes.func,
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

function select(store) {
  return {
    tab: store.navigation.tab,
    isLoggedIn: store.user.isLoggedIn,
  };
}

module.exports = CatToeNavigator;
