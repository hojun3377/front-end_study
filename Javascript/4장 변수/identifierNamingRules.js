// ES5부터 식별자를 만들 때 유니코드 문자를 허용.
// 그러나 알파벳 외의 유니코드 문자로 명명된 식별자를 사용하는 것은 바람직하지 않음.
var 이름, なまえ;

// 자바스크립트는 대소문자를 구별.
var firstname;
var firstName;
var FIRSTNAME;

// 명명규칙 위배 오류
// var first-name; // SyntaxError: Unexpected token '-'
// var 1st; // SyntaxError: Invalid or unexpected token
// var this; // SyntaxError: Unexpected token 'this'