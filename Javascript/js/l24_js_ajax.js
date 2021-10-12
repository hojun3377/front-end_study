// request : 통신용어로 서버에 특정페이지(url) 요청(GET)할 때 생성하는 객체
// response : 요청한 결과를 받아온 객체

// XMLHttpRequest : 자바스크립트에서 특정페이지를 비동기식으로 요청할 때 사용하는 객체
// XMLHttpRequest.responseText : 요청한 페이지의 본문
const req = new XMLHttpRequest(),
      url = "l24_load_body.html",
      method = "GET";

loadRoot.onclick = () => {
  req.open(method,url);

  req.onreadystatechange = function() {
    if(req.readyState === XMLHttpRequest.DONE) {
      if(req.status === 200) {
        console.log(req.response);
        printRoot.innerHTML = req.response;
      }
      else if(req.status === 404) {
        printRoot.innerHTML = `<h2>${req.status} Error : Not Found HTML Page`;
      }
    }
  };

  req.send();
}