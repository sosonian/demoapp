import React, {Component} from 'react'
import './RecordSearchArea.css'
import AutofillList from './AutofillList'

class RecordSearchArea extends Component {
    constructor(props) {
        super(props)
        this.state = {
           basicSearchWord:"查詢全欄位，可用 AND、OR 布林邏輯",
           advanceSearchWord:null,
           showAdvancedSearchArea:false,
           showAutofillList:false,
           selectedAutofillList:0
        }
    }

    componentDidMount(){
        this.initialAdvanceSearchState()
    }

    initialAdvanceSearchState=()=>{
        if(!this.state.advanceSearchWord)
        {
            let tempArray = []
            tempArray.push(this.initialAdvanceSearchObj())
            this.setState({
                advanceSearchWord:tempArray
            })
        }
    }

    initialAdvanceSearchObj=()=>{
        let initialState = {
            columnName:"Movie_TitleMain",
            boolean:"AND",
            operator:"Like",
            keyword:"請輸入查詢關鍵字"
        }
        return initialState
    }

    onBasicSearchWordInput=(e)=>{
        e.stopPropagation();
        if(e.target.value !== this.state.basicSearchWord)
        {         
            if(e.target.value !== "")
            {
                this.setState({
                    basicSearchWord:e.target.value,             
                    showAutofillList:true,
                    selectedAutofillList:0
                })
            }    
            else
            {
                this.setState({
                    basicSearchWord:e.target.value,             
                    showAutofillList:false,
                    selectedAutofillList:0
                })
            }       
        }
    }

    getKeyword=(msg)=>{
        console.log("getKeyword...")
        if(msg !== this.state.basicSearchWord)
        {              
            this.setState({
                basicSearchWord:msg,             
                showAutofillList:false,
                selectedAutofillList:0
            },()=>{
                this.handleSearchInfo("basic")
            })           
        }
    }

  
    onClick = () => {
        console.log("fuck you don't click me !")
    }

    handleSearchInfo = (type,e) => {
        console.log("handleSearchInfo")
        if(e)
        {
            e.preventDefault()
            e.stopPropagation()
        }
       
        let tempArray = []
        let msg = {}
        if(type === "basic")
        {
            if(this.state.basicSearchWord)
            {
                if(this.state.basicSearchWord !=="" && this.state.basicSearchWord !== "查詢全欄位，可用 AND、OR 布林邏輯")
                {
                    let roughWords = this.roughParser(this.state.basicSearchWord)
                    let outputWords = this.advanceParser(roughWords)
                    console.log("keywords parser finish...")
                    console.log(outputWords)
                    msg = {
                        type:type,
                        searchWord:outputWords,
                    }

                    tempArray.push(this.initialAdvanceSearchObj())
                    this.setState({
                        advanceSearchWord:tempArray,
                        showAdvancedSearchArea:false,
                        showAutofillList:false,
                        selectedAutofillList:0
                    },()=>{
                        this.props.getSearchInfo(msg)
                    })
                }
                else
                {
                    msg = {
                        type:type,
                        searchWord:null
                    }

                    tempArray.push(this.initialAdvanceSearchObj())
                    this.setState({
                        advanceSearchWord:tempArray,
                        showAdvancedSearchArea:false,
                        showAutofillList:false,
                        selectedAutofillList:0
                    },()=>{
                        this.props.getSearchInfo(msg)
                    })
                }
            }
            else
            {
                msg = {
                    type:type,
                    searchWord:null
                }

                tempArray.push(this.initialAdvanceSearchObj())
                this.setState({
                    advanceSearchWord:tempArray,
                    showAdvancedSearchArea:false,
                    showAutofillList:false,
                    selectedAutofillList:0
                },()=>{
                    this.props.getSearchInfo(msg)
                })
            }
        }
        else if(type === "advance")
        {
            if(this.state.advanceSearchWord && this.state.advanceSearchWord[0])
            {
                if(this.state.advanceSearchWord[0].keyword !=="請輸入查詢關鍵字")
                {
                    msg = {
                        type:type,
                        searchWord:this.state.advanceSearchWord
                    }

                    this.setState({
                        basicSearchWord:null,
                        showAdvancedSearchArea:false
                    },()=>{
                        this.props.getSearchInfo(msg)
                    })
                }
            }
        }       
    }

    roughParser = (text) =>{
        let patt1 = /[^\s]+/g
        let outputRough = text.match(patt1)
        console.log("rough parsering...")
        console.log(text)
        console.log(outputRough)
        return outputRough
    }

