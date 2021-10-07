import React, { Component } from 'react';
import "./GridButton.scss";
class GridButton extends Component {
    constructor(props){
        super(props);    
    }
    render() {
        return (
            <div className={"button_container"}>
                <button className={this.props.className} onClick={this.props.onClick} style={this.props.style} value={this.props.value} >{this.props.text}</button>

            </div>
        );
    }
}

export default GridButton;
