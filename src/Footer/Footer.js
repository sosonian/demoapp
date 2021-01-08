import React, { Component } from 'react';
import LinkedList from '../Function/LinkedList'
import Category from '../IntroList/Category'
import './Footer.css'
import IPAddress from '../IPAddress'

class Footer extends Component {
    constructor(props){
        super(props)
        this.state = {
            firstStageOptions:null
        }
    }

    componentDidMount(){
        this.initialStaticPage()
    }
 
    componentDidUpdate(){
      
    }
 
    initialStaticPage=async()=>{
        let tempIP = new IPAddress()
        console.log('initialStaticPage')
        let msg = await fetch(tempIP.state.ip+'/api/staticPage/get/PublicStaticPageMainInfo', {
            method:"get"
        })
 
        let output = await msg.json()
        //console.log("output : ", output[0])
         
        let finalList = this.returnLinkedList(output[0] && output[0].Public_StaticPage_LinkedList) 
 
        this.setState({
            firstStageOptions:finalList
        })
    }

    returnLinkedList =(list)=> {
        let cloneL = new LinkedList()
        
        if(list)
        {
            if(list.head)
            {
                let current = list.head
                while(current)
                {
                    let tempNodeData = {...current.data}
                    cloneL.insertLast(tempNodeData)
                    current = current.next
                }
            }
        }
        
        return cloneL
    }

    appendCategory=()=>{
        if(this.state.firstStageOptions)
        {      
            let tempLinkedList = this.state.firstStageOptions
            let tempArray = []
            let countI = -1

            for(let i=0;i< tempLinkedList.length;i++)
            {
                //console.log("i : ",i)
                //console.log(tempLinkedList.getAt(i))
                tempArray.push(tempLinkedList.getAt(i))
                //return( <FirstStageOption optionInfo={tempLinkedList.getAt(i)}/>)
            }
            return tempArray.map(option=>{
                countI= countI+1
                return(<Category key={countI} categoryID={option.id} categoryName={option.route} categoryTitle={option.title} categoryList={option.list} mode={"footer"}/>)
            })

        }
        else
        {
            return null
        }
    }

    render(){
        let beforeFooterContainer = {
            backgroundColor:"White",
            //width:"100vw",
            //height:"500px",
            //marginTop:"300px",
            opacity:"0",
            transition:'all 2s ease'
        }

        let afterFooterContainer = {
            backgroundColor:"White",
            //width:"100vw",
            //height:"500px",
            //marginTop:"300px",
            opacity:"1",
            transition:'all 2s ease'
        }

        let categoryContainer = {
            display:"flex",
            flexDirection:"row",
            flexWrap:"wrap",
            justifyContent:"center",
            paddingBottom:"50px",
            paddingTop:"50px"
        }

        return(
            <div style={this.state.firstStageOptions?afterFooterContainer:beforeFooterContainer}>
                <div style={categoryContainer}>  
                    {this.appendCategory()}
                </div>
                <div className={"FooterInfoContainer"}>
                    <div className={"FooterInfo"}>
                        台灣華語電影資料庫
                    </div>
                    <div className={"FooterInfo"}>
                        此為功能及個人技術展示版本
                    </div>
                    <div className={"FooterInfo"}>
                        內容資料取自 IMDB、WIKI、HKMDB 等網路資料，不保證其正確性
                    </div>
                    <div className={"FooterInfo"}>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer
