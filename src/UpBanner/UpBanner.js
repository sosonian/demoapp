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
            searchInfo:null,
            //count:0,
            url:"/"
        }
    }

    getLogoClick=(msg)=>{
        this.setState({
            searchInfo:null,
            redirect:false
        },()=>{
            this.props.getLogoClick(msg)
        })
    }

    goToFrontPage=()=>{
        console.log("goToFrontPage...")
        if(this.state.url === "/")
        {
            this.setState({
                searchInfo:null,
                url:"/default"
            })
        }
        else if(this.state.url === "/default")
        {
            this.setState({
                searchInfo:null,
                url:"/"
            })
        }
        else
        {
            this.setState({
                searchInfo:null,
                url:"/"
            })
        }
    }

    getSearchInfo=(msg)=>{
        let uriQuery = encodeURIComponent(JSON.stringify(msg.searchWord))
        let url = '/SearchResult/searchType/'+msg.type+'/query/'+uriQuery
        this.setState({
            searchInfo:msg,
            url:url
        })
    }

    render(){
        console.log("UpBanner render...")
        console.log(this.state.url)
        
        return(
           
            <div className="UpBannerBody">
                <Redirect to={this.state.url}/>
                <LogoAndTitleDiv getLogoClick={this.getLogoClick} goToFrontPage={this.goToFrontPage} IntroListShowOrHide={this.props.IntroListShowOrHide}/>
                <RecordSearchArea getSearchInfo={this.getSearchInfo} ipAddress={this.props.ipAddress}/>
            </div>
        )
    }
}

export default UpBanner
