import { Input, Row, Col, Divider, Button } from "antd";
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
      copySuccess: "Copy"
    };
    if (
      localStorage.getItem("filterList") !== "" &&
      localStorage.getItem("filterList") !== null
    ) {
      this.filterList = localStorage.getItem("filterList").split(",");
    }
  }

  basePrice = 100;
  addIcons = true;
  checkBoxPrice = false;
  checkBoxCombineItems = false;
  checkBoxSortType = false;
  checkBoxCombineUp = false;
  checkBoxFilterOption = false;
  filterList = [];
  normalList = [];

  onCheckboxPriceAddChange = (e) => {
    this.checkBoxPrice = !this.checkBoxPrice;
    this.fixText();
  };

  onCheckboxSortTypeChange = (e) => {
    console.log(e);
    this.checkBoxSortType = !this.checkBoxSortType;
    this.fixText();
  };

  onChangeInputText = (e) => {
    this.normalList = e.currentTarget.value.split("\n");
    this.fixText();
  };

  onChangeInputPrice = (e) => {
    this.basePrice = e.target.value;
    this.fixText();
  };

  onChangeSearchField = (e) => {
    this.filterList = e;
    localStorage.setItem("filterList", e);
    this.fixText();
  };

  fixText = () => {
    inventoryUser = new InventoryUser();

    if (
      localStorage.getItem("filterList") !== "" &&
      localStorage.getItem("filterList") !== null
    ) {
      this.filterList = localStorage.getItem("filterList").split(",");
    }

    for (let l of this.normalList) {
      inventoryUser.ParseItem(l);
    }

    this.setState({
      prettierText: inventoryUser.toString(
        this.filterList,
        this.checkBoxPrice,
        this.basePrice,
        this.checkBoxSortType,
        this.checkBoxCombineItems,
        this.checkBoxCombineUp,
        this.checkBoxFilterOption
      ),
    });
  };

  updateClipboard(newClip) {
    navigator.clipboard.writeText(newClip).then(
      () => {
        this.setState({copySuccess: "Copied!"});
      },
      () => {
        this.setState({copySuccess: "Copy failed!"});
      }
    );
  }

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
                <Checkbox
                  className="noselect"
                  onChange={() => {
                    this.checkBoxFilterOption = !this.checkBoxFilterOption;
                    this.fixText();
                  }}
                  text="Toggle filter"
                />
                <Row justify="center" style={{ marginTop: "15px" }}>
                  <Checkbox
                    className="noselect"
                    onChange={() => {
                      this.checkBoxCombineUp = !this.checkBoxCombineUp;
                      this.fixText();
                    }}
                    text="Combine up all Items"
                  />
                </Row>
              </Col>
              <Col
                xs={10}
                s={10}
                m={9}
                l={9}
                xl={9}
                style={{ marginLeft: "15px" }}
              >
                <Row justify="" style={{ marginTop: "15px" }}>
                  <Checkbox
                    className="noselect"
                    onChange={() => {
                      this.checkBoxCombineItems = !this.checkBoxCombineItems;
                      this.fixText();
                    }}
                    text="Reduce Inventory"
                  />
                </Row>
                <Row justify="" style={{ marginTop: "15px" }}>
                  <Checkbox
                    className="noselect"
                    onChange={() => {
                      this.checkBoxSortType = !this.checkBoxSortType;
                      this.fixText();
                    }}
                    text="Sort for Type"
                  />
                </Row>
                <Row justify="" style={{ marginTop: "15px" }}>
                  <Checkbox
                    className="noselect"
                    onChange={() => {
                      this.checkBoxPrice = !this.checkBoxPrice;
                      this.fixText();
                    }}
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
            <Button
              style={{ marginTop: "10px" }}
              onClick={() => {
                navigator.permissions
                  .query({ name: "clipboard-write" })
                  .then((result) => {
                    if (
                      result.state === "granted" ||
                      result.state === "prompt"
                    ) {
                      this.updateClipboard(this.state.prettierText);
                    }
                  });
              }}
            >
              {this.state.copySuccess}
            </Button>
          </Col>
        </Row>
      </>
    );
  }
}
