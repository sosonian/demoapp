import React, { Component } from 'react';
import ImageDiv from './ImageDiv'
import TextDiv from './TextDiv'

class CompositionContainer extends Component {
    constructor(props){
        super(props)
        this.state={
            position:{
                x:0,
                y:0,
            },
            refPos:{
                x:0,
                y:0
            },
            divSize:{
                width:0,
                height:0,
            },
            refDivSize:{
                width:0,
                height:0
            },
            
            containerFocusing:false,
            containerExtending:false,
            containerDragging:false,
            resizeHeight:null
        }
   
    }
    componentDidMount(){
        if(this.props.divPos.x)
        {
            this.setState({
                position:{
                    //x:this.props.initialPos.x,
                    //y:this.props.initialPos.y
                    x:this.props.divPos.x,
                    y:this.props.divPos.y
                },
                divSize:this.props.size
            })

        }
        else
        {
        }
    }

    componentDidUpdate(prevProps, prevState) {
        //console.log('ControllerUnitContainer componentDidUpdate conID ', this.props.conID)
        
        if(this.state.containerExtending === false && this.state.containerDragging === true)
        {
            if(prevProps.mousePos !== this.props.mousePos)
            {
                this.setNewContainerPosition()
            } 
        }
        else if(this.state.containerExtending === true && this.state.containerDragging === false)
        {
            if(prevProps.mousePos !== this.props.mousePos)
            {
                this.setNewContainerSize()
            } 
        }
        else
        {
            if(prevProps.size !== this.props.size && prevProps.divPos !== this.props.divPos)
            {
                this.setState({
                    position:this.props.divPos,
                    divSize:this.props.size,
                    containerFocusing:true
                })
            }
            else if(prevProps.size !== this.props.size && prevProps.divPos === this.props.divPos)
            {
                this.setState({
                    divSize:this.props.size,
                    containerFocusing:true
                })

            }
            else if(prevProps.size === this.props.size && prevProps.divPos !== this.props.divPos)
            {
                this.setState({
                    position:this.props.divPos,
                    containerFocusing:true
                })
            }
            else
            {
                if(this.props.focusingContainer === this.props.conID)
                {
                    if(!this.state.containerFocusing)
                    {
                        this.setState({
                            containerFocusing:true
                        })
                    }   
                }
                else
                {
                    if(this.state.containerFocusing)
                    {
                        this.setState({
                            containerFocusing:false
                        })
                    }   
                }
            }
        }
    }

    detectTextOrImageDiv=()=>{
        let tempSize = {}
        if(this.props.previewMode)
        {
            tempSize=this.props.size
        }
        else
        {
            tempSize = this.state.divSize
        }


        if(this.props.type==="image")
        {           
            return(
                <ImageDiv imageSize={tempSize} commonAttributes={this.props.commonAttributes} imageAttributes={this.props.imageAttributes} previewMode={this.props.previewMode}/>
            )
            
        }
        else if(this.props.type==="text")
        {
            return(
                <TextDiv textSize={tempSize} commonAttributes={this.props.commonAttributes} textAttributes={this.props.textAttributes} previewMode={this.props.previewMode} getResizeHeight={this.getResizeHeight}/>
            )
        }
    }

    getResizeHeight=(msg)=>{
        if(this.state.resizeHeight !== msg)
        {
            this.setState({
                resizeHeight:msg
            })
            //this.props.getResizeHeight(msg)
            if(this.props.grouped)
            {
                this.props.getMaxHeight(this.state.position.y+msg)
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
            position:newPos,
            containerFocusing:true
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
            divSize:newSize,
            containerFocusing:true
        })
       
    }

    extendAreaMouseDown=(e)=>{
        // console.log('extendAreaMouseDown')
        e.stopPropagation()
        this.setState({
            containerExtending:true,
            containerFocusing:true,
            refPos:{
                //x:e.clientX-this.props.offset.x,
                //y:e.clientY-this.props.offset.y
                x:e.clientX,
                y:e.clientY
            },
            refDivSize:this.state.divSize
        })   

        let msg ={
            conID:this.props.conID,
            //unitID:this.props.showingUnitID,
            //zIndex:this.props.zIndex,
            containerExtending:true,
            //subView:this.getSubView()
        }
        this.props.containerExtending(msg)
    }

