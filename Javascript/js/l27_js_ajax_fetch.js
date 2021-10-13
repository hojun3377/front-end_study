async function setTimeLoad() {
  await setTimeout(()=>{
    fetch("l27_load_body.html")
      .then((resp)=>{ return resp.text(); })
      .then((respText)=>{
        console.log(respText);
      })
      .catch((err)=>{console.log(err)});
  }, 2000);
  await setTimeout(()=>{

  }, 2000);
  await setTimeout(()=>{

  }, 2000);
}