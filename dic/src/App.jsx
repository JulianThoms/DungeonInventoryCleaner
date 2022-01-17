import "./App.css";
import Inventory from "./inventory/Inventory.jsx";
import ReactGA from "react-ga4";
import { Layout, Menu } from "antd";
import { useState } from "react";
const { Content, Footer } = Layout;
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
            {page === 1 && <Inventory />}
          </Content>
          <Footer style={{ textAlign: "center" }}>
            <span>
              Dungeon Inventory Cleaner & Sorter ©2022 Created and beautifully designed by Zoop from
              the Dungeons
            </span>
            <p>
              I'm quitting, thanks for using the Website, I'll try to keep it running and up to date &lt;3
              You can help me by using PRs!
            </p>
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
