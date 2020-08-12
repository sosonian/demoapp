import React, { Component } from 'react';
import './Category.css'
import IntroListOption from './IntroListOption'
import LinkedList from '../Function/LinkedList'

class Category extends Component {
    constructor(props){
        super(props)
    }


    createSecondStageOption=()=>{
        if(this.props.categoryList)
        {      
         
            let tempLinkedList = this.returnLinkedList(this.props.categoryList)
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
                return(<IntroListOption key={option.countI} optionID={option.id} firstRoute={this.props.categoryName} secondRoute={option.route} optionTitle={option.title}/> )
            })

        }
        else
        {
            return null
        }
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

    render(){
        
        return(
            <div className="CategoryBody"> 
                <div className="CategoryTitle">{this.props.categoryTitle}</div>
                {this.createSecondStageOption()}
            </div>
        )
    }
}

export default Category