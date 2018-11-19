import { Stepper } from "antd-mobile-rn";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class StepperItem extends React.Component {
  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.text}>{this.props.title}</Text>
        <View>
          <Stepper {...this.props} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
  
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
    marginTop:10,
    
  },
  text: {
    flex: 1,
    fontSize: 15
  }
});
