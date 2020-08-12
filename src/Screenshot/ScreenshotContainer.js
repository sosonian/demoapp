import React, {Component} from 'react'
import ScreenshotPicker from './ScreenshotPicker'


class ScreenshotContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mousePos:{
                x:0,
                y:0
            },
            refPos:{
                x:0,
                y:0
            },
            needMousePos:false,
            containerExtending:false,
            containerDragging:false,
        }
        this.containerRef = React.createRef()
    }

    componentDidMount(){

    }

    onContainerExtending = (msg)=>{
        //console.log('ControllerUnitLayout onContainerExtending')

        if(msg.containerExtending)
        {
            this.setState({
                containerExtending:msg.containerExtending,
                needMousePos:true,
            })
        }  
    }

    onContainerDragging = (msg) => {

        if(msg.containerDragging)
        {
            this.setState({
                containerDragging:msg.containerDragging,     
                needMousePos:true,
            })         
        }
        else
        {        
            this.setState({          
                containerDragging:false,
                needMousePos:false,
                mousePos:{
                    x:0,
                    y:0
                }   
            })
        }
    }

  
    onMouseMove=(e)=>{
        //console.log("FloatWindowLayout onMouseMove...")
        if(this.state.needMousePos)
        { 
            this.setState({
                mousePos:{
                    x:e.clientX,
                    y:e.clientY
                },
            })
        }
    }

    getBodySize=()=>{
        let size = {
            width:this.containerRef.clientWidth,
            height:this.containerRef.clientHeight
            //width:this.containerRef.clientWidth,
            //height:this.containerRef.clientHeight
        }
        return size
    }


    closeScreenshotPicker=()=>{
        this.props.closeScreenshotPicker()
    }

    getSreenshotArea=(msg)=>{
        this.props.getSreenshotArea(msg)
    }

    render(){
        let containerStyle = {
            position:"fixed",
            top:"0px",
            left:"0px",
            width:"100%",
            height:"100%",
            zIndex:"2000"
        }

        return(
            <div style={containerStyle} ref={(ref)=>{this.containerRef=ref}} onMouseMove={this.onMouseMove}>
                <ScreenshotPicker bodySize={this.getBodySize()} mousePos={this.state.mousePos} containerExtending={this.onContainerExtending} containerDragging={this.onContainerDragging} closeScreenshotPicker={this.closeScreenshotPicker} getSreenshotArea={this.getSreenshotArea}/>
            </div>    
        )
    }
}

export default ScreenshotContainer
