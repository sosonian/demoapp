import React, {Component} from 'react'
import TextsmsIcon from '@material-ui/icons/Textsms';

import './ChatRoom.css'
import FlashCountBadge from '../Function/FlashCountBadge'


class ChatRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {
           

        }
    }

    componentDidMount(){

    }

    componentDidUpdate(prevProps){
        //if(prevProps.unreadMessage !== this.props.unreadMessage && this.props.unreadMessage.length === 0 )
        //{
        //    this.setState({
        //        shrink:true,
        //        expandContain:null
        //    })
        //}        
    }

    rowContainer=()=>{       
        return this.createShrinkContainer()   
    }

    
    createShrinkContainer=()=>{
        return <div>
                    <div className={"userCountRow"} onClick={this.invokeChatChannel}><div className={"userCountTitle"}><TextsmsIcon fontSize={"large"}/></div><div className={"messageNumberBadge"}><FlashCountBadge countNumber={this.props.queryStage === "1A"?2:this.props.unreadMessage.length} badgeType={"red-blue"}/></div></div>
                </div>
    }

    shrinkContainer=()=>{
        this.setState({
            shrink:true,
            expandContain:null
        })
    }



    invokeChatChannel=()=>{
        this.props.getChatChannel()
    }

    render(){
        return(
            <div className={"chatRoom"} style={this.state.shrink? null:null}>           
                {this.rowContainer()}              
            </div>    
        )
    }
}

export default ChatRoom
