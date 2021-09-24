function Car() {
  let name = "qm3";
  this.carName = "qm3";
}

console.log(Car);
console.log(Car.prototype);
console.log(new Car()); // 복제
console.log(Object.create(Car));

/////////////////////////////////////

function Person() {
  this.name = "최호준";
  this.callName = function() {
    console.log("안녕, " + this.name);
  }
}

Person.callName2 = function() {
  console.log(this.prototype);
  console.log("안녕, " + this.name);
}

// Person.callName();
Person.callName2();
let callName2F = Person.callName2.bind(new Person());
callName2F();
