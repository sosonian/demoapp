import React, { Component } from 'react';
import './EventBody.css'
import EventContainer from './EventContainer'
import axios from 'axios'
import Footer from '../Footer/Footer'
import IPAddress from '../IPAddress'

class EventBody extends Component {
    constructor(props){
        super(props)
        this.state={
            Event:null,
        }
    }

    componentDidMount(){
       
       this.getEventState()
       
    }

    getEventState =async()=>{
        let tempIP = new IPAddress()
        console.log("getEventState")
        let tDate = new Date()
        let today = tDate.toISOString().slice(0, 19).replace('T', ' ')
        let msg = await fetch(tempIP.state.ip+'/api/event/fetch/EventMainInfoByDate/'+today+'/'+today)
        
        if(msg.statusText !== "SQL qeury error" || msg.statusText !== "mysql DB crash")
        {
            let output = await msg.json()
            console.log("msg")
            this.setState({
                Event:output
            })
        }
    }



    getClassName=()=>{
        let className = "EventBody"
        if(this.props.showOrHide)
        {
            className = "EventBody Show"
        }
        console.log("className : ",className)
        return className
    }

    createEventContainer=()=>{
        if(this.state.Event)
        {
            return(
                this.state.Event.map(event=>
                    <EventContainer eventDetail={event} openEventPage={(msg)=>{this.props.history.push("/Event/"+msg)}}/>
                )
            )
        }
        else
        {
            return null
        }
    }

    render(){
        return(
            <div className={this.getClassName()}>
                {this.createEventContainer()}     
                <div>
                    <Footer/>
                </div>                  
            </div>
             
        )
    }
}

export default EventBody