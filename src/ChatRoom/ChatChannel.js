import React, {Component} from 'react'
import './ChatChannel.css'
import CameraIcon from '@material-ui/icons/LocalSee'



class ChatChannel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message:"請輸入訊息"
        }
        //this.dummyChatRowRef = React.createRef()
    }

    componentDidMount(){
        this.scrollToBottom()
        this.markMessageRead()
    }

    componentDidUpdate(prevProp, prevstate){
        if(prevProp.textInfo !== this.props.textInfo)
        {
            console.log("ChatChannel update")
            this.scrollToBottom()

            if(this.props.textInfo)
            {
                console.log("A1")
                if(!prevProp.textInfo)
                {
                    console.log("A1-1")
                    this.markMessageRead()
                }
                else
                {
                    console.log("A1-2")
                    let objA = prevProp.textInfo[prevProp.textInfo.length -1]
                    let objB = this.props.textInfo[this.props.textInfo.length -1]

                    if(objA.channelID !== objB.channelID || objA.emitDate !== objB.emitDate || objA.emitID !== objB.emitID || objA.emitImage !== objB.emitImage || objA.emitMessage !== objB.emitMessage || objA.emitName !== objB.emitName || objA.emitTime !== objB.emitTime)                        
                    {
                        console.log("A1-2-1")
                        this.markMessageRead()
                    }
                }
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.textInfo === this.props.textInfo && nextState.message === this.state.message)
        {
            return false
        }
        else
        {
            return true
        }
    }

    scrollToBottom=()=>{
        console.log(this.dummyChatRowRef)
        this.dummyChatRowRef.scrollIntoView({ behavior: "smooth" })
    }

    createFirstRow=()=>{
        let cTime = new Date()
        return <div className={"rightChatRow"}>
        <div className={"chatRowHeader"}><div className={"chatRowName"}>{"系統自動客服"}</div><div className={"chatRowTime"}>{cTime.toLocaleString("zh-TW",{timeStyle:"medium",hour12:false})}</div></div>
        <div className={"rightChatMessage"}>{"您好，歡迎使用藏品資料查詢系統~"}</div>
        </div>
    }

    createSecondRow=()=>{
        let cTime = new Date()
        return <div className={"rightChatRow"}>
        <div className={"chatRowHeader"}><div className={"chatRowName"}>{"系統自動客服"}</div><div className={"chatRowTime"}>{cTime.toLocaleString("zh-TW",{timeStyle:"medium",hour12:false})}</div></div>
        <div className={"rightChatMessage leftAlign"}>{"請問您是要："}
            <div className={"queryTypeOption"} onClick={()=>this.chooseType(1)}>{"1. 我有使用上的問題想請教。"}</div>
            <div className={"queryTypeOption"} onClick={()=>this.chooseType(2)}>{"2. 我發現資料文字有錯誤!"}</div>
            <div className={"queryTypeOption"} onClick={()=>this.chooseType(3)}>{"3. 我發現系統有些功能不正常!"}</div>
            <div className={"queryTypeOption"} onClick={()=>this.chooseType(4)}>{"4. 我對於此系統有些建議跟想法。"}</div>
            <div className={"queryTypeOption"} onClick={()=>this.chooseType(5)}>{"5. 都不是，我有其他問題..."}</div>
        </div>
        </div>
    }

    chooseType=(number)=>{
        let msg = {
            userID: this.props.hostUserID,
            emitMessage:"請輸入訊息"
        }
        switch(number){
            case 1:
                msg = {
                    userID: this.props.hostUserID,
                    emitMessage:"我有使用上的問題想請教。"
                }
                this.props.getChatMessage(msg)
                this.setState({
                    message:"請輸入訊息"
                })
                break;
            case 2:
                msg = {
                    userID: this.props.hostUserID,
                    emitMessage:"我發現資料文字有錯誤!。"
                }
                this.props.getChatMessage(msg)
                this.setState({
                    message:"請輸入訊息"
                })
                break;
            case 3:
                msg = {
                    userID: this.props.hostUserID,
                    emitMessage:"我發現系統有些功能不正常!。"
                }
                this.props.getChatMessage(msg)
                this.setState({
                    message:"請輸入訊息"
                })
                break;
            case 4:
                msg = {
                    userID: this.props.hostUserID,
                    emitMessage:"我對於此系統有些建議跟想法!。"
                }
                this.props.getChatMessage(msg)
                this.setState({
                    message:"請輸入訊息"
                })
                break;
            case 5:
                msg = {
                    userID: this.props.hostUserID,
                    emitMessage:"都不是，我有其他問題!。"
                }
                this.props.getChatMessage(msg)
                this.setState({
                    message:"請輸入訊息"
                })
                break;
            default:
                break;
        }
    }

    createMessageRows=()=>{
        let output = []
        if(this.props.textInfo)
        {
            
            if(this.props.queryStage === "1A")
            {
                output.push(this.createFirstRow(),this.createSecondRow())
            }
            else
            {
                output = this.props.textInfo.map(text=>{
                    // let imageUrl
                    // if(chat.emitImage)
                    // {
                    //     imageUrl = URL.createObjectURL(chat.emitImage)
                    // }
                    return <div className={text.emitID === this.props.hostUserID ? "leftChatRow":"rightChatRow"}>
                    <div className={"chatRowHeader"}><div className={"chatRowName"}>{text.emitName}</div><div className={"chatRowTime"}>{text.emitTime}</div></div>
                    <div className={text.emitID === this.props.hostUserID ? "leftChatMessage":"rightChatMessage"}>{text.emitMessage? text.emitMessage:<a href={'http://192.168.3.220:5000/api/screenshotImage/download/'+text.emitImage} style={{display:"table-cell"}} target="_blank"><img src={'http://192.168.3.220:5000/api/screenshotImage/download/'+text.emitImage} style={{maxWidth:"150px",height:"auto",cursor:"pointer"}}/></a>}</div>
                    </div>
                })
            }
            //return null
        }
        else
        {
            if(this.props.queryStage === "1A")
            {
                output.push(this.createFirstRow(),this.createSecondRow())
            }
            else
            {
                output = null
            }
        }

        return output
    }

    closeChannel=()=>{
        this.props.closeChannel()
    }

    markMessageRead=()=>{
        console.log("markMessageRead")
        if(this.props.textInfo)
        {
            let msg = {
                channelID : this.props.hostUserID,
                type : "query"
            }

            this.props.markRead(msg)
        }
    }

    messageInput=(e)=>{
        if(e.target.value !== this.state.message)
        {
            if(new TextEncoder().encode(e.target.value).length < 300)
            {
                this.setState({message:e.target.value})
            }
        }
    }

    messageSubmit=(e)=>{
        if(e.key === "Enter")
        {
            console.log('do submit message...')
            let msg = {
                userID: this.props.hostUserID,
                emitMessage:this.state.message
            }
            this.props.getChatMessage(msg)
            this.setState({
                message:"請輸入訊息"
            })
        }
    }

    takeScreenShot=()=>{
        this.props.takeScreenShot()
    }

    render(){
        return(
            <div className={"chatChannel"} style={{right:this.props.index*280+250}}>   
                <div className={"chatChannelHeader"}>
                    <div className={"chatChannelLabel"}>{"反映問題"}</div>
                    <div className={"rightUpConrnerArea"}>
                        <div className={"chatChannelButton"} onClick={this.takeScreenShot}><CameraIcon/></div>
                        <div className={"chatChannelCloseButton"} onClick={this.closeChannel}>{"x"}</div>
                    </div>
                </div> 
                <div className={"chatRowContainer"}>
                    {this.createMessageRows()}
                    <div className={"chatRowBottom"} ref={(re)=>{this.dummyChatRowRef= re}}></div>
                </div>
                <div className={"chatChannelInput"}><input type="text" style={{width:"100%",border:"1px solid #c5c5c5"}} value={this.state.message?this.state.message:""} onChange={this.messageInput} onKeyDown={this.messageSubmit}/></div>      
            </div>    
        )
    }
}

export default ChatChannel
