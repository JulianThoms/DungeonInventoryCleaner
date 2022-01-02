import React from "react";
import Management from "./Management.jsx";

export default class Inventory extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        <Management />
      </div>
    );
  }
}
