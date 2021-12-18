import { Input, Row, Col, Divider, Space } from "antd";
import React from "react";
import Checkbox from "./CheckboxCoc.jsx";
import SearchField from "./SearchFieldCoc.jsx";
import InventoryUser from "../models/InventoryUser";

const { TextArea } = Input;
let inventoryUser = new InventoryUser();

export default class Management extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prettierText: "",
      prettierTextCombined: "",
    };
    if (
      localStorage.getItem("filterList") !== "" &&
      localStorage.getItem("filterList") !== null
    ) {
      this.filterList = localStorage.getItem("filterList").split(",");
    }
  }

  basePrice = 100;
  normalList = [];
  prettierList = [];
  addIcons = true;
  checkBoxPrice = false;
  checkBoxCombineItems = false;
  cleansedListCombined = [];
  backupList = [];
  filterList = [];

  onCheckboxPriceAddChange = (e) => {
    this.checkBoxPrice = !this.checkBoxPrice;
    this.fixText(this.normalList);
  };

  onCheckboxCombineItemsChange = (e) => {
    this.checkBoxCombineItems = !this.checkBoxCombineItems;
    this.fixText(this.normalList);
  };

  onChangeInputText = (e) => {
    this.normalList = e.currentTarget.value.split("\n");
    this.fixText(this.normalList);
  };

  onChangeInputPrice = (e) => {
    this.basePrice = e.target.value;
    this.fixText(this.normalList);
  };

  onChangeSearchField = (e) => {
    this.filterList = e;
    localStorage.setItem("filterList", e);
    this.fixText(this.normalList);
  };

  fixText = (list) => {
    inventoryUser = new InventoryUser();

    if (
      localStorage.getItem("filterList") !== "" &&
      localStorage.getItem("filterList") !== null
    ) {
      this.filterList = localStorage.getItem("filterList").split(",");
    }

    for (let l of list) {
      inventoryUser.ParseItem(l);
    }

    this.setState({
      prettierText: inventoryUser.toString(
        this.filterList,
        this.checkBoxPrice,
        this.basePrice,
        false,
        this.checkBoxCombineItems
      ),
    });
  };

  render() {
    return (
      <>
        <Row gutter={16} justify="center">
          <Col className="gutter-row" xs={24} s={24} m={12} l={12} xl={12}>
            <Divider className="noselect">Paste API Here</Divider>
            <Row justify="center">
              <TextArea
                rows={6}
                spellCheck={false}
                onChange={this.onChangeInputText}
              />
            </Row>
            <Divider className="noselect" orientation="left">
              Options
            </Divider>
            <Row justify="center">
              <Col xs={22} s={22} m={14} l={14} xl={14}>
                <p className="noselect">Remove Items from Output</p>
                <SearchField
                  defaultValue={this.filterList}
                  onChange={this.onChangeSearchField}
                />
              </Col>
              <Col xs={10} s={10} m={10} l={10} xl={10}>
                <Row justify="center" style={{ marginTop: "15px" }}>
                  <Checkbox
                    className="noselect"
                    onChange={this.onCheckboxCombineItemsChange}
                    text="Reduce Inventory"
                  />
                </Row>
                <br />
                <Row justify="center">
                  <Checkbox
                    className="noselect"
                    onChange={this.onCheckboxPriceAddChange}
                    text="Add Price to all Items"
                  />
                  {this.checkBoxPrice && (
                    <Input
                      defaultValue="100"
                      maxLength={4}
                      style={{ width: "60%", marginTop: "15px" }}
                      onChange={this.onChangeInputPrice}
                    />
                  )}
                </Row>
              </Col>
            </Row>
          </Col>
          <Col className="gutter-row" xs={24} s={24} m={12} l={12} xl={12}>
            <Divider className="noselect">
              Receive Prettier Inventory Here
            </Divider>
            <TextArea
              spellCheck={false}
              value={this.state.prettierText}
              rows={6}
            />
          </Col>
        </Row>
      </>
    );
  }
}
