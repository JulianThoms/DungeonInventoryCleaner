import { Layout } from "antd";

import React from "react";

import Management from "./Management.jsx";

const {  Content, Footer } = Layout;

export default class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }
  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Layout className="site-layout">
          <Content style={{ margin: "1% 8%" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <Management />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            <span>
              COC Simulator ©2021 Created and beautifully designed by Zoop from
              the Dungeons
            </span>
            <p>If you find any bugs or have feature requests just dm me</p>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
