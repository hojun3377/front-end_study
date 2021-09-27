// 실습 ( function을 이용하여 생성자 만들기 )
console.log('실습 ( function을 이용한 생성자 )');

function Car(carName) {
  let name = "qm3";
  this.carName = carName;
  this.company = this.__proto__.company;
}
Car.prototype.company = "hyendae";

console.log("<생성자 함수> ( Car )");
console.log(Car);

console.log("<생성자 프로토타입> ( Car.prototype )");
console.log(Car.prototype);

console.log("<새로 생성된 객체> ( 생성자 함수를 이용하여 새로운 객체 생성 )"); // 복제
let testCar = new Car("qm3");
console.log(testCar);
console.log("<새로 생성된 객체의 __proto__> ( 객체의 __proto__는 생성자의 prototype을 가리킨다. )")
console.log(testCar.__proto__);

console.log("<상속>\n<새로운 생성자 함수> ( Wheel )")
function Wheel(carName) {
  Car.call(this,carName); // super 생성자 호출
}
console.log(Wheel);
console.log("<생성자 프로토타입을 복사하여 새로운 프로토타입 객체 생성> ( Object.create(constructorFunction.prototype) )");
// Car를 상속받는 Wheel로 바인딩
Wheel.prototype = Object.create(Car.prototype);
Wheel.prototype.constructor = Wheel;
console.log(Wheel.prototype);

console.log("<Car를 상속받은 Wheel의 새로 생성된 객체>");
let testCar2 = new Wheel("sonata");
console.log(testCar2);
console.log("<새로 생성된 객체의 __proto__>");
console.log(testCar2.__proto__);

//////////////////////////////////////////////////////////////////////
console.log("//////////////////////////////////////////////////////////////////////");

// 실습 ( bind함수 )
console.log('실습 ( bind함수 )');

// javascript의 모든 객체는 자신의 prototype으로부터 constructor를 상속한다.
// 객체 인스턴스가 생성되는 순간 prototype의 constructor 메서드를 호출하며,
// 모든 javascript 함수는 function prototype 객체를 참조(__proto__)하기 때문에 function prototype객체의 constructor를 호출하여 생성한다.

// Person을 선언한 순간 Person.prototype 객체가 생성되며,
// Person.prototype.constructor는 아래의 원본 함수를 가리킨다.
function Person() {
  this.name = "최호준";
  this.callName = function() {
    return "안녕, "+this.name;
  }
}
console.log("<생성자 함수> ( Person )");
console.log(Person); // 선언된 함수 ( window객체의 멤버함수 )
console.log("<객체 내 함수 실행> ( (new Person).callName(); )");
// new Person은 Person.prototype.constructor을 실행하여 새로운 Object를 만들고,
// 해당 Object의 __proto__는 Person.prototype을 가리킨다.
console.log((new Person).callName());

console.log("<생성자 함수 내에 함수 설정> ( Person.callName2 )");
// Person 함수의 property로 callName2 함수를 선언한다.
Person.callName2 = function() {
  // Person.callName2()를 실행시 Person.prototype.constructor.callName2() 가 실행되므로
  // 이때, this는 Person.prototype.constructor 이다.
  // 따라서 Person.prototype.constructor의 name인 'Person'이 출력
  return "안녕, "+this.name;
};
// callName2는 이미 선언된 Person 함수 객체 프로퍼티로 추가하는 것이므로 실제 선언된 함수가 변경되지 않으며,
// Person.prototype.constructor의 프로퍼티로 추가됨을 알 수 있다.
console.log(Person);
console.log(Person.prototype);
console.log("<외부에서 설정한 함수 실행> ( Person.callName2(); )")
console.log(Person.callName2());

console.log("<외부에서 설정한 함수 bind 후 실행> ( Person.callName2.bind(new Person()); )")
const testPerson = new Person();
// 실행컨텍스트의 객체 testPerson의 프로퍼티로 함수가 바인딩 된다.
const callName2F = Person.callName2.bind(testPerson);
console.log(testPerson);
console.log(callName2F);
console.log(callName2F());

///////////////////////////////////////////////////////////////////////
console.log("//////////////////////////////////////////////////////////////////////");

// function과 closure로 이용하여 변수를 캡슐화 하여 정의
console.log("function과 closure로 이용하여 변수를 캡슐화 하여 정의");

function TestFunction(name="이름없음",age=0) {
  let _name = name;
  let _age = age;

  return {
    getName: () => {
      return _name;
    },
    getAge: () => {
      return _age;
    },
    setName: (name) => {
      _name = name;
    },
    setAge: (age) => {
      _age = age;
    }
  }
}

// class를 이용하여 캡슐화 하여 정의
class TestPerson {
  // 클래스에서 생략 가능
  // name = "이름없음"; age = 0;

  // private을 선언하기위해 예약어 # (ex. #name = value;)을 이용하여 변수 선언
  // 생략 불가능
  #name;
  #age

  // 모든 클래스는 생성자를 호출해야 객체를 생성할 수 있다.
  constructor(name="이름없음",age = 0) {
    // this.name = name ? name : "이름없음";
    this.#name = name;

    try {
      if(isNaN(age)) {
        throw `${age} is not a Number`;
      }
    }
    catch(e) {
      console.log(e)
    }
    finally {
      this.#age = age>=0 ? age : "나이불명";
    }
  }

  // getName() { return this.#name+" 씨"; }
  get name() { return this.#name+" 씨"; }
  set name(name) { this.#name = name; }
}

// 1. function과 closure를 이용한 변수은닉
const tf1 = new TestFunction();
const tf2 = new TestFunction("tf_최호준", 25);
console.log(tf1.getName());
tf2.setName("메롱")
console.log(tf2.getName());

// 2. class를 이용한 변수은닉
const tp1 = new TestPerson();
const tp2 = new TestPerson("tp_최호준", 25);
console.log(tp1.name);
tp2.name = "가나다"
console.log(tp2.name);

///////////////////////////////////////////////////////////////////////
console.log("//////////////////////////////////////////////////////////////////////");

// 실습 ( class 상속 )
console.log("실습 ( class 상속 )");

class Animal {
  #name;
  #age;
  #species;

  constructor(name,age=-1,species=undefined) {
    this.#name = name;
    this.#age = age;
    this.#species = species;
  }

  get name() { return this.#name; }
  get age() { return this.#age; }
  get species() { return this.#species; }

  set name(name) { this.#name = name; }
  set age(age) { this.#age = age; }
  set species(species) { this.#species = species; }
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

const dog = new Dog("코코", 9, "개", "최호준", "푸들", "소형");
console.log(dog);
