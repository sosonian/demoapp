import React, { Component } from 'react';
import './MovieWorkProductionInfo.css';

class MovieWorkProductionInfo extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
    }

    render(){
    
        return(
            <div className="MovieWorkProductionInfo">  
                <div className="MovieSection">{"預算 : "}{this.getSectionInfoOutput("budget")}</div>
                <div className="MovieSection">{"補助金 : "}{this.getSectionInfoOutput("subsidy")}</div>
                <div className="MovieSection">{"製作起始年度 : "}{this.getSectionInfoOutput("projectBegin")}</div>
                <div className="MovieSection">{"製作完成年度 : "}{this.getSectionInfoOutput("projectFinish")}</div>
            </div>
        )
    }
}

export default MovieWorkProductionInfo