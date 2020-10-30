import React, { Component } from 'react';
import './IntroList.css'
import Category from './Category'

import LinkedList from '../Function/LinkedList'
import IPAddress from '../IPAddress'

class IntroList extends Component {
    constructor(props){
        super(props)
        this.state={
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
                return(<Category key={countI} categoryID={option.id} categoryName={option.route} categoryTitle={option.title} categoryList={option.list} windowSize={this.props.windowSize}/>)
            })

        }
        else
        {
            return null
        }
    }

    getClassName=()=>{
        let className = "IntroListMainBody"
        if(this.props.showOrHide)
        {
            if(this.props.windowSize === "small"){
                className = "IntroListMainBody ShowSmall"
            }
            else
            {
                className = "IntroListMainBody ShowNotSmall"
            }
        }
        console.log("className : ",className)
        return className
    }

    render(){
        
        return(
            <div className={this.getClassName()}> 
                {this.appendCategory()}
            </div>
        )
    }
}

export default IntroList