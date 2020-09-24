import React, { Component } from 'react';
import UpBanner from '../UpBanner/UpBanner'
import './MainBody.css'
import IntroList from '../IntroList/IntroList'
import EventBody from '../Event/EventBody'
import MovieWorkInfoMainBody from '../MovieWorkInfo/MovieWorkInfoMainBody'
import ResultListMainBody from '../ResultList/ResultListMainBody'
import EventPage from '../Event/EventPage'
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import Footer from '../Footer/Footer'
import IPAddress from '../IPAddress'
import ChatRoom from '../ChatRoom/ChatRoom'
import ChatChannel from '../ChatRoom/ChatChannel'
import webSocket from 'socket.io-client'
import html2canvas from 'html2canvas'
import ScreenshotContainer from '../Screenshot/ScreenshotContainer'

class MainBody extends Component {
    constructor(props){
        super(props)
        this.state = {
            event:true,
            showIntroList:false,
            sessionID:null,
            clientIP:null,
            clientName:null,
            ipAddress:null,
            toggleScreenshotPicker:false,
            screenshotArea:null,
            screenshotEmitInfo:null,
            wsMiddleWare:null,
            query:null,
            toggleChatChannel:false,
            newUrl:null
        }
    }

    componentDidMount(){
        this.initialIPAddress()
        this.userSessionStart()
        window.addEventListener("beforeunload",(e)=>this.userSessionEnd(e))
    }

    componentDidUpdate(prevProps,prveState){
        if(prveState.ipAddress !== this.state.ipAddress)
        {
            this.userSessionStart()
        }

        if(this.state.screenshotArea)
        {
            let msg = this.state.screenshotArea
            this.captureScreenShot(msg.x, msg.y, msg.width, msg.height, this.state.screenshotEmitInfo)
            this.setState({
                screenshotArea:null,
                screenshotEmitInfo:null
            })
        }
    }

    componentWillUnmount(){
        window.removeEventListener("beforeunload", this.userSessionEnd)
    }

    initialIPAddress=()=>{
        let tempIP = new IPAddress()
        this.setState({
            ipAddress:tempIP.state.ip
        })
    }

    captureScreenShot=(posX,posY,width,height, emitInfo)=>{
        html2canvas(document.body,{
            useCORS:true,
            allowTaint:false
        }).then((canvas)=>{
            let tempCanvas = document.createElement('canvas')
            let tempCanvasContext = tempCanvas.getContext('2d')
          
            tempCanvas.width = width/9*10
            tempCanvas.height = height/9*10
            tempCanvasContext.drawImage(canvas, posX, posY, width/9*10, height/9*10, 0, 0, width/9*10, height/9*10)
            //tempCanvasContext.drawImage(canvas, posX/9*10, posY/9*10, width/9*10, height/9*10, 0, 0, width/9*10, height/9*10)
         
            //var a = document.createElement('a')
            var screenshotImg = tempCanvas.toDataURL("image/jpeg")
            //a.download = 'testScreenShot.jpg'
            //a.click()
            let tempObj = {}
            tempObj[this.state.clientIP] = true
            this.state.wsMiddleWare.emit('query_image',{channelID:emitInfo.channelID, emitID:emitInfo.visitorID, emitName:emitInfo.visitorName, emitIP:this.state.clientIP, emitImage:screenshotImg, read:tempObj})
        })
    }
  
    userSessionStart=async()=>{
        console.log("userSessionStart")
        let msg = await fetch(this.state.ipAddress+'/frontEnd/userBehavior/session/start',{
            method:"POST",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        })
        let output = await msg.json()
        if(msg.status !== 200) throw Error(msg.message)
        console.log(output)
        this.setState({
            sessionID:output[0].sessionID,
            clientIP:output[0].clientIP,
            clientName:"來自"+output[0].clientIP,
            wsMiddleWare:webSocket('http://192.168.3.220:5000')
        },()=>{
            this.createPersonalRoom()
            this.dealWebSocket()
        })
    }

    userSessionEnd=(e)=>{
        e.preventDefault()      
        this.emitUserSessionEnd()
        let msg = fetch(this.state.ipAddress+'/frontEnd/userBehavior/session/leave/'+this.state.sessionID)
        e.returnValue = ""  // !!!!!! Chrome requires returnValue to be set !!!!!!!
    }

    emitUserSessionEnd=()=>{ 
        this.state.wsMiddleWare.emit('visitor_leave',{visitorIP:this.state.clientIP, visitorName:this.state.clientName})
        //e.returnValue = ""
      }
  

    createPersonalRoom=()=>{
        if(this.state.clientIP)
        {
            this.state.wsMiddleWare.emit('visitor_visit',{visitorID:this.state.clientIP, visitorIP:this.state.clientIP, visitorName:this.state.clientName})
        }
    }

