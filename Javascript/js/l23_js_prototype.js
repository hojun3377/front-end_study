function Car() {
  this.name = "qm3";
  this.move = function() {
    console.log("움직임");
  };
  function aa(){};
}
// Car.prototype.move2 = function() {
//   console.log(this);
//   console.log(`${this.name}이 움직임`);
// };
Object.defineProperty(Car.prototype, 'move2', {
  configurable: true,
  value: function() {
    console.log(this);
    console.log(`${this.name}이 움직임`);
  },
  writable: true
});

////////////////////////////////////////////

console.group("function Car를 통한 접근");
console.log("Car", Car);
console.log("Car.prototype", Car.prototype);
console.log("Car.name", Car.name);
console.groupEnd();

console.group("Car 타입의 객체 car를 통한 접근");
const car = new Car();
car.move();
console.log("car", car);
console.log("car.name", car.name);
console.log("car.__proto__.move2", car.__proto__.move2);
car.move2();
car.__proto__.move2();
console.groupEnd();

////////////////////////////////////////////

console.group("Object.create(Car)");
// car2는 Car를 복제한 독자적인 프로토타입 객체
// car2.__proto__는 Car를 참조한다.
const car2 = Object.create(Car);
console.log("car2", car2);
// Car는 프로토타입 객체를 가지고 있기 때문에 car2 또한 프로토타입을 가진다.
console.log("car2.prototype", car2.prototype);
car2.prototype.move2();
console.log("car2.__proto__", car2.__proto__); // f Car
console.log("car2.__proto__", car2.__proto__.__proto__); // f() { [native code] }
console.log("car2.prototype === car2.__proto__.prototype", car2.prototype === car2.__proto__.prototype);
console.groupEnd();

////////////////////////////////////////////

console.group("Object.create(new Car())");
const car3 = Object.create(new Car());
// car3는 new Car()를 복제한 독자적인 프로토타입 객체
// car3.__proto__는 new Car()를 참조한다.
console.log("car3", car3);
console.log("car3.name", car3.name);
car3.move();
car3.move2();
console.log("car3.prototype", car3.prototype); // 객체 인스턴스는 prototype을 가지지 않는다.
console.log("car3.__proto__", car3.__proto__); // new Car()
console.log("car3.__proto__.__proto__", car3.__proto__.__proto__); // Car.prototype
console.log("car3.__proto__.__proto__.__proto__", car3.__proto__.__proto__.__proto__); // Object.prototype
console.groupEnd();

// 익명함수는 프로토타입이 존재하지 않는 함수
console.log("익명함수는 프로토타입이 존재하지 않는다. ( (()=>{}).prototype )\n", (()=>{}).prototype);

////////////////////////////////////////////

class Test {
  constructor(a,b) {
    this.a = a;
    this.b = b;
  };
  c() { return "c 함수 입니다."; };
}

const test = new Test("a","b");

console.group("class Test를 이용한 접근");
console.log("class Test{}", Test);
console.log("class Test{}.prototype", Test.prototype);
console.log("class Test{}.__proto__", Test.__proto__);
console.log("class Test{}.__proto__.__proto__", Test.__proto__.__proto__);
console.log("class Test{}.prototype.c()", Test.prototype.c());
console.log("class Test{}.prototype.c.prototype", Test.prototype.c.prototype);
console.log("const test = new Test('a', 'b')\n", test);
console.log("test.c.prototype", test.c.prototype);
console.groupEnd();
