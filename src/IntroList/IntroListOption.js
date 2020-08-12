import React, { Component } from 'react';
import './IntroListOption.css'
import {Link} from 'react-router-dom';

class IntroListOption extends Component {
    constructor(props){
        super(props)
    }

    getClassName=()=>{
        let className = "IntroListOption" 
        return className
    }

    render(){
        
        return(
            <Link to={"/Introduction/"+this.props.firstRoute+"/"+this.props.secondRoute+"/"+this.props.optionID} style={{ textDecoration: 'none' }}>
                <div className={"IntroListOption"} > 
                    {this.props.optionTitle}
                </div>
            </Link>
        )
    }
}

export default IntroListOption