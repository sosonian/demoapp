import React, { Component } from 'react';
import LogoAndTitleDiv from './LogoAndTitleDiv'
import RecordSearchArea from './RecordSearchArea'
import './UpBanner.css'
import { Redirect } from 'react-router-dom'


class UpBanner extends Component {
    constructor(props){
        super(props)
        this.state = {
            basicSearchWord:"查詢全欄位，可用 AND、OR 布林邏輯",
            redirect:false,
            searchInfo:null
        }
    }

    getLogoClick=(msg)=>{
        this.props.getLogoClick(msg)
    }

    getSearchInfo=(msg)=>{
        this.setState({
            searchInfo:msg,
            redirect:true
        })
        //this.props.getSearchInfo(msg)
    }

    getUrl=()=>{
        if(this.state.searchInfo)
        {
            console.log("searchword : ")
            console.log(this.state.searchInfo.searchWord)      
            let uriQuery = encodeURIComponent(JSON.stringify(this.state.searchInfo.searchWord))
            let url = '/SearchResult/searchType/'+this.state.searchInfo.type+'/query/'+uriQuery
            return url
        }
        else
        {
            return null
        }
    }



    render(){
        
        return(
           
            <div className="UpBannerBody">
                {this.state.redirect? <Redirect to={this.getUrl()}/>:null}
               <LogoAndTitleDiv getLogoClick={this.getLogoClick} IntroListShowOrHide={this.props.IntroListShowOrHide}/>
               <RecordSearchArea getSearchInfo={this.getSearchInfo} ipAddress={this.props.ipAddress}/>
            </div>
        )
    }
}

export default UpBanner
