import React from 'react'
import { useState } from 'react';

const preList1=[
    {id:1,
     name:"Commonwealth Bank",
     Img:"./img/common.png",
     des:"",
     isSelect:false,
    },
    {id:2,
        name:"National Australia Bank",
        Img:"./img/NAB.png",
        des:"",
        isSelect:false,
       },
       {id:3,
        name:"Australia and NZ Bank",
        Img:"./img/AANZB.png",
        des:"",
        isSelect:false,
       },
       {id:4,
        name:"Westpac",
        Img:"./img/West.png",
        des:"",
        isSelect:false,
       },
]

const preList2=[
    {
    id:1,
    name:"BHP Billiton",
    Img:"./img/West.png",
    des:"Share Registry",
    isSelect:false,
    },
    {
        id:2,
        name:"Telstra",
        Img:"./img/West.png",
        des:"Share Registry",
        isSelect:false,
        },
]

export function List(){
    const [list1, setList1] = useState(preList1);
    const [list2, setList2] = useState(preList2);

    const click = (id, listType) => {
        if(listType === "list1") {
            const updatedList = list1.map(item => 
                item.id === id ? {...item, isSelect: !item.isSelect} : item
            );
            setList1(updatedList);
        } else if(listType === "list2") {
            const updatedList = list2.map(item => 
                item.id === id ? {...item, isSelect: !item.isSelect} : item
            );
            setList2(updatedList);
        }
    }


  return (
    <div className="common-inst">                    
        <h2>Common Institutions</h2>                  
        <h4>Common Institutions</h4> 

        <ul className='list'>
         {list1.map((info)=>
         <li className={`listItem ${info.isSelect ? "selected" : ""}`} 
         onClick={() => click(info.id, "list1")}>
            <img className='listImg' src={info.Img} alt="img" /> 
            {info.name}
       
         </li>)}
        
        </ul>      
        <h4>Common Institutions</h4>
        <ul className='list'>
         {list2.map((info)=>
         <li className={`listItem ${info.isSelect ? "selected":""}`} 
         onClick={() => click(info.id, "list2")}>
            <img className='listImg' src={info.Img} alt="img" /> 
            {info.name}
            <span className='description'>{info.des}</span>
       
         </li>)}
        
        </ul>              
                   
    </div>
  )
}

export default List