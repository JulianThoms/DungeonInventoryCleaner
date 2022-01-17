import { Select } from "antd";
import React from "react";
import possibleItems from "../models/items.js";

const { Option } = Select;
let selectProps = {};

export default class SearchFieldCoc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    if (
      localStorage.getItem("filterList") != null &&
      localStorage.getItem("filterList") != ""
    ) {
      selectProps = {
        defaultValue: localStorage.getItem("filterList").split(","),
      };
    }
  }

  s;

  render() {
    return (
      <Select
        {...selectProps}
        mode="multiple"
        style={{ width: "95%" }}
        placeholder="Select Items to Remove from List"
        onChange={this.props.onChange}
        optionLabelProp="label"
      >
        {
          (console.log(possibleItems),
          possibleItems.map((item, key) => {
            return (
              <Option value={item.name.toLowerCase()} key={key}>
                {item.name}
              </Option>
            );
          }))
        }
      </Select>
    );
  }
}
