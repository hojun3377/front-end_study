// import React from 'react';
// import ReactDOM from 'react-dom';
// import Header from './Header';
// import Desc from './Desc';
// import Dropdown from './dropdown/DropdownComponent';
// import Calculator from './Calculator';

// ReactDOM.render(
//   <React.StrictMode>
//     <Header title={["React", "Start"]} nav_li={[
//         { text: "Component", url: "#component" },
//         { text: "Props", url: "#props" },
//         { text: "State", url: "#state" },
//         { text: "계산기", url: "#calculator"}
//       ]}/>
//     <Desc />
//     <Dropdown />
//     <Calculator />
//   </React.StrictMode>,
//   document.getElementById('root')
// );


import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import Dropdown from './dropdown/DropdownComponent'
import Calculator from './calculator/Calculator';
import reportWebVitals from './reportWebVitals';

document.a

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      main_component: <></>
    }
  }
  
  componentDidMount() {
    // 바닐라 자바스크립트는 컴포넌트가 마운트된 시점에 작성하면 된다.
    // document.querySelector("a").onclick = function() {alert(this)};
  }

  navClickHandler(e) { // e는 react가 전달해주는 약속된 매개변수 event
    // alert(e.target.href.split("#")[1]); // 좋지 않은 방법
    console.log(e.target.dataset.component);
    // alert(e.target.dataset.component); // 좋은 방법
  }
  
  render() {
    return (
      <React.StrictMode>
        <Navcomp clickHandler={this.navClickHandler}></Navcomp>
        <main>
          {this.state.main_component}
        </main>
        {/* <Acomp></Acomp>
        <Bcomp></Bcomp>
        <Ccomp></Ccomp>
        <Dropdown />
        <Calculator /> */}
      </React.StrictMode>
    )
  }
}

function Acomp() {
  return (
    <div>
      <h1>Acomp 컴포넌트</h1>
    </div>
  )
}

function Bcomp() {
  return (
    <div>
      <h1>Bcomp 컴포넌트</h1>
    </div>
  )
}

function Ccomp() {
  return (
    <div>
      <h1>Ccomp 컴포넌트</h1>
    </div>
  )
}

function Navcomp(props) {
  console.log(props)
  return (
    <div>
      <h1>Nav 컴포넌트</h1>
      <ul>
        {/* href에 주소로 #을 사용하면 html 문서에서 #id를 찾는다. ( 화면 새로고침 X ) */}
        <li><a onClick={props.clickHandler} href="#Acomp" data-component="Acomp">Acomp</a></li>
        <li><a onClick={props.clickHandler} href="#Bcomp">Bcomp</a></li>
        <li><a onClick={props.clickHandler} href="#Calculator">Calculator</a></li>
        <li><a onClick={props.clickHandler} href="#Ccomp">Ccomp</a></li>
      </ul>
    </div>
  )
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
