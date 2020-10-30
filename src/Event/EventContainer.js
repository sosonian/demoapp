import React, { Component } from 'react';
import './EventContainer.css'
import DynamicImage from './DynamicImage'
import IPAddress from '../IPAddress'



class EventContainer extends Component {
    constructor(props){
        super(props)
        this.state ={
            eventAbstract:null
        }
    }

    componentDidMount(){
        this.fetchEventInfoFromAPI()
    }

    fetchEventInfoFromAPI=async()=>{
        if(this.props.eventDetail && this.props.eventDetail.Event_SysID)
        {
            let tempIP = new IPAddress()
            console.log('fetchEventInfoFromAPI')
            let msg = await fetch(tempIP.state.ip+'/api/event/fetch/EventAbstractInfo/'+this.props.eventDetail.Event_SysID)
            
            if(msg.statusText !== "SQL qeury error" || msg.statusText !== "mysql DB crash")
            {
                console.log("OK")
                let output = await msg.json()

                let tempAbstractObj = {
                    Event_Images:output[0].Event_BGImageSettings,
                    Event_Story:output[0].Event_Story,
                    Event_SubTitle:output[0].Event_SubTitle, 
                    Event_Title:output[0].Event_Title,
                }

                this.setState({
                    eventAbstract:tempAbstractObj
                })
            }
        }
    }

    openEventPage=()=>{
        this.props.openEventPage(this.props.eventDetail.Event_SysID)
    }

    render(){ 
        let beforeEventContainer = {
            marginTop: '50px',
            width: '0%',
            backgroundColor: 'rgba(0, 0, 0)',
            padding: '50px',
            opacity:'0',
            transition:'all 2s ease'
        }

        let afterEventContainer = {
            marginTop: '50px',
            width: '80%',
            backgroundColor: 'rgba(112, 128, 144)',
            //padding: '50px',
            opacity:'1',
            transition:'all 2s ease'
        }
        return(
            <div style={this.state.eventAbstract? afterEventContainer:beforeEventContainer}> 
                <div className="EventTitleContainer">
                    <div className="EventTitle">{this.state.eventAbstract ? this.state.eventAbstract.Event_Title : null}</div>
                </div>
                <div className="Image">   
                    <DynamicImage eventImages={this.state.eventAbstract ? this.state.eventAbstract.Event_Images : null} windowSize={this.props.windowSize}/>
                </div>  
                <div className="EventSubTitle">{this.state.eventAbstract ? this.state.eventAbstract.Event_SubTitle : null}</div>
                <div className="EventTextBlock">     
                    <p className="block-with-text">{this.state.eventAbstract ? this.state.eventAbstract.Event_Story : null}</p>
                </div>
                <div className="JumpToDetailButton" onClick={this.openEventPage}>{"深入專題"}</div>              
            </div>
        )
    }
}

export default EventContainer