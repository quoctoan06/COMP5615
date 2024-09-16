import React from 'react';
import { Layout, theme } from 'antd';

import {
  ArrowLeftOutlined 
} from '@ant-design/icons';
import { Alert } from 'antd';

const {Sider} = Layout;

export default function MySider() {
    const {
        token: { colorBgContainer },
      } = theme.useToken();
      return(
        <Sider width={'30%'} style={{ background: colorBgContainer }}>
           <ArrowLeftOutlined style={{marginLeft:'40px',marginRight:'15px',display : 'inline-block',marginTop:'60px'}}/>
           <h1 style={{fontSize:'25px', lineHeight:'50px', display : 'inline',marginTop:'-30px',fontWeight:'700'}}>Estate of the late John Richards</h1>
           <p style={{marginLeft:'70px',marginTop:'-5px', color:'#9095A8',fontSize:'14px',fontWeight:'500'}}>Thomas Patrick O’Neill | #1242</p>
           <p style={{marginLeft:'40px',marginTop:'40px', color:'#9095A8',fontSize:'14px',fontWeight:'500'}}>Notifications</p>
           <Alert style={{border:'none', borderRadius:'6px', padding:'12px', marginLeft:'40px',width:'450px', height:'41px',background:'#BDE3FF',fontWeight:'500',fontSize:'14px', marginBottom:'10px'}} message="XXX time has passed" type="info" />
           <Alert style={{border:'none', borderRadius:'6px', padding:'12px', marginLeft:'40px',width:'450px', height:'41px',background:'#BDE3FF',fontWeight:'500',fontSize:'14px', marginBottom:'10px'}} message="XXX time has passed" type="info" /> <br />
           <p style={{padding:'0px, 43px, 0px, 0px', marginLeft:'40px',marginTop:'20px', color:'#9095A8',fontSize:'14px',fontWeight:'500'}}>Checklist</p><br/>
           <input style={{background:'#ffffff', border:'none',fontSize:'16px', marginLeft:'40px', display:'inline', textDecoration: 'underline', fontWeight:'400', width:'300px', color:"#000000"}} disabled value={'Add Client ID'}></input>
           <Alert message="Complete" style={{marginBottom:'32px', border:'none', borderRadius:'32px', marginLeft:'60px' ,padding:'3px',fontWeight:'500',width:'89px',background:'#D1EBC8',display:'inline-block',textAlign:'center'}} />
           <input style={{background:'#ffffff', border:'none',fontSize:'16px', marginLeft:'40px', display:'inline', textDecoration: 'underline', fontWeight:'400', width:'300px', color:"#000000"}} disabled value={'Add Death Certificate'}></input>
           <Alert message="Complete" style={{marginBottom:'32px', border:'none', borderRadius:'32px', marginLeft:'60px' ,padding:'3px',fontWeight:'500',width:'89px',background:'#D1EBC8',display:'inline-block',textAlign:'center'}} />
           <input style={{background:'#ffffff', border:'none',fontSize:'16px', marginLeft:'40px', display:'inline', textDecoration: 'underline', fontWeight:'400', width:'300px', color:"#000000"}} disabled value={'Add Will'}></input>
           <Alert message="Complete" style={{marginBottom:'32px', border:'none', borderRadius:'32px', marginLeft:'60px' ,padding:'3px',fontWeight:'500',width:'89px',background:'#D1EBC8',display:'inline-block',textAlign:'center'}} />
           <input style={{background:'#ffffff', border:'none',fontSize:'16px', marginLeft:'40px', display:'inline', textDecoration: 'underline', fontWeight:'400', width:'300px', color:"#000000"}} disabled value={'Add Beneficiary Details'}></input>
           <Alert message="In Progress" style={{marginBottom:'32px', border:'none', borderRadius:'32px', marginLeft:'60px' ,padding:'3px',fontWeight:'500',width:'89px',background:'#F1F4E1',display:'inline-block',textAlign:'center'}} />
           <input style={{background:'#ffffff', border:'none',fontSize:'16px', marginLeft:'40px', display:'inline', textDecoration: 'underline', fontWeight:'400', width:'300px', color:"#000000"}} disabled value={'Notify Institutions'}></input>
           <Alert message="Next" style={{marginBottom:'32px', border:'none', borderRadius:'32px', marginLeft:'60px' ,padding:'3px',fontWeight:'500',width:'89px',background:'#B9E4F9',display:'inline-block',textAlign:'center'}} />
           <input style={{background:'#ffffff', border:'none',fontSize:'16px', marginLeft:'40px', display:'inline', textDecoration: 'underline', fontWeight:'400', width:'300px', color:"#000000"}} disabled value={'Add Grant'}></input>
           <Alert message="Next" style={{marginBottom:'32px', border:'none', borderRadius:'32px', marginLeft:'60px' ,padding:'3px',fontWeight:'500',width:'89px',background:'#B9E4F9',display:'inline-block',textAlign:'center'}} />
           <input style={{background:'#ffffff', border:'none',fontSize:'16px', marginLeft:'40px', display:'inline', textDecoration: 'underline', fontWeight:'400', width:'300px', color:"#000000"}} disabled value={'Verify Assets'}></input>
           <Alert message="Not Started" style={{marginBottom:'32px', border:'none', borderRadius:'32px', marginLeft:'60px' ,padding:'3px',fontWeight:'500',width:'89px',background:'#E3E3E3',display:'inline-block',textAlign:'center'}} />
           <input style={{background:'#ffffff', border:'none',fontSize:'16px', marginLeft:'40px', display:'inline', textDecoration: 'underline', fontWeight:'400', width:'300px', color:"#000000"}} disabled value={'Collect Assets'}></input>
           <Alert message="Not Started" style={{marginBottom:'32px', border:'none', borderRadius:'32px', marginLeft:'60px' ,padding:'3px',fontWeight:'500',width:'89px',background:'#E3E3E3',display:'inline-block',textAlign:'center'}} />
           <input style={{background:'#ffffff', border:'none',fontSize:'16px', marginLeft:'40px', display:'inline', textDecoration: 'underline', fontWeight:'400', width:'300px', color:"#000000"}} disabled value={'Distribute'}></input>
           <Alert message="Not Started" style={{marginBottom:'32px', border:'none', borderRadius:'32px', marginLeft:'60px' ,padding:'3px',fontWeight:'500',width:'89px',background:'#E3E3E3',display:'inline-block',textAlign:'center'}} /><br/><br/>
           <input style={{background:'#ffffff', border:'none',fontSize:'16px', marginLeft:'40px', display:'inline', fontWeight:'400', width:'200px', color:"#000000"}} disabled value={'Settings'}></input>

        </Sider>
      )
}
