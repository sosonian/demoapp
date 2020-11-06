import React, { Component } from 'react';
import './HomeBody.css'
import Footer from '../Footer/Footer'
import IPAddress from '../IPAddress'
import GridCell from './GridCell'
import {CellRef} from './GridContainerRef'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

class HomeBody extends Component {
    constructor(props){
        super(props)
        this.state={
            Event:null,
            xPos:0
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

    moveToLeft=()=>{
        console.log("Move Left")
        this.dummyGridContainerRowRef.scrollBy({top:0,left:-320,behavior:'smooth'})

    }

    moveToRight=()=>{
        //this.setState({
        //    xPos:this.state.xPos + 250
        //},()=>{
            this.dummyGridContainerRowRef.scrollBy({top:0,left:+320,behavior:'smooth'})
        //})
    }

   
    render(){
        return(
            <div className={"HomeBody"} >
                <div className={"GridCenterBody"}>
                    <div className={"GridLeftArrow"}>
                        <div className={"GridArrowMiddleLevel"} onClick={()=>this.moveToLeft()}>
                            <ArrowBackIosIcon fontSize={'large'}/>
                        </div>
                    </div>
                    <div className={"GridContainer"} ref={(re)=>{this.dummyGridContainerRowRef= re}}>          
                        {this.createEventContainer()}
                    </div>    
                    <div className={"GridRightArrow"}>
                        <div className={"GridArrowMiddleLevel"} onClick={()=>this.moveToRight()}>
                            <ArrowForwardIosIcon fontSize={'large'}/>
                        </div>
                    </div>
                </div> 
                <div style={{"width":"100%"}}>
                    <Footer/>
                </div>                  
            </div>
             
        )
    }
}

export default HomeBody