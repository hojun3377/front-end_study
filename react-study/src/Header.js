function Header(props) {
  const navLiEls = [];

  props.nav_li.forEach((el,i) => {
    navLiEls.push(
      <li key={i}>
        <a href={el.url}>{el.text}</a>
      </li>
    );
  });
  
  return (
      <header>
        <h1>{props.title.join(" ")}</h1>
        <nav>
          <ul>
            {navLiEls}
          </ul>
        </nav>
      </header>
  )
}

export default Header;