import React, { Component } from 'react';
import {serverIP} from '../IPAdressModule'
import './ResultListMainBody.css';
import IPAddress from '../IPAddress'
import ResultRow from './ResultRow'

class ResultListMainBody extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchWord:null,
            listData:null,
            limitNumber:50,
            pageNumber:1,
            totalNumber:"",
            orderType:"ASC",
            orderColumn:"Movie_TitleMain",
            searchType:"basic",
            searchColumn:"All",
            metaInfo:null,
            ipAddress:null
        }
    }

    
    componentDidMount(){
        this.initialIPAddress()
        this.initialState()   
        
    }

    componentDidUpdate(prevProps,prevState){
        console.log("ResultListMainBody Update...")
        if(prevProps.match.params.searchType !== this.props.match.params.searchType || prevProps.match.params.query !== this.props.match.params.query)
        {
            this.initialState()
        }
    }

    componentWillUnmount(){
       
    }

    
  
    initialState=()=>{
        let query = JSON.parse(decodeURIComponent(this.props.match.params.query))
        this.setState({
            searchType:this.props.match.params.searchType,
            searchWord:query,
            listData:null,
            metaInfo:null,
            totalNumber:"",
        },()=>{
            this.getRecord()
        })
    }

    initialIPAddress=()=>{
        let tempIP = new IPAddress()
        this.setState({
            ipAddress:tempIP.state.ip
        })
    }

    getRecord=()=>{
        if(this.state.searchType && this.state.searchType === "basic")
        {
            if(!this.state.searchWord)
            {
                console.log("A1-1")
                console.log(this.state.searchWord)
                this.getAllRecord()
                .then(res=>{
                    this.setState({
                        showWarningDialog:false,
                        listData:res,
                        totalNumber:res[0].Movie_TotalCount,
                    })             
                })
            }
            else
            {
                console.log("A1-2")
                console.log(this.state.searchWord)
                
                // 預設排序邏輯  關聯性
                // this.getRecordByBasicQueryValidation()
                //
                
                // 預設排序邏輯  選擇欄位
                this.getRecordByBasicSearch()
                //

                .then(res=>{
                    if(res[0])
                    {
                        this.setState({
                            showWarningDialog:false,
                            listData:res,
                            totalNumber:res[0].Movie_TotalCount,
                        })     
                    }
                    else
                    {
                        this.setState({
                            showWarningDialog:false,
                            listData:null,
                            totalNumber:0,
                        })
                    }             
                })

                this.getMetaByBasicQuery()
            }
        }
        else if(this.state.searchType && this.state.searchType === "advance")
        {
            console.log("A2-1")
            this.getRecordByAdvanceSearch()
            .then(res=>{
                if(res[0])
                {
                    this.setState({
                        showWarningDialog:false,
                        listData:res,
                        totalNumber:res[0].Movie_TotalCount,
                    })     
                }
                else
                {
                    this.setState({
                        showWarningDialog:false,
                        listData:null,
                        totalNumber:0,
                    })
                }             
            })

            this.getMetaByAdvanceQuery()
        }
    }


    getAllRecord = async()=>{
        console.log("proceed getAllRecord...")
        let limitNumber = this.state.limitNumber
        let pageNumber = this.state.pageNumber
        let orderType = this.state.orderType
        let orderColumn = this.state.orderColumn
        let msg = await fetch(serverIP+'/api/movie/basicQuery/frontend/limit/'+limitNumber+'/pageNumber/'+pageNumber+'/orderColumn/'+orderColumn+'/orderType/'+orderType+'/query/default')

        let output = await msg.json()
        if(msg.status !== 200) throw Error(msg.message)
        //console.log(output)
        return output
    }


    getRecordByBasicSearch = async()=>{
        console.log("proceed getRecordByBasicSearch...")
        let limitNumber = this.state.limitNumber
        let pageNumber = this.state.pageNumber
        let orderType = this.state.orderType
        let orderColumn = this.state.orderColumn
        let queryWords = encodeURI(JSON.stringify(this.state.searchWord))
        console.log("limitNumber : ",limitNumber)
        console.log("pageNumber : ",pageNumber)
        console.log("orderType : ",orderType)
        console.log("orderColumn : ",orderColumn)
        console.log("queryWords : ",queryWords)
        let msg = await fetch(serverIP+'/api/movie/basicQuery/frontend/limit/'+limitNumber+'/pageNumber/'+pageNumber+'/orderColumn/'+orderColumn+'/orderType/'+orderType+'/query/'+queryWords)

        let output = await msg.json()
        if(msg.status !== 200) throw Error(msg.message)
        //console.log(output)
        return output
    }

    getRecordByBasicQueryValidation = async()=>{
        console.log("getRecordByBasicQueryValidation...")
        let limitNumber = this.state.limitNumber
        let pageNumber = this.state.pageNumber
        let orderType = this.state.orderType
        let orderColumn = this.state.orderColumn
        let queryWords = encodeURI(JSON.stringify(this.state.searchWord))
        console.log("limitNumber : ",limitNumber)
        console.log("pageNumber : ",pageNumber)
        console.log("orderType : ",orderType)
        console.log("orderColumn : ",orderColumn)
        console.log("queryWords : ",queryWords)
        let msg = await fetch(serverIP+'/api/movie/basicQueryValidation/frontend/limit/'+limitNumber+'/pageNumber/'+pageNumber+'/query/'+queryWords)

        let output = await msg.json()
        if(msg.status !== 200) throw Error(msg.message)
        //console.log(output)
        return output
    }

    getMetaByBasicQuery = async()=>{
        console.log("getMetaByBasicQuery...")
       
        let queryWords = encodeURI(JSON.stringify(this.state.searchWord))
        console.log("querywords : ", queryWords)

        let tempState = {}
        
        let msgCategory = await fetch(serverIP+'/api/movie/basicQuery/frontend/meta/field/Category/query/'+queryWords)
        let msgProducer = await fetch(serverIP+'/api/movie/basicQuery/frontend/meta/field/Producer/query/'+queryWords)
        let msgProductionCompany = await fetch(serverIP+'/api/movie/basicQuery/frontend/meta/field/ProductionCompany/query/'+queryWords)
        let msgProductionDate = await fetch(serverIP+'/api/movie/basicQuery/frontend/meta/field/ProductionDate/query/'+queryWords)
        let msgProductionLocation = await fetch(serverIP+'/api/movie/basicQuery/frontend/meta/field/ProductionLocation/query/'+queryWords)
        let msgActorName = await fetch(serverIP+'/api/movie/basicQuery/frontend/meta/field/ActorName/query/'+queryWords)
        let msgStaffName = await fetch(serverIP+'/api/movie/basicQuery/frontend/meta/field/StaffName/query/'+queryWords)
        let msgStaffCompany = await fetch(serverIP+'/api/movie/basicQuery/frontend/meta/field/StaffCompany/query/'+queryWords)

        let outputCategory = await msgCategory.json()
        let outputProducer = await msgProducer.json()
        let outputProductionCompany = await msgProductionCompany.json()
        let outputProductionDate = await msgProductionDate.json()
        let outputProductionLocation = await msgProductionLocation.json()
        let outputActorName = await msgActorName.json()
        let outputStaffName = await msgStaffName.json()
        let outputStaffCompany = await msgStaffCompany.json()

        if(outputCategory)
        {
            tempState.Category = outputCategory
        }

        if(outputProducer)
        {
            tempState.Producer = outputProducer
        }

        if(outputProductionCompany)
        {
            tempState.ProductionCompany = outputProductionCompany
        }
        
        if(outputProductionDate)
        {
            tempState.ProductionDate = outputProductionDate
        }

        if(outputProductionLocation)
        {
            tempState.ProductionLocation = outputProductionLocation
        }
        
        if(outputActorName)
        {
            tempState.ActorName = outputActorName
        }

        if(outputStaffName)
        {
            tempState.StaffName = outputStaffName
        }

        if(outputStaffCompany)
        {
            tempState.StaffCompany = outputStaffCompany
        }
        
        if(tempState !== this.state.metaInfo)
        {
            this.setState({
                metaInfo:tempState
            })
        }
    }

    getMetaByAdvanceQuery = async()=>{
        console.log("getMetaByAdvanceQuery...")
       
        let queryWords = encodeURI(JSON.stringify(this.state.searchWord))

        let tempState = {}
        
        let msgCategory = await fetch(serverIP+'/api/movie/advanceQuery/frontend/meta/field/Category/query/'+queryWords)
        let msgProducer = await fetch(serverIP+'/api/movie/advanceQuery/frontend/meta/field/Producer/query/'+queryWords)
        let msgProductionCompany = await fetch(serverIP+'/api/movie/advanceQuery/frontend/meta/field/ProductionCompany/query/'+queryWords)
        let msgProductionDate = await fetch(serverIP+'/api/movie/advanceQuery/frontend/meta/field/ProductionDate/query/'+queryWords)
        let msgProductionLocation = await fetch(serverIP+'/api/movie/advanceQuery/frontend/meta/field/ProductionLocation/query/'+queryWords)
        let msgActorName = await fetch(serverIP+'/api/movie/advanceQuery/frontend/meta/field/ActorName/query/'+queryWords)
        let msgStaffName = await fetch(serverIP+'/api/movie/advanceQuery/frontend/meta/field/StaffName/query/'+queryWords)
        let msgStaffCompany = await fetch(serverIP+'/api/movie/advanceQuery/frontend/meta/field/StaffCompany/query/'+queryWords)

        let outputCategory = await msgCategory.json()
        let outputProducer = await msgProducer.json()
        let outputProductionCompany = await msgProductionCompany.json()
        let outputProductionDate = await msgProductionDate.json()
        let outputProductionLocation = await msgProductionLocation.json()
        let outputActorName = await msgActorName.json()
        let outputStaffName = await msgStaffName.json()
        let outputStaffCompany = await msgStaffCompany.json()

        if(outputCategory)
        {
            tempState.Category = outputCategory
        }

        if(outputProducer)
        {
            tempState.Producer = outputProducer
        }

        if(outputProductionCompany)
        {
            tempState.ProductionCompany = outputProductionCompany
        }
        
        if(outputProductionDate)
        {
            tempState.ProductionDate = outputProductionDate
        }

        if(outputProductionLocation)
        {
            tempState.ProductionLocation = outputProductionLocation
        }
        
        if(outputActorName)
        {
            tempState.ActorName = outputActorName
        }

        if(outputStaffName)
        {
            tempState.StaffName = outputStaffName
        }

        if(outputStaffCompany)
        {
            tempState.StaffCompany = outputStaffCompany
        }
        
        if(tempState !== this.state.metaInfo)
        {
            this.setState({
                metaInfo:tempState
            })
        }
    }

    getRecordByAdvanceSearch = async()=>{
        console.log("proceed getRecordByAdvanceSearch...")
        let limitNumber = this.state.limitNumber
        let pageNumber = this.state.pageNumber
        let orderType = this.state.orderType
        let orderColumn = this.state.orderColumn
        let queryWords = encodeURI(JSON.stringify(this.state.searchWord))
        console.log("limitNumber : ",limitNumber)
        console.log("pageNumber : ",pageNumber)
        console.log("orderType : ",orderType)
        console.log("orderColumn : ",orderColumn)
        console.log("queryWords : ",queryWords)
        let msg = await fetch(serverIP+'/api/movie/advanceQuery/frontend/limit/'+limitNumber+'/pageNumber/'+pageNumber+'/orderColumn/'+orderColumn+'/orderType/'+orderType+'/query/'+queryWords)

        let output = await msg.json()
        if(msg.status !== 200) throw Error(msg.message)
        //console.log(output)
        return output
    }

    getSearchWords=()=>{
       
        if(this.state.searchWord)
        {
            
            if(this.state.searchType === "basic")
            {               
                let output = ""
                this.state.searchWord.forEach((word,index) => {
                    if(index === 0)
                    {
                        output = word.keyword
                    }
                    else
                    {
                        output = output+" "+word.boolean+" "+word.keyword 
                    }
                });

                return  <div className="ResultListInfoArea">
                        <div className="ResultListInfoAreaRow">
                            <div className="ResultListInfoAreaRowTitle">{"搜尋關鍵字 : "}</div>
                            <div className="ResultListInfoAreaRowContent">{output}</div>
                        </div>
                        <div className="ResultListInfoAreaRow">
                            <div className="ResultListInfoAreaRowTitle">{"搜尋結果筆數 : "}</div>
                            <div className="ResultListInfoAreaRowContent">{this.state.totalNumber + " 筆"}</div>
                        </div>
                    </div>
                
            }
            else if(this.state.searchType === "advance")
            {
                let output = this.state.searchWord.map((word,index)=>{
                    return <div className="ResultListInfoAreaRowParent">
                        <div className="ResultListInfoAreaRow">
                            <div className="ResultListInfoAreaRowTitle">{"搜尋關鍵字 : "}</div>
                            <div className="ResultListInfoAreaRowContent">{word.keyword}</div>
                        </div>
                        <div className="ResultListInfoAreaRow">
                            <div className="ResultListInfoAreaRowTitle">{"搜尋欄位 : "}</div>
                            <div className="ResultListInfoAreaRowContent">{this.getColumnName(word.columnName)}</div>
                        </div>
                        <div className="ResultListInfoAreaRow">
                            <div className="ResultListInfoAreaRowTitle">{"搜尋模式 : "}</div>
                            <div className="ResultListInfoAreaRowContent">{this.getOperator(word.operator)}</div>
                        </div>
                        <div className="ResultListInfoAreaRow">
                            <div className="ResultListInfoAreaRowTitle">{"搜尋邏輯 : "}</div>
                            <div className="ResultListInfoAreaRowContent">{word.boolean}</div>
                        </div>
                    </div>
                })

                return  <div className="ResultListInfoArea">
                    <div style={{width:"60%"}}>
                        {output}
                    </div>
                    <div className="ResultListInfoAreaRow">
                        <div className="ResultListInfoAreaRowTitle">{"搜尋結果筆數 : "}</div>
                        <div className="ResultListInfoAreaRowContent">{this.state.totalNumber + " 筆"}</div>
                    </div>
                </div>
                

            }
            else
            {             
                return null
            }
        }
        else
        {
            console.log("A2")
            return null
        }
    }

    getColumnName=(name)=>{
        switch (name){
            case "Movie_SysID":
                return "藏品系統號";
            case "Movie_TitleMain":
                return "主要名稱";
            case "Movie_TitleTranslation":
                return "翻譯名稱";
            case "Movie_TitleOther":
                return "其他名稱";
            case "Movie_SubCategoryOne":
                return "長片短片";
            case "Movie_SubCategoryTwo":
                return "種類";
            case "Movie_ProductionDate":
                return "出品日期";
            case "Movie_ProductionLocation":
                return "出品地點";
            case "Movie_ProductionCompany":
                return "出品公司";
            case "Movie_Producer":
                return "出品人";
            case "Movie_DramaContent":
                return "內容大綱";
            case "Movie_Rating":
                return "分級";
            case "Movie_Language":
                return "語言";
            case "Movie_ActorName":
                return "演員";
            case "Movie_RoleName":
                return "腳色名稱";
            case "Movie_StaffName":
                return "工作人員";
            case "Movie_Position":
                return "職稱";
            case "Movie_Company":
                return "公司"
        }
    }

    getOperator=(operator)=>{
        switch(operator){
            case "Like":
                return "包含";
            case "Equal":
                return "等於";
            case "Greater":
                return "大於";
            case "Smaller":
                return "小於";
        }
    }

    createRow=()=>{
        if(this.state.listData && this.state.listData[0])
        {
            let output = this.state.listData.map(row=>{
                return <ResultRow rowData={row} searchWord={this.state.searchWord}/>
            })

            return output
        }
        else
        {
            if(this.state.totalNumber === "")
            {
                return <div>{"資料搜尋中..."}</div>
            }
            else
            {
                return null
            }
        }
    }

    createMetaInfo=()=>{
        if(this.state.metaInfo)
        {
            let tempCount = 0
            let tempArray = Object.keys(this.state.metaInfo)
            tempArray.sort((a, b)=>{
                if(this.state.metaInfo[a][0] && this.state.metaInfo[b][0])
                {
                    if(this.state.metaInfo[a][0].sumCount > this.state.metaInfo[b][0].sumCount)
                    {
                        return -1
                    }
                }
                else if(this.state.metaInfo[b][0] && !this.state.metaInfo[a][0])
                {
                    return -1
                }
                else if(this.state.metaInfo[a][0] && !this.state.metaInfo[b][0])
                {
                    return -1
                }
                else
                {
                    return 0 
                }
            })

            console.log(tempArray)
            

            let output = tempArray.map(field=>{
                if(this.state.metaInfo[field].length>0)
                {
                    console.log(this.state.metaInfo[field])
                    return (
                        <div className={"MetaInfoArea"}>
                            <div className={"MetaInfoTitle"}>
                                {this.transTitle(field)}
                            </div>
                            <div>
                                {this.state.metaInfo[field].map(row=>{
                                    return (this.createMetaRow(field, row))
                                })}
                            </div>
                        </div>
                    )
                }
                else
                {
                    return <div></div>
                }
            })
          
            return output
        }
        else
        {      
            return <div>{"產生後設資料中..."}</div>       
        }
    }

    transTitle=(field)=>{
        switch(field){
            case "ActorName":
                return "相關演出人員"
            case "Category":
                return "相關分類"
            case "Producer":
                return "相關出品人"
            case "ProductionCompany":
                return "相關出品公司"
            case "ProductionDate":
                return "相關出品日期"
            case "ProductionLocation":
                return "相關出品地點"
            case "StaffCompany":
                return "相關參與製作公司"
            case "StaffName":
                return "相關工作人員"
        }
    }

    createMetaRow=(type, row)=>{
        switch(type){
            case "ActorName":
                return (
                    <div className={"MetaInfoRow"} onClick={()=>this.rowClicked(type, row)}>
                        <div className={"MetaInfoContent"}>{row.Movie_ActorName+" ("+row.Count+")"}</div>
                    </div>
                )
            case "Category":
                return (
                    <div className={"MetaInfoRow"} onClick={()=>this.rowClicked(type, row)}>
                        <div className={"MetaInfoContent"}>{row.Movie_SubCategoryOne+" / "+row.Movie_SubCategoryTwo+" ("+row.Count+")"}</div>
                    </div>
                )
            case "Producer":
                return (
                    <div className={"MetaInfoRow"} onClick={()=>this.rowClicked(type, row)}>
                        <div className={"MetaInfoContent"}>{row.Movie_Producer+" ("+row.Count+")"}</div>
                    </div>
                )
            case "ProductionCompany":
                return (
                    <div className={"MetaInfoRow"} onClick={()=>this.rowClicked(type, row)}>
                        <div className={"MetaInfoContent"}>{row.Movie_ProductionCompany+" ("+row.Count+")"}</div>
                    </div>
                )
            case "ProductionDate":
                return (
                    <div className={"MetaInfoRow"} onClick={()=>this.rowClicked(type, row)}>
                        <div className={"MetaInfoContent"}>{row.Movie_ProductionDate+" ("+row.Count+")"}</div>
                    </div>
                )
            case "ProductionLocation":
                return (
                    <div className={"MetaInfoRow"} onClick={()=>this.rowClicked(type, row)}>
                        <div className={"MetaInfoContent"}>{row.Movie_ProductionLocation+" ("+row.Count+")"}</div>
                    </div>
                )
            case "StaffCompany":
                return (
                    <div className={"MetaInfoRow"} onClick={()=>this.rowClicked(type, row)}>
                        <div className={"MetaInfoContent"}>{row.Movie_Company+" / "+row.Movie_Position+" ("+row.Count+")"}</div>
                    </div>
                )
            case "StaffName":
                return (
                    <div className={"MetaInfoRow"} onClick={()=>this.rowClicked(type, row)}>
                        <div className={"MetaInfoContent"}>{row.Movie_StaffName+" / "+row.Movie_Position+" ("+row.Count+")"}</div>
                    </div>
                )
        }
    }

    rowClicked=(type, row)=>{
        console.log("type : ", type)
        console.log(row)
    }

    render(){

        return(
            <div className="ResultListMainBody">  
                <div className="ResultListLeftArea">
                    {this.createMetaInfo()}
                </div>
                <div className="ResultListRightArea">
                    {this.getSearchWords()}                     
                    {this.createRow()} 
                </div>
            </div>
        )
    }
}

export default ResultListMainBody