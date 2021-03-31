# Front-end Study

## Internet이란?
인터넷은 컴퓨터로 연결하여 TCP/IP(Transmission Control Protocol/Internet Protocol)라는 통신 프로토콜을 이용해 정보를 주고받는 컴퓨터 네트워크이다.
요약하자면, '컴퓨터로 연결된 네트워크들의 집합체'.
<p align="center">
  <img src="https://mdn.mozillademos.org/files/8453/internet-schema-7.png" alt="Internet Structure"/>
</p>

## HTTP란?
**Hyper Text Transfer Protocol**.   
W3 상에서 정보를 주고받을 수 있는 OSI 모델(Open Systems Interconnection Reference Model)에서 응용 계층(Application Layer)의 프로토콜 중 하나이며, 클라이언트와 서버 사이에 이루어지는 요청/응답(request/response) 프로토콜이다. 주로 TCP(Transmission Control Protocol)를 사용하고 HTML/3부터는 UDP(User Datagram Protocol)를 사용하며, 80번 포트를 사용한다. HTTP를 통해 전달되는 자료는 http:로 시작하는 URL(Uniform Resource Locator, 인터넷 주소)로 조회할 수 있다.

## HTTP Message
서버와 클라이언트 간에 데이터가 교환되는 방식.
### 구조
<table>
  <tr>
    <td align="center">Request Line | Response Status Line</td>
  </tr>
  <tr>
    <td align="center">Header</td>
  </tr>
  <tr>
    <td align="center">Empty Line</td>
  </tr>
  <tr>
    <td align="center">Body</td>
  </tr>
</table>

### HTTP Request Method
- GET: Server에 Resource 요청 (Read)
- HEAD: GET과 동일하지만, body는 반환하지 않는다. (즉, Header만 반환) 웹서버의 다운 여부, 웹서버 정보를 얻기위해 사용될 수 있다.
- POST: Client에서 Sever로 Resource를 전송하여 new Resource를 생성한다. (Create)
- PUT: Request Payload를 이용하여 Sever에 new Resource를 생성하거나, target resource를 대체한다. (Update)
- DELETE: target Resource를 삭제한다. (Delete)
- CONNECT: Request Resource에 대해 Server와 양방향 통신을 시작한다. 예를들어 SSL(Secure Sockets Layer)를 사용하는 웹사이트 접속에 사용될 수 있다. 또한, hop by hop 메서드이다.
- OPTIONS: target Resource와의 통신 옵션을 설명하기 위해 사용한다.
- PATCH: Resource의 부분적인 수정을 할 때 사용한다. PUT Method는 Resource 전체를 교체한다는 점에서 차이점이 있다.
- TRACE: target Resource의 경로를 따라 메시지 loop-back 테스트를 합니다.

|HTTP Method|Request has Body|Response has Body|Idenpotent|
|:---:|:---:|:---:|:---:|
|**GET**|*Optional*|Yes|Yes|
|**HEAD**|*Optional*|No|Yes|
|**POST**|Yes|Yes|No|
|**PUT**|Yes|Yes|Yes|
|**DELETE**|*Optional*|Yes|Yes|
|**CONNECT**|*Optional*|Yes|No|
|**OPTIONS**|*Optional*|Yes|Yes|
|**PATCH**|Yes|Yes|No|
|**TRACE**|No|Yes|Yes|

### PUT vs POST
PUT은 POST와 다르게 멱등성(Idempotent, 연산을 여러 번 적용하더라도 결과가 달라지지 않는 성질)을 지닌다. 때문에 PUT Method는 동일한 request를 반복해서 보내더라도 결과가 달라지지 않지만, POST는 동일한 Request를 반복해서 보내면 new Resource가 반복해서 생성된다.

### HTTP Status Code
|Code|Message|Description|
|:---:|:---:|:---:|
|1xx|Informational(정보)|정보 교환|
|100|Continue|클라이언트로부터 일부 요청을 받았으니 나머지 요청 정보를 계속 보내주길 바람.|
|2xx|Success(성공)|데이터 전송이 성공적으로 이루어졌거나, 이해되었거나, 수락되었음.|
|200|OK|오류 없이 전송 성공.|
|3xx|Redirection(방향 바꿈)|자료의 위치가 바뀌었음.|
|301|Moved Permanently|요구한 데이터를 변경된 URL에서 찾았음. 예를들어 웹사이트의 도메인을 변경했거나, 새로운 URL 구조로 개편했을 때 사용. 검색엔진의 기존 URL이 새로운 URL로 변경.|
|302|Found|요구한 데이터가 변경된 URL에 있음을 명시. 301과 비슷하지만 새 URL은 임시 저장 장소로 해석됨. 검색엔진의 기존 URL은 그대로 유지하고, 컨텐츠만 새로운 URL에서 조회.|
|4xx|Client Error(클라이언트 오류)|클라이언트 측의 오류. 주소를 잘못 입력하였거나 요청이 잘못 되었음.|
|400|Bad Request|요청 실패. 문법상 오류가 있어서 서버가 요청사항을 이해하지 못함.|
|401|Unauthorized|권한 없음.|
|403|Forbidden|요청 거부. 금지|
|404|Not Found|문서를 찾을 수 없음. 서버가 요 청한 파일이나 스크립트를 찾지 못함.|
|405|Method not allowed|메서드 허용 안됨. 예를들어 POST 방식만 지원하는 뷰에 GET 요청을 한 경우.|
|5xx|Server Error(서버 오류)|서버 측의 오류로 올바른 요청을 처리할 수 없음.|
|500|Internal Server Error|서버 내부 오류.|

### 예시
<p align="center">
  <img src="https://mdn.mozillademos.org/files/13827/HTTPMsgStructure2.png" alt="HTTP Message Structure"/>
</p>

## Roadmap
[github.com/kamranahmedse/developer-roadmap](https://github.com/kamranahmedse/developer-roadmap)

## Reference
[위키백과 - Internet](https://ko.wikipedia.org/wiki/%EC%9D%B8%ED%84%B0%EB%84%B7)   
[MDN - 인터넷은 어떻게 동작하는가?](https://developer.mozilla.org/ko/docs/Learn/Common_questions/How_does_the_Internet_work)   
[위키백과 - HTTP](https://ko.wikipedia.org/wiki/HTTP)   
[MDN - HTTP 메시지](https://developer.mozilla.org/ko/docs/Web/HTTP/Messages)   
[MDN - HTTP 요청 메서드](https://developer.mozilla.org/ko/docs/Web/HTTP/Methods)   
[MDN - HTTP 상태 코드](https://developer.mozilla.org/ko/docs/Web/HTTP/Status)