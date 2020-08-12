import React, { Component } from 'react';
import CompositionContainer from './CompositionContainer'


class ContainerGroup extends Component {
    constructor(props){
        super(props)
        this.state={
            maxHeight:null
        }
    }
    componentDidMount(){
        this.initialMaxHeight()
    }

    componentDidUpdate(prevProps, prevState) {
  
    }

    initialMaxHeight=()=>{
        if(this.props.containerArray.length>1)
        {
            //console.log("A1")
            let minY = Math.min.apply(Math, this.props.containerArray.map(container=>{return container.y}))
            let maxY = Math.max.apply(Math, this.props.containerArray.map(container=>{return container.y+container.height}))

            //console.log("minY : ", minY)
            //console.log("maxY : ", maxY)
            
            this.setState({
                maxHeight:maxY-minY
            })
        }
        //else
        //{
            //console.log("A2")
        //}
    }

    getMaxHeight=(msg)=>{
        if(msg !== this.state.maxHeight)
        {
            this.setState({
                maxHeight:msg
            })
        }
    }

    createContainer=()=>{
        if(this.props.containerArray.length>1)
        {
            return this.props.containerArray.map(container=>{
                let pos2 = {
                    x:(container.x/this.props.bodySize.width)*100+"%",
                    y:container.y
                }

                let size = {
                    width:(container.width/this.props.bodySize.width)*100+"vw",
                    height:container.height
                }
                
                return(
                    <CompositionContainer key={container.conID} conID={container.conID} type={container.type} previewMode={true} previewSize={this.props.previewSize} grouped={true} getMaxHeight={this.getMaxHeight} bodySize={this.props.bodySize} commonAttributes={container.commonAttributes} imageAttributes={container.imageAttributes} textAttributes={container.textAttributes} color={"grey"} divPos={pos2}  size={size} />
                )
            })
        }
        else
        {
            return(
                <CompositionContainer key={this.props.containerArray[0].conID} conID={this.props.containerArray[0].conID} type={this.props.containerArray[0].type} previewMode={true} previewSize={this.props.previewSize} grouped={false} getMaxHeight={this.getMaxHeight} bodySize={this.props.bodySize} commonAttributes={this.props.containerArray[0].commonAttributes} imageAttributes={this.props.containerArray[0].imageAttributes} textAttributes={this.props.containerArray[0].textAttributes} color={"grey"} divPos={{x:(this.props.containerArray[0].x/this.props.bodySize.width)*100+"%",y:this.props.containerArray[0].y}}  size={{width:(this.props.containerArray[0].width/this.props.bodySize.width)*100+"vw",
                height:this.props.containerArray[0].height}} />
            )
        }                 
    }

    getHeight=()=>{
        //console.log("ContainerGroup getHeight")
        if(this.props.containerArray.length>1)
        {
            //console.log("maxHeight : ", this.state.maxHeight)
            if(this.state.maxHeight)
            {
                return this.state.maxHeight
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
        let containerGroupStyle= {
            width:"100%",
            height:this.getHeight(),
            position:"relative",
            marginTop:this.props.indexKey === 0 ? "-600px":"40px"
        }

        return(
            <div style={containerGroupStyle}> 
                {this.createContainer()}
            </div>
        )
    }
}

export default ContainerGroup
