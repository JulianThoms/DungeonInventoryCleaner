import { Select } from 'antd'
import React from 'react'
const { Option } = Select
let selectProps = {};
const AvailItems = [{value: "avalanche", name:" Avalanche"}]

export default class SearchFieldCoc extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    if (localStorage.getItem('filterList') != null && localStorage.getItem('filterList') != ""){
      selectProps = {
        defaultValue: localStorage.getItem('filterList').split(',')
      }
    }
  }

  s

  render() {
    return (
        <Select
        {... selectProps}
        mode="multiple"
        style={{ width: '95%' }}
        placeholder="Select Items to Remove from List"
        onChange={this.props.onChange}
        optionLabelProp="label"
      >
        <Option value="avalanche">Avalanche</Option>
        <Option value="bf cannon">BF Cannon</Option>
        <Option value="big club">Big Club</Option>
        <Option value="boosting bugle">Boosting Bugle</Option>
        <Option value="challenger arrow">Challenger Arrow</Option>
        <Option value="chumby chicken">Chumby Chicken</Option>
        <Option value="cleansed tome">Cleansed Tome</Option>
        <Option value="cleansing flames">Cleansing Flames</Option>
        <Option value="draining dagger">Draining Dagger</Option>
        <Option value="energetic ally">Energetic Ally</Option>
        <Option value="explosion powder">Explosion Powder</Option>
        <Option value="festive feast">Festive Feast</Option>
        <Option value="fire sword">Fire Sword</Option>
        <Option value="freezeman">Freezeman</Option>
        <Option value="halberd">Halberd</Option>
        <Option value="healing pendant">Healing Pendant</Option>
        <Option value="imp whistle">Imp Whistle</Option>
        <Option value="knight's lance">Knight's Lance</Option>
        <Option value="love letter">Love Letter</Option>
        <Option value="machete">Machete</Option>
        <Option value="magic parasol">Magic Parasol</Option>
        <Option value="pet imp">Pet Imp</Option>
        <Option value="poison dagger">Poison Dagger</Option>
        <Option value="rock companion">Rock Companion</Option>
        <Option value="seeking missiles">Seeking Missiles</Option>
        <Option value="survival kit">Survival Kit</Option>
        <Option value="thorns">Thorns</Option>
        <Option value="trusty steed">Trusty Steed</Option>
        <Option value="whirlwind axe">Whirlwind Axe</Option>
        <Option value="punching bag">Punching Bag</Option>
      </Select>
    )
  }
}
