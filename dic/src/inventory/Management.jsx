import { Input, Row, Col, Divider, Space } from "antd";
import React from "react";
import Checkbox from "./CheckboxCoc.jsx";
import SearchField from "./SearchFieldCoc.jsx";
import Item from "../models/Item.js";

const { TextArea } = Input;
let filterList = [];
export default class Management extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prettierText: "",
      prettierTextCombined: "",
    };
    if (
      localStorage.getItem("filterList") != "" &&
      localStorage.getItem("filterList") != null
    ) {
      filterList = localStorage.getItem("filterList").split(",");
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
    let re = /:([^:]+):\s([^:]+)(\d).*$/;
    let cleansedList = [];
    let toBeAdded;

    for (let i = 0; i < list.length; i++) {
      if (re.test(list[i])) {
        if (isNaN(parseInt(list[i].match(re)[3].trim()))) {
          continue;
        }
        toBeAdded = new Item(
          list[i].match(re)[1].trim(),
          list[i].match(re)[2],
          parseInt(list[i].match(re)[3].trim())
        );
      } else {
        continue;
      }

      // filter
      let skip = false;
      if (this.filterList != null && this.filterList.length != 0) {
        for (let i of this.filterList) {
          if (
            toBeAdded.name.toLowerCase().includes(i) &&
            i.length > 2 &&
            toBeAdded.name.length > 2
          ) {
            console.log("skipping because:");
            console.log(i.length);
            console.log(toBeAdded.name.length);
            console.log(toBeAdded.name.toLowerCase());
            console.log(i);
            skip = true;
          }
        }
      }

      if (skip) {
        continue;
      }

      cleansedList.push(toBeAdded);
    }

    if (this.checkBoxCombineItems) {
      cleansedList = this.combineItems(cleansedList);
    }

    cleansedList = cleansedList.map((item) => {
      try {
        let level = item.level;
        let price = parseInt(this.basePrice);
        while (level != 1) {
          price *= 2;
          level--;
        }
        if (this.checkBoxPrice) {
          item += " - " + price + " :coin:";
        }
        return item;
      } catch (e) {}
    });

    if (JSON.stringify(cleansedList) != JSON.stringify(this.prettierList)) {
      this.prettierList = cleansedList;
      this.setState({
        prettierText: this.prettierList.toString().split(",").join("\n"),
      });
    }
  };

  combineItems = (text) => {
    let Items = [];
    for (let item of text) {
      if (item == null) {
        continue;
      }

      Items.push(item);
    }

    Items = this.sortItems(Items);

    // filter duplicates to amounts
    let filteredDupItems = [];

    for (let comparableItem of Items) {
      let amtStuff = Items.filter(
        (item) =>
          item.level == comparableItem.level && item.name == comparableItem.name
      );
      if (amtStuff.length > 1) {
        amtStuff[0].amount = amtStuff.length;
      }
      if (
        !filteredDupItems.some(
          (e) => e.name === amtStuff[0].name && e.level === amtStuff[0].level
        )
      ) {
        filteredDupItems.push(amtStuff[0]);
      }
    }

    /* where was i going with this
    let splitItems = [];
    for (let singleItem of Items) {
      let listExists = false;
      for (let list of splitItems) {
        if (list.some((e) => e.name === singleItem.name)) {
          list.push(singleItem);
          listExists = true;
        }
      }
      if (!listExists) {
        splitItems.push([singleItem]);
      }
    }

    let sortSplitLists = [];

    for (let spI = 0; spI < splitItems.length; spI++) {
      // each list of items here.

      for (let i = 0; i < splitItems[spI].length; i++) {
        // looping through first item here to compare.
      }
      sortSplitLists.push();

      sortSplitLists.push(splitItems[spI]);
    }
    */

    // To combine items here
    /*
    for (let list of splitItems) {
      for (let i = 0; i < list.length; i++) {
        for (let y = 0; y < list.length; y++) {
          if (i == y) {
            continue;
          }
          if (list[i].level == list[y].level && list[i].level != 9) {
            list[i].level++;
            list = list.splice(i, 1);
            i = 0;
            break;
          }
        }
      }
      */

    return filteredDupItems;
  };

  sortItems = (items) => {
    return items.sort(function (a, b) {
      return b.level - a.level;
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
