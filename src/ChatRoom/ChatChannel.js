import React, {Component} from 'react'
import './ChatChannel.css'
import CameraIcon from '@material-ui/icons/LocalSee'
import {serverIP} from '../IPAdressModule'



class ChatChannel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message:"請輸入訊息",
        }
        //this.dummyChatRowRef = React.createRef()
    }

    componentDidMount(){
        this.scrollToBottom()
        this.markMessageRead()
    }

    componentDidUpdate(prevProp, prevstate){
        console.log("componentDidUpdate")
        this.scrollToBottom()
        if(prevProp.textInfo !== this.props.textInfo)
        {
            console.log("ChatChannel update")
            

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

    scrollToBottom=()=>{
        //console.log(this.dummyChatRowRef)
        this.dummyChatRowRef.scrollIntoView({ behavior: "smooth" })
    }

    createStageRow=(text)=>{
        switch(text.emitMessage){
            case "cmsStage1A":
                return <div className={"rightChatRow"}>
                    <div className={"chatRowHeader"}><div className={"chatRowName"}>{"系統自動客服"}</div><div className={"chatRowTime"}></div></div>
                    <div className={"rightChatMessage"}>{"您好，歡迎使用藏品資料查詢系統~"}</div>
                    </div>
            case "cmsStage1B":
                if(this.props.queryStage === "1")
                {
                    return <div className={"rightChatRow"}>
                    <div className={"chatRowHeader"}><div className={"chatRowName"}>{"系統自動客服"}</div><div className={"chatRowTime"}></div></div>
                    <div className={"rightChatMessage leftAlign"}>{"請問您是要："}
                        <div className={"queryTypeOption"} onClick={()=>this.chooseType(1)}>{"1. 我有使用上的問題想請教。"}</div>
                        <div className={"queryTypeOption"} onClick={()=>this.chooseType(2)}>{"2. 我發現資料文字有錯誤!"}</div>
                        <div className={"queryTypeOption"} onClick={()=>this.chooseType(3)}>{"3. 我發現系統有些功能不正常!"}</div>
                        <div className={"queryTypeOption"} onClick={()=>this.chooseType(4)}>{"4. 我對於此系統有些建議跟想法。"}</div>
                        <div className={"queryTypeOption"} onClick={()=>this.chooseType(5)}>{"5. 都不是，我有其他問題..."}</div>
                    </div>
                    </div>
                }
                else
                {
                    return <div className={"rightChatRow"}>
                    <div className={"chatRowHeader"}><div className={"chatRowName"}>{"系統自動客服"}</div><div className={"chatRowTime"}></div></div>
                    <div className={"rightChatMessage leftAlign"}>{"請問您是要："}
                        <div className={"queryTypeOptionChoosed"} >{"1. 我有使用上的問題想請教。"}</div>
                        <div className={"queryTypeOptionChoosed"} >{"2. 我發現資料文字有錯誤!"}</div>
                        <div className={"queryTypeOptionChoosed"} >{"3. 我發現系統有些功能不正常!"}</div>
                        <div className={"queryTypeOptionChoosed"} >{"4. 我對於此系統有些建議跟想法。"}</div>
                        <div className={"queryTypeOptionChoosed"} >{"5. 都不是，我有其他問題..."}</div>
                    </div>
                    </div>

                }
            case "cmsStage2":
                return <div className={"rightChatRow"}>
                    <div className={"chatRowHeader"}><div className={"chatRowName"}>{"系統自動客服"}</div><div className={"chatRowTime"}></div></div>
                    <div className={"rightChatMessage"}>{"好的，接下來請讓我們知道如何稱呼您，請於下方輸入您的名稱~"}</div>
                    </div>
            case "cmsStage3":
                return <div className={"rightChatRow"}>
                    <div className={"chatRowHeader"}><div className={"chatRowName"}>{"系統自動客服"}</div><div className={"chatRowTime"}></div></div>
                    <div className={"rightChatMessage"}>{"謝謝您"}<div style={{color:"blue"}}>{this.props.hostUserName
                    }</div>{"! 為方便聯繫您，再請您輸入您的email帳號"}</div>
                    </div>
            case "cmsStage4A":
                return <div className={"rightChatRow"}>
                    <div className={"chatRowHeader"}><div className={"chatRowName"}>{"系統自動客服"}</div><div className={"chatRowTime"}></div></div>
                    <div className={"rightChatMessage"}>{"謝謝您，接下來請描述您的問題或意見-"}</div>
                    </div>
            case "cmsStage4B":
                return <div className={"rightChatRow"}>
                    <div className={"chatRowHeader"}><div className={"chatRowName"}>{"系統自動客服"}</div><div className={"chatRowTime"}></div></div>
        <div className={"rightChatMessage"}>{"1. 截圖功能：您可以點擊"}<CameraIcon/>{"按鈕，頁面左上會出現可拖曳放大之截圖框。將其拖曳至您有問題之區域，再點擊截圖框左上同樣圖示，即可截圖並傳送給系統客服，使客服更直覺地了解您的問題。"}</div>
                    </div>  
            case "cmsStage4C":
                return <div className={"rightChatRow"}>
                    <div className={"chatRowHeader"}><div className={"chatRowName"}>{"系統自動客服"}</div><div className={"chatRowTime"}></div></div>
        <div className={"rightChatMessage"}>{'2. 文字數量：如您的意見文字較多，可分段輸入，請勿一對話框超過100字。如已陳述完畢，請於獨立對話框輸入"完畢"或"Done"，系統始進入下一階段。'}</div>
                    </div> 
            case "cmsStage5A":
                return <div className={"rightChatRow"}>
                    <div className={"chatRowHeader"}><div className={"chatRowName"}>{"系統自動客服"}</div><div className={"chatRowTime"}></div></div>
        <div className={"rightChatMessage"}>{"謝謝您提供的意見，如系統客服人員在線的話，將直接線上回覆您，若不在線，將於2日內回覆至您的信箱。"}</div>
                    </div>
            case "cmsStage5B":
                return <div className={"rightChatRow"}>
                    <div className={"chatRowHeader"}><div className={"chatRowName"}>{"系統自動客服"}</div><div className={"chatRowTime"}></div></div>
        <div className={"rightChatMessage"}>{'如您有新的問題，請於下方輸入: "我有問題"。'}</div>
                    </div>
            case "cmsQueryType1":
                return <div className={text.emitID === this.props.hostUserID ? "leftChatRow":"rightChatRow"}>
                    <div className={"chatRowHeader"}><div className={"chatRowName"}>{text.emitName}</div><div className={"chatRowTime"}>{text.emitTime}</div></div>
                    <div className={text.emitID === this.props.hostUserID ? "leftChatMessage":"rightChatMessage"}>{"我有使用上的問題想請教。"}</div>
                    </div>
            case "cmsQueryType2":
                return <div className={text.emitID === this.props.hostUserID ? "leftChatRow":"rightChatRow"}>
                    <div className={"chatRowHeader"}><div className={"chatRowName"}>{text.emitName}</div><div className={"chatRowTime"}>{text.emitTime}</div></div>
                    <div className={text.emitID === this.props.hostUserID ? "leftChatMessage":"rightChatMessage"}>{"我發現資料文字有錯誤!"}</div>
                    </div>
            case "cmsQueryType3":
                return <div className={text.emitID === this.props.hostUserID ? "leftChatRow":"rightChatRow"}>
                    <div className={"chatRowHeader"}><div className={"chatRowName"}>{text.emitName}</div><div className={"chatRowTime"}>{text.emitTime}</div></div>
                    <div className={text.emitID === this.props.hostUserID ? "leftChatMessage":"rightChatMessage"}>{"我發現系統有些功能不正常!"}</div>
                    </div>
            case "cmsQueryType4":
                return <div className={text.emitID === this.props.hostUserID ? "leftChatRow":"rightChatRow"}>
                    <div className={"chatRowHeader"}><div className={"chatRowName"}>{text.emitName}</div><div className={"chatRowTime"}>{text.emitTime}</div></div>
                    <div className={text.emitID === this.props.hostUserID ? "leftChatMessage":"rightChatMessage"}>{"我對於此系統有些建議跟想法。"}</div>
                    </div>
            case "cmsQueryType5":
                return <div className={text.emitID === this.props.hostUserID ? "leftChatRow":"rightChatRow"}>
                    <div className={"chatRowHeader"}><div className={"chatRowName"}>{text.emitName}</div><div className={"chatRowTime"}>{text.emitTime}</div></div>
                    <div className={text.emitID === this.props.hostUserID ? "leftChatMessage":"rightChatMessage"}>{"都不是，我有其他問題..."}</div>
                    </div>
            default:
                return <div className={text.emitID === this.props.hostUserID ? "leftChatRow":"rightChatRow"}>
                    <div className={"chatRowHeader"}><div className={"chatRowName"}>{text.emitName}</div><div className={"chatRowTime"}>{text.emitTime}</div></div>
                    <div className={text.emitID === this.props.hostUserID ? "leftChatMessage":"rightChatMessage"}>{text.emitMessage? text.emitMessage:<a href={serverIP+'/api/screenshotImage/download/'+text.emitImage} style={{display:"table-cell"}} target="_blank"><img src={serverIP+'/api/screenshotImage/download/'+text.emitImage} style={{maxWidth:"150px",height:"auto",cursor:"pointer"}}/></a>}</div>
                    </div>
        }
    }


    


    openImageTab=(dataImage)=>{
        let html = "<img src='"+dataImage+"'/>";
        let newTab = window.open()
        newTab.document.write(html)
        newTab.focus()
    }

    chooseType=(number)=>{
        let stageTwoMsg = "請輸入您的名稱"
        let msg = {
            userID: this.props.hostUserID,
            emitMessage:"請輸入訊息"
        }

        let stage = "2"
        switch(number){
            case 1:
                msg = {
                    userID: this.props.hostUserID,
                    emitMessage:"cmsQueryType1"
                }
                this.props.getChatMessage(msg, stage)
                this.setState({
                    message:stageTwoMsg
                })
                break;
            case 2:
                msg = {
                    userID: this.props.hostUserID,
                    emitMessage:"cmsQueryType2"
                }
                this.props.getChatMessage(msg, stage)
                this.setState({
                    message:stageTwoMsg
                })
                break;
            case 3:
                msg = {
                    userID: this.props.hostUserID,
                    emitMessage:"cmsQueryType3"
                }
                this.props.getChatMessage(msg, stage)
                this.setState({
                    message:stageTwoMsg
                })
                break;
            case 4:
                msg = {
                    userID: this.props.hostUserID,
                    emitMessage:"cmsQueryType4"
                }
                this.props.getChatMessage(msg, stage)
                this.setState({
                    message:stageTwoMsg
                })
                break;
            case 5:
                msg = {
                    userID: this.props.hostUserID,
                    emitMessage:"cmsQueryType5"
                }
                this.props.getChatMessage(msg, stage)
                this.setState({
                    message:stageTwoMsg
                })
                break;
            default:
                break;
        }
    }

    createMessageRows=()=>{
        let output =[]
        if(this.props.queryInfo)
        {
            output = this.props.queryInfo.map(text=>{
                return this.createStageRow(text)
            })
        }
        else
        {
            output = null
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
            if(this.props.queryStage === "2")
            {
                let stage = "3"
                let msg = {
                    userID: this.props.hostUserID,
                    emitMessage:this.state.message
                }
                this.props.getChatMessage(msg,stage)
                this.setState({
                    message:"您的email"
                })
            }
            else if(this.props.queryStage === "3")
            {
                let stage = "4"
                let msg = {
                    userID: this.props.hostUserID,
                    emitMessage:this.state.message
                }
                this.props.getChatMessage(msg,stage)
                this.setState({
                    message:"請描述您的意見或問題"
                })
            }
            else if(this.props.queryStage === "4")
            {
                let stage = "5"
                let msg = {
                    userID: this.props.hostUserID,
                    emitMessage:this.state.message
                }
                this.props.getChatMessage(msg,stage)
                this.setState({
                    message:"請描述您的意見或問題"
                })
            }
            else if(this.props.queryStage === "5")
            {
                if(this.state.message === "完畢" || this.state.message === "Done")
                {
                    let stage = "6"
                    let msg = {
                        userID: this.props.hostUserID,
                        emitMessage:this.state.message
                    }
                    this.props.getChatMessage(msg,stage)
                    this.setState({
                        message:"請描述您的意見或問題"
                    })
                }
                else
                {
                    let stage = "5"
                    let msg = {
                        userID: this.props.hostUserID,
                        emitMessage:this.state.message
                    }
                    this.props.getChatMessage(msg,stage)
                    this.setState({
                        message:"請描述您的意見或問題"
                    })
                } 
            }
            else if(this.props.queryStage === "10")
            {
                if(this.state.message === "我有問題" )
                {
                    let stage = "1"
                    let msg = {
                        userID: this.props.hostUserID,
                        emitMessage:this.state.message
                    }
                    this.props.getChatMessage(msg,stage)
                    this.setState({
                        message:"請描述您的意見或問題"
                    })
                }
                else
                {
                    let stage = "10"
                    let msg = {
                        userID: this.props.hostUserID,
                        emitMessage:this.state.message
                    }
                    this.props.getChatMessage(msg,stage)
                    this.setState({
                        message:"請描述您的意見或問題"
                    })
                } 
            }
        }
    }

    takeScreenShot=()=>{
        this.props.takeScreenShot()
    }

    render(){
        console.log("ChatChannel render...")
        return(
            <div className={"chatChannel"} style={{right:this.props.index*280+250}}>   
                <div className={"chatChannelHeader"}>
                    <div className={"chatChannelLabel"}>{"反映問題"}</div>
                    <div className={"rightUpConrnerArea"}>
                        {this.props.queryStage === "4" || this.props.queryStage === "5" || this.props.queryStage === "10" ?  <div className={"chatChannelButton"} onClick={this.takeScreenShot}><CameraIcon/></div> :null}
                        <div className={"chatChannelCloseButton"} onClick={this.closeChannel}>{"x"}</div>
                    </div>
                </div> 
                <div className={"chatRowContainer"}>
                    {this.createMessageRows()}
                    <div className={"chatRowBottom"} ref={(re)=>{this.dummyChatRowRef= re}}></div>
                </div>
                {this.props.queryStage === "1" ? null: <div className={"chatChannelInput"}><input type="text" style={{width:"100%",border:"1px solid #c5c5c5"}} value={this.state.message?this.state.message:""} onChange={this.messageInput} onKeyDown={this.messageSubmit}/></div>}      
            </div>    
        )
    }
}

export default ChatChannel
