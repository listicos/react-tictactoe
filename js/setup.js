'use strict';

import {AppRegistry, StyleSheet, Text, View} from 'react-native'
import React, { Component, AppState, Platform, StatusBar } from 'react'
import CatToeApp from 'CatToeApp'

function setup(): ReactClass<{}> {
  class CatToe extends React.Component {
    constructor() {
      super();
      this.state = {
      };
    }
    render() {
      return (
        <CatToeApp />
      );
    }
  }

  return CatToe
}

module.exports = setup