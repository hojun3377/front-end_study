/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
console.group("function을 이용한 생성자");

function Car(carName) {
  let name = "qm3";
  this.carName = carName;
}
Car.prototype.company = "hyendae";

/////////////////////////////////////////////////////////////////////////////////////////
console.group("생성자와 프로토타입");

console.log("생성자 함수 ( Car )\n", Car);

console.log("함수의 프로토타입 객체 ( Car.prototype )\n", Car.prototype);

let testCar = new Car("qm3");
console.log("인스턴스 객체 ( testCar = new Car('qm3') )\n", testCar);

console.log("인스턴스 객체의 __proto__는 생성자의 프로토타입 가리킴 ( testCar.__proto__ )\n", testCar.__proto__);

console.groupEnd();
/////////////////////////////////////////////////////////////////////////////////////////
console.group("상속");

function Wheel(carName) {
  Car.call(this,carName); // super 생성자 호출
}

console.log("생성자 함수 ( Wheel )\n", Wheel);

console.log("함수의 프로토타입 객체 ( Wheel.prototype )\n", Wheel.prototype);

Wheel.prototype = Object.create(Car.prototype); // Car의 프로토타입을 상속
Wheel.prototype.constructor = Wheel;
console.log("생성자 프로토타입을 복사하여 새로운 프로토타입 객체 생성 ( Wheel.prototype = Object.create(prototype) )\n생성자 프로토타입 constructor를 Wheel 함수와 바인딩 ( Wheel.prototype.constructor = Wheel )\n생성자 함수의 프로토타입( Wheel.prototype )\n", Wheel.prototype);

let testWheel = new Wheel("sonata");
console.log("인스턴스 객체 ( testWheel = new Wheel('sonata') )\n", testWheel);

console.log("프로토타입 체인 ( testWheel.company )\n", testWheel.company);

console.groupEnd();
/////////////////////////////////////////////////////////////////////////////////////////

console.groupEnd();
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
console.group("함수 객체 ( function object )");

// 객체 인스턴스가 생성되는 순간 prototype의 constructor 메서드를 호출하며,
// 모든 javascript 함수는 function prototype 객체를 참조하기 때문에
// function prototype객체의 constructor를 호출하여 생성한다.

// Person을 선언한 순간 Person.prototype 객체가 생성되며,
// Person.prototype.constructor는 아래의 원본 함수를 가리킨다.
function Person() {
  this.name = "최호준";
  this.callName = function() {
    return "안녕, "+this.name;
  }
}
console.log("생성자 함수 ( Person )\n", Person);

// new Person은 Person.prototype.constructor을 실행하여 새로운 Object를 만들고,
// 해당 Object의 __proto__는 Person.prototype을 가리킨다.
const testPerson = new Person();
console.log("인스턴스 객체 멤버함수 실행 ( testPerson.callName() )\n", testPerson.callName());

// Person 함수의 property로 callName2 함수를 선언한다.
// Person 함수 객체 property로 추가하는 것이므로 실제 선언된 함수가 변경되지 않으며,
// Person.prototype.constructor를 확인하면 프로퍼티로 추가됨을 알 수 있다. (함수의 메타데이터)
Person.callName2 = function() {
  // Person.callName2()를 실행시 Person.prototype.constructor.callName2() 가 실행되므로
  // 이때, this는 Person.prototype.constructor 이다.
  // 따라서 Person.prototype.constructor의 name인 'Person'이 출력
  return "안녕, "+this.name;
};
console.log("생성자 함수 내에 함수 설정 후 호출 ( Person.callName2() )\n", Person.callName2());
console.log("변하지 않는 생성자 함수 ( Person )\n", Person);
console.log("Person 함수 객체의 property로 들어간 callName2 ( constructor.callName2() 확인 )\n",Person.prototype);

console.groupEnd();
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
console.group("bind 함수");

// 함수가 객체 testPerson을 바인딩 한다.
console.log("callName2를 인스턴스 객체 testPerson에 bind 후 실행 ( Person.callName2.bind(testPerson)() )\n", Person.callName2.bind(testPerson)());

