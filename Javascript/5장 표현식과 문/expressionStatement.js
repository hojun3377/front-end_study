var x; // 표현식이 아닌 문
x = 100; // 표현식인 문

var foo = x = 100;
console.log(foo); // 100

// var foo = var x; // SyntaxError: Unexpected token 'var'