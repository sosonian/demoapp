import React, { Component } from 'react';
//import { ReactComponent as DefaultImageBackground } from '../../../../../Utilities/defaultImage.svg'

const wStyles = theme => ({
    ImageIconAdjusted:{
        width:"100%",
        height:"100%"
    }
})

class ImageDiv extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    loadImageAdjust=()=>{
        if(this.props.imageAttributes.imageAdjust)
        {
            return ` contrast(${this.props.imageAttributes.imageAdjust.contrast}%) hue-rotate(${this.props.imageAttributes.imageAdjust.hue}deg) brightness(${this.props.imageAttributes.imageAdjust.brightness}%) saturate(${this.props.imageAttributes.imageAdjust.saturate}%) sepia(${this.props.imageAttributes.imageAdjust.sepia}%) invert(${this.props.imageAttributes.imageAdjust.invert}%) blur(${this.props.imageAttributes.imageAdjust.blur}px) opacity(${this.props.imageAttributes.imageAdjust.opacity}%)`
        }
        else
        {
            return null
        }
    }

    getImagePos=(type)=>{
        if(this.props.imageAttributes.imageContainerPos)
        {
            if(!this.props.previewMode)
            {
                if(type==="left")
                {
                    return 0-this.props.imageAttributes.imageContainerPos.x
                }
                else if(type==="top")
                {
                    return 0-this.props.imageAttributes.imageContainerPos.y
                }
            }
            else
            {
                if(type==="left")
                {
                    return 0-this.props.imageAttributes.imageContainerPos.x
                }
                else if(type==="top")
                {
                    return 0-this.props.imageAttributes.imageContainerPos.y
                }
            }
        }
        else
        {
            return 0
        }
    }

    getImageSize=(type)=>{
        if(this.props.imageAttributes.dynamicImageSize)
        {
            if(type==="width")
            {
                return this.props.imageAttributes.dynamicImageSize.width
            }
            else if(type==="height")
            {
                return this.props.imageAttributes.dynamicImageSize.height
            }
        }
        else
        {
            return "100%"
        }
    }

    detectUrlProps=()=>{
      
        let svgStyle = {
            width:this.props.imageSize.width,
            height:this.props.imageSize.height,
            position:"absolute",
        }

        if(this.props.imageAttributes.imageUrl)
        {
            //console.log("detectUrlProps imageUrl true")
    
            let imageStyle ={
                position:"relative",
                top:this.getImagePos("top"),
                left:this.getImagePos("left"),
                width:this.getImageSize("width"),
                height:this.getImageSize("height"),
                filter: this.loadImageAdjust(),
            }

            return(
                <img style={imageStyle} src={this.props.imageAttributes.imageUrl} alt={"loadimage"}/>
            )
        }
        else
        {
            //console.log("detectUrlProps imageUrl false")
            //return(<DefaultImageBackground style={svgStyle}/>)
        }
    }

    getWidth=()=>{
        if(this.props.imageAttributes.imageUrl)
        {
            return this.props.imageSize.width+6
        }
        else
        {
            return this.props.imageSize.width
        }
    }

    getHeight=()=>{
        if(this.props.imageAttributes.imageUrl)
        {
            return this.props.imageSize.height+6
        }
        else
        {
            return this.props.imageSize.height
        }
    }


    render(){
        // let focusingCompositionContainerStyle ={
        //     width:this.getWidth(),
        //     height:this.getHeight(),
        //     border:'3px dashed',
        //     borderColor:'#fff838',
        //     overflow:"hidden",    
        // }

        let notFocusingCompositionContainerStyle ={
            width:this.getWidth()-6,
            height:this.getHeight()-6,
            overflow:"hidden",
            position:"relative",
        }
       
        return(
            <div style={notFocusingCompositionContainerStyle}>
                {this.detectUrlProps()}      
            </div>
        )
    }
}

export default ImageDiv
