import { Input, Row, Col, Divider, Space } from 'antd'
import React from 'react'
import Checkbox from './CheckboxCoc.jsx'
import SearchField from './SearchFieldCoc.jsx'

const { TextArea } = Input

export default class Management extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      prettierText: '',
    }
  }
  basePrice = 100
  prettierList = []
  checkBoxPrice = false

  onCheckboxPriceAddChange = (e) => {
    this.checkBoxPrice = !this.checkBoxPrice
    this.fixText(this.prettierList)
  }

  onChangeInputText = (e) => {
    let list = e.currentTarget.value.split('\n')
    this.fixText(list)
  }

  onChangeInputPrice = (e) => {
    this.basePrice = e.target.value
    this.fixText(this.prettierList)
  }

  fixText = (list) => {
    let re = /:([A-Z]{1}[a-z]*)+:[ ](([A-Z])([a-z])*[ ]{0,1})+[1-9]/
    let cleansedList = []
    let toBeAdded = ''

    for (let i = 0; i < list.length; i++) {
      if (re.test(list[i])) {
        console.log('match found.')
        toBeAdded = list[i].match(re)[0]
      } else {
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

  onChangeSearchField = (e) => {
    console.log(e)
  }

  render() {
    return (
      <>
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <Divider>Paste API Here</Divider>
            <Row>
              <TextArea rows={6} onChange={this.onChangeInputText} />
            </Row>
            <Divider orientation="left">Options</Divider>
            <Row>
              <Col span={14}>
                <p>Filter List</p>
                <SearchField onChange={this.onChangeSearchField} />
              </Col>
              <Col span={10}>
                <Checkbox
                  onChange={this.onCheckboxPriceAddChange}
                  text="Add Price"
                />
                <br />
                <Input
                  defaultValue="100"
                  maxLength={4}
                  style={{ width: '60%', marginTop: '15px' }}
                  onChange={this.onChangeInputPrice}
                />
              </Col>
            </Row>
          </Col>
          <Col className="gutter-row" span={12}>
            <Divider>Receive Prettier Inventory Here</Divider>
            <TextArea value={this.state.prettierText} rows={6} />
          </Col>
        </Row>
      </>
    )
  }
}
