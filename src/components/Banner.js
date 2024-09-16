import React from "react";
import { TextContent } from "@cloudscape-design/components";
import { BrowserRouter as Router, useNavigate, Link } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import { Button } from "antd";
export function Banner({ PageBack, isConfirmed, title }) {
  return (
    <div className="headers">
      <div className="icons">
        <span
          onClick={PageBack}
          style={{
            position: "relative",
            top: "-20px",
            fontSize: "40px",
            color: "#00008B",
          }}
        >
          <Link>
            <BsArrowLeftShort />
          </Link>
        </span>
      </div>
      <div className="titles">
        <TextContent>
          <h1 style={{ color: "#212B52", fontFamily: "Rubik,sans-serif" }}>
            Notify institutions
          </h1>
          <p style={{ color: "#5F5F5F", fontWeight: "400" }}>
            {title}
          </p>
        </TextContent>
      </div>
      <div style={{ margin: "auto 20px auto auto" }}>
        {isConfirmed &&
          <p style={{
            border: "none",
            padding: "8px",
            fontWeight: "500",
            background: "#B9E4F9",
            textAlign: "center",
            borderRadius: "15px"
          }}>
            Institutions Notified
          </p>
        }
      </div>
    </div>
  );
}

export default Banner;
