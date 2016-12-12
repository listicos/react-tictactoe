/**
 * Copyright 2016 Listicos.
 * @providesModule CatToeButton
 * @flow
 */

'use strict';

import CatToeColors from 'CatToeColors'
import LinearGradient from 'react-native-linear-gradient'
import React, { Component } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  PixelRatio,
  View
} from 'react-native'

class CatToeButton extends React.Component {
  props: {
    type: 'primary' | 'secondary';
    icon?: number;
    caption: string;
    style?: any;
    onPress: () => mixed;
  };

  static defaultProps = {
    type: 'primary',
  };

  render() {
    const caption = this.props.caption.toUpperCase();
    let icon;
    if (this.props.icon) {
      icon = <Image source={this.props.icon} style={styles.icon} />;
    }
    let content;
    if (this.props.type === 'primary') {
      content = (
        <LinearGradient
          start={[0.5, 1]} end={[1, 1]}
          colors={CatToeColors.button.primary.background}
          style={[styles.button, styles.primaryButton]}>
          {icon}
          <Text style={[styles.caption, styles.primaryCaption]}>
            {caption}
          </Text>
        </LinearGradient>
      );
    }else if (this.props.type === 'secondary') {
      content = (
        <LinearGradient
          start={[0.5, 1]} end={[1, 1]}
          colors={CatToeColors.button.secondary.background}
          style={[styles.button, styles.primaryButton]}>
          {icon}
          <Text style={[styles.caption, styles.secondaryCaption]}>
            {caption}
          </Text>
        </LinearGradient>
      );
    }
    return (
      <TouchableOpacity
        accessibilityTraits="button"
        onPress={this.props.onPress}
        activeOpacity={0.8}
        style={[styles.container, this.props.style]}>
        {content}
      </TouchableOpacity>
    );
  }
}

const HEIGHT = 50;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    height: HEIGHT
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  border: {
    borderWidth: 1,
    borderColor: CatToeColors.lightText,
    borderRadius: HEIGHT / 2,
  },
  primaryButton: {
    borderRadius: HEIGHT / 2,
    backgroundColor: 'transparent',
  },
  secondaryCaption: {
    borderRadius: HEIGHT / 2,
    color: CatToeColors.button.secondary.color
  },
  cancelCaption: {
    borderRadius: HEIGHT / 2,
    color: '#FFFFFF'
  },
  registerCaption: {
    fontSize: 10,
    borderRadius: HEIGHT / 2,
    color: '#FFFFFF'
  },
  icon: {
    marginRight: 12,
  },
  caption: {
    fontSize: 15,
    fontFamily: 'AvenirNext-DemiBold',
    fontWeight: '700',
    textAlign: 'center'
  },
  primaryCaption: {
    color: 'white',
  }
});

module.exports = CatToeButton;