    advanceParser = (roughKeywords) => {
        let output = []
        var i
        for(i=0;i<roughKeywords.length;i++)
        {
            if(i===0)
            {
                if(roughKeywords[i] !== "AND"  && roughKeywords[i] !== "OR")
                {
                    let key = {
                        boolean:"AND",
                        keyword:roughKeywords[i]
                        
                    }
                    output.push(key)
                } 
            }
            else
            {
                if(roughKeywords[i-1] === "OR")
                {
                    if(roughKeywords[i] !== "AND" && roughKeywords[i] !== "OR")
                    {
                        let key = {
                            boolean:"OR",
                            keyword:roughKeywords[i],
                        }
                        output.push(key)
                    } 
                }
                else
                {
                    if(roughKeywords[i] !== "AND" && roughKeywords[i] !== "OR")
                    {
                        let key = { 
                            boolean:"AND",
                            keyword:roughKeywords[i],
                        }
                        output.push(key)
                    }
                }
            }
        }
        return output
    }

    createAdvanceArea=()=>{
        return (<div className={"advanceSearchAreaBackground"} style={this.state.showAdvancedSearchArea? {height:"100%"}:{height:"0%"}}>
            {this.createAdvanceAreaElements()}
        </div>)
    }

    createAdvanceAreaElements=()=>{
        if(this.state.showAdvancedSearchArea)
        return(
            <div style={{marginTop:"50px"}}>  
            {this.getSelectOption()}<div style={{display:"flex",width:"60%",margin:"auto"}}><div className={"advanceSearchAreaAddButton"} onClick={this.addCondition}>
       +</div><div className="executeAdvanceSearchButton" onClick={(e)=>this.handleSearchInfo("advance",e)}>執行查詢</div></div>
            </div>
        )
    }

    getSelectOption=()=>{
        if(this.state.advanceSearchWord)
        {
            let result = this.state.advanceSearchWord.map((row,index)=>{
                return this.createSelectRow(row,index)
            })
            return result
        }
        else
        {
            return null
        }
    }

    createSelectRow=(row,index)=>{

        return (   
            <div style={{width:"100%",margin:"10px"}}>
            <div className={"advanceSearchAreaConditionRow"}>
                <select value={row.boolean} className={"advanceSearchAreaCellSelect"} onChange={(e)=>this.changeAdvanceValue(e,index,"boolean")}>
                    <option value="AND">AND</option>
                    <option value="OR">OR</option>
                </select>
                <select value={row.columnName} className={"advanceSearchAreaCellSelect"} onChange={(e)=>this.changeAdvanceValue(e,index,"columnName")}>
                    <option value="Movie_SysID">藏品系統號</option>
                    <option value="Movie_TitleMain">主要名稱</option>
                    <option value="Movie_TitleTranslation">翻譯名稱</option>
                    <option value="Movie_TitleOther">其他名稱</option>
                    <option value="Movie_SubCategoryOne">長片短片</option>
                    <option value="Movie_SubCategoryTwo">種類</option>
                    <option value="Movie_ProductionDate">出品日期</option>
                    <option value="Movie_ProductionLocation">出品地點</option>
                    <option value="Movie_ProductionCompany">出品公司</option>
                    <option value="Movie_Producer">出品人</option>
                    <option value="Movie_DramaContent">內容大綱</option>
                    <option value="Movie_Rating">分級</option>
                    <option value="Movie_Language">語言</option>
                    <option value="Movie_ActorName">演員</option>
                    <option value="Movie_RoleName">腳色名稱</option>
                    <option value="Movie_StaffName">工作人員</option>
                    <option value="Movie_Position">職稱</option>
                    <option value="Movie_Company">公司</option>
                </select>
                <select value={row.operator} className={"advanceSearchAreaCellSelect"} onChange={(e)=>this.changeAdvanceValue(e,index,"operator")}>
                    {row.columnName === "Movie_ProductionDate" ? null:<option value="Like">包含</option>}
                    <option value="Equal">{"="}</option>
                    {row.columnName === "Movie_ProductionDate" ? <option value="Greater">{">"}</option> :null}
                    {row.columnName === "Movie_ProductionDate" ? <option value="Smaller">{"<"}</option> :null}
                </select>
                <div style={{margin:"5px 5px 5px 30px",width:"30%"}}>
                    <input style={{width:"100%"}} type='text' value={row.keyword} onChange={(e)=>this.changeAdvanceValue(e,index,"keyword")}/>
                </div>   
                <div className={"advanceSearchAreaRemoveButton"} onClick={()=>this.removeCondition(index)}>
                    x
                </div>        
            </div>
            </div>
        )
    }

