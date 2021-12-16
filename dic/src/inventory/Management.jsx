import { Input, Row, Col, Divider, Space } from 'antd'
import React from 'react'
import Checkbox from './CheckboxCoc.jsx'
import SearchField from './SearchFieldCoc.jsx'

const { TextArea } = Input
let filterList = []
export default class Management extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      prettierText: '',
    }
    if (
      localStorage.getItem('filterList') != '' &&
      localStorage.getItem('filterList') != null
    ) {
      filterList = localStorage.getItem('filterList').split(',')
    }
  }

  basePrice = 100
  normalList = []
  prettierList = []
  checkBoxPrice = false

  onCheckboxPriceAddChange = (e) => {
    this.checkBoxPrice = !this.checkBoxPrice
    this.fixText(this.prettierList)
  }

  onChangeInputText = (e) => {
    this.normalList = e.currentTarget.value.split('\n')
    this.fixText(this.normalList)
  }

  onChangeInputPrice = (e) => {
    this.basePrice = e.target.value
    this.fixText(this.prettierList)
  }

  onChangeSearchField = (e) => {
    this.filterList = e
    localStorage.setItem('filterList', e)
    this.fixText(this.normalList)
  }

  fixText = (list) => {
    let re = /:([A-Z]*[a-z]*)+:[ ](([A-Z])([a-z])*[ ]{0,1})+[1-9]/
    let cleansedList = []
    let toBeAdded = ''

    for (let i = 0; i < list.length; i++) {
      if (re.test(list[i])) {
        toBeAdded = list[i].match(re)[0]
      } else {
        continue
      }

      // filter
      let skip = false
      for (let i of this.filterList) {
        if (toBeAdded.toLowerCase().includes(i)) {
          skip = true
        }
      }

      if (skip) {
        continue
      }

      try {
        let level = parseInt(toBeAdded[toBeAdded.length - 1])
        let price = parseInt(this.basePrice)
        while (level != 1) {
          price *= 2
          level--
        }
        if (this.checkBoxPrice) {
          toBeAdded += ' - ' + price + ' :coin:'
        }
      } catch (e) {
        continue
      }

      //var skips = richTextBox3.Text.Split('\n')
      let isSkip = false

      //if (backCut.Contains(ele)) {
      // isSkip = true
      //break
      //}
      cleansedList.push(toBeAdded)
    }
    if (JSON.stringify(cleansedList) != JSON.stringify(this.prettierList)) {
      this.prettierList = cleansedList
      this.setState({ prettierText: this.prettierList.join('\n') })
    }
  }

  render() {
    return (
      <>
        <Row gutter={16} justify="center">
          <Col className="gutter-row" xs={24} s={24} m={12} l={12} xl={12}>
            <Divider className="noselect">Paste API Here</Divider>
            <Row justify="center">
              <TextArea rows={6} onChange={this.onChangeInputText} />
            </Row>
            <Divider className="noselect" orientation="left">
              Options
            </Divider>
            <Row justify="center">
              <Col xs={22} s={22} m={14} l={14} xl={14}>
                <p className="noselect">Remove Items from Output</p>
                <SearchField defaultValue={this.filterList} onChange={this.onChangeSearchField} />
              </Col>

              <Col xs={10} s={10} m={10} l={10} xl={10}>
                <br />
                <Checkbox
                  className="noselect"
                  onChange={this.onCheckboxPriceAddChange}
                  text="Add Price"
                />
                <Input
                  defaultValue="100"
                  maxLength={4}
                  style={{ width: '60%', marginTop: '15px' }}
                  onChange={this.onChangeInputPrice}
                />
              </Col>
            </Row>
          </Col>
          <Col className="gutter-row" xs={24} s={24} m={12} l={12} xl={12}>
            <Divider className="noselect">
              Receive Prettier Inventory Here
            </Divider>
            <TextArea value={this.state.prettierText} rows={6} />
          </Col>
        </Row>
      </>
    )
  }
}
