const host = '127.0.0.1'; // localhost
const port = 7000;

///////////////////////////////////////////////////////////////////////

// nodejs를 시작하는 방법
// https://nodejs.org/ko/ 에서 최신 버전 다운
// 작성한 js 파일을 node 명령어로 실행하면 준비 끝
// V8 크롬의 자바스크립트 엔진으로 빌드된다.
// V8엔진은 스크립트 문서(문자열을 그대로 프로그램으로 실행)를 컴파일한다.
console.log("nodejs 안녕");

///////////////////////////////////////////////////////////////////////
// DB server

// mysql server에 접속하는 방법
// mysql server 실행 ( net start mysql )
// mysql conector library를 다운받아야 한다. ( npm i mysql ( mysql server ver.5 까지 지원, 5버전 이상의 문법을 사용할 수 없다. ) )
// require(`mysql`)로 다운받은 library를 사용한다.
// npm mysql로 사용법 확인
const mysql = require(`mysql`);

// 접속준비
const connection = mysql.createConnection({
  host: host,
  port: 3306,
  user: 'root',
  password: '0000',
  database: 'test',
});

// 아래 error msg 발생
// Client does not support authentication protocol requested by server; consider upgrading MySQL client

// 해결방법
// ALTER USER ‘root’@’localhost’ IDENTIFIED WITH mysql_native_password BY ‘사용할패스워드’
// FLUSH PRIVILEGES

let productList = null;
connection.connect(function(err) {
  if(err) throw err;
  else console.log(`DB서버가 연결되었습니다.\nhost : ${this._config.host}, port : ${this._config.port}, user : ${this._config.user}\n`);

  connection.query("SELECT * FROM `product`",(err,result,fields) => {
    if(err) throw err;
    productList = result;
    connection.end(err => { if(err) throw err }); // DB연결 해제
  });
});

///////////////////////////////////////////////////////////////////////
// WEB server

// http 연결
// require(nameStr) : nodejs가 가지고있는 module(nameStr)의 api를 가지고 온다.
// http를 이루는 가장 중요한 객체는 request, response
// 서버 안에서 가장 중요한 것은 사용자의 요청(request)에 따라 서버가 응답을 다르게 하는 것이다.
// 응답을 다르게 하기 위해서 DB의 내용을 요청에 따라 응답(response)을 바꾸는 것이 백엔드가 하는 일이다.
const http = require('http');
// console.log(http);

// 서버 생성
const server = http.createServer((req,res)=>{
  res.statusCode = 200;
  res.setHeader('Content-Type','text/html;charset=utf-8');

  // response product page print
  let productList_e = "<ol>"
  productList.forEach(element => {
    productList_e += "<li><ul>"
    for(key in element) {
      // productList_e += "<li>"+key+" : " + element[key] + "<br>"
      productList_e += `<li>${key} : ${element[key]}</li>`
    }
    productList_e += "</ul></li>";
  });
  productList_e +="</ol>"

  let div_e = `
    <div>
      <h2>frontend_study.product 출력</h2>
      <div>${productList_e}</div>
    </div>
  `;

  res.write(`<h1>Javascript nodejs response</h1>`+div_e);
  res.end();
});

// serverObj.listen : 서버 실행
// serverObj.listen(port, hostName, callback function)
// callback function : 서버 실행 후 실행되는 함수
server.listen(port,host,()=>{
  console.log(`서버가 실행되었습니다\nhost : ${host}, port : ${port}\n`);
});