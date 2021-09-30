function Desc() {
  return (
    <ul>
      <li>비쥬얼 스튜디오 code 설치</li>
      <li>node.js npm 웹팩을 설치 (최신버전)</li>
      <li>cmd (명령 프롬프트, terminal)</li>
      <li>node --version 설치 확인</li>
      <li>cd tab 으로 react app 설치할 경로를 찾으세요</li>
      <li>터미널에 설치할 폴더를 드래그해서 넣으세요.</li>
      <li>window: npx create-react-app my-app(이름)</li>
      <li>linux: sudo npx create-react-app my-app(이름)</li>
      <br />
      <li>리액트는 독자적인 element(jsx)를 구성한다.</li>
      <li>리액트의 element는 html element로 render로 다시 출력되기 때문에 그 구성이 비슷하다.</li>
      <li>자바스크립트에서 html element를 불러올 때 사용하는 이름과 비슷하다.</li>
      <li>react는 함수가 완전한 형태이길 원한다. return을 구현해야한다.</li>
      <li>react는 함수도 javascript 함수와 다른 함수 구성을 사용한다.</li>
      <li>Component Hedaer 매개변수 props는 약속된 값이고 props Component가 렌더링될 때 어떻게 구성될 것인지를 결정</li>
      <li>App, Header는 react Component라 부른다.</li>
      <li>Component는 element로 구성된 도구( ex. 일정 memo ) =&gt; 개발자가 정의</li>
      <li>ReactDOM.render()는 컴포넌트를 렌더링하는 함수이다.</li>
      <li>ReactDOM으로 html 유사 element다 ( HTMLDOM x )</li>
      <li>react는 jsx의 li element를 배열에서 출력할 때 꼭 unique한 key 를 줘야한다. ( rule )</li>
    </ul>
  );
}

export default Desc;