    extendAreaMouseUp=(e)=>{
        e.stopPropagation()
        // console.log('extendAreaMouseUp')
        this.setState({
            containerExtending:false,
            refPos:{
                x:0,
                y:0
            },
        })  

        let msg ={
            conID:this.props.conID,
            containerExtending:false,
            size:this.state.divSize,
        }
        
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
                //x:e.clientX-this.props.offset.x-this.state.position.x,
                //y:e.clientY-this.props.offset.y-this.state.position.y
                x:e.clientX-this.state.position.x,
                y:e.clientY-this.state.position.y
            }
        })   

        let msg ={
            conID:this.props.conID,
            //unitID:this.props.showingUnitID,
            //zIndex:this.props.zIndex,
            containerDragging:true,
        }
        this.props.containerDragging(msg)
        
    }

    headerMouseUp=(e)=>{
        e.stopPropagation()
        e.preventDefault()
        this.setState({
            containerDragging:false,
            refPos:{
                x:0,
                y:0
            },
        })  

        let msg ={
            conID:this.props.conID,
            containerDragging:false,
            position:this.state.position,
        }
        this.props.containerDragging(msg)
    }

    headerOnDoubleClick=()=>{
        //console.log("CompositionContainer headerOnDoubleClick")  
    }

    checkImageAttribute=()=>{
        if(this.props.imageAttributes.imageUrl)
        {
            //console.log("checkImageAttribute")
        }
        else
        {
            if(this.props.textAttributes.background)
            {
                return this.props.textAttributes.background.color
            }
            else
            {
                return this.props.color
            }
        }
    }

    onContextMenu=(e)=>{
        e.preventDefault()
        e.stopPropagation()
        let refPos={
            x:e.clientX,
            y:e.clientY
        }
        let msg = {
            conID:this.props.conID,
            pos:refPos
        }
        this.props.getContextMenu(msg)
    }

    onDoubleClick=()=>{
        if(this.props.type==="image")
        {
            this.props.invokeImageEditor()
        }
        else if(this.props.type==="text")
        {
            this.props.invokeTextEditor()
        }
    }

    loadOpacity=()=>{
        if(this.props.textAttributes)
        {
            if(this.props.textAttributes.background)
            {
                return this.props.textAttributes.background.opacity / 100
            }
            else
            {
                return null
            }
        }
        else
        {
            return null
        }
    }

    checkBackgroundStyleHeight=()=>{
        if(this.props.previewMode)
        {
            if(this.state.resizeHeight)
            {
                return this.state.resizeHeight
            }
            else
            {
                return this.state.divSize.height
            }
        }
        else
        {
            return this.state.divSize.height
        }
    }

    getPositionTop=()=>{
        if(this.props.previewMode)
        {
            if(this.props.previewSize === "large")
            {
                return this.state.position.y
            }
            else if(!this.props.previewSize)
            {
                return this.state.position.y
            }
            else if(this.props.grouped)
            {
                return this.state.position.y
            }
            else
            {
                return 0
            }
        }
        else
        {
            return this.state.position.y
        }
    }

    getPositionMode=()=>{
        if(this.props.previewMode)
        {
            if(this.props.previewSize === 'large')
            {
                return 'absolute'
            }
            else if(!this.props.previewSize)
            {
                return 'absolute'
            }
            else if(this.props.grouped)
            {
                return 'absolute'
            }
            else
            {
                return 'relative'
            }
        }
        else
        {
            return 'absolute'
        }
    }

    getHeight=()=>{
        if(this.props.previewMode)
        {
            if(this.props.previewSize === 'large')
            {
                return this.state.divSize.height
            }
            else if(!this.props.previewSize)
            {
                return this.state.divSize.height
            }
            else
            {
                if(this.state.resizeHeight)
                {
                    return this.state.resizeHeight
                }
                else
                {
                    return this.state.divSize.height
                }
            }
        }
        else
        {
            return this.state.divSize.height
        }
    }

    render(){
        let focusingCompositionContainerStyle ={
            width:this.state.divSize.width,
            height:this.state.divSize.height,
            position:'absolute',
            left:this.state.position.x,
            top:this.state.position.y,
            zIndex:this.props.zIndex,
            //backgroundColor:this.checkImageAttribute(),
            outline:'3px dashed #fff838',
            //borderColor:'#fff838',
            boxSizing:'border-box',
            display: 'flex',
            flexDirection: 'column',
            cursor:this.props.previewMode?null:'move',
        }

        let notFocusingCompositionContainerStyle ={
            width:this.state.divSize.width,
            height:this.getHeight(),
            position:this.getPositionMode(),
            left:this.state.position.x,
            top: this.getPositionTop(),
            zIndex:this.props.zIndex,
            boxSizing:'border-box',
            display: 'flex',
            flexDirection: 'column',
            cursor:this.props.previewMode?null:'move',
        }

        let extendFunctionAreaStyle = {
            width:'20px',
            height:'20px',
            position:'absolute',
            right:'0px',
            bottom:'0px',
            userSelect:'none',
            color:"#fff838",
            cursor:'nw-resize',
            zIndex:1300
        }

        let backgroundStyle= {
            width:this.state.divSize.width,
            height:this.checkBackgroundStyleHeight(),
            backgroundColor:this.checkImageAttribute(),
            position:"absolute",
            top:0,
            left:0,
            opacity:this.loadOpacity(),
        }



        return(
            this.props.previewMode ?
            <div style={notFocusingCompositionContainerStyle}> 
                <div>
                    <div style={backgroundStyle}></div>
                    {this.detectTextOrImageDiv()} 
                </div>  
            </div>
            :
            <div style={this.state.containerFocusing? focusingCompositionContainerStyle: notFocusingCompositionContainerStyle}> 
                <div onMouseDown={this.headerMouseDown} onMouseUp={this.headerMouseUp} onContextMenu={this.onContextMenu} onDoubleClick={this.onDoubleClick}>
                    <div style={backgroundStyle}></div>
                    {this.detectTextOrImageDiv()} 
                </div>  
                <div style={extendFunctionAreaStyle} onMouseDown={this.extendAreaMouseDown}  onMouseUp={this.extendAreaMouseUp}>
                    &#9499;
                </div> 
            </div>
        )
    }
}

export default CompositionContainer
