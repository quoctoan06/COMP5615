import React from 'react'
import {TextContent} from "@cloudscape-design/components";


export function Header(){
  return (
    <header>
      <TextContent >
        <img className="logo" src="./img/logo.png" alt="logo" />
      </TextContent>
      </header>
  )
}

export default Header