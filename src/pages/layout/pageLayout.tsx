import React, { useState } from "react";
import {
  RightCircleOutlined,
  LeftCircleOutlined,
  UserOutlined,
  HomeOutlined,
  CalendarOutlined,
  SettingOutlined,
  GlobalOutlined,
  BellOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Select } from "antd";
import type { MenuProps } from "antd";

import "./styles.css";
import Sessions from "../sessions/Sessions";

const { Header, Sider, Content } = Layout;
const { useToken } = theme;
type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const PageLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { token } = useToken();

  const items: MenuItem[] = [
    getItem("Home", "1", <HomeOutlined />),
    getItem("Planning", "sub1", <CalendarOutlined />, [
      getItem("Sessions", "2"),
      getItem("Venues", "3"),
    ]),
    getItem("Attendees", "sub2", <UserOutlined />, [
      getItem("Team 1", "4"),
      getItem("Team 2", "5"),
    ]),
    getItem("Settings", "sub3", <SettingOutlined />, [
      getItem("Team 1", "6"),
      getItem("Team 2", "8"),
    ]),
  ];

  return (
    <Layout style={{ height: " 100%" }}>
      <Header className="header">
        <div className="demo-logo">
          <span>Evently</span>
          <Button
            type="text"
            icon={
              collapsed ? (
                <RightCircleOutlined style={{ fontSize: "20px" }} />
              ) : (
                <LeftCircleOutlined style={{ fontSize: "20px" }} />
              )
            }
            onClick={() => setCollapsed(!collapsed)}
            style={{
              width: 250,
              height: 64,
            }}
          />
        </div>
        <div style={{ width: "33%" }}>
          <Select
            className="selectLegue"
            defaultValue="Champions’ League 2023"
            options={[
              {
                value: "Champions’ League 2023",
                label: (
                  <b>
                    <GlobalOutlined style={{ marginRight: "1rem" }} />
                    Champions’ League 2023
                  </b>
                ),
              },
            ]}
          />
        </div>
        <div style={{ width: "20%", display: "flex", gap: "1rem" }}>
          <Button type="primary" icon={<BellOutlined />} shape="default" />
          <Select
            className="selectLegue"
            defaultValue="Jane Doe"
            options={[
              {
                value: "Jane Doe",
                label: (
                  <b>
                    <SmileOutlined style={{ marginRight: "1rem" }} />
                    Jane Doe
                  </b>
                ),
              },
            ]}
          />
        </div>
      </Header>
      <Layout>
        <Sider
          className="sidebar"
          trigger={null}
          collapsible
          collapsed={collapsed}
          theme="dark"
          width="250"
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["2"]}
            items={items}
            className="menuItem"
          />
        </Sider>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Sessions />
        </Content>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
