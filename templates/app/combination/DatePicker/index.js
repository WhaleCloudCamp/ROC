import { DatePicker, List } from "antd-mobile-rn";
import React from "react";

export default class DatePickers extends React.Component {
  render() {
    return (
      <DatePicker
        {...this.props}
      >
        <List.Item arrow="horizontal">{this.props.timeValue}</List.Item>
      </DatePicker>
    );
  }
}