// 하지만 객체 testPerson의 프로퍼티로 추가되지는 않는다.
console.log("testPerson의 property로 추가되지 않은 callName2 ( testPerson의 property 확인 )\n", testPerson);

console.groupEnd();
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
console.group("캡슐화");

/////////////////////////////////////////////////////////////////////////////////////////
console.group("function과 closure");

function TestFunction(name="이름없음",age=0) {
  let _name = name;
  let _age = age;

  return {
    getName: () => { return _name; },
    getAge: () => { return _age; },
    setName: (name) => { _name = name; },
    setAge: (age) => { _age = age; }
  }
}

const tf = new TestFunction("tf_최호준", 25);
tf.setName("최호준")
console.log("function과 closure를 이용한 변수 은닉\n", tf);
console.log("tf의 변수 접근( tf.getName(), tf.getAge() )\n",`name : ${tf.getName()}, age : ${tf.getAge()}`);

console.groupEnd();
/////////////////////////////////////////////////////////////////////////////////////////
console.group("class");

class TestClass {
  // 일반 변수는 사용하기위해 선언할 때 생략이 가능하지만, private 변수를 사용하기위해 선언할 때 생략이 불가능하다.

  // 생략 가능
  // name = "이름없음"; age = 0;

  // 생략 불가능
  // private을 선언하기위해 예약어 # (ex. #name = value;)을 이용하여 변수 선언
  #name;
  #age;

  // 모든 class는 생성자가 존재
  constructor(name="이름없음",age = 0) {
    this.#name = name;

    try { if(isNaN(age)) throw `${age} is not a Number`; }
    catch(e) { console.log(e); }
    finally { this.#age = age>=0 ? age : "나이불명"; }
  }

  // getter와 setter
  get name() { return this.#name; }
  get age() { return this.#age; }
  set name(name) { this.#name = name; }
  set name(age) { this.#age = age; }

  // 멤버함수
  hello() { return this.#name+"씨 안녕하세요!"; }
}

const tc = new TestClass("tc_최호준", 25);
tc.name = "최호준";
console.log("class를 이용한 변수 은닉\n", tc);
console.log("tf의 변수 접근( tc.name, tc.age )\n",`name : ${tc.name}, age : ${tc.age}`);

console.log("class내에 정의된 함수는 class prototype에 정의됨 ( TestClass.prototype.hello )\n", TestClass.prototype.hello);

console.groupEnd();
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
console.group("class 상속");

class Animal {
  #name;
  #age;
  #species;

  constructor(name,age=-1,species=undefined) {
    this.#name = name;
    this.#age = age;
    this.#species = species;
  }

  // getter
  get name() { return this.#name; }
  get age() { return this.#age; }
  get species() { return this.#species; }

  // setter
  set name(name) { this.#name = name; }
  set age(age) { this.#age = age; }
  set species(species) { this.#species = species; }

  hello() { return this.#name+", 안녕!"; }
}
// 주인, 품종, 크기
class Dog extends Animal {
  // 전역변수 이름과 get 멤버의 이름을 동일하게 작성하지 않기( get 멤버()가 무시당한다.)
  // 동일하게 작성하고 싶으면 꼭 private로 선언하세요.
  #master;
  #kind;
  #size;

  constructor(name,age,species,master,kind,size) {
    super(name,age,species);
    this.#master = master;
    this.#kind = kind;
    this.#size = size;
  }

  get master() { return this.#master; }
  get kind() { return this.#kind; }
  get size() { return this.#size; }

  set master(master) { this.#master = master; }
  set kind(kind) { this.#kind = kind; }
  set size(size) { this.#size = size; }
}

console.log("상위 Class ( Animal )\n", Animal);
console.log("하위 Class ( Dog )\n", Dog);

const dog = new Dog("코코", 9, "개", "최호준", "푸들", "소형");
console.log("Animal을 상속받은 Dog의 인스턴스 객체 ( dog = new Dog(...) )\n", dog);

console.log("상위 클래스의 멤버함수 사용 ( dog.hello() )\n", dog.hello());

console.groupEnd();
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