    changeAdvanceValue=(e,index,type)=>{
        if(this.state.advanceSearchWord[index][type] !== e.target.value)
        {
            let tempArray = this.state.advanceSearchWord.map((row,rowIndex)=>{
                if(rowIndex === index)
                {
                    let tempObject = Object.assign({},row)
                    tempObject[type] = e.target.value
                    return tempObject
                }
                else
                {
                    return row
                }
            })

            this.setState({
                advanceSearchWord:tempArray
            })
        }
    }

    removeCondition=(index)=>{
        if(this.state.advanceSearchWord && this.state.advanceSearchWord.length>1)
        {
            let tempArray = [...this.state.advanceSearchWord]
            tempArray.splice(index,1)
            this.setState({
                advanceSearchWord:tempArray
            })
        }
    }

    addCondition=()=>{
        let newCondition = this.initialAdvanceSearchObj()
        let tempArray = [...this.state.advanceSearchWord,newCondition]
        this.setState({
            advanceSearchWord:tempArray
        })
    }

    toggleAutofillList=()=>{
        if(this.state.showAutofillList)
        {
            this.setState({
                showAutofillList:false,
                selectedAutofillList:0
            })
        }
    }

    onKeyDown=(e)=>{
        console.log("KeyDown : ", e.key)
        if(e.key === "Enter")
        {
            this.handleSearchInfo("basic",null)   
        }
        else if(e.key === "ArrowDown")
        {
            if(this.state.showAutofillList)
            {
                this.setState({
                    selectedAutofillList : this.state.selectedAutofillList + 1
                })
            }
        }
        else if(e.key === "ArrowUp")
        {
            if(this.state.showAutofillList)
            {
                this.setState({
                    selectedAutofillList : this.state.selectedAutofillList - 1
                })
            }
        }
        else if(e.key === "Escape")
        {
            if(this.state.showAutofillList)
            {
                this.setState({
                    showAutofillList:false,
                    selectedAutofillList:0
                })
            }
        }

    }

    returnKeyword=(msg)=>{
        if(msg !== this.state.basicSearchWord)
        {
            this.setState({
                basicSearchWord:msg
            })
        }
    }


    render(){
        let inputTextDefaultStyle = {
            display: "inline-block",
            width:"300px",
            height:"30px",
            fontSize: "15px",
            fontFamily:"Microsoft JhengHei",
            border: "1px solid #adb4bf",
            borderRadius: "4px 0px 0px 4px",  
            backgroundColor:"#ffffff",
            color: "#adb4bf"
        }

        let inputTextStyle = {
            display: "inline-block",
            width:"300px",
            height:"30px",
            fontSize: "15px",
            fontFamily:"Microsoft JhengHei",
            border: "1px solid #adb4bf",
            borderRadius: "4px 0px 0px 4px",  
            backgroundColor:"#ffffff",
            color: "#adb4bf"
        }

        return(
            <div className="SearchArea">
                <div className="basicSearchArea">
                    <div style={{display:"flex"}}>
                        <div>
                            <input style={this.state.basicSearchWord === "查詢全欄位，可用 AND、OR 布林邏輯" ? inputTextDefaultStyle:inputTextStyle} type="text" value={this.state.basicSearchWord ? this.state.basicSearchWord : "" } onChange={this.onBasicSearchWordInput} onKeyDown={(e)=>this.onKeyDown(e)}/* onBlur={this.toggleAutofillList} */ />
                            {this.state.showAutofillList ?<AutofillList basicSearchWord={this.state.basicSearchWord} selectedIndex={this.state.selectedAutofillList} ipAddress={this.props.ipAddress} getKeyword={this.getKeyword} returnKeyword={this.returnKeyword}/> : null }
                        </div>
                        <div className="advanceSearchAreaSubmitButton" onClick={(e)=>this.handleSearchInfo("basic",e)}>查詢</div>         
                    </div>
                    <div className="ToggleAdvanceAreaButton" onClick={(e)=>this.setState({showAdvancedSearchArea:!this.state.showAdvancedSearchArea,showAutofillList:false})}>{!this.state.showAdvancedSearchArea? "開啟進階查詢 +":"收合進階查詢 -"}</div>
                </div>
                {this.createAdvanceArea()}
            </div>    
        )
    }
}

export default RecordSearchArea
