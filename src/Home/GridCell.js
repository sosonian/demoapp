import React, { Component } from 'react';
import './GridCell.css'
import DynamicImage from '../Event/DynamicImage'
import IPAddress from '../IPAddress'



class GridCell extends Component {
    constructor(props){
        super(props)
        this.state ={
            eventAbstract:null,
            hover:false
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
            width: this.props.posRef.width+'px',
            height: this.props.posRef.height+'px',
            top:this.props.posRef.top+'px',
            left:this.props.posRef.left+'px',
            backgroundColor: 'rgba(0, 0, 0)',
            opacity:'0',
            transition:'all 2s ease',
            position:'absolute',
            border:'1px solid white'
        }

        let afterEventContainer = {
            width: this.props.posRef.width+'px',
            height: this.props.posRef.height+'px',
            top:this.props.posRef.top+'px',
            left:this.props.posRef.left+'px',
            backgroundColor: 'rgba(112, 128, 144)',
            //padding: '50px',
            opacity:'1',
            transition:'all 2s ease',
            position:'absolute',
            border:'1px solid white'
        }
        return(
            <div style={this.state.eventAbstract? afterEventContainer:beforeEventContainer} onClick={this.openEventPage} onMouseOver={()=>{this.setState({hover:true})}} onMouseLeave={()=>{this.setState({hover:false})}}> 
                <div className={this.state.hover?"CellTitleContainer mousehover":"CellTitleContainer nothover"}>
                    <div className="EventTitle">{this.state.eventAbstract ? this.state.eventAbstract.Event_Title : null}</div>
                </div>
                {this.state.hover? null:
                <div className="CellImageContainer">   
                    <DynamicImage eventImages={this.state.eventAbstract ? this.state.eventAbstract.Event_Images : null} windowSize={this.props.windowSize}/>
                </div> 
                } 
                <div className="CellSubTitle">{this.state.eventAbstract ? this.state.eventAbstract.Event_SubTitle : null}</div>     
                {
                    this.state.hover? <div className="CellTextBlock">     
                    <p className="Cell-with-text">{this.state.eventAbstract ? this.state.eventAbstract.Event_Story : null}</p>
                </div>  
                :null
                }
                 
            </div>
        )
    }
}

export default GridCell