/**
 * @providesModule CatToeApp
 * @flow
 */
'use strict';

import React, { Component } from 'react'
import {
  Platform,
  StatusBar,
  AppState,
  View,
  StyleSheet
} from 'react-native';
import CatToeNavigator from 'CatToeNavigator'

var CatToeApp = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <CatToeNavigator />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

module.exports = CatToeApp