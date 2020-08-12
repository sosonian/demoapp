import React, {Component} from 'react';
import CompositionContainer from './CompositionContainer'
import ContainerGroup from './ContainerGroup'
import BGImage from '../Utilites/Taiwan_Film_Institute_title_20170123.jpg'
import IPAddress from '../IPAddress'


class EventPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            windowSize:"large",
            compositionContainers:null,
            bodyHeight:null,
            bodySize:null
        }
        this.openTempFile = React.createRef()
        this.scrollContainerLayout = React.createRef()   
    }

    componentDidMount(){
        this.initialState()
        window.addEventListener("resize", this.getResizeWidth)
    }

    componentDidUpdate(preProps){
        if(this.props.match.params.StaticPage_SysID !== preProps.match.params.StaticPage_SysID)
        {
            this.initialState()
            window.addEventListener("resize", this.getResizeWidth)
        }
    }

    componentWillUnmount(){

    }

    initialState=async()=>{
        console.log('initialState')
        let staticPageSysID = this.props.match.params.StaticPage_SysID 
        let eventSysID = this.props.match.params.Event_SysID
        let tempIP = new IPAddress()
        if(eventSysID && !staticPageSysID)
        {
            let msg = await fetch(tempIP.state.ip+'/api/event/fetch/EventComposition/'+eventSysID)
            let output = await msg.json()
            let size= {
                width:window.innerWidth,
                height:window.innerHeight
            }
    
            this.setState({
                compositionContainers:output[0].Event_CompositionSettings,
                bodyHeight:800,
                bodySize:size
            })
        }
        else if(!eventSysID && staticPageSysID)
        {
            let msg = await fetch(tempIP.state.ip+'/api/staticPage/get/PublicPage/'+staticPageSysID)
            let output = await msg.json()
            console.log(output)
            let size= {
                width:window.innerWidth,
                height:window.innerHeight
            }
    
            this.setState({
                compositionContainers:output[0].Public_StaticPage_CompositionSettings,
                bodyHeight:800,
                bodySize:size
            })
        }
    }


    getResizeWidth=()=>{
        //console.log(this.scrollContainerLayout)
        let tempWidth = 1900
        if(this.scrollContainerLayout.current)
        {
            tempWidth = this.scrollContainerLayout.current.scrollWidth
        }
    
        //console.log(tempWidth)
        if(tempWidth >= 1900)
        {
            if(this.state.windowSize !== "large")
            {
                this.setState({
                    windowSize :"large"
                })
            }
        }
        else if(tempWidth<1900 && tempWidth >= 1300)
        {
            if(this.state.windowSize !== "medium")
            {
                this.setState({
                    windowSize :"medium"
                })
            }
        }
        else if(tempWidth<1300)
        {
            if(this.state.windowSize !== "small")
            {
                this.setState({
                    windowSize :"small"
                })
            }
        }
    }

    createContainer=()=>{
        if(this.state.windowSize === "large")
        {
            return this.renderInLargeContainer()
        }
        else if(this.state.windowSize === "medium")
        {
            return this.renderInMediumContainer()
        }
        else if(this.state.windowSize === "small")
        {
            return this.renderInMediumContainer()
        }

        //console.log("ContentPreview createContainer...")
    }

    renderInLargeContainer=()=>{
        if(this.state.compositionContainers)
        {
            return(
                this.state.compositionContainers.map(container=>{

                    let pos2 = {
                        x:(container.x/this.state.bodySize.width)*100+"%",
                        y:container.y
                    }
            
                    let size = {
                        width:(container.width/this.state.bodySize.width)*100+"vw",
                        height:container.height
                    }

                    return(
                        <CompositionContainer key={container.conID} conID={container.conID} type={container.type} previewMode={true} bodySize={this.state.bodySize} commonAttributes={container.commonAttributes} imageAttributes={container.imageAttributes} textAttributes={container.textAttributes} color={"grey"} divPos={pos2}  size={size} />
                    )
                })
            )
        }
        else
        {
            return null
        }
    }

    renderInMediumContainer=()=>{
        if(this.state.compositionContainers)
        {
            /// sorting array
            let tempArray = this.state.compositionContainers.map(composition=>{
                return composition
            }).sort((a,b)=>{
                return a.y-b.y
            })

            console.log("sorting array :")
            console.log(tempArray)

            let groupArray = []
            let groupObj = []
            let prevMinHeight=0
            let prevMaxHeight=0 
            //let groupToken = false

            for(var i =0; i<tempArray.length; i++)
            {
                //console.log("loop i : ", i)
                if(i === 0)
                {      
                    groupObj.push(tempArray[i]) 
                }
                else if(i === tempArray.length-1)
                {
                    prevMaxHeight = tempArray[i-1].y+tempArray[i-1].height
                    if(tempArray[i].y < prevMaxHeight)
                    {
                        //console.log("height been involved : ", i-1, i)
                        groupObj.push(tempArray[i])
                        let tempGroupObj = groupObj.map(obj=>{
                            return obj
                        })
                        groupArray.push(tempGroupObj )
                    }
                    else
                    {
                        let tempGroupObj = groupObj.map(obj=>{
                            return obj
                        })
                        groupArray.push(tempGroupObj)
                        let finalGroupObj = []
                        finalGroupObj.push(tempArray[i])
                        groupArray.push(finalGroupObj)
                    }
                }
                else
                {
                    ///prevMinHeight = tempArray[i-1].y
                    prevMaxHeight = tempArray[i-1].y+tempArray[i-1].height
                    if(tempArray[i].y < prevMaxHeight)
                    {
                        //console.log("height been involved : ", i-1, i)
                        groupObj.push(tempArray[i])
                    }
                    else
                    {
                        let tempGroupObj = groupObj.map(obj=>{
                            return obj
                        })
                        groupArray.push(tempGroupObj)
                        groupObj = []
                        groupObj.push(tempArray[i])
                    }
                }
            }

            console.log("groupArray :")
            console.log(groupArray)

            let finalGroupArray =[]

            groupArray.forEach(array=>{
                if(array.length>1)
                {
                    let minY = Math.min.apply(Math, array.map(container=>{return container.y}))
                    let maxY = Math.max.apply(Math, array.map(container=>{return container.y+container.height}))
                    let maxHeight = maxY-minY
                    let newArray = array.map(container=>{
                        let tempContainer = {
                            conID:container.conID,
                            width:container.width,
                            height:container.height,
                            x:container.x,
                            y:container.y-minY,
                            imageAttributes:container.imageAttributes,
                            textAttributes:container.textAttributes,
                            title:container.title,
                            type:container.type,
                            zIndex:container.zIndex
                        }
                        return tempContainer
                    })
                    finalGroupArray.push(newArray)
                }
                else
                {
                    finalGroupArray.push(array)
                }
            })

            console.log("finalGroupArray :")
            console.log(finalGroupArray)


            return(
                finalGroupArray.map((array,index)=>{
                    console.log("A1")
                    return (
                        <ContainerGroup key={index} indexKey={index} containerArray={array} bodySize={this.state.bodySize} previewSize={this.state.windowSize}/>
                    )
                })
            )
        }
        else
        {
            return null
        }
    }
    
    render(){
        let scrollContainer={
            position:"fixed",
            top:0,
            left:0,
            width:"100vw",
            height:"100vh",
            backgroundColor:"#000000",
            overflow:"scroll",
            zIndex:1400
        }

        let middleLayout = {
            position:this.state.windowSize === "small"? "sticky":"relative",
            top:0,
            marginLeft:"auto",
            marginRight:"auto",
            borderRadius:"10px",
            width:"90vw",
            height:this.state.windowSize === "small"? "100vh" : this.props.bodyHeight,
            //height:"1300px",
            backgroundColor:"#ffffff",
            opacity:"0.3"
        }

        let backgroundImageStyle = {
            backgroundImage: `url(${BGImage})`,
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
            backgroundSize: "cover",
            position:"fixed",
            top:0,
            left:0,
            width:"100vw",
            height:"100vh",
            filter:"blur(5px)"
        }

        return (

            <div style={scrollContainer}  ref={this.scrollContainerLayout} >
                <div style={backgroundImageStyle}/>
                <div style={middleLayout}/> 
                {this.createContainer()}
            </div>
           
        )  
    }
}

export default EventPage
