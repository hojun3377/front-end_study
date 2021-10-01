import React from "react";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      process: "",
      dot: false,
      result: 0,
      nums: [],
      operator: []
    };
  }

  numHandler(e) {
    // console.log(this);
    let currentStr;
    
    // result
    if(this.state.result === 0) currentStr = e.target.value;
    else currentStr = this.state.result+e.target.value;

    this.setState({
      result: Number(currentStr),
      dot: (this.state.dot || e.target.value===".") ? true : false
    });
  }

  opHandler(e) {
    let op = e.target.value,
        num;

    if(this.state.operator.length) {
      num = this.state.nums.pop();
      switch(this.state.operator.pop()) {
        case "+":
          num += this.state.result;
          break;
        case "−":
          num -= this.state.result;
          break;
        case "×":
          num *= this.state.result;
          break;
        case "÷":
          num /= this.state.result;
          break;
        default:
          console.log("opHandler Error");
          break;
      }
    }
    else num = this.state.result;


    this.state.nums.push(num);
    this.state.operator.push(op);
    this.setState({
      process: num+op,
      result: 0
    });
  }

  toolHandler(e) {
    let tool = e.target.value;

    switch(tool) {
      case "C":
        this.setState({process: "0"});
      case "CE":
        this.setState({result: 0, dot: false});
        break;
      case "DEL":
        let currentStr = this.state.result.toString().slice(0,-1);
        this.setState({result: Number(currentStr)});
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
        <p><textarea name="cal_result" cols="30" rows="1" style={{resize: "none"}} value={this.state.result} readOnly></textarea></p>
        <table>
          <tbody>
            <tr>
              <td><button>%</button></td>
              <td><button onClick={(e)=>this.toolHandler(e)} value="CE">CE</button></td>
              <td><button onClick={(e)=>this.toolHandler(e)} value="C">C</button></td>
              <td><button onClick={(e)=>this.toolHandler(e)} value="DEL">DEL</button></td>
            </tr>
            <tr>
              <td><button>1/x</button></td>
              <td><button>x&sup2;</button></td>
              <td><button>&sup2;&radic;<span style={{textDecoration: "overline"}}>x</span></button></td>
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
              <td><button>&plusmn;</button></td>
              <td><button onClick={(e)=>this.numHandler(e)} value="0">0</button></td>
              <td><button onClick={(e)=>{this.state.dot || this.numHandler(e)}} value=".">.</button></td>
              <td><button onClick={(e)=>this.opHandler(e)} value="=">=</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Calculator;