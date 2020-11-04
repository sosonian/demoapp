import React, { Component } from 'react';
import UpBanner from '../UpBanner/UpBanner'
import './MainBody.css'
import IntroList from '../IntroList/IntroList'
import EventBody from '../Event/EventBody'
import MovieWorkInfoMainBody from '../MovieWorkInfo/MovieWorkInfoMainBody'
import ResultListMainBody from '../ResultList/ResultListMainBody'
import EventPage from '../Event/EventPage'
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import {serverIP} from '../IPAdressModule'
import ChatRoom from '../ChatRoom/ChatRoom'
import ChatChannel from '../ChatRoom/ChatChannel'
import webSocket from 'socket.io-client'
import html2canvas from 'html2canvas'
import ScreenshotContainer from '../Screenshot/ScreenshotContainer'
import HomeBody from '../Home/HomeBody'

class MainBody extends Component {
    constructor(props){
        super(props)
        this.state = {
            event:true,
            showIntroList:false,
            sessionID:null,
            queryType:null,
            clientIP:null,
            clientName:null,
            clientEmail:null,
            toggleScreenshotPicker:false,
            screenshotArea:null,
            screenshotEmitInfo:null,
            wsMiddleWare:null,
            preQuery:null,
            query:null,
            toggleChatChannel:false,
            queryStage:"1",
            newUrl:null,
            scrollTop:0,
            windowSize:"large"
        } 
        this.containerLayout = React.createRef()
    }

    componentDidMount(){
        window.addEventListener("resize", this.getResizeWidth)
        this.userSessionStart()       
        window.addEventListener("beforeunload",(e)=>this.userSessionEnd(e))
    }

    componentDidUpdate(prevProps,prveState){
        

        if(this.state.screenshotArea)
        {
            let msg = this.state.screenshotArea
            this.captureScreenShot(msg.x, msg.y+this.state.scrollTop, msg.width, msg.height, this.state.screenshotEmitInfo)
            this.setState({
                screenshotArea:null,
                screenshotEmitInfo:null
            })
        }
    }

    componentWillUnmount(){
        window.removeEventListener("beforeunload", this.userSessionEnd)
    }

