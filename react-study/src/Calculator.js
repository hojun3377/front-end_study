import React from "react";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      process: "",
      buffer: "0",
      isDot: false,
      isBuf: true,
      nums: [],
      operator: []
    };
  }

  numHandler(e) {
    let crtProcess;
    
    if(this.state.isBuf && this.state.buffer!=="0") crtProcess = this.state.buffer+e.target.value;
    else {
      crtProcess = e.target.value==="." ? "0." : e.target.value;
    }
    
    this.setState({
      buffer: crtProcess,
      isBuf: true,
      isDot: (this.state.isDot || e.target.value===".") ? true : false
    });
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
    
    return result;
  }

  rstHandler(e) {
    let num = this.state.nums.length ? this.state.nums.pop() : Number(this.state.buffer),
        prcStr = this.state.process+this.state.buffer;

    if(this.state.operator.length) {
      num = this.calculate(
        num, Number(this.state.buffer),
        this.state.operator.pop()
      );
    }

    this.setState({
      process: prcStr+e.target.value,
      self: "",
      buffer: num,
      isBuf: false,
      isDot: false
    })
  }

  selfopHandler(e) {
    let op = e.target.value,
        num = Number(this.state.buffer),
        crtProcess = this.state.operator.length ? this.state.nums[0]+this.state.operator[0] : "",
        selfStr = this.state.self ? this.state.self : num;

    switch(op) {
      case "fraction":
        num = 1/num;
        selfStr = `1/(${selfStr})`;
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
      process: crtProcess+selfStr,
      self: selfStr,
      buffer: num
    });
  }

  opHandler(e) {
    let op = e.target.value, 
        bufNum = Number(this.state.buffer),
        crtProcess = this.state.process ? this.state.process : bufNum.toString();

    // buffer의 변화에 대한 nums & operator 데이터 관리
    if(this.state.isBuf) this.state.nums.push(bufNum); // buffer에 숫자 추가
    else if(this.state.operator.length) {
      crtProcess = crtProcess.slice(0,-1);
      this.state.operator.pop(); // 마지막에 들어간 연산자 삭제
    }
    this.state.operator.push(op); // operator에 연산자 추가

    // process 관리
    // 연산자가 2개 이상이 될 경우 연산 시작
    if(this.state.operator.length >= 2) {
      let num1 = this.state.nums.shift(),
          num2 = this.state.nums.shift(),
          tempOp = this.state.operator.shift();

      bufNum = this.calculate(num1,num2,tempOp);
      this.state.nums.push(bufNum);
      crtProcess = this.state.nums[0]+this.state.operator[0];
    }
    else crtProcess += this.state.operator[0];

    // state 값 설정
    this.setState({
      process: crtProcess,
      buffer: bufNum,
      isBuf: false,
      isDot: false
    });
  }

  toolHandler(e) {
    let tool = e.target.value;

    switch(tool) {
      case "C":
        this.setState({process: "", isBuf: false, nums: [], operator: []});
      case "CE":
        this.setState({buffer: 0, isDot: false});
        break;
      case "DEL":
        if(this.state.isBuf) {
          let crtProcess = this.state.buffer.slice(0,-1);
          this.setState({
            buffer: crtProcess ? crtProcess : "0"
          });
        }
        break;
      default:
        console.log("toolHandler Error");
        break;
    }
  }

  render() {
    return (
      <div id="calculator">
        <p><textarea name="cal_process" cols="30" rows="1" style={{resize: "none"}} value={this.state.process} readOnly></textarea></p>
        <p><textarea name="cal_buffer" cols="30" rows="1" style={{resize: "none"}} value={this.state.buffer} readOnly></textarea></p>
        <table>
          <tbody>
            <tr>
              <td><button>%</button></td>
              <td><button onClick={(e)=>this.toolHandler(e)} value="CE">CE</button></td>
              <td><button onClick={(e)=>this.toolHandler(e)} value="C">C</button></td>
              <td><button onClick={(e)=>this.toolHandler(e)} value="DEL">DEL</button></td>
            </tr>
            <tr>
              <td><button onClick={(e)=>this.selfopHandler(e)} value="fraction">1/x</button></td>
              <td><button onClick={(e)=>this.selfopHandler(e)} value="sqr">x&sup2;</button></td>
              <td><button onClick={(e)=>this.selfopHandler(e)} value="root">&sup2;&radic;<span style={{textDecoration: "overline"}}>x</span></button></td>
              <td><button onClick={(e)=>this.opHandler(e)} value="&divide;">&divide;</button></td>
            </tr>
            <tr>
              {/* <td><button onClick={this.numHandler} value="7">7</button></td> */}
              <td><button onClick={(e)=>this.numHandler(e)} value="7">7</button></td>
              <td><button onClick={(e)=>this.numHandler(e)} value="8">8</button></td>
              <td><button onClick={(e)=>this.numHandler(e)} value="9">9</button></td>
              <td><button onClick={(e)=>this.opHandler(e)} value="&times;">&times;</button></td>
            </tr>
            <tr>
              <td><button onClick={(e)=>this.numHandler(e)} value="4">4</button></td>
              <td><button onClick={(e)=>this.numHandler(e)} value="5">5</button></td>
              <td><button onClick={(e)=>this.numHandler(e)} value="6">6</button></td>
              <td><button onClick={(e)=>this.opHandler(e)} value="&minus;">&minus;</button></td>
            </tr>
            <tr>
              <td><button onClick={(e)=>this.numHandler(e)} value="1">1</button></td>
              <td><button onClick={(e)=>this.numHandler(e)} value="2">2</button></td>
              <td><button onClick={(e)=>this.numHandler(e)} value="3">3</button></td>
              <td><button onClick={(e)=>this.opHandler(e)} value="+">+</button></td>
            </tr>
            <tr>
              <td><button onClick={(e)=>this.selfopHandler(e)} value="negate">&plusmn;</button></td>
              <td><button onClick={(e)=>this.numHandler(e)} value="0">0</button></td>
              <td><button onClick={(e)=>{this.state.isDot || this.numHandler(e)}} value=".">.</button></td>
              <td><button onClick={(e)=>this.rstHandler(e)} value="=">=</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Calculator;