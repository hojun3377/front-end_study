const header = <h1>React</h1>
const reactBasicDesc = 
  <ul>
    <li>리액트는 모바일 어플리케이션과 비슷한 UI를 제공하기 위한 Web Application 제작 도구이다.</li>
    <li>리액트는 자바스크립트를 기반으로 reactjavascript와 reactDOM을 제작해서 제공</li>
    <li>reactDOM은 reactjavascript안에서 JSX라는 문법으로 html 구문을 제작할 수 있다.</li>
    <li>빌드된 리액트로 만든 어플은 html css js 파일로 되어있다.</li>
    <li>리액트에서 함수와 클래스는 컴포넌트를 제작하기 위한 객체이고 컴포넌트( Component )는 UI를 구성하는 한 부분이다. ( ex. button, nav, form, ... )</li>
  </ul>
const reactMecha = 
  <ul>
    <li>
      리액트는 root component가 여러 컴포넌트를 호출하여 reactDOM을 구성
      <br/>화면에 render할 수 있는 htmlDOM을 만들고 출력한다. ( ReactDOM.render() )
    </li>
    <li>이때, component에게 초기값을 매개변수 props로 줄 수 있다.</li>
    <li>props는 수정불가한 초기값으로 컴포넌트가 렌더링할 때만 호출되길 기대한다.</li>
    <li>props로 화면에 출력된 값은 바뀌지 않는다.</li>
  </ul>