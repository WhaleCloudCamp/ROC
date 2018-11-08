import React, { Component } from "react";
import { View, Text } from "react-native";
<%- importStr %>

export default class Demo extends Component {
  static navigationOptions = {
    title: "<%- title %>"
  };

  state = {};

  render() {
    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
         <%- componentStr %>
      </View>
    );
  }
}
