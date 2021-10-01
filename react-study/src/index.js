import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Desc from './Desc';
import Calculator from './Calculator';

ReactDOM.render(
  <React.StrictMode>
    <Header title={["React", "Start"]} nav_li={[
        { text: "Component", url: "#component" },
        { text: "Props", url: "#props" },
        { text: "State", url: "#state" },
        { text: "계산기", url: "#calculator"}
      ]}/>
    <Desc />
    <Calculator />
  </React.StrictMode>,
  document.getElementById('root')
);