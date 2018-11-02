import React, { Component } from "react";
import { View, Text } from "react-native";
<%- page.importStr %>

export default class Demo extends Component {
  static navigationOptions = {
    title: "<%- page.title %>"
  };

  state = {};

  render() {
    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
         <%- page.componentStr %>
      </View>
    );
  }
}
