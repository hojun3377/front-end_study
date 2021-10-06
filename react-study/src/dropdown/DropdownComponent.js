import React, { Component } from 'react'
import './dropdown.js'
import './dropdown.scss'

export class DropdownComponent extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isActive: false
  //   };
  // }
  
  render() {
    return (
      <div className="dropdownContainer">
        <h2>Dropdown Menu</h2>
        <div className="dropdown-hover">
          <a className="link" href="#title">hoverDropdown ( default )</a>
          <ul className="menu">
            <li><a href="#calculator">계산기</a></li>
            <li><a href="#dropdown">드롭다운</a></li>
            <li><a href="#side_nav">사이드 네비게이션</a></li>
            <li><a href="#top_nav">탑 네비게이션</a></li>
          </ul>
        </div>
        <hr />
        <div className="dropdown-active">
          <a className="link" href="#title">hoverDropdown ( active )</a>
          <ul className="menu">
            <li><a href="#calculator">계산기</a></li>
            <li><a href="#dropdown">드롭다운</a></li>
            <li><a href="#side_nav">사이드 네비게이션</a></li>
            <li><a href="#top_nav">탑 네비게이션</a></li>
          </ul>
        </div>
        <div className="dropdown-active">
          <a className="link" href="#title">hoverDropdown ( active )</a>
          <ul className="menu">
            <li><a href="#calculator">계산기</a></li>
            <li><a href="#dropdown">드롭다운</a></li>
            <li><a href="#side_nav">사이드 네비게이션</a></li>
            <li><a href="#top_nav">탑 네비게이션</a></li>
          </ul>
        </div>
      </div>
      
    )
  }
}

export default DropdownComponent
