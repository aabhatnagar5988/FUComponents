import React, { Component } from 'react';
import {
  StyleSheet, TextInput, View, Image, ImageSourcePropType,
} from 'react-native';

type P = {
  validator: Function,
  onBlur: Function,
  containerStyle: StyleSheet.Style,
  style: StyleSheet.Style,
  icon: ImageSourcePropType,
  iconOnRight: boolean,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',

    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  icon: {
    margin: 5,
    maxHeight: 30,
    maxWidth: 30,
  },
  input: {
    flex: 1,
  },
});

class TextField extends Component<P> {
  state = {
    borderColor: this.props.borderColor || '#CCC', // eslint-disable-line
  };

  _onBlur = (e) => {
    const { validator, onBlur } = this.props;
    const newState = {};
    if (validator && !validator()) {
      newState.borderColor = 'red';
    } else {
      newState.borderColor = '#CCC';
    }

    if (onBlur) onBlur(e);

    this.setState(newState);
  }

  render() {
    const {
      containerStyle,
      style,
      icon,
      iconOnRight,
      onBlur,
      ...other
    } = this.props;

    const { borderColor } = this.state;

    const computedStyles = StyleSheet.create({
      container: {
        flexDirection: iconOnRight ? 'row-reverse' : 'row',
        borderColor,
        ...containerStyle,
      },
    });

    return (
      <View style={[styles.container, computedStyles.container]}>
        {
          !!icon && (
            <Image
              style={styles.icon}
              source={icon}
              resizeMode="contain"
            />
          )
        }
        <TextInput
          style={styles.input}
          onBlur={this._onBlur}
          {...other}
        />
      </View>
    );
  }
}

export default TextField;
