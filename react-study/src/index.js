import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Desc from './Desc';

ReactDOM.render(
  <React.StrictMode>
    <Header title={["React", "Start"]} nav_li={[
        { text: "Component", url: "./Component.html" },
        { text: "Props", url: "./Props.html" },
        { text: "State", url: "./State.html" }
      ]}/>
    <Desc />
  </React.StrictMode>,
  document.getElementById('root')
);