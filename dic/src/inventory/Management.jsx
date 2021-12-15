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
      checkBoxPrice: false,
      basePrice: 100,
    }
  }

  onChangeInputText = (e) => {
    let re = /:([A-Z]{1}[a-z]*)+:[ ](([A-Z])([a-z])*[ ]{0,1})+[1-9]/
    let list = e.currentTarget.value.split('\n')
    let cleansedList = [];
    for(let i = 0; i < list.length; i++) {
      if (re.test(list[i])) {
        console.log('match found.')
        cleansedList.push(list[i].match(re)[0])
      }
      if (list[i] == '') {
        continue
      }
      console.log(cleansedList)
      try {
        var frontCut = cleansedList.Substring(cleansedList.IndexOf(':'))
        let amountDoppel = 0
        let index = 0
        for (let c of frontCut) {
          {
            if (c == ':') {
              if (amountDoppel == 2) {
                break
              }

              amountDoppel += 1
            }

            index++
          }
        }

        cleansedList = frontCut.Substring(0, index)
        let level = parseInt(cleansedList[cleansedList.Length - 1].ToString())
        let price = parseInt(this.state.basePrice)
        while (level != 1) {
          price *= 2
          level--
        }
        if (this.state.checkBoxPrice) {
          cleansedList += ' - ' + price + ' :coin:'
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
    }
    
    this.setState({ prettierText: cleansedList.join("\n") })
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
                <Checkbox text="Add Price" />
                <br />
                <Input
                  defaultValue="100"
                  maxLength={4}
                  style={{ width: '60%', marginTop: '15px' }}
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
