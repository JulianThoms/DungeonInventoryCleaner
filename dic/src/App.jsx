import "./App.css";
import Inventory from "./inventory/Inventory.jsx";
import ReactGA from "react-ga4";
import { Layout, Menu } from "antd";
import { SubnodeOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function App() {
  ReactGA.initialize("G-R9K7DPFTRE");
  ReactGA.send("pageview");

  const [page, setPage] = useState(1);

  return (
    <div className="App">
      <Layout style={{ minHeight: "100vh" }}>
        {/*
        <Sider collapsed={true}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item
              key="1"
              onClick={() => setPage(1)}
              icon={<EditOutlined />}
            ></Menu.Item>
            <Menu.Item
              key="2"
              onClick={() => setPage(2)}
              icon={<SubnodeOutlined />}
            ></Menu.Item>
          </Menu>
        </Sider>
        */}
        <Layout className="site-layout">
          <Content style={{ margin: "1% 8%" }}>
            {page == 1 && <Inventory />}
          </Content>
          <Footer style={{ textAlign: "center" }}>
            <span>
              COC Simulator ©2021 Created and beautifully designed by Zoop from
              the Dungeons
            </span>
            <p>
              If you find any bugs or have feature requests just @zoop#8448 me
            </p>
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
