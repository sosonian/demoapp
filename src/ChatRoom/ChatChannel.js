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

    // shouldComponentUpdate(nextProps, nextState){
    //     console.log("shouldComponentDidUpdate")
    //     console.log(this.props.textInfo)
    //     console.log(nextProps.textInfo)
    //     if(nextProps.textInfo === this.props.textInfo && nextState.message === this.state.message)
    //     {
    //         return false
    //     }
    //     else
    //     {
    //         return true
    //     }
    // }

    scrollToBottom=()=>{
        //console.log(this.dummyChatRowRef)
        this.dummyChatRowRef.scrollIntoView({ behavior: "smooth" })
    }

    createStageRow=(stage, userName)=>{
        switch(stage){
            case "1A":
                return <div className={"rightChatRow"}>
                    <div className={"chatRowHeader"}><div className={"chatRowName"}>{"系統自動客服"}</div><div className={"chatRowTime"}></div></div>
                    <div className={"rightChatMessage"}>{"您好，歡迎使用藏品資料查詢系統~"}</div>
                    </div>
            case "1B":
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
            case "1C":
                return <div className={"rightChatRow"}>
                    <div className={"chatRowHeader"}><div className={"chatRowName"}>{"系統自動客服"}</div><div className={"chatRowTime"}></div></div>
                    <div className={"rightChatMessage leftAlign"}>{"請問您是要："}
                        <div className={"queryTypeOption"} >{"1. 我有使用上的問題想請教。"}</div>
                        <div className={"queryTypeOption"} >{"2. 我發現資料文字有錯誤!"}</div>
                        <div className={"queryTypeOption"} >{"3. 我發現系統有些功能不正常!"}</div>
                        <div className={"queryTypeOption"} >{"4. 我對於此系統有些建議跟想法。"}</div>
                        <div className={"queryTypeOption"} >{"5. 都不是，我有其他問題..."}</div>
                    </div>
                    </div>
            case "2":
                return <div className={"rightChatRow"}>
                    <div className={"chatRowHeader"}><div className={"chatRowName"}>{"系統自動客服"}</div><div className={"chatRowTime"}></div></div>
                    <div className={"rightChatMessage"}>{"好的，接下來請讓我們知道如何稱呼您，請於下方輸入您的名稱~"}</div>
                    </div>
            case "3":
                return <div className={"rightChatRow"}>
                    <div className={"chatRowHeader"}><div className={"chatRowName"}>{"系統自動客服"}</div><div className={"chatRowTime"}></div></div>
                    <div className={"rightChatMessage"}>{"謝謝您"}<div style={{color:"blue"}}>{userName}</div>{"! 為方便聯繫您，再請您輸入您的email帳號"}</div>
                    </div>
            case "4A":
                return <div className={"rightChatRow"}>
                    <div className={"chatRowHeader"}><div className={"chatRowName"}>{"系統自動客服"}</div><div className={"chatRowTime"}></div></div>
                    <div className={"rightChatMessage"}>{"謝謝您，接下來請描述您的問題或意見-"}</div>
                    </div>
            case "4B":
                return <div className={"rightChatRow"}>
                    <div className={"chatRowHeader"}><div className={"chatRowName"}>{"系統自動客服"}</div><div className={"chatRowTime"}></div></div>
        <div className={"rightChatMessage"}>{"1. 截圖功能：您可以點擊"}<CameraIcon/>{"按鈕，頁面左上會出現可拖曳放大之截圖框。將其拖曳至您有問題之區域，再點擊截圖框左上同樣圖示，即可截圖並傳送給系統客服，使客服更直覺地了解您的問題。"}</div>
                    </div>  
            case "4C":
                return <div className={"rightChatRow"}>
                    <div className={"chatRowHeader"}><div className={"chatRowName"}>{"系統自動客服"}</div><div className={"chatRowTime"}></div></div>
        <div className={"rightChatMessage"}>{'2. 文字數量：如您的意見文字較多，可分段輸入，請勿一對話框超過100字。如已陳述完畢，請於獨立對話框輸入"完畢"或"done"，系統始進入下一階段。'}</div>
                    </div> 
 


        }
    }


    createChatRow=(text)=>{
        return <div className={text.emitID === this.props.hostUserID ? "leftChatRow":"rightChatRow"}>
        <div className={"chatRowHeader"}><div className={"chatRowName"}>{text.emitName}</div><div className={"chatRowTime"}>{text.emitTime}</div></div>
        <div className={text.emitID === this.props.hostUserID ? "leftChatMessage":"rightChatMessage"}>{text.emitMessage? text.emitMessage:<a href={'http://192.168.3.220:5000/api/screenshotImage/download/'+text.emitImage} style={{display:"table-cell"}} target="_blank"><img src={'http://192.168.3.220:5000/api/screenshotImage/download/'+text.emitImage} style={{maxWidth:"150px",height:"auto",cursor:"pointer"}}/></a>}</div>
        </div>
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
                    emitMessage:"我有使用上的問題想請教。"
                }
                this.props.getChatMessage(msg, stage)
                this.setState({
                    message:stageTwoMsg
                })
                break;
            case 2:
                msg = {
                    userID: this.props.hostUserID,
                    emitMessage:"我發現資料文字有錯誤!"
                }
                this.props.getChatMessage(msg, stage)
                this.setState({
                    message:stageTwoMsg
                })
                break;
            case 3:
                msg = {
                    userID: this.props.hostUserID,
                    emitMessage:"我發現系統有些功能不正常!"
                }
                this.props.getChatMessage(msg, stage)
                this.setState({
                    message:stageTwoMsg
                })
                break;
            case 4:
                msg = {
                    userID: this.props.hostUserID,
                    emitMessage:"我對於此系統有些建議跟想法。"
                }
                this.props.getChatMessage(msg, stage)
                this.setState({
                    message:stageTwoMsg
                })
                break;
            case 5:
                msg = {
                    userID: this.props.hostUserID,
                    emitMessage:"都不是，我有其他問題!"
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
        

        switch(this.props.queryStage){
            case "1":
                output.push(this.createStageRow("1A"),this.createStageRow("1B"))
                break;
            case "2":
                if(this.props.textInfo){                  
                    output.push(this.createStageRow("1A"),this.createStageRow("1C"),this.createChatRow(this.props.textInfo[0]),this.createStageRow("2"))
                }
                else
                {
                    return null
                }
                break;
            case "3":
                if(this.props.textInfo && this.props.textInfo[1]){
                    output.push(this.createStageRow("1A"),this.createStageRow("1C"),this.createChatRow(this.props.textInfo[0]),this.createStageRow("2"),this.createChatRow(this.props.textInfo[1]),this.createStageRow("3",this.props.textInfo[1].emitMessage))
                }
                else
                {
                    return null
                }
                break; 
            case "4":
                if(this.props.textInfo && this.props.textInfo[2]){
                    output.push(this.createStageRow("1A"),this.createStageRow("1C"),this.createChatRow(this.props.textInfo[0]),this.createStageRow("2"),this.createChatRow(this.props.textInfo[1]),this.createStageRow("3",this.props.textInfo[1].emitMessage),this.createChatRow(this.props.textInfo[2]),this.createStageRow("4A"),this.createStageRow("4B"),this.createStageRow("4C"))
                }
                else
                {
                    return null
                }
                break;   
               
            default:
                break;

        }
        
        return output

        //output = this.props.textInfo.map(text=>{
        //    return <div className={text.emitID === this.props.hostUserID ? "leftChatRow":"rightChatRow"}>
        //        <div className={"chatRowHeader"}><div className={"chatRowName"}>{text.emitName}</div><div className={"chatRowTime"}>{text.emitTime}</div></div>
        //        <div className={text.emitID === this.props.hostUserID ? "leftChatMessage":"rightChatMessage"}>{text.emitMessage? text.emitMessage:<a href={'http://192.168.3.220:5000/api/screenshotImage/download/'+text.emitImage} style={{display:"table-cell"}} target="_blank"><img src={'http://192.168.3.220:5000/api/screenshotImage/download/'+text.emitImage} style={{maxWidth:"150px",height:"auto",cursor:"pointer"}}/></a>}</div>
        //        </div>
        //})
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
                        <div className={"chatChannelButton"} onClick={this.takeScreenShot}><CameraIcon/></div>
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
