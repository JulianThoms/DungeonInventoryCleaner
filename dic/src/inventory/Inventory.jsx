import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

import React from "react";

import Management from "./Management.jsx";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

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
