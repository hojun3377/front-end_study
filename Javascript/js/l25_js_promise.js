// 자바스크립트는 순차적 언어로 순서대로 실행한다.
// 자바스크립트는 multi threading을 지원하지 않는다. ( single thread )
// 오래 걸리거나 반복되는 실행이 있으면, 그 실행은 따로 하고 나머지를 계속 실행한다.
// ref) https://stackoverflow.com/questions/12187393/why-javascript-settimeout-is-not-multithreaded

// window.setTimeout(()=>console.log("2"),1000);
// console.log("3");

// 때문에 특정 실행들을 동기화 하려면 Promise 객체를 이용한다.
console.group("순차실행");
console.log("1");
new Promise(resolve=>{
  window.setTimeout(()=>{
    console.group("resolve로 동기화 ( 1초 후 실행 )");
    console.log("2");
    resolve();
  }, 1000);
}).then(()=>{
  console.log("3");
  console.groupEnd();
});
console.log("4");
console.groupEnd();

////////////////////////////////////

const sum = function(a,b) {
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      console.group("reject로 예외처리 ( 1초 후 실행 )");
      if(Number(a) && Number(b)) resolve(a+b);
      else reject("Is not a Number");
    }, 1000);
  });
}

sum(10,"0").then(result=>{
  console.log("10+20 =", result);
}).then(()=>{
  console.log("계산 완료");
  console.groupEnd();
}).catch(msg=>{
  console.log(msg);
  console.groupEnd();
});

// new Promise((resolve, reject)=>{
//   setTimeout(()=>{
//     console.group("reject로 예외처리 ( 1초 후 실행 )");
//     console.log("sum(1,2) =",sum(1,2));
//     resolve();
//   }, 1000);
// }).then((resolveResult)=>{
//   console.log("계산 실행 완료", resolveResult);
//   console.groupEnd();
// });