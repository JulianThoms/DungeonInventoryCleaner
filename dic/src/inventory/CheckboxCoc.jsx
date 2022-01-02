import { Input, Row, Col } from "antd";
import React from "react";
import { Checkbox } from "antd";

export default class CheckboxCoc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Checkbox className="noselect" onChange={this.props.onChange}>
        {this.props.text}
      </Checkbox>
    );
  }

  onChange(e) {
    this.props.onChange();
  }
}
