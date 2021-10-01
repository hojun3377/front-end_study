import React from "react";

// function Clock(){} // 함수는 react함수로 자바스크립트 함수가 아니다.
// Clock.__proto__ = React.prototype; // 이런 형태의 함수로 추측

class Clock extends React.Component {

  constructor(props) {
    super(props);
    // setState({dateText: ...}) // 컴포넌트가 출력된 후 setState로 변경
    // Clock 객체의 property로 state 설정
    this.state = {
      dateText : new Date().toLocaleTimeString()
    };

    // ref: https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
    // constructor 컴포넌트를 사용하는 다른 컴포넌트 수 만큼 실행된다.
    // {indexjs, header.js}
    // window.setInterval(()=>this.setDateText(), 1000);
  }
  
  // componentDidMount는 브라우저 화면에 컴포넌트가 출력된 후 실행된다.
  componentDidMount() {
    this.dateInterval = setInterval(()=> {
      // console.log("Clock 실행중");
      this.setState({dateText: new Date().toLocaleTimeString()});
    }, 1000);
  }

  // componentWillUnmount는 해당 컴포넌트가 제거될 때, 제거되기 전에 실행된다.
  componentWillUnmount() {
    clearInterval(this.dateInterval);
    console.log("Clock이 삭제되었습니다.");
  }

  // React.render()를 overriding
  render() {
    return (
      <div>
        <span>{this.state.dateText}</span>
      </div>
    );
  }
}

export default Clock;