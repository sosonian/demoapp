import React, {Component} from 'react'
import './ScreenshotPicker.css'
import CameraIcon from '@material-ui/icons/LocalSee'

class ScreenshotPicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            position:{
                x:0,
                y:0
            },
            refPos:{
                x:0,
                y:0
            },
            divSize:{
                width:200,
                height:200
            },
            refDivSize:{
                width:0,
                height:0
            },

            containerExtending:false,
            containerDragging:false
        }
    }

    componentDidMount(){

    }

    componentDidUpdate(prevProps, prevState) {
        //console.log('FloatWindow componentDidUpdate...')
         
        if(this.state.containerExtending === false && this.state.containerDragging === true)
        {
            //console.log("A")
            if(prevProps.mousePos !== this.props.mousePos)
            {
                this.setNewContainerPosition()
            } 
        }
        else if(this.state.containerExtending === true && this.state.containerDragging === false)
        {
            //console.log("B")
            if(prevProps.mousePos !== this.props.mousePos)
            {
                this.setNewContainerSize()
            } 
        }
    }


    setNewContainerPosition() {
        let containerX = this.props.mousePos.x-this.state.refPos.x
        let containerY = this.props.mousePos.y-this.state.refPos.y
        let newPos = {
            x:containerX,
            y:containerY
        }

        this.setState({
            position:this.borderCollisonForMoving(newPos),
        })
    }

    setNewContainerSize=()=>{

        let width = this.state.refDivSize.width+(this.props.mousePos.x-this.state.refPos.x)
        let height = this.state.refDivSize.height+(this.props.mousePos.y-this.state.refPos.y)
       
        let newSize = {
            width:width,
            height:height
        }
   
        this.setState({
            divSize: this.borderCollisonForExtending(newSize) ,
        })
    }

    borderCollisonForMoving=(pos)=>{
        if(pos.x<0)
        {
            pos.x=0
        }

        if(pos.x+this.state.divSize.width>this.props.bodySize.width)
        {
            pos.x=this.props.bodySize.width-this.state.divSize.width
        }

        if(pos.y<0)
        {
            pos.y=0
        }

        if(pos.y+this.state.divSize.height>this.props.bodySize.height)
        {
            pos.y=this.props.bodySize.height-this.state.divSize.height
        }

        return pos

    }

    borderCollisonForExtending=(size)=>{
        if(size.width+this.state.position.x>this.props.bodySize.width)
        {
            size.width = this.props.bodySize.width-this.state.position.x
        }

        if(size.height+this.state.position.y>this.props.bodySize.height)
        {
            size.height = this.props.bodySize.height-this.state.position.y
        }

        return size

    }


    extendAreaMouseDown=(e)=>{
        // console.log('extendAreaMouseDown')
        e.stopPropagation()
        this.setState({
            containerExtending:true,
            containerFocusing:true,
            refPos:{
                x:e.clientX,
                y:e.clientY
            },
            refDivSize:this.state.divSize
        })   

        let msg ={
            containerExtending:true,
        }
        this.props.containerExtending(msg)
    }

    extendAreaMouseUp=(e)=>{
        e.stopPropagation()
        this.setState({
            containerExtending:false,
            refPos:{
                x:0,
                y:0
            },
        })  

        let msg ={
            containerExtending:false,
        }
        //console.log("D0")
      
        this.props.containerExtending(msg)
    }

    headerMouseDown=(e)=>{   
        e.stopPropagation()
        e.preventDefault()
        //console.log('ControllerUnitContainer headerMouseDown')
        this.setState({
            containerDragging:true,
            containerFocusing:true,
            refPos:{
                x:e.clientX-this.state.position.x,
                y:e.clientY-this.state.position.y
            }
        })   

        let msg ={
            containerDragging:true,
        }
        this.props.containerDragging(msg)
        
    }

    headerMouseUp=(e)=>{
        e.stopPropagation()
        this.setState({
            containerDragging:false,
            refPos:{
                x:0,
                y:0
            },
        })  

        let msg ={
            containerDragging:false,
        }
        this.props.containerDragging(msg)
    }

    closeScreenshotPicker=()=>{
        this.props.closeScreenshotPicker()
    }

    getSreenshotArea=()=>{
        let msg = {
            x:this.state.position.x,
            y:this.state.position.y,
            width:this.state.divSize.width,
            height:this.state.divSize.height
        }
        this.props.getSreenshotArea(msg)
    }

    render(){
        let defaultImageLayout = {
            top:this.state.position.y,
            left:this.state.position.x,
            width:this.state.divSize.width,
            height:this.state.divSize.height
        }

        let extendFunctionAreaStyle = {
            width:'20px',
            height:'20px',
            position:'absolute',
            right:'0px',
            bottom:'0px',
            userSelect:'none',
            color:"#d2691e",
            cursor:'nw-resize'
        }

        return(
            <div className={"ScreenshotPickerContainer"} style={defaultImageLayout} onMouseDown={this.headerMouseDown} onMouseUp={this.headerMouseUp}>
                <div className={"ScreenshotPickerContainerButton"} style={{lineHeight:"30px"}} onClick={this.closeScreenshotPicker}>X</div>
                <div className={"ScreenshotPickerContainerButton"} style={{lineHeight:"41px"}} onClick={this.getSreenshotArea}><CameraIcon/></div>
                <div style={extendFunctionAreaStyle} onMouseDown={this.extendAreaMouseDown}  onMouseUp={this.extendAreaMouseUp}>
                    &#9499;
                </div> 
            </div>    
        )
    }
}

export default ScreenshotPicker
