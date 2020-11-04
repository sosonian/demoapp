import React, { Component } from 'react';

class DynamicImage extends Component {
    constructor(props){
        super(props)
        this.state={
            transitionSecond:5,
            image:{
                order:null,
                imageUrl:null
            }
        }
    }

    componentDidMount(){
        this.loadProps()
        //if(this.props.eventImages[0])
        //{
            
             
            
            this.interval = setInterval(()=>this.transUrl(),5000)
        //}
    }

    componentDidUpdate(prevProps){

        if(this.props.windowSize === "small")
        {
            clearInterval(this.interval)
        }

        if(this.props.eventImages !== prevProps.eventImages)
        {
            this.loadProps()
        }

        
    }

    componentWillUnmount(){
        //if(this.props.eventImages[0])
        //{
            clearInterval(this.interval)
        //}
    }

    loadProps=()=>{
        if(this.props.eventImages)
        {
            this.setState({
                image:{
                    order:1,
                    imageUrl:this.props.eventImages[0].imageUrl
                }
            })
        }
    }

    

    transUrl(){
        //console.log("transUrl...")
        if(this.props.eventImages)
        {
            if(this.props.eventImages.length>0)
            {
                let tempOrder = this.state.image.order +1
                if(this.props.eventImages.length >= tempOrder)
                {
                    this.setState({
                        image:{
                            order:tempOrder,
                            imageUrl:this.props.eventImages[tempOrder-1].imageUrl
                        }
                    })
                }
                else
                {
                    this.setState({
                        image:{
                            order:1,
                            imageUrl:this.props.eventImages[0].imageUrl
                        }
                    })
                }
            }
        }
    }

    loadImageUrl=()=>{
        if(this.state.image.imageUrl)
        {
            return 'url('+this.state.image.imageUrl+')'
        }
        else
        {
            return null
            //return `url(${BGImage})`
        }
    }

    loadImageAdjust=()=>{
        if(this.props.eventImages)
        {
            if(this.props.eventImages[this.state.image.order])
            {
                let tempOrder = this.state.image.order-1
                return ` contrast(${this.props.eventImages[tempOrder].imageAdjust.contrast}%) hue-rotate(${this.props.eventImages[tempOrder].imageAdjust.hue}deg) brightness(${this.props.eventImages[tempOrder].imageAdjust.brightness}%) saturate(${this.props.eventImages[tempOrder].imageAdjust.saturate}%) sepia(${this.props.eventImages[tempOrder].imageAdjust.sepia}%) invert(${this.props.eventImages[tempOrder].imageAdjust.invert}%) blur(${this.props.eventImages[tempOrder].imageAdjust.blur}px) opacity(${this.props.eventImages[tempOrder].imageAdjust.opacity}%)`
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

    render(){
        //console.log("DynamicImage render...")
        const ImageStyle={
            width:'100%',
            height: '100%',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundImage:this.loadImageUrl(),
            filter: this.loadImageAdjust(),
            transitionDuration:"3s",
            transitionProperty:"background-image"
        }
        
        return(
            <div style={ImageStyle}> 
            </div>
        )
    }
}

export default DynamicImage
