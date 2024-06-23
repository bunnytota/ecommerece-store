import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import GridViewIcon from '@mui/icons-material/GridView';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import Link from 'next/link';
const Menubar = () => {
  return (
    <>
      <div className="container">
        <div className="tabs1">
          <input type="radio" id="radio-1" name="tabs" defaultChecked />
          <label  className="tab" htmlFor="radio-1" ><HomeIcon/>Home{/*<span className="notification">2</span>*/}</label>
          
          <input type="radio" id="radio-2" name="tabs" />
          <label className="tab" htmlFor="radio-2"><GridViewIcon/>Catagory</label>
          <input type="radio" id="radio-3" name="tabs" />
          <label className="tab" htmlFor="radio-3"><UpdateOutlinedIcon/>Update</label>
          <span className="glider"></span>
          <input type="radio" id="radio-4" name="tabs" />
          <label className="tab" htmlFor="radio-4" ><CommentOutlinedIcon/>message</label>
          
        </div>
      </div>
    </>
  );
}

export default Menubar;