    dealWebSocket=()=>{
        this.state.wsMiddleWare.on('query', data=>{
            console.log("socket on query")
            //console.log(data)
            this.setState({
                query:data
            })
        })
  
        this.state.wsMiddleWare.on('query_image', data=>{
            console.log('query_image')
            console.log(data)
            this.setState({
                query:data
            })
        })
    }
  
    getLogoClick=(msg)=>{
        if(!this.state.showIntroList)
        {
            this.setState({
                showIntroList:true
            })
        }
    }

    onClickHandler=()=>{
        if(this.state.showIntroList)
        {
            this.setState({
                showIntroList:false
            })
        }
    }

    countUnreadMessage=()=>{
        let resultArray = []
        if(this.state.query)
        {           
            console.log("countUnreadMessage")
            console.log(this.state.query)
            
            this.state.query.forEach(query=>{
                if( !query.read[this.state.clientIP])
                {
                    resultArray.push(query)
                }
            })        
            return resultArray
        }
        else
        {
            return resultArray
        }
    }

    createChatChannel=()=>{      
        if(this.state.toggleChatChannel)
        {
            return <ChatChannel hostUserID={this.state.clientIP} textInfo={this.state.query} closeChannel={this.closeChannel} getChatMessage={this.getChatMessage} takeScreenShot={this.takeScreenShot} markRead={this.markRead}/>
        }
    }

    getChatChannel=()=>{
        this.setState({
            toggleChatChannel:true
        })
    }

    closeChannel=()=>{  
        this.setState({
            toggleChatChannel:false
        })
    }
  
    takeScreenShot=()=>{
        let msg = {
            channelID:this.state.clientIP,
            type:"query",
            visitorID:this.state.clientIP,
            visitorName:"來自"+this.state.clientIP
        }
        this.setState({      
            toggleScreenshotPicker:true,
            screenshotEmitInfo:msg
        })
    }
  
    closeScreenshotPicker=()=>{
        this.setState({
            toggleScreenshotPicker:false,
            screenshotEmitInfo:null
        })
    }
  
    getSreenshotArea=(msg)=>{
        this.setState({
            toggleScreenshotPicker:false,
            screenshotArea:msg
        })
    }

    markRead=(msg)=>{
        this.state.wsMiddleWare.emit('mark_read',{channelID:msg.channelID, emitID:this.state.clientIP, type:msg.type})
    }

    getChatMessage=(msg)=>{
        let tempObj = {}
        tempObj[this.state.clientIP] = true
        this.state.wsMiddleWare.emit('query',{channelID:this.state.clientIP, emitID:this.state.clientIP, emitName:this.state.clientName, emitIP:this.state.clientIP, emitMessage:msg.emitMessage, read:tempObj})
    }

    getSearchInfo=(msg)=>{
        console.log("getSearchInfo")
        console.log(msg)
        let url = msg
        if(msg === "/default")
        {
            if(this.state.newUrl === "/default")
            {
                url = "/"
            }
            else if(this.state.newUrl === "/")
            {
                url = "/default"
            }
            else
            {
                url = "/default"
            }
        }
    
        this.setState({newUrl:url})
    }
  
    render(){
        console.log("MainBody render")
        return(
            <BrowserRouter>
            {this.state.newUrl ?<Redirect to={this.state.newUrl}/> : null}
            <div className="MainBody" onClick={this.onClickHandler}>  
                {this.createChatChannel()}
                <ChatRoom unreadMessage={this.countUnreadMessage()} userID={this.state.clientIP} getChatChannel={this.getChatChannel}/>
                <div className="UpHeader"> 
                    <UpBanner getLogoClick={this.getLogoClick} IntroListShowOrHide={this.state.showIntroList} getSearchInfo={this.getSearchInfo} ipAddress={this.state.ipAddress}/> 
                    <IntroList showOrHide={this.state.showIntroList}/>
                </div>
                <div className="MainContainer">     
                    <div className="BufferArea"/>
                    <Route exact path='/' component={EventBody}/>
                    <Route exact path='/default' component={EventBody}/>
                    <Route path='/Movie/Workinfo/:movie_id' component={MovieWorkInfoMainBody}/>
                    <Route path='/Event/:Event_SysID' component={EventPage}/>
                    <Route path='/Introduction/:FirstStageRoute/:SecondStageRoute/:StaticPage_SysID' component={EventPage}/>
                    <Route path='/SearchResult/searchType/:searchType/limit/:limit/page/:page/query/:query' component={ResultListMainBody}/>
                </div>
                <div className="BackgroundImage">  
                </div>             
            </div>
            {this.state.toggleScreenshotPicker? <ScreenshotContainer closeScreenshotPicker={this.closeScreenshotPicker} getSreenshotArea={this.getSreenshotArea}/>:null}
            </BrowserRouter>
        )
    }
}

export default MainBody
