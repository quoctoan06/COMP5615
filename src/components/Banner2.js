import React from "react";
import { Icon, TextContent } from "@cloudscape-design/components";

export function Banner2() {
  return (
    <div className="headers">
      <div className="icons">
        <Icon name="arrow-left" />
      </div>
      <div className="titles">
        <TextContent>
          <h1 style={{ color: "#212B52", fontFamily: "Rubik,sans-serif" }}>
            Estate of the late John Richards
          </h1>
          <p style={{ color: "#5F5F5F" }}>Thomas Patrick O’Neill | #1242</p>
        </TextContent>
      </div>
    </div>
  );
}
