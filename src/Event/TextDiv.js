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
                return "'"+this.props.textAttributes.font.eFamily+","+this.props.textAttributes.font.cFamily+"'"
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
        if(this.props.textAttributes.hyperLinks)
        {
            if(this.props.textAttributes.hyperLinks.length>0)
            {
                let story = this.props.textAttributes.story
                let count = 0
                let sliceSIndex = 0
                return(
                    this.props.textAttributes.hyperLinks.map(link=>{
                        //console.log("count : ",count)
                        //console.log("hyperLinks.length : ",this.props.textAttributes.hyperLinks.length)
                        //let story = this.props.textAttributes.story

                        let s = link.start
                        let e = link.end

                        if(count === 0)
                        {
                            sliceSIndex = 0                      
                        }
   
                        let suffix = null
                        let prefix = story.slice(sliceSIndex,s)
                       
                        if(count === this.props.textAttributes.hyperLinks.length-1)
                        {
                            suffix = story.slice(e,-1)
                        }
                        
                        count = count + 1
                        sliceSIndex = e
                        //console.log("prefix : ",story.slice(0,s))
                        //console.log("link : ",story.slice(s,e))
                        //console.log("suffix : ",suffix)
                        return <span>{prefix}<a className={"aHyperLink"} href={"http://www.google.com"}>{story.slice(s,e)}</a>{suffix}</span>
                    })
                )
            }
            else
            {
                return this.props.textAttributes.story
            }
        }
        else
        {
            return this.props.textAttributes.story
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
            fontFamily:this.getFontFamily()
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
