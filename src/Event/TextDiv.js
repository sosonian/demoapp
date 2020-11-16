import React, { Component } from 'react';
import './TextDiv.css'

class TextDiv extends Component {
    constructor(props){
        super(props)
        this.state={
           
        }
        this.textRef= React.createRef()
    }

    componentDidMount(){
        window.addEventListener("resize", this.getResizeHeight)
        this.getResizeHeight()
    }

    componentWillUnmount(){
        window.removeEventListener("resize", this.getResizeHeight)
    }

    
    getResizeHeight=()=>{
        //console.log("TextDiv Resizing...")
        let tempHeight = this.textRef.current.scrollHeight
        //console.log("resizeHeight : ", tempHeight)
        //console.log(this.textRef)
        this.props.getResizeHeight(tempHeight)
    }

    detectUrlProps=()=>{
        // let svgStyle = {
        //     width:"100%",
        //     height:"100%",
        //     position:"absolute"    
        // }
        if(this.props.textAttributes.background)
        {
            return null
        }
        //else
        //{
        //    return(<DefaultTextBackground style={svgStyle}/>)
        //}
    }

    getWidth=()=>{
        return this.props.textSize.width
    }

    getHeight=()=>{
        return this.props.textSize.height
    }

    getFontColor=()=>{
        if(this.props.textAttributes.font)
        {
            return this.props.textAttributes.font.color
        }
        else
        {
            return null
        }
    }

    getFontSize=()=>{
        if(this.props.textAttributes.font)
        {
            return this.props.textAttributes.font.size
        }
        else
        {
            return null
        }
    }

    getFontSize=()=>{
        if(this.props.textAttributes.font)
        {
            return this.props.textAttributes.font.size
        }
        else
        {
            return null
        }
    }

    getFontFamily=()=>{
        if(this.props.textAttributes.font)
        {
            if(this.props.textAttributes.font.eFamily !=="none" && this.props.textAttributes.font.cFamily !=="none")
            {
                return "'"+this.props.textAttributes.font.eFamily+"','"+this.props.textAttributes.font.cFamily+"'"
            }
            else if(this.props.textAttributes.font.eFamily !=="none" && this.props.textAttributes.font.cFamily ==="none")
            {
                return this.props.textAttributes.font.eFamily
            }
            else if(this.props.textAttributes.font.eFamily ==="none" && this.props.textAttributes.font.cFamily !=="none")
            {
                return this.props.textAttributes.font.cFamily
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

    overflowCheck=()=>{
        if(this.props.previewMode)
        {
            return null
        }
        else
        {
            return "hidden"
        }
    }

    buildContent=()=>{
        //console.log("buildContent...")
        
        if(this.props.textAttributes.story)
        {
            let result = this.props.textAttributes.story.replace(/!es#/g, '"')     
            return <div dangerouslySetInnerHTML={{__html:result}} />
        }
        else
        {
            return null
        }     
    }

    onDoubleClick=()=>{

    }


    render(){
        //console.log("TextDiv get textAttributes story")
        //console.log(this.props.textAttributes.story)
        // let focusingCompositionContainerStyle ={
        //     width:this.getWidth(),
        //     height:this.getHeight(),
        //     border:'3px dashed',
        //     borderColor:'#fff838',
        // }

        let notFocusingCompositionContainerStyle ={
            width:this.getWidth(),
            height:this.getHeight(),
            position:"relative",
            color:this.getFontColor(),
            overflow:this.overflowCheck(),
            fontSize:this.getFontSize()+'px',
            fontFamily:this.getFontFamily(),
            textAlign:"left"
        }
        
        return(
            <div style={notFocusingCompositionContainerStyle} ref={this.textRef}>
                {this.detectUrlProps()}      
                {this.buildContent()}
            </div>
        )
    }
}

export default TextDiv
