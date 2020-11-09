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
        let frontObj = <div className={"PrefixEmptyCell"}/>
        let backObj 
        let maxLeft = 0
        output.push(frontObj)
        if(this.state.Event)
        {
            
            this.state.Event.forEach((event,index) => {                        
                if(index < 6)
                {
                    let obj = <GridCell posRef={CellRef[index]} eventDetail={event} openEventPage={(msg)=>{this.props.history.push("/Event/"+msg)}} windowSize={this.props.windowSize}/>
                    output.push(obj)
                    maxLeft = CellRef[index]
                }
                else
                {
                    maxLeft = 1600*(index/6>>0)+CellRef[index%6].left
                    let tempPosRef = {
                        no:index,
                        width:CellRef[index%6].width,
                        height:CellRef[index%6].height,
                        left:maxLeft,
                        top:CellRef[index%6].top
                    }

                    let obj = <GridCell posRef={tempPosRef} eventDetail={event} openEventPage={(msg)=>{this.props.history.push("/Event/"+msg)}} windowSize={this.props.windowSize}/>
                    output.push(obj)  
                }
            })

            let finalLeft = maxLeft+400

            backObj = <div className={"SuffixEmptyCell"} style={{"top":"0px","left":finalLeft+"px"}}/>

            output.push(backObj)



           

            return output
        }
        else
        {
            return null
        }
    }

    moveToLeft=()=>{
        console.log("Move Left")
        this.dummyGridContainerRowRef.scrollBy({top:0,left:-400,behavior:'smooth'})

    }

    moveToRight=()=>{
        //this.setState({
        //    xPos:this.state.xPos + 250
        //},()=>{
            this.dummyGridContainerRowRef.scrollBy({top:0,left:+400,behavior:'smooth'})
        //})
    }

   
    render(){
        return(
            <div className={"HomeBody"} >
                <div className={"GridCenterBody"}>            
                    <div className={"GridContainer"} ref={(re)=>{this.dummyGridContainerRowRef= re}}>          
                        {this.createEventContainer()}
                    </div>
                    <div className={"GridLeftArrow"}>
                        <div className={"GridArrowMiddleLevel"} onClick={()=>this.moveToLeft()}>
                            <ArrowBackIosIcon style={{fontSize:80}}/>
                        </div>
                    </div>    
                    <div className={"GridRightArrow"}>
                        <div className={"GridArrowMiddleLevel"} onClick={()=>this.moveToRight()}>
                            <ArrowForwardIosIcon style={{fontSize:80}}/>
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