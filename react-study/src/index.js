import React ,{ Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import './index.scss';

import Calculator from './calculator/Calculator';
import Dropdown from './dropdown/DropdownComponent'

class Index extends Component {
  constructor(props) {
    super(props);
    let element = <><h1>안녕!</h1></>;
    this.state = {
      component: element
    };
  }
  
  componentDidMount() {
    // 바닐라 자바스크립트는 컴포넌트가 마운트된 시점에 작성하면 된다.
    // document.querySelector("a").onclick = function() {alert(this)};
  }

  navClickHaner(e){
    // 주소 찾기
    // alert(e.target.href.split("#")[1]); // 좋지 않은 방법
    // console.log(e.target.dataset.component);
    // alert(e.target.dataset.component); // 좋은 방법

    let a_link = e.target.dataset.component;
    let element=<></>; //<></> 아무것도 없는태그
    // <Calculator></Calculator> //Calculator는 import 하는 Component를 참조하는 변수
    //<"Calculator"></"Calculator"> //문자열이 Compoent를 참조하는 이름을 대신할 수 없다.
    //React.createElement(Calculator,null);
    if(a_link === "Acomp"){
      element=<Acomp></Acomp>;
    }
    else if(a_link === "Bcomp"){
      element=<Bcomp></Bcomp>;
    }
    else if(a_link === "Ccomp"){
      element=<Ccomp></Ccomp>;
    }
    else if(a_link === "Calculator"){
      element=<Calculator></Calculator>;
    }
    else if(a_link === "Dropdown"){
      element=<Dropdown></Dropdown>;
    }

    console.log("ddd");

    this.setState({
      component: element
    });
  }
  
  render() {
    return (
      <React.StrictMode>
        <Navcomp clickHandler={this.navClickHaner.bind(this)} />
        <h2>조건문으로 SPA 구현</h2>
        <div>
          {this.state.component}
        </div>
        <hr/>
        <Navcomp_route/>
        <h2>Router로 다른페이지 component 호출 ( SPA (X) )</h2>
        <p>a 태그와 비슷한 link로 라우터의 주소를 호출하면 SPA로 동작한다.</p>
        <BrowserRouter>
          {/* <Route path="/" component={this}></Route> */}
          <Route path="/Acomp" component={Acomp}></Route>
          <Route path="/Bcomp">
            <Bcomp></Bcomp>
          </Route>
          <Route path="/Ccomp" component={Ccomp}></Route>
          <Route path="/Calculator" component={Calculator}></Route>
          <Route path="/Dropdown" component={Dropdown}></Route>
        </BrowserRouter>
        <hr/>
        <BrowserRouter>
          <Navcomp_link/>
          <Switch>
            <Route path="/Acomp" component={Acomp}></Route>
            <Route path="/Bcomp">
              <Bcomp></Bcomp>
            </Route>
            <Route path="/Ccomp" component={Ccomp}></Route>
            <Route path="/Calculator" component={Calculator}></Route>
            <Route path="/Dropdown" component={Dropdown}></Route>
            <Route path="/" exact>
              <h2>환영합니다 home 페이지 입니다.</h2>
              <p>root 주소를 호출했습니다.</p>
              <ul>
                <li>root url/~~~ 1영역/~~~~2영역/</li>
                <li>root url/ , root url/Acomp, root url/Bcomp : 영역</li>
                <li>route는 주소를 요청하면 해당 영역의 포함되는 주소를 모두 호출한다. (ex. /Bcomp =&gt; /, /Bcomp</li>
                <li>포함되는 주소에 exact를 추가하면 중첩되지 않는다.</li>
                <li>라우터에 Switch를 사용하면 포함되는 모든 주소를 찾지 않고 일치하는 주소를 찾으면 멈춘다.</li>
                <li>라우터의 Switch를 사용하면 포함되는 모든 주소를 찾지 않고 일치하는 주소를 찾으면 멈춘다. ( break )</li>
                <li>실제로 존재하지 않는 주소를 입력하면 가장 마지막의 Route에서 break 된다.</li>
              </ul>
            </Route>
            <Route>
              <h1>404 없는 페이지를 요청했습니다.</h1>
            </Route>
          </Switch>
        </BrowserRouter>
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
  return (
    <div className="navigation-container">
      <h1>Nav 컴포넌트</h1>
      <ul>
        {/* href에 주소로 #을 사용하면 html 문서에서 #id를 찾는다. ( 화면 새로고침 X ) */}
        {/* <li><a onClick={props.clickHandler} data-component="Acomp" href="">Acomp</a></li> */}
        <li><a onClick={props.clickHandler} data-component="Acomp" href="#Acomp">Acomp</a></li>
        <li><a onClick={props.clickHandler} data-component="Bcomp" href="#Bcomp">Bcomp</a></li>
        <li><a onClick={props.clickHandler} data-component="Ccomp" href="#Ccomp">Ccomp</a></li>
        <li><a onClick={props.clickHandler} data-component="Calculator" href="#Calculator">Calculator</a></li>
        <li><a onClick={props.clickHandler} data-component="Dropdown" href="#Dropdown">Dropdown</a></li>
      </ul>
    </div>
  )
}
function Navcomp_route() {
  return (
    <div className="navigation-container">
      <h1>Route 컴포넌트( 컴포넌트를 주소로 요청 = 화면 새로고침 )</h1>
      <ul>
        <li><a href="/">Root</a></li>
        <li><a href="/Acomp">Acomp</a></li>
        <li><a href="/Bcomp">Bcomp</a></li>
        <li><a href="/Ccomp">Ccomp</a></li>
        <li><a href="/Calculator">Calculator</a></li>
        <li><a href="/Dropdown">Dropdown</a></li>
      </ul>
    </div>
  )
}
function Navcomp_link() {
  return (
    <div className="navigation-container">
      <h1>Link로 Route 컴포넌트 호출( 컴포넌트를 주소로 요청 = SPA )</h1>
      <ul>
        <li><Link to="/">Root</Link></li>
        <li><Link to="/Acomp">Acomp</Link></li>
        <li><Link to="/Bcomp">Bcomp</Link></li>
        <li><Link to="/Ccomp">Ccomp</Link></li>
        <li><Link to="/Calculator">Calculator</Link></li>
        <li><Link to="/Dropdown">Dropdown</Link></li>
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
