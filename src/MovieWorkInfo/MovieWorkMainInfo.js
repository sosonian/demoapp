import React, { Component } from 'react';
import './MovieWorkMainInfo.css';

class MovieWorkMainInfo extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
    }

    render(){
    
        return(
            <div className="MovieWorkMainInfo">  
                <div className="MovieTitleSection">{"片名 : "}{title}</div>
                <div className="MovieTitleSection">{"作品語言 : "}{this.getSectionInfoOutput("langauge")}</div>
                <div className="MovieTitleSection">{"作品主要類型 : "}{this.getSectionInfoOutput("mainType")}</div>
                <div className="MovieTitleSection">{"作品次要類型 : "}{this.getSectionInfoOutput("subType")}</div>
                <div className="MovieTitleSection">{"長片或短片 : "}{this.getSectionInfoOutput("longShort")}</div>
                <div className="MovieTitleSection">{"劇情概要 : "}{this.getSectionInfoOutput("plot")}</div>
                <div className="MovieTitleSection">{"作品時長 : "}{this.getSectionInfoOutput("duration")}</div>
                <div className="MovieTitleSection">{"畫面比例 : "}{this.getSectionInfoOutput("aspectRatio")}</div>
                <div className="MovieTitleSection">{"畫面色彩 : "}{this.getSectionInfoOutput("color")}</div>
            </div>
        )
    }
}

export default MovieWorkMainInfo