    getResizeWidth=()=>{
        //console.log(this.scrollContainerLayout)
        let tempWidth = 1900
        if(this.containerLayout.current)
        {
            tempWidth = this.containerLayout.current.scrollWidth
        }
    
        //console.log(tempWidth)
        if(tempWidth >= 1900)
        {
            if(this.state.windowSize !== "large")
            {
                this.setState({
                    windowSize :"large"
                })
            }
        }
        else if(tempWidth<1900 && tempWidth >= 900)
        {
            if(this.state.windowSize !== "medium")
            {
                this.setState({
                    windowSize :"medium"
                })
            }
        }
        else if(tempWidth<900)
        {
            if(this.state.windowSize !== "small")
            {
                this.setState({
                    windowSize :"small"
                })
            }
        }
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

            if(this.state.queryStage === "4")
            {
                this.setState({queryStage : "5"},()=>{
                    this.state.wsMiddleWare.emit('query_image',{channelID:emitInfo.channelID, emitID:emitInfo.visitorID, emitName:this.state.clientName? this.state.clientName:emitInfo.visitorName, emitIP:this.state.clientIP, emitImage:screenshotImg, read:tempObj})
                })
            }
            else
            {
                this.state.wsMiddleWare.emit('query_image',{channelID:emitInfo.channelID, emitID:emitInfo.visitorID, emitName:this.state.clientName? this.state.clientName:emitInfo.visitorName, emitIP:this.state.clientIP, emitImage:screenshotImg, read:tempObj})
            }
        })
    }
  
    userSessionStart=async()=>{
        console.log("userSessionStart")
        let msg = await fetch(serverIP+'/frontEnd/userBehavior/session/start',{
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
            wsMiddleWare:webSocket(serverIP)
        },()=>{
            this.dealWebSocket()
            this.createPersonalRoom()
            this.emitStageOne()
            this.getResizeWidth()
        })
    }

    userSessionEnd=(e)=>{
        e.preventDefault()      
        this.emitUserSessionEnd()
        let msg = fetch(serverIP+'/frontEnd/userBehavior/session/leave/'+this.state.sessionID)
        e.returnValue = ""  // !!!!!! Chrome requires returnValue to be set !!!!!!!
    }

    emitUserSessionEnd=()=>{ 
        this.state.wsMiddleWare.emit('visitor_leave',{visitorIP:this.state.clientIP, visitorName:this.state.clientName})
        //e.returnValue = ""
      }
  

    createPersonalRoom=()=>{
        if(this.state.clientIP)
        {
            this.state.wsMiddleWare.emit('visitor_visit',{visitorID:this.state.clientIP, visitorIP:this.state.clientIP, visitorName:this.state.clientName?this.state.clientName:this.state.clientIP})
        }
    }

    dealWebSocket=()=>{
        console.log("dealWebSocket...")
        this.state.wsMiddleWare.on('query', data=>{
              
            let IDArray = []
            let tempObj = data[data.length-1]
            let stage

            if(this.state.queryStage === "10")
            {
                IDArray = null
                stage = "10"
            }
            else if(this.state.queryStage === "6" && tempObj.emitMessage === "cmsStage5B")
            {
                this.state.wsMiddleWare.emit('queryComplete',{channelID:this.state.clientIP,emitID:this.state.clientIP, emitName:this.state.clientName, emitIP:this.state.clientIP, emitFullTime:tempObj.emitFullTime, emitEmail:this.state.clientEmail, queryType:this.state.queryType, IDList:this.state.preQuery})
                stage = "10"
                IDArray = null
            }
            else
            {
                if(this.state.preQuery)
                {
                    IDArray = this.state.preQuery

                    if(IDArray[IDArray.length-1].DBID !== tempObj.DBID)
                    {
                        let obj = { DBID:tempObj.DBID}
                        IDArray.push(obj)
                    }
                }
                else
                {
                    let obj = { DBID:tempObj.DBID}
                    IDArray.push(obj)
                }
                stage = this.state.queryStage
            }

            
            this.setState({
                query:data,
                preQuery:IDArray,
                queryStage:stage
            })                 
        })
  
        this.state.wsMiddleWare.on('query_image', data=>{
            console.log('query_image')
            console.log(data)
            let IDArray = []
            let tempObj = data[data.length-1]

            if(this.state.preQuery)
            {
                IDArray = this.state.preQuery

                if(IDArray[IDArray.length-1].DBID !== tempObj.DBID)
                {
                    let obj = { DBID:tempObj.DBID}
                    IDArray.push(obj)
                }
            }
            else
            {
                let obj = { DBID:tempObj.DBID}
                IDArray.push(obj)
            }
            
            this.setState({
                query:data,
                preQuery:IDArray
            })
        })
    }
  
    getLogoClick=(msg)=>{
        //if(!this.state.showIntroList)
        //{
            this.setState({
                showIntroList:msg
            })
        //}
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
            return <ChatChannel hostUserID={this.state.clientIP} hostUserName={this.state.clientName} textInfo={this.state.preQuery} queryInfo={this.state.query} closeChannel={this.closeChannel} getChatMessage={this.getChatMessage} takeScreenShot={this.takeScreenShot} markRead={this.markRead} queryStage={this.state.queryStage}/>
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
            screenshotArea:msg,
            scrollTop:document.documentElement.scrollTop
        })
    }

    markRead=(msg)=>{
        this.state.wsMiddleWare.emit('mark_read',{channelID:msg.channelID, emitID:this.state.clientIP, type:msg.type})
    }

    emitStageOne=()=>{

        console.log("emit firstStage")
        let tempObj = {}
        tempObj[this.state.clientIP] = true
        this.state.wsMiddleWare.emit('query',{channelID:this.state.clientIP, emitID:"AutoResponse", emitName:"自動客服", emitIP:"AutoResponse", emitMessage:"cmsStage1A",read:tempObj})
        this.state.wsMiddleWare.emit('query',{channelID:this.state.clientIP, emitID:"AutoResponse", emitName:"自動客服", emitIP:"AutoResponse", emitMessage:"cmsStage1B",read:tempObj})
 
    }

    getChatMessage=(msg, stage)=>{
        console.log("getChatMessage...")
        let tempObj = {}
        tempObj[this.state.clientIP] = true

        if(stage === "1")
        {
            console.log("stage 1")
            this.setState({
                queryStage:stage
            },()=>{
                this.state.wsMiddleWare.emit('query',{channelID:this.state.clientIP, emitID:this.state.clientIP, emitName:this.state.clientName, emitIP:this.state.clientIP, emitMessage:msg.emitMessage,read:tempObj})  
                this.state.wsMiddleWare.emit('query',{channelID:this.state.clientIP, emitID:"AutoResponse", emitName:"自動客服", emitIP:"AutoResponse", emitMessage:"cmsStage1A",read:tempObj})
                this.state.wsMiddleWare.emit('query',{channelID:this.state.clientIP, emitID:"AutoResponse", emitName:"自動客服", emitIP:"AutoResponse", emitMessage:"cmsStage1B",read:tempObj})
            })

        }
        else if(stage === "2")
        {
            
            if(this.state.clientName)
            {
                this.setState({
                    queryType:msg.emitMessage,
                    queryStage:"4"
                },()=>{
                    this.state.wsMiddleWare.emit('query',{channelID:this.state.clientIP, emitID:this.state.clientIP, emitName:this.state.clientName, emitIP:this.state.clientIP, emitMessage:msg.emitMessage,read:tempObj})
                    this.state.wsMiddleWare.emit('query',{channelID:this.state.clientIP, emitID:"AutoResponse", emitName:"自動客服", emitIP:"AutoResponse", emitMessage:"cmsStage4A",read:tempObj})
                    this.state.wsMiddleWare.emit('query',{channelID:this.state.clientIP, emitID:"AutoResponse", emitName:"自動客服", emitIP:"AutoResponse", emitMessage:"cmsStage4B",read:tempObj})
                    this.state.wsMiddleWare.emit('query',{channelID:this.state.clientIP, emitID:"AutoResponse", emitName:"自動客服", emitIP:"AutoResponse", emitMessage:"cmsStage4C",read:tempObj})
                })
            }
            else
            {
                this.setState({
                    queryType:msg.emitMessage,
                    queryStage:stage
                },()=>{
                    this.state.wsMiddleWare.emit('query',{channelID:this.state.clientIP, emitID:this.state.clientIP, emitName:this.state.clientName, emitIP:this.state.clientIP, emitMessage:msg.emitMessage,read:tempObj})  
                    this.state.wsMiddleWare.emit('query',{channelID:this.state.clientIP, emitID:"AutoResponse", emitName:"自動客服", emitIP:"AutoResponse", emitMessage:"cmsStage2",read:tempObj})
                })
            }
            
        }
        else if(stage === "3")
        {
            this.setState({
                clientName:msg.emitMessage,
                queryStage:stage
            },()=>{
                this.state.wsMiddleWare.emit('query',{channelID:this.state.clientIP, emitID:this.state.clientIP, emitName:this.state.clientName, emitIP:this.state.clientIP, emitMessage:msg.emitMessage,read:tempObj})  
                this.state.wsMiddleWare.emit('query',{channelID:this.state.clientIP, emitID:"AutoResponse", emitName:"自動客服", emitIP:"AutoResponse", emitMessage:"cmsStage3",read:tempObj})
            })
        }
        else if(stage === "4")
        {
            this.setState({
                clientEmail:msg.emitMessage,
                queryStage:stage
            },()=>{
                this.state.wsMiddleWare.emit('query',{channelID:this.state.clientIP, emitID:this.state.clientIP, emitName:this.state.clientName, emitIP:this.state.clientIP, emitMessage:msg.emitMessage,read:tempObj})
                this.state.wsMiddleWare.emit('query',{channelID:this.state.clientIP, emitID:"AutoResponse", emitName:"自動客服", emitIP:"AutoResponse", emitMessage:"cmsStage4A",read:tempObj})
                this.state.wsMiddleWare.emit('query',{channelID:this.state.clientIP, emitID:"AutoResponse", emitName:"自動客服", emitIP:"AutoResponse", emitMessage:"cmsStage4B",read:tempObj})
                this.state.wsMiddleWare.emit('query',{channelID:this.state.clientIP, emitID:"AutoResponse", emitName:"自動客服", emitIP:"AutoResponse", emitMessage:"cmsStage4C",read:tempObj})
            })      
        }
        else if(stage === "5")
        {
            
            this.setState({
                queryStage:stage
            },()=>{
                this.state.wsMiddleWare.emit('query',{channelID:this.state.clientIP, emitID:this.state.clientIP, emitName:this.state.clientName,  emitIP:this.state.clientIP, emitMessage:msg.emitMessage,read:tempObj})
                
            })      
        }
        else if(stage === "6")
        {
           
            this.setState({
                queryStage:stage
            },()=>{
                this.state.wsMiddleWare.emit('query',{channelID:this.state.clientIP, emitID:this.state.clientIP, emitName:this.state.clientName, emitIP:this.state.clientIP,  emitMessage:msg.emitMessage,read:tempObj})
                this.state.wsMiddleWare.emit('query',{channelID:this.state.clientIP, emitID:"AutoResponse", emitName:"自動客服", emitIP:"AutoResponse",  emitMessage:"cmsStage5A",read:tempObj})
                this.state.wsMiddleWare.emit('query',{channelID:this.state.clientIP, emitID:"AutoResponse", emitName:"自動客服", emitIP:"AutoResponse",  emitMessage:"cmsStage5B",read:tempObj})
                
            })      
        }
        else
        {
            this.setState({
                queryStage:stage
            },()=>{
                this.state.wsMiddleWare.emit('query',{channelID:this.state.clientIP, emitID:this.state.clientIP, emitName:this.state.clientName, emitIP:this.state.clientIP, emitMessage:msg.emitMessage,read:tempObj})  
            })
        }
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

        return(
            <BrowserRouter>
            {this.state.newUrl ?<Redirect to={this.state.newUrl}/> : null}
            <div className="MainBody" onClick={this.onClickHandler} ref={this.containerLayout} >  
                {this.createChatChannel()}
                <ChatRoom unreadMessage={this.countUnreadMessage()} userID={this.state.clientIP} getChatChannel={this.getChatChannel} queryStage={this.state.queryStage}/>
                <div className="UpHeader"> 
                    <UpBanner getLogoClick={this.getLogoClick} IntroListShowOrHide={this.state.showIntroList} getSearchInfo={this.getSearchInfo} ipAddress={serverIP}/> 
                    <IntroList showOrHide={this.state.windowSize === "small" ? this.state.showIntroList:true} windowSize={this.state.windowSize}/>
                </div>
                <div className="MainContainer" >     
                    <div className="BufferArea"/>
                    <Route exact path='/' render={props=>(<HomeBody {...props} windowSize={this.state.windowSize}/>)}/>
                    <Route exact path='/default' render={props=>(<HomeBody {...props} windowSize={this.state.windowSize}/>)}/>
                    <Route path='/Movie/Workinfo/:movie_id' component={MovieWorkInfoMainBody}/>
                    <Route path='/Event/:Event_SysID' component={EventPage}/>
                    <Route path='/Introduction/:FirstStageRoute/:SecondStageRoute/:StaticPage_SysID' component={EventPage}/>
                    <Route path='/SearchResult/searchType/:searchType/limit/:limit/page/:page/query/:query' component={ResultListMainBody}/>
                </div>
                <div className="BackgroundImage" >  
                </div>             
            </div>
            {this.state.toggleScreenshotPicker? <ScreenshotContainer closeScreenshotPicker={this.closeScreenshotPicker} getSreenshotArea={this.getSreenshotArea}/>:null}
            </BrowserRouter>
        )
    }
}

export default MainBody
