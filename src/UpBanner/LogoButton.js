import React, { Component } from 'react';
import {ReactComponent as TFILogo} from '../Utilites/TFILogo.svg'
import './LogoButton.css'
import TFILogoComponent from '../Utilites/TFILogo'
import NewLogo from '../Utilites/NewLogo'


class LogoButton extends Component {
    constructor(props){
        super(props)
    }

    getLogoBackgroundClassName=()=>{
        let className = "LogoBackground"
        if(this.props.IntroListShowOrHide)
        {
            className = "LogoBackground On" 
        }
        return className
    }

    render(){
        
        return(
            <div className="LogoButton">
               <NewLogo/>
               <div className={this.getLogoBackgroundClassName()} >
               </div>
            </div>
        )
    }
}

export default LogoButton
