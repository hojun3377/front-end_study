import { useState } from "react";
import Clock from "./Clock";

function Header(props) {
  // const state = useState(default);
  // state[0] = default, state[1] = setDefault()
  const [title, setTitle] = useState(props.title.join(" "));
  const [style, setStyle] = useState({color: "blue"});
  const [clockMount, setClockMount] = useState(true);
  const navLiEls = [];
  const liClickHandler = function(e, i) {
    console.log(e.target.href.split("#")[1]);
  };

  props.nav_li.forEach((el,i) => {
    navLiEls.push(
      <li key={i}>
        <a href={el.url} onClick={(e)=>liClickHandler(e,i)}>{el.text}</a>
      </li>
    );
  });

  // console.log(this); // undefined

  const titleClick = function() {
    setStyle({
      color: "red",
      border: "1px solid",
      borderColor: "green"
    });
    setTitle("타이틀 클릭");
  }

  const toggleClock = function() {
    setClockMount(!clockMount);
  }
  
  return (
      <header>
        <h1 style={style} onClick={titleClick}>{title}</h1>
        <nav>
          <ul>
            {navLiEls}
          </ul>
        </nav>
        {clockMount && <Clock />}
        <button onClick={toggleClock}>clock toggle</button>
      </header>
  )
}

export default Header;