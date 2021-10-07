import React, { Component } from 'react';
import GridButton from './GridButton';
import './Calculator.scss'

class Calculator extends Component {
    constructor(props){
        super(props);
        this.state={
            current:"",//화면에 표시되는 값
            inputNum:0, //입력받은 값
            result:0,//연산 결과 
            process:"",//화면에 표시되는 연산과정
            operator:"",//연산자 
            setNum:false//연산을 누르고 처음 수를 누르는지(current 초기화)
        }
        this.btnHandler.bind(this);
    }
    btnHandler(e){
        let val=e.target.value;
        let className=e.target.className;
        console.log(className);
        switch(className){
           case "num" : this.numHandler(val); break;
           case "operator" : this.operatorHandler(val); break;
           case "selfOperator" : this.selfOperatorHandler(val); break;

           case "control" : this.controlHandler(val); break;
        }
    }
    numHandler(num){
        let setNum=this.state.setNum;
        let current="";

        if(setNum){
            current+=num;
            setNum=false;
        }else{
            current=this.state.current+num;
        }
        this.setState(
            {
                current: current,
                inputNum: Number(current),
                process: `${this.state.process.split("=")[0]+num}=${this.state.result}`, 

                setNum: setNum,

        });
    }

    operatorHandler(operator){
     
        let result=this.state.result;
        let current=this.state.current;
        let inputNum=this.state.inputNum;

        switch(this.state.operator){
            case "" :
                current=result;
                result=inputNum;
                break;
            case "%" : 
                result%=inputNum;
                process+="%";
                break; 
            case "÷" :
                result/=inputNum;
                break;
            case "×" :  
                result*=inputNum;
                break;
            case "−" : 
                result-=inputNum;
                break;
            case "+" : 
                result+=inputNum;
                break;
            case "±" :  break;
        }
        let process=this.state.process.split("=")[0]+operator; 

        const stateObj={
            result : result,
            current: result,
            inputNum : inputNum,
            process: `${process}=${result}`, 
            setNum: true,
            operator: operator
        }
        this.setState(stateObj);
        return stateObj;

    }

    selfOperatorHandler(operator){
        const stateObj=this.operatorHandler(operator);
        console.log(stateObj);
        
        
        let process=this.state.process; 
        let result=stateObj.result;
        let current=stateObj.current;
        let inputNum=stateObj.inputNum;
        
        switch(operator){
            case "√" :  
            result=Math.sqrt(result);
            process=`√(${process.split("=")[0]})=${result}`;

            break;
            case "𝒳²" :  
            result=result*result;
            process=`(${process.split("=")[0]})²=${result}`;
                break;
            case "¹/𝒳" : 
            result=1/result;
            process=`(1/${process.split("=")[0]})=${result}`;
                break;
            case "=" :  
            this.operatorHandler(this.state.operator);
            process=`${process.split("=")[0]}=${result}`;

            break;

        }
        console.log(result,inputNum,current,this.state.operator);
        this.setState(
            {
                result : result,
                current: result,
                inputNum : result,
                process: process, 
                setNum: true,
                operator: ""
            }
        );
        

    }


    controlHandler(control){
        switch(control){
            case "ce" :
                let i= this.state.process.lastIndexOf(this.state.inputNum);
                this.setState({
                    current:"",//화면에 표시되는 값
                    inputNum:0, //입력받은 값
                    process: this.state.process.substr(0,i)
                })    
                break;
            case "c" : 
                this.setState({
                    current:"",//화면에 표시되는 값
                    inputNum:0, //입력받은 값
                    result:0,//연산 결과 
                    process:"",//화면에 표시되는 연산과정
                    operator:"",//연산자 
                    setNum:false//연산을 누르고 처음 수를 누르는지(current 초기화)
                });    
                break;
            case "back" :
            
                this.setState({
                    current:this.sate.current.substr,
                    inputNum:0, 
                    process:"",
                }); 
            break;
         }

    }
    render() {
        return (
            <>
                <div className="calculator">
                    <div className="screen container">
                        <textarea name="" className="process" cols="25" rows="1" placeholder="0" value={this.state.process} disabled ></textarea>
                        <textarea name="" className="result" cols="25" rows="1" placeholder="0" value={this.state.current} disabled ></textarea>
                    </div>
                    <div className="button container">

                        <GridButton onClick={(e)=>{this.btnHandler(e);}} className="operator" value="%" text="%"></GridButton>
                        <GridButton onClick={(e)=>{this.btnHandler(e);}} className="selfOperator" value="√" text="√"></GridButton>
                        <GridButton onClick={(e)=>{this.btnHandler(e);}} className="selfOperator" value="𝒳²" text="𝒳²"></GridButton>
                        <GridButton onClick={(e)=>{this.btnHandler(e);}} className="selfOperator" value="¹/𝒳" text="¹/𝒳"></GridButton>
                        <GridButton onClick={(e)=>{this.btnHandler(e);}} className="control" value="ce" text="CE"></GridButton>
                        <GridButton onClick={(e)=>{this.btnHandler(e);}} className="control" value="c" text="C"></GridButton>
                        <GridButton onClick={(e)=>{this.btnHandler(e);}} className="control" value="back" text="⇦"></GridButton>
                        <GridButton onClick={(e)=>{this.btnHandler(e);}} className="operator" value="÷" text="÷"></GridButton>
                        <GridButton onClick={(e)=>{this.btnHandler(e);}} className="num" value="7" text="7"></GridButton>
                        <GridButton onClick={(e)=>{this.btnHandler(e);}} className="num" value="8" text="8"></GridButton>
                        <GridButton onClick={(e)=>{this.btnHandler(e);}} className="num" value="9" text="9"></GridButton>
                        <GridButton onClick={(e)=>{this.btnHandler(e);}} className="operator" value="×" text="×"></GridButton>
                        <GridButton onClick={(e)=>{this.btnHandler(e);}} className="num" value="4" text="4"></GridButton>
                        <GridButton onClick={(e)=>{this.btnHandler(e);}} className="num" value="5" text="5"></GridButton>
                        <GridButton onClick={(e)=>{this.btnHandler(e);}} className="num" value="6" text="6"></GridButton>
                        <GridButton onClick={(e)=>{this.btnHandler(e);}} className="operator" value="−" text="−"></GridButton>
                        <GridButton onClick={(e)=>{this.btnHandler(e);}} className="num" value="1" text="1"></GridButton>
                        <GridButton onClick={(e)=>{this.btnHandler(e);}} className="num" value="2" text="2"></GridButton>
                        <GridButton onClick={(e)=>{this.btnHandler(e);}} className="num" value="3" text="3"></GridButton>
                        <GridButton onClick={(e)=>{this.btnHandler(e);}} className="operator" value="+" text="+"></GridButton>
                        <GridButton onClick={(e)=>{this.btnHandler(e);}} className="operator" value="±" text="±"></GridButton>
                        <GridButton onClick={(e)=>{this.btnHandler(e);}} className="num" value="0" text="0"></GridButton>
                        <GridButton onClick={(e)=>{this.btnHandler(e);}} className="num" value="." text="."></GridButton>
                        <GridButton onClick={(e)=>{this.btnHandler(e);}} className="selfOperator" value="=" text="="></GridButton>
                    </div>

                </div>
            </>
        );
    }
}
export default Calculator;