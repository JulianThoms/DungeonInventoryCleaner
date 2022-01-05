import "./App.css";
import Inventory from "./inventory/Inventory.jsx";
import ReactGA from "react-ga4";
import { Layout, Menu, Modal } from "antd";
import { SubnodeOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function App() {
  ReactGA.initialize("G-R9K7DPFTRE");
  ReactGA.send("pageview");
  const [page, setPage] = useState(1);
  const [seeAd, setSeeAd] = useState(
    localStorage.getItem("seeAd") != undefined
      ? localStorage.getItem("seeAd")
      : true
  );
  return (
    <div className="App">
      <Modal
        centered
        width={"50%"}
        visible={true}
        onOk={() => {
          localStorage.setItem("seeAd", "false");
          setSeeAd(false);
        }}
        onCancel={() => {alert("hah, you thought I would implement this button? :boxkek:")}}
      >
        <h1>A message from our Sponsor, FQVBSina Lurk</h1>
        <p>
          <b>Boxbox Discord Feud</b> is looking for <b>5 contestants</b> to form a team and go
          against Seorin's team in the game show!
        </p>
        <p>
          The show is completely similar to Family Feud and the questions are
          from the survey that you might have completed before!
        </p>
        <p>
          Tag <b>FQVBSina</b> in Discord for more details, if you have questions, etc.
        </p>
        <a>
          https://docs.google.com/forms/d/1uAlkovIQo0IOmZO0Hc6zrpeFkfP5s7odUgriO2J8DfY/edit
        </a>
      </Modal>
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
