import React, { Component } from 'react';
import LogoButton from './LogoButton'
import './LogoAndTitleDiv.css'
import {Link} from 'react-router-dom';

class LogoAndTitleDiv extends Component {
    constructor(props){
        super(props)
    }

    logoOnClickHandler=(e)=>{
        //e.stopPropagation()
        let msg = true
        if(this.props.IntroListShowOrHide)
        {
            msg = false
        }

        this.props.getLogoClick(msg)
    }

    titleOnClickHandler=()=>{
        this.props.getTitleClick()
    }

    render(){
        const style = {
            //width:360,
            height:100,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        }

        const mdStyle = {
            color:'#adb4bf',
            fontSize:40,
            fontFamily:'Microsoft JhengHei',
            lineHeight:'100px'
        }

        const sdStyle = {
            display: 'flex',
            flexDirection: 'row',
            color:'#b0b0b0',
            fontSize:12,
        }

        const captial = {
            color:'#61dafb',
            fontSize:12,
            fontWeight:'bold',
            paddingLeft:2
        
        }
    
        return(
            <div style={style}>
                <div onClick={this.logoOnClickHandler}>
                    <LogoButton IntroListShowOrHide={this.props.IntroListShowOrHide}/>
                </div>
              
                <div className={"titleGroup"} onClick={()=>this.props.goToFrontPage()}>
                    <div style={mdStyle}>{"藏品資料庫查詢模組"}</div>
                </div>
              
            </div>
        )
    }
}

export default LogoAndTitleDiv