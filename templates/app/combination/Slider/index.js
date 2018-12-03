import { Slider } from "antd-mobile-rn";
import React from "react";
import { View } from "react-native";

export default class Sliders extends React.Component {
  render() {
    return (
      <View
        style={{
          borderTopWidth: 10,
          borderBottomWidth: 10,
          borderColor: "white",
          backgroundColor: "white",
        }}
      >
        <Slider {...this.props} />
      </View>
    );
  }
}
