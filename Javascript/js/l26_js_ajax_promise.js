const loadBodyReq = function(selector,url,method="GET") {
  const req = new XMLHttpRequest(); // 통신 준비

  req.open(method,url);
  req.onload = ()=>{
    if(req.status===200) selector.innerHTML = req.responseText;
    else selector.innerHTML = `error: ${req.status}`;

  }
  req.send();
}

// 순차적으로 request

// 동기화 (X)
// setTimeout(()=>{loadBodyReq(loadedPage,"l26_load_body.html")}, 2000);
// setTimeout(()=>{loadBodyReq(loadedPage2,"l26_load_body.html")}, 3000);
// setTimeout(()=>{loadBodyReq(loadedPage3,"l26_load_body.html")}, 4000);

// 동기화 (O, callback)
// setTimeout(() => {
//   const req = new XMLHttpRequest();
//   const method = "GET";
//   const url = "l26_load_body.html";

//   req.open(method,url);
//   req.onload = ()=>{
//     if(req.status===200) {
//       loadedPage.innerHTML=req.responseText;
      
//       const req2 = new XMLHttpRequest();
//       req2.open(method,url);
//       req2.onload = ()=>{
//         if(req2.status===200) {
//           loadedPage2.innerHTML=req2.responseText;
          
//           const req3 = new XMLHttpRequest();
//           req3.open(method,url);
//           req3.onload = ()=>{
//             if(req3.status===200) {
//               loadedPage3.innerHTML=req3.responseText;
//             }
//           }
//           req3.send();
//         }
//       }
//       req2.send();
//     }
//   }
//   req.send(); 
// }, 2000);

// 동기화 (O, promise)
const promiseReq = function(selector,url,req) {
  return new Promise(resolve=>{
    setTimeout(() => {
      req(selector,url);
      resolve({ url, req });
    }, 2000);
  });
}

promiseReq(loadedPage,"l26_load_body.html",loadBodyReq)
  .then(({ url, req })=>{
    req(loadedPage2,url);
    return { url, req };
  })
  .then(({ url, req })=>{
    req(loadedPage3,url);
  });

  // 동기화 (O, async)