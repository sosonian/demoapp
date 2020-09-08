import React, { Component } from 'react';
import './PageSelectFunctionArea.css'



class PageSelectFunctionArea extends Component {
    constructor(props){
        super(props)
        this.state = {
           
        }
    }

    changeLimitValue=(e)=>{
        e.stopPropagation();
        this.props.getPageLimitInfo(Number(e.target.value))
    }

    changeCurrentPage=(e)=>{
        e.stopPropagation();   
        if(e.target.value <= this.getTotalPageNumber())
        {
            this.props.getPageNumberInfo(Number(e.target.value))
        }      
        //this.props.getPageNumberInfo(e.target.value)
    }

    changeCurrentPageByClick=(e,type)=>{
        let pageToken = 0
        switch (type){
            case "first":
                this.props.getPageNumberInfo(1)
                break;
            case "minusTen":
                pageToken = 1
                if(this.props.storedPageNumber-10 > 1)
                {
                    pageToken = Number(this.props.storedPageNumber)-10
                }
                this.props.getPageNumberInfo(pageToken)
                break;
            case "minusOne":
                pageToken = 1
                if(this.props.storedPageNumber-1 > 1)
                {
                    pageToken = Number(this.props.storedPageNumber)-1
                }
                this.props.getPageNumberInfo(pageToken)
                break;
            case "last":
                this.props.getPageNumberInfo(this.getTotalPageNumber())
                break;
            case "addTen":
                pageToken = this.getTotalPageNumber()
                if(this.props.storedPageNumber+10 < this.getTotalPageNumber())
                {
                    pageToken = Number(this.props.storedPageNumber)+10
                }
                this.props.getPageNumberInfo(pageToken)
                break;
            case "addOne":
                pageToken = this.getTotalPageNumber()
                if(this.props.storedPageNumber+1 < this.getTotalPageNumber())
                {
                    pageToken = Number(this.props.storedPageNumber)+1
                }
                this.props.getPageNumberInfo(pageToken)
                break;
        }
    }

    getTotalPageNumber=()=>{
        let output = Math.floor(this.props.storedTotalNumber/this.props.storedLimitNumber)
        let leftNumber = this.props.storedTotalNumber % this.props.storedLimitNumber

        if(output === 0)
        {
            output = 1
        }
        else
        {
            if(leftNumber !== 0)
            {
                output = output + 1
            }
        }

        return output
    }

   
    render(){
        console.log("pageSelectFunctionArea render...")
        
        return(
            
                <div className="pageFunctionArea">
                    <div className="leftFieldGroup">
                        <div className="fieldTitle">每頁筆數</div>
                        <form>
                            <select value={this.props.storedLimitNumber} onChange={this.changeLimitValue} className="pageLimitSelect">
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </form>
                    </div>
                    <div className="centerFieldGroup">
                        <div className="fieldTitle">總筆數<a style={{color:"#ffe736"}}>{this.props.storedTotalNumber}</a>筆</div>
                        <div className="fieldTitle">共<a style={{color:"#ffe736"}}>{this.getTotalPageNumber()}</a>頁</div>  
                        <div className="fieldTitle">目前頁面</div>
                        <form>
                            <input className="pageNumberInput" type='text' value={this.props.storedPageNumber} onChange={this.changeCurrentPage}/>
                        </form>   
                        <div className="arrowIconArea">
                            <div className="arrowIcon" onClick={(e)=>this.changeCurrentPageByClick(e,"first")}>&#10072; &#10092;</div>
                            <div className="arrowIcon" onClick={(e)=>this.changeCurrentPageByClick(e,"minusTen")}>&#10092; &#10092;</div>
                            <div className="arrowIcon" onClick={(e)=>this.changeCurrentPageByClick(e,"minusOne")}>&#10092;</div>
                            <div className="fieldTitle"><a style={{color:"#ffe736"}}>{this.props.storedPageNumber}</a></div>
                            <div className="arrowIcon" onClick={(e)=>this.changeCurrentPageByClick(e,"addOne")}>&#10093;</div>
                            <div className="arrowIcon" onClick={(e)=>this.changeCurrentPageByClick(e,"addTen")}>&#10093; &#10093;</div>
                            <div className="arrowIcon" onClick={(e)=>this.changeCurrentPageByClick(e,"last")}>&#10093; &#10072;</div>
                        </div>        
                    </div>    
                </div>
          
        )
    }
}

export default PageSelectFunctionArea