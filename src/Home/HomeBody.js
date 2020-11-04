import React, { Component } from 'react';
import './HomeBody.css'
import Footer from '../Footer/Footer'
import IPAddress from '../IPAddress'
import GridCell from './GridCell'
import {CellRef} from './GridContainerRef'

class HomeBody extends Component {
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

    createEventContainer=()=>{
        let output = []
        if(this.state.Event)
        {
            
            this.state.Event.forEach((event,index) => {                        
                if(index < 6)
                {
                    let obj = <GridCell posRef={CellRef[index]} eventDetail={event} openEventPage={(msg)=>{this.props.history.push("/Event/"+msg)}} windowSize={this.props.windowSize}/>
                    output.push(obj)
                }
                else
                {
                    let tempPosRef = {
                        no:index,
                        width:CellRef[index%6].width,
                        height:CellRef[index%6].height,
                        top:1200*(index/6>>0)+CellRef[index%6].top,
                        left:CellRef[index%6].left
                    }

                    let obj = <GridCell posRef={tempPosRef} eventDetail={event} openEventPage={(msg)=>{this.props.history.push("/Event/"+msg)}} windowSize={this.props.windowSize}/>
                    output.push(obj)
                }
            })

            return output
        }
        else
        {
            return null
        }
    }

   
    render(){
        return(
            <div className={"HomeBody"} >
                <div className={"GridContainer"}>
                    {this.createEventContainer()}
                </div>     
                <div>
                    <Footer/>
                </div>                  
            </div>
             
        )
    }
}

export default HomeBody