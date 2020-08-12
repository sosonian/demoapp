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
            width:360,
            height:60,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        }

        const mdStyle = {
            color:'#ffffff',
            fontSize:20,
            fontFamily:'Microsoft JhengHei',
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
                    <div style={mdStyle}>{"國家電影中心藏品資料庫"}</div>
                    <div style={sdStyle}>
                        <div style={captial}>{"T"}</div>{"aiwan"}<div style={captial}>{"F"}</div>{"ilm"}<div style={captial}>{"I"}</div>{"nstitution Archives Database"}
                    </div>
                </div>
              
            </div>
        )
    }
}

export default LogoAndTitleDiv