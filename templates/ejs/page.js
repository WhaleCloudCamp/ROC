import React, { Component } from "react";
import { ScrollView } from "react-native";
<%- importStr %>

export default class Demo extends Component {
  static navigationOptions = {
    title: "<%- title %>"
  };

  state = {};

  render() {
    return (
      <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
         <%- componentStr %>
      </ScrollView>
    );
  }
}
