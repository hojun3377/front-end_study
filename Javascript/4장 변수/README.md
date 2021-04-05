# 4장 변수
   
## 변수
**하나의 값을 저장하기 위해 확보한 메모리 공간 자체** 또는 **그 메모리 공간을 식별하기 위해 붙인 이름**이다.   
간단히 말하자면, **값의 위치를 가리키는 상징적인 이름**이다.


## 식별자
**어떤 값을 구별해서 식별할 수 있는 고유한 이름**을 말한다.   
식별자는 **값이 아니라 메모리 주소를 기억**한다. 즉, 식별자는 **메모리 주소에 붙인 이름** 이라고 할 수 있다.   

   
## 변수 선언
자바스크립트는 변수 선언시 **var**, **let**, **const** 키워드를 사용한다.

### 키워드 (keyword)
자바스크립트 코드를 해석하고 실행하는 자바스크립트 엔진이 수행할 동작을 규정한 일종의 명령이다.   
예를들어, var 키워드를 만나면 자바스크립트 엔진은 뒤에 오는 변수 이름으로 새로운 변수를 선언한다.

### 자바스크립트 엔진의 변수 선언
변수 선언은 총 2단계를 거쳐 수행한다.
   
 1. 선언단계: 변수 이름을 등록하여 자바스크립트 엔진에 변수의 존재를 알린다.
 2. 초기화 단계: 값을 저장하기 위한 메모리 공간을 확보하고 암묵적으로 undefined를 할당해 초기화한다.

~~~
var score; // 변수 선언
~~~  
이때, score에는 undefined라는 값이 암묵적으로 할당되어 초기화된다. 이는 C언어와 Java와 같은 언어의 변수선언과는 다른점을 보이는데, 자바스크립트의 var 키워드는 암묵적으로 초기화를 수행하므로 변수 선언시 초기화 단계를 거치지 않은 상태에서 변수 값을 참조할 때 쓰레기값(garbage value)이 나오는 위험으로부터 안전하다.   

### 참조 에러 (ReferenceError)
선언하지 않은 식별자에 접근 시 나타나는 에러이다.   
![ReferenceError Image](/Javascript/img/ch4.ReferenceError.png)   
실습: [ReferenceError.js](./ReferenceError.js)

### 변수 호이스팅 (variable hoisting)
자바스크립트 엔진의 변수 선언은 런타임(runtime, 소스코드가 한 줄씩 순차적으로 실행되는 시점) 이전단계에서 실행된다. 때문에 변수를 참조하는 코드가 변수 선언보다 앞에있어도, 참조에러(ReferenceError)가 발생하는 것이 아니라, undefined 값을 참조한다. 이처럼 **변수 선언문이 코드의 선두로 끌어 올려진 것처럼 동작하는 자바스크립트 고유의 특징**을 변수 호이스팅(variable hoisting)이라 한다.   
실습: [hoisting.js](hoisting.js)


## 값의 할당
값의 할당은 변수 선언과는 다르게 런타임(runtime)에 실행된다.   
변수에 값을 할당할 때는 이전 값인 undefined가 저장되어 있던 메모리 공간을 지우고 그 메모리 공간에 할당 값을 새롭게 저장하는 것이 아니라 **새로운 메모리 공간을 확보하고 그곳에 할당 값을 저장**한다.   
실습: [assignment_1.js](assignment_1.js), [assignment_2.js](assignment_2.js), [assignment_3.js](assignment_3.js)   

### 가비지 콜렉터 (garbage collector)
가비지 콜렉터는 애플리케이션이 할당(allocate)한 메모리 공간을 주기적으로 검사하여 더 이상 사용되지 않는 메모리를 해제(release)하는 기능을 말한다. 자바스크립트는 가비지 콜렉터를 내장하고 있는 매니지드 언어(managed language)로서 콜렉터를 통해 메모리 누수(memory leak)를 방지한다.

### 언매니지드 언어(unmanaged language)와 매니지드 언어(managed language)
프로그래밍 언어는 메모리 관리 방식에 따라 언매니지드 언어와 매니지드 언어로 분류할 수 있다.   
C언어와 같은 언매니지드 언어는 개발자가 명시적으로 메모리를 할당하고 해제하기 위해 malloc()과 free()같은 low-level 메모리 제어 기능을 제공한다. 이를 통해 개발자는 최적의 성능을 확보할 수 있지만, 치명적 오류를 생산할 가능성도 있다.   
반대로 자바스크립트 같은 매니지드 언어는 메모리 관리 기능을 언어 차원에서 담당하고 개발자의 직접적인 메모리 제어를 허용하지 않는다. 때문에 개발자의 역량에 의존하는 부분이 상대적으로 작아져 일정한 생산성을 확보할 수 있다는 장점이 있지만 성능 면에서 어느 정도의 손실은 감수할 수밖에 없다.
   
   
## 식별자 네이밍 규칙
 - 식별자는 특수문자를 제외한 문자, 숫자, 언더스코어(_), 달러 기호($)를 포함할 수 있다.
 - 단, 식별자는 특수문자를 제외한 문자, 언더스코어(_), 달러 기호($)로 시작해야 한다. (**숫자로 시작하는 것은 허용하지 않는다.**)
 - 예약어는 식별자로 사용할 수 없다.

실습: [identifierNamingRules.js](identifierNamingRules.js)

### 예약어

<table>
  <tr>
    <td align="center">await</td>
    <td align="center">break</td>
    <td align="center">case</td>
    <td align="center">catch</td>
    <td align="center">class</td>
    <td align="center">const</td>
  </tr>
  <tr>
    <td align="center">continue</td>
    <td align="center">debugger</td>
    <td align="center">default</td>
    <td align="center">delete</td>
    <td align="center">do</td>
    <td align="center">else</td>
  </tr>
  <tr>
    <td align="center">enum</td>
    <td align="center">export</td>
    <td align="center">extends</td>
    <td align="center">false</td>
    <td align="center">finally</td>
    <td align="center">for</td>
  </tr>
  <tr>
    <td align="center">function</td>
    <td align="center">if</td>
    <td align="center">implements*</td>
    <td align="center">import</td>
    <td align="center">in</td>
    <td align="center">instanceof</td>
  </tr>
  <tr>
    <td align="center">interface*</td>
    <td align="center">let*</td>
    <td align="center">new</td>
    <td align="center">null</td>
    <td align="center">package*</td>
    <td align="center">private*</td>
  </tr>
  <tr>
    <td align="center">protected*</td>
    <td align="center">public*</td>
    <td align="center">return</td>
    <td align="center">super</td>
    <td align="center">static*</td>
    <td align="center">switch</td>
  </tr>
  <tr>
    <td align="center">this</td>
    <td align="center">throw</td>
    <td align="center">true</td>
    <td align="center">try</td>
    <td align="center">typeof</td>
    <td align="center">var</td>
  </tr>
  <tr>
    <td align="center">void</td>
    <td align="center">while</td>
    <td align="center">with</td>
    <td align="center">yield*</td>
    <td align="center"></td>
    <td align="center"></td>
  </tr>
</table>
   
<p align="left">
  *: 식별자로 사용 가능하나 strict mode에서는 사용 불가
</p>
   
### 네이밍 컨벤션 (naming convention)
하나 이상의 영어 단어로 구성된 식별자를 만들 때 가독성 좋게 단어를 한눈에 구분하기 위해 규정한 명명 규칙이다. 주로 4가지 유형의 네이밍 컨벤션이 자주 사용된다.
   
    // 카멜 케이스(camelCase)
    var firstName;
  
    // 스네이크 케이스(snake_case)
    var first_name;

    // 파스칼 케이스(PascalCase)
    var FirstName;

    // 헝가리언 케이스(typeHungarianCase)
    var strFirstName; // type + identifier
    var $elem = document.getElementById('myId'); // DOM 노드
    var observable$ = fromEvent(document, 'click'); // RxJS 옵저버블
   
주로 변수나 함수의 이름에는 카멜 케이스(camelCase)를 사용하고,   
생성자 함수, 클래스의 이름에는 파스칼 케이스(PascalCase)를 사용한다.