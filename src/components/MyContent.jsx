import React from "react";
import { Alert, Tabs, Input, Button, Card } from "antd";
import { Layout, theme } from "antd";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Outlet,
  useNavigate,
} from "react-router-dom";
const { Content } = Layout;
const { TabPane } = Tabs;
const { TextArea } = Input;

const onChange = (key: string) => {
  console.log(key);
};

export default function MyContent({ Gonext }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <p style={{ fontSize: "22px", fontWeight: "700" }}>
          Assets & Liabilities
        </p>
      ),
      children: (
        <div>
          <p style={{ fontSize: "22px", fontWeight: "700" }}>
            Assets & Liabilities
          </p>
          <Card
            style={{
              width: "219px",
              height: "135px",
              display: "inline-block",
              marginRight: "15px",
            }}
          >
            <img
              style={{ marginTop: "-10px", marginLeft: "-10px" }}
              src="./img/logo1.png"
              alt="logo"
            />
            <p style={{ marginTop: "-5px", fontSize: "14px", fontWeight: "700" }}>
              Gross Value of the Estate
            </p>
            <p style={{ marginTop: "-5px", fontSize: "12px", fontWeight: "400" }}>
              $540,000,00.00
            </p>
          </Card>
          <Card
            style={{
              width: "219px",
              height: "135px",
              display: "inline-block",
              marginRight: "15px",
            }}
          >
            <img
              style={{ marginTop: "-10px", marginLeft: "-10px" }}
              src="./img/logo1.png"
              alt="logo"
            />
            <p style={{ marginTop: "-5px", fontSize: "14px", fontWeight: "700" }}>
              Gross Value of the Estate
            </p>
            <p style={{ marginTop: "-5px", fontSize: "12px", fontWeight: "400" }}>
              $540,000,00.00
            </p>
          </Card>
          <Tabs>
            <TabPane
              tab={<p style={{ fontSize: "22px", fontWeight: "700" }}>Assets</p>}
              key="1"
            >
            <Button
            onClick={Gonext}
            type="primary"
            style={{
              float: "right",
              background: "#3166AA",
              marginTop: "28px",
              marginBottom: "20px",
            }}
          >
            Notify Institutions
          </Button>
            </TabPane>
            <TabPane
              style={{ fontSize: "22px", fontWeight: "700" }}
              tab={
                <p style={{ fontSize: "22px", fontWeight: "700" }}>Liabilities</p>
              }
              key="2"
            ></TabPane>
          </Tabs>
          {/* <Button
            onClick={Gonext}
            type="primary"
            style={{
              float: "right",
              background: "#3166AA",
              marginTop: "28px",
              marginBottom: "20px",
            }}
          >
            Notify Institutions
          </Button> */}
          <TextArea rows={15} />
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <p style={{ fontSize: "22px", fontWeight: "700" }}>Details & Documents</p>
      ),
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: <p style={{ fontSize: "22px", fontWeight: "700" }}>Distributions</p>,
      children: "Content of Tab Pane 3",
    },
  ];
  return (
    <Content
      style={{
        padding: 24,
        margin: 0,
        minHeight: 1000,
        background: colorBgContainer,
      }}
    >
      <br /> <br />
      <Alert
        message="In Preparation"
        style={{
          border: "none",
          borderTopRightRadius: "0px",
          borderBottomRightRadius: "0px",
          borderTopLeftRadius: "32px",
          borderBottomLeftRadius: "32px",
          marginLeft: "20px",
          padding: "3px",
          fontWeight: "500",
          width: "220px",
          background: "#D1EBC8",
          display: "inline-block",
          textAlign: "center",
        }}
      />
      <Alert
        message="Institutions Notified"
        style={{
          marginBottom: "32px",
          border: "none",
          padding: "3px",
          fontWeight: "500",
          width: "220px",
          marginLeft: "1px",
          background: "#D1EBC8",
          display: "inline-block",
          textAlign: "center",
          borderRadius: "0px",
        }}
      />
      <Alert
        message="Application Submitted"
        style={{
          marginBottom: "32px",
          border: "none",
          marginLeft: "1px",
          padding: "3px",
          fontWeight: "500",
          width: "220px",
          background: "#B9E4F9",
          display: "inline-block",
          textAlign: "center",
          borderRadius: "0px",
        }}
      />
      <Alert
        message="Grant Obtained"
        style={{
          marginBottom: "32px",
          border: "none",
          marginLeft: "1px",
          padding: "3px",
          fontWeight: "500",
          width: "220px",
          background: "#D9D9D9",
          display: "inline-block",
          textAlign: "center",
          borderRadius: "0px",
        }}
      />
      <Alert
        message="Finalised"
        style={{
          marginBottom: "32px",
          border: "none",
          borderTopRightRadius: "32px",
          borderBottomRightRadius: "32px",
          borderTopLeftRadius: "0px",
          borderBottomLeftRadius: "0px",
          marginLeft: "1px",
          padding: "3px",
          fontWeight: "500",
          width: "220px",
          background: "#D9D9D9",
          display: "inline-block",
          textAlign: "center",
        }}
      />
      
      <Tabs
        style={{ marginLeft: "20px" }}
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
    </Content>
  );
}
