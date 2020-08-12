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

    createMessageRows=()=>{
        if(this.props.textInfo)
        {
            let output = this.props.textInfo.map(text=>{
                // let imageUrl
                // if(chat.emitImage)
                // {
                //     imageUrl = URL.createObjectURL(chat.emitImage)
                // }
                return <div className={text.emitID === this.props.hostUserID ? "leftChatRow":"rightChatRow"}>
                <div className={"chatRowHeader"}><div className={"chatRowName"}>{text.emitName}</div><div className={"chatRowTime"}>{text.emitTime}</div></div>
                <div className={text.emitID === this.props.hostUserID ? "leftChatMessage":"rightChatMessage"}>{text.emitMessage? text.emitMessage:<a href={'http://192.168.43.243:5000/api/screenshotImage/download/'+text.emitImage} style={{display:"table-cell"}} target="_blank"><img src={'http://192.168.43.243:5000/api/screenshotImage/download/'+text.emitImage} style={{maxWidth:"150px",height:"auto",cursor:"pointer"}}/></a>}</div>
                </div>
            })
            return output
            //return null
        }
        else
        {
            return null
        }
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
                <div className={"chatChannelHeader"}><div className={"chatChannelLabel"}>{"反映問題"}</div><div className={"toggleArea"} style={{position:"absolute",right:"5px"}} onClick={this.closeChannel}>{"x"}</div><div className={"chatChannelButton"} onClick={this.takeScreenShot}><CameraIcon/></div></div> 
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
