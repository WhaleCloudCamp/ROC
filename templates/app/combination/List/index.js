import React from "react";
import { List } from "antd-mobile-rn";

export default class Lists extends React.Component {
  render() {
    return <List.Item {...this.props}>{this.props.title}</List.Item>;
  }
}
