import React from "react";
import { Layout } from "antd";
//import logo from "./img/logo.png";
const { Header } = Layout;
export default function MyHeader() {
  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        background: "#ffffff",
        borderBottomStyle: "solid",
        borderWidth: "1px",
        borderColor: "#F2F2F2",
      }}
    >
      <img
        src="./img/logo.png"
        alt="logo"
        style={{ width: "80px", height: "60px" }}
      />
    </Header>
  );
}
