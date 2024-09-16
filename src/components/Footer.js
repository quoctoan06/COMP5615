import React from "react";
import { Button } from "@cloudscape-design/components";
export function Footer({ goNext }) {
  return (
    <div className="bottom-btn">
      <Button> Save for Later </Button>
      <Button variant="primary" onClick={goNext}>
        {" "}
        Continue{" "}
      </Button>
    </div>
  );
}

export default Footer;
