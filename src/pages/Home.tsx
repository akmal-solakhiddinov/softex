import React, { useEffect, useState } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  AccountBookOutlined,
  ColumnWidthOutlined
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Apptable from "../components/Table.tsx";
import { IUser } from "../lib/types.ts";

const { Header, Content, Sider } = Layout;
const nav = ["Statistics", "Education", "Settigs", "Hard Skills", "Conditions"];
const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  AccountBookOutlined,
  ColumnWidthOutlined
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `${nav[index]}`,
}));

const Home: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [user, setUser] = useState<IUser>();
  const siderStyle: React.CSSProperties = {
    overflow: "auto",
    height: "100vh",
    position: "sticky",
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: "thin",
    scrollbarGutter: "stable",
    background: colorBgContainer,
    borderRight:'2px solid rgb(228, 228, 228)'
  };

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) {
      const { user } = JSON.parse(u);
      setUser(user);
    }
  }, []);

  return (
    <Layout>
      <Sider style={siderStyle} breakpoint="lg" collapsedWidth="0">
        <div style={{ padding: "16px", color: "black", fontSize: "18px" }}>
          Pages
        </div>
        <Menu  mode="vertical"  items={items} style={{flex:1, minWidth:0, border:"none"}} />
      </Sider>
      <Layout style={{ position: "relative" }}>
        <Header
          style={{
            padding:"0 20px",
            background: colorBgContainer,
            position: "sticky",
            top: "0",
            zIndex: "100",
          }}
        >
          User: {user?.login}
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <Apptable />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
