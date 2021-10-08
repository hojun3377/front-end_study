import React from "react";
import './calculator.scss'

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      process: "",
      result: "0",
      isInit: true,
      isDot: false,
      isLastIptOp: false, 
      nums: [],
      operator: []
    };
  }

  calculate(num1, num2, op) {
    let result = num1;
    
    switch(op) {
      case "+":
        result += num2;
        break;
      case "−":
        result -= num2;
        break;
      case "×":
        result *= num2;
        break;
      case "÷":
        result /= num2;
        break;
      default:
        // non operator
        break;
    }
    
    console.log(result);
    return result;
  }

  numHandler(e) {
    let buffer = this.state.result;

    if(this.state.isInit || this.state.isLastIptOp) buffer = e.target.value==="." ? "0." : e.target.value;
    else buffer += e.target.value;
    
    this.setState({
      process: this.state.isInit ? "" : this.state.process,
      result: buffer,
      isInit: false,
      isDot: (this.state.isDot || e.target.value===".") ? true : false,
      isLastIptOp: false,
      nums: this.state.isInit ? [] : this.state.nums,
      operator: this.state.isInit ? [] : this.state.operator
    });

    console.log("num", this.state);
  }

  rstHandler(e) {
    let op = this.state.operator[0], 
        num1, num2, prc, buffer;

    if(op) {
      if(this.state.isLastIptOp) {
        num1 = Number(this.state.result);
        num2 = this.state.nums[0];
      }
      else {
        num1 = this.state.nums.pop();
        num2 = Number(this.state.result);
        this.state.nums.push(num2);
      }
      buffer = this.calculate(num1,num2,op);
      prc = num1+op+num2;
    }
    else {
      buffer = Number(this.state.result);
      this.state.nums.push(buffer);
      prc = buffer.toString();
    }
    
    prc += e.target.value;
    this.setState({
      process: prc,
      result: buffer,
      isInit: true,
      isDot: false,
      isLastIptOp: true
    })
  }

  selfopHandler(e) {
    let op = e.target.value,
        num = Number(this.state.result),
        prc = this.state.operator.length ? this.state.nums[0]+this.state.operator[0] : "",
        str;

    switch(op) {
      case "fraction":
        num = 1/num;
        str = `1/(${str})`;
        break;
      // case "sqr":
      //   selfStr = `sqr(${num})`;
      //   num = Math.pow(num,2);
      //   break;
      // case "root":
      //   selfStr = `√(${num})`;
      //   num = Math.sqrt(num);
      //   break;
      // case "negate":
      //   selfStr = `negate(${num})`;
      //   num = -num;
      //   break;
      default:
        break;
    }
    
    this.setState({
      process: prc,
      buffer: num
    });
  }

  opHandler(e) {
    let op = e.target.value, 
        buffer = Number(this.state.result),
        prc = this.state.process ? this.state.process : buffer.toString();

    // =이 끝난경우
    if(this.state.isInit) {
      this.state.nums.pop();
      this.state.operator.pop();
      prc = buffer.toString();
    }

    // 전에 들어온 값이 op인지 확인
    if(this.state.isLastIptOp && !this.state.isInit) {
      prc = prc.slice(0,-1); // process 확인
      this.state.operator.pop(); // 마지막에 들어간 연산자 삭제
    }
    else this.state.nums.push(buffer); // num 스택에 숫자 추가

    this.state.operator.push(op); // operator에 연산자 추가

    // process 관리

    // 연산자가 2개 이상이 될 경우
    if(this.state.operator.length >= 2) {
      let num1 = this.state.nums.shift(),
          num2 = this.state.nums.shift(),
          tempOp = this.state.operator.shift();

      buffer = this.calculate(num1,num2,tempOp);
      this.state.nums.push(buffer);
      prc = this.state.nums[0]+this.state.operator[0];
    }
    else prc += this.state.operator[0];

    // state 값 설정
    this.setState({
      process: prc,
      result: buffer,
      isInit: false,
      isDot: false,
      isLastIptOp: true
    });
  }

  toolHandler(e) {
    let tool = e.target.value;

    switch(tool) {
      case "C":
        this.setState({process: "", isInit: true, nums: [], operator: []});
      case "CE":
        this.setState({result: "0", isDot: false, isLastIptOp: false});
        break;
      case "DEL":
        let buffer = this.state.isInit ? this.state.result : this.state.result.slice(0,-1);
        this.setState({
          result: buffer ? buffer : "0"
        });
        break;
      default:
        console.log("toolHandler Error");
        break;
    }
  }

  render() {
    return (
      <div id="calculator" className="container">
        <div className="screen container">
          <textarea className="process" cols="30" rows="1" value={this.state.process} readOnly></textarea>
          <textarea className="result" cols="30" rows="1" value={this.state.result} readOnly></textarea>
        </div>
        <div className="button container">
          <button className="operator">%</button>
          <button className="tool" onClick={(e)=>this.toolHandler(e)} value="CE">CE</button>
          <button className="tool" onClick={(e)=>this.toolHandler(e)} value="C">C</button>
          <button className="tool" onClick={(e)=>this.toolHandler(e)} value="DEL">⇦</button>
          <button className="operator" onClick={(e)=>this.selfopHandler(e)} value="fraction">¹/𝒳</button>
          <button className="operator" onClick={(e)=>this.selfopHandler(e)} value="sqr">𝒳²</button>
          <button className="operator" onClick={(e)=>this.selfopHandler(e)} value="root">√</button>
          <button className="operator" onClick={(e)=>this.opHandler(e)} value="&divide;">&divide;</button>
          {/* <bu className="number"tton onClick={this.numHandler} value="7">7</button> */}
          <button className="number" onClick={(e)=>this.numHandler(e)} value="7">7</button>
          <button className="number" onClick={(e)=>this.numHandler(e)} value="8">8</button>
          <button className="number" onClick={(e)=>this.numHandler(e)} value="9">9</button>
          <button className="operator" onClick={(e)=>this.opHandler(e)} value="&times;">&times;</button>
          <button className="number" onClick={(e)=>this.numHandler(e)} value="4">4</button>
          <button className="number" onClick={(e)=>this.numHandler(e)} value="5">5</button>
          <button className="number" onClick={(e)=>this.numHandler(e)} value="6">6</button>
          <button className="operator" onClick={(e)=>this.opHandler(e)} value="&minus;">&minus;</button>
          <button className="number" onClick={(e)=>this.numHandler(e)} value="1">1</button>
          <button className="number" onClick={(e)=>this.numHandler(e)} value="2">2</button>
          <button className="number" onClick={(e)=>this.numHandler(e)} value="3">3</button>
          <button className="operator" onClick={(e)=>this.opHandler(e)} value="+">+</button>
          <button className="operator" onClick={(e)=>this.selfopHandler(e)} value="negate">&plusmn;</button>
          <button className="number" onClick={(e)=>this.numHandler(e)} value="0">0</button>
          <button className="number" onClick={(e)=>{this.state.isDot || this.numHandler(e)}} value=".">.</button>
          <button className="operator" onClick={(e)=>this.rstHandler(e)} value="=">=</button>
        </div>
      </div>
    );
  }
}

export default Calculator;