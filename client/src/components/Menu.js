import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Menu = ({menuShow})=>{
  const history = useHistory();

  const openMenu = (url)=>{
    history.push(url);
  }

  return (
    <div className={`app-menu ${menuShow === true ? "app-menu-show" : "app-menu-hide"}`}>
      <button onClick={()=>openMenu('')}>Home</button>
      <button onClick={()=>openMenu('analytics')}>Dashboard</button>
      <button onClick={()=>openMenu('list')}>List</button>
    </div>
  )
}

export default Menu;