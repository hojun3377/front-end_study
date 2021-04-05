# 5장 표현식과 문

## 값
**식(표현식, expression)이 평가(evaluate)되어 생성된 결과**를 말한다.
~~~
// 변수에는 10 + 20이 평가되어 생성된 숫자 값 30이 할당된다.
var sum = 10 + 20;
~~~

## 리터럴 (literal)
**사람이 이해할 수 있는 문자 또는 약속된 기호를 사용해 값을 생성하는 표기법**을 말한다.


|리터럴|예시|
|:---:|:---:|
|정수 리터럴|100|
|부동소수점 리터럴|10.5|
|2진수 리터럴|0b01000001|
|8진수 리터럴|0o101|
|16진수 리터럴|0x41|
|문자열 리터럴|'Hello' or "Hello"|
|불리언 리터럴|true or false|
|null 리터럴|null|
|undefined 리터럴|undefined|
|객체 리터럴|{ name: 'Lee', address: 'Seoul' }|
|배열 리터럴|[ 1, 2, 3 ]|
|함수 리터럴|function() {}|
|정규 표현식 리터럴|/[A-Z]+/g|


## 표현식
**값으로 평가될 수 있는 문**이다. 즉, 표현식이 평가되면 새로운 값을 생성하거나 기존 값을 참조한다.   
또한, 리터럴은 값으로 평가되기 때문에 **리터럴도 표현식**이다.
~~~
// 리터럴 표현식
10
'Hello'

// 식별자 표현식 (선언이 이미 존재한다고 가정)
sum
person.name
arr[1]

// 연산자 표현식
10 + 20
sum = 10;
sum !== 10;

// 함수/메서드 호출 표현식 (선언이 이미 존재한다고 가정)
square();
person.getName();
~~~

## 문 (statement)
**프로그램을 구성하는 기본 단위**이자 **최소 실행 단위**이다.

### 토큰 (token)
**문법적인 의미를 가지며, 문법적으로 더 이상 나눌 수 없는 코드의 기본 요소**를 의미한다.

~~~
var sum = 1 + 2; // 문
~~~
   
토큰: var, sum, =, 1, +, 2, ;   
   
## 표현식인 문과 표현식이 아닌 문
표현식인 문은 **값으로 평가될 수 있는 문**이며, 표현식이 아닌 문은 **값으로 평가될 수 없는 문**을 말한다.
~~~
// 변수 선언문은 값으로 평가 될 수 없으므로 표현식이 아니다.
var x;

// 1, 2, 1 + 2, x = 1 + 2는 모두 표현식이다.
// x = 1 + 2는 표현식이면서 완전한 문이기도 하다.
x = 1 + 2;
~~~
   
표현식인 문과 표현식이 아닌문을 구별하는 가장 간단하고 명료한 방법은 **변수에 할당해 보는 것**이다.   
   
~~~
var x; // 표현식이 아닌 문
x = 100; // 표현식인 문
~~~

~~~
// 표현식이 아닌 문은 값처럼 사용할 수 없다.
var foo = var x; // SyntaxError: Unexpected token 'var'
~~~

~~~
// 표현식인 문은 값처럼 사용할 수 있다.
var foo = x = 100;
console.log(foo); // 100
~~~
실습: [expressionStatement.js](expressionStatement.js)

### 완료 값 (completion value)
크롬 개발자 도구에서 표현식이 아닌 문을 실행하면 언제나 undefined를 출력한다. 이를 **완료 값**이라 한다. 완료 값은 표현식의 평가 결과가 아니기 때문에 다른 값과 같이 변수에 할당할 수 없고 참조할 수도 없다.   
![Completion Value Img](/Javascript/img/ch5.CompletionValue.png)   
   
크롬개발자 도구에서 표현식인 문을 실행하면 언제나 평가된 값을 반환한다.   
![Non Completion Value Img](/Javascript/img/ch5.NonCompletionValue.png)   

## 세미클론 자동 삽입 기능 (ASI, Automatic Semicolon Insertion)
자바스크립트에서는 세미클론이 생략 가능하다. 이는 자바스크립트 엔진이 소스코드를 해석할 때 문의 끝이라고 예측되는 지점에 세미클론을 자동으로 붙여주는 **세미클론 자동 삽입 기능(ASI)이 암묵적으로 실행**되기 때문이다.   

하지만, 개발자의 예측이 일치하지 않는 경우가 간혹있기 때문에, **세미클론 사용을 권장**한다.
~~~
function foo() {
    return
    {}
    // 개발자의 예측 => return {};
    // ASI 동작 결과 => return; {};
}

console.log(foo()); // undefined

var bar = function() {}
(function() {})();
// 개발자의 예측 => var bar = function() {}; (function() {})();
// ASI 동작 결과 => var bar = function() {}(function() {})();
~~~
실습: [asiError.js](asiError.js)