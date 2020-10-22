import React, { Component } from 'react';

class MaskArea extends Component {
    constructor(props){
        super(props)
        this.state={}
           
   
    }
    componentDidMount(){
       
    }

    getPath=()=>{
        let outer = "M0,0 L0,"+this.props.dynamicImageSize.height+"L"+this.props.dynamicImageSize.width+","+this.props.dynamicImageSize.height+"L"+this.props.dynamicImageSize.width+",0 Z"
        let inner = "M"+this.props.floatWinPos.x+","+this.props.floatWinPos.y+"L"+Number(this.props.floatWinPos.x+this.props.floatWinSize.width)+","+this.props.floatWinPos.y+"L"+Number(this.props.floatWinPos.x+this.props.floatWinSize.width)+","+Number(this.props.floatWinPos.y+this.props.floatWinSize.height)+"L"+this.props.floatWinPos.x+","+Number(this.props.floatWinPos.y+this.props.floatWinSize.height)+"L"+this.props.floatWinPos.x+","+this.props.floatWinPos.y+"Z"

        //console.log(outer+inner)
        return outer+inner
    }

    render(){
        let svgStyle={
            fill:"#000000",
            width:this.props.dynamicImageSize.width,
            height:this.props.dynamicImageSize.height,
            opacity:"50%",
            
        }

        let pathStyle ={
            fillRule:"evenodd"
        }

        return(       
            <svg style={svgStyle}>
                <path style={pathStyle} d={this.getPath()}/>    
            </svg>
        )
    }
}

export default MaskArea
