import React, { Component } from 'react';
import {serverIP} from '../IPAdressModule'
import './ResultListMainBody.css';
import IPAddress from '../IPAddress'
import ResultRow from './ResultRow'
import PageSelectFunctionArea from './PageSelectFunctionArea'
import Footer from '../Footer/Footer'

class ResultListMainBody extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchWord:null,
            listData:null,
            limitNumber:null,
            pageNumber:null,
            totalNumber:"",
            orderType:"ASC",
            orderColumn:"Movie_TitleMain",
            searchType:"basic",
            searchColumn:"All",
            metaInfo:null,
            metaSelectedInfo:null,
            metaCategoryToggle:{
                ActorName:false,
                Category:false,
                Producer:false,
                ProductionCompany:false,
                ProductionDate:false,
                ProductionLocation:false,
                StaffCompany:false,
                StaffName:false
            },
            ipAddress:null
        }
    }

    
    componentDidMount(){
        this.initialIPAddress()
        this.initialState()   
        
    }

    componentDidUpdate(prevProps,prevState){
        console.log("ResultListMainBody Update...")
        if(prevProps.match.params.searchType !== this.props.match.params.searchType || prevProps.match.params.query !== this.props.match.params.query || prevProps.match.params.limit !== this.props.match.params.limit || prevProps.match.params.page !== this.props.match.params.page)
        {
            console.log("A1")
            if(this.state.metaSelectedInfo)
            {
                console.log("A1-1")
                if(prevProps.match.params.searchType !== this.props.match.params.searchType || prevProps.match.params.query !== this.props.match.params.query)
                {
                    console.log("A1-1-1")
                    this.initialState()
                }
            }
            else
            {
                this.initialState()             
            }
        }
    }

    componentWillUnmount(){
       
    }

    initialStateTemp=()=>{
        let limitNumber = this.props.match.params.limit
        let pageNumber = this.props.match.params.page
        
        this.setState({
            searchType:this.props.match.params.searchType,
            limitNumber:limitNumber,
            pageNumber:pageNumber,
            listData:null,
            metaInfo:null,
            totalNumber:"",
        },()=>{
            this.getRecord()
        })
    }

    initialState=()=>{
        let limitNumber = this.props.match.params.limit
        let pageNumber = this.props.match.params.page
        console.log(this.props.match.params.query)
        let query = JSON.parse(decodeURI(this.props.match.params.query))

        console.log(query)
        this.setState({
            searchType:this.props.match.params.searchType,
            limitNumber:limitNumber,
            pageNumber:pageNumber,
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

                this.getMetaByBasicQuery()
            }
            else
            {
                console.log("A1-2")
                console.log(this.state.searchWord)
                
                this.getRecordByBasicSearch()

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

    getRecordByBasicAndMetaSearch = async(metaInfo)=>{
        console.log("proceed getRecordByBasicAndMetaSearch...")
        
        let limitNumber = this.state.limitNumber
        let pageNumber = this.state.pageNumber
        let orderType = this.state.orderType
        let orderColumn = this.state.orderColumn
        let queryWords = encodeURI(JSON.stringify(this.state.searchWord))
        let encodeMetaInfo = encodeURI(JSON.stringify(metaInfo))
        console.log("limitNumber : ",limitNumber)
        console.log("pageNumber : ",pageNumber)
        console.log("orderType : ",orderType)
        console.log("orderColumn : ",orderColumn)
        console.log("queryWords : ",queryWords)

        


        let msg = await fetch(serverIP+'/api/movie/basicQuery/frontend/metaAndSearch/limit/'+limitNumber+'/pageNumber/'+pageNumber+'/orderColumn/'+orderColumn+'/orderType/'+orderType+'/query/'+queryWords+'/metaInfo/'+encodeMetaInfo)

        let output = await msg.json()
        if(msg.status !== 200) throw Error(msg.message)
        //console.log(output)
        return output
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

    getRecordByAdvanceAndMetaSearch = async(metaInfo)=>{
        console.log("getRecordByAdvanceAndMetaSearch...")
        let limitNumber = this.state.limitNumber
        let pageNumber = this.state.pageNumber
        let orderType = this.state.orderType
        let orderColumn = this.state.orderColumn
        let objA={}
        let objB={}

        let tempArray = [...this.state.searchWord]

        switch(metaInfo.type){
            case "ActorName":
                objA = {
                    boolean:"AND",
                    columnName:"Movie_ActorName",
                    keyword:metaInfo.keywordA,
                    operator:"Equal"
                }

                tempArray.push(objA)
                break;
            case "Category":
                objA = {
                    boolean:"AND",
                    columnName:"Movie_SubCategoryOne",
                    keyword:metaInfo.keywordA,
                    operator:"Equal"
                }

                objB = {
                    boolean:"AND",
                    columnName:"Movie_SubCategoryTwo",
                    keyword:metaInfo.keywordB,
                    operator:"Equal"
                }
                tempArray.push(objA, objB)
                break;
            case "Producer":
                objA = {
                    boolean:"AND",
                    columnName:"Movie_Producer",
                    keyword:metaInfo.keywordA,
                    operator:"Equal"
                }

                tempArray.push(objA)
                break;                
            case "ProductionCompany":
                objA = {
                    boolean:"AND",
                    columnName:"Movie_ProductionCompany",
                    keyword:metaInfo.keywordA,
                    operator:"Equal"
                }

                tempArray.push(objA)
                break;
            case "ProductionDate":
                objA = {
                    boolean:"AND",
                    columnName:"Movie_ProductionDate",
                    keyword:metaInfo.keywordA,
                    operator:"Equal"
                }

                tempArray.push(objA)
                break;
            case "ProductionLocation":
                objA = {
                    boolean:"AND",
                    columnName:"Movie_ProductionLocation",
                    keyword:metaInfo.keywordA,
                    operator:"Equal"
                }

                tempArray.push(objA)
                break;
            case "StaffCompany":
                objA = {
                    boolean:"AND",
                    columnName:"Movie_Company",
                    keyword:metaInfo.keywordA,
                    operator:"Equal"
                }

                objB = {
                    boolean:"AND",
                    columnName:"Movie_Position",
                    keyword:metaInfo.keywordB,
                    operator:"Equal"
                }
                tempArray.push(objA, objB)
                break;
            case "StaffName":
                objA = {
                    boolean:"AND",
                    columnName:"Movie_StaffName",
                    keyword:metaInfo.keywordA,
                    operator:"Equal"
                }

                objB = {
                    boolean:"AND",
                    columnName:"Movie_Position",
                    keyword:metaInfo.keywordB,
                    operator:"Equal"
                }
                tempArray.push(objA, objB)
                break;
        }
        
        let queryWords = encodeURI(JSON.stringify(tempArray))
        
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
             
            if(this.state.searchType === "basic")
            { 
                let output = ""
                if(this.state.searchWord)      
                {
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
                }
                else
                {
                    output = "無關鍵字，搜尋全部資料"
                }  
                
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
            else if(this.state.searchType === "basicMeta")
            {             
                let output = ""
                if(this.state.searchWord)      
                {
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
                }
                else
                {
                    output = "無關鍵字，搜尋全部資料"
                }  
                
                return  <div className="ResultListInfoContainerArea">
                    <div className="ResultListInfoArea">
                        <div className="ResultListInfoAreaRow">
                            <div className="ResultListInfoAreaRowTitle">{"搜尋關鍵字 : "}</div>
                            <div className="ResultListInfoAreaRowContent">{output}</div>
                        </div>
                                                
                    </div>
                    {this.getMetaSearchInfoView()}
                    <div className="ResultListInfoAreaRow">
                        <div className="ResultListInfoAreaRowTitle">{"搜尋結果筆數 : "}</div>
                        <div className="ResultListInfoAreaRowContent">{this.state.totalNumber + " 筆"}</div>
                    </div>
                </div>
            }
            else if(this.state.searchType === "advanceMeta")
            {     
                let objA
                let objB        
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

                if(this.state.metaSelectedInfo)
                {
                    switch(this.state.metaSelectedInfo.type){
                        case "ActorName":
                            objA = <div className="ResultListInfoAreaRowParent">
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋關鍵字 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{this.state.metaSelectedInfo.keywordA ? this.state.metaSelectedInfo.keywordA.replace('@','/'):null}</div>
                                </div>
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋欄位 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{this.getColumnName("Movie_ActorName")}</div>
                                </div>
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋模式 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{"等於"}</div>
                                </div>
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋邏輯 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{"AND"}</div>
                                </div>
                            </div>

                            output.push(objA)
                            break;
                            
                        case "Category":
                            objA = <div className="ResultListInfoAreaRowParent">
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋關鍵字 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{this.state.metaSelectedInfo.keywordA ? this.state.metaSelectedInfo.keywordA.replace('@','/'):null}</div>
                                </div>
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋欄位 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{this.getColumnName("Movie_SubCategoryOne")}</div>
                                </div>
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋模式 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{"等於"}</div>
                                </div>
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋邏輯 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{"AND"}</div>
                                </div>
                            </div>

                            objB = <div className="ResultListInfoAreaRowParent">
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋關鍵字 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{this.state.metaSelectedInfo.keywordB ? this.state.metaSelectedInfo.keywordB.replace('@','/'):null}</div>
                                </div>
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋欄位 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{this.getColumnName("Movie_SubCategoryTwo")}</div>
                                </div>
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋模式 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{"等於"}</div>
                                </div>
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋邏輯 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{"AND"}</div>
                                </div>
                            </div>

                            output.push(objA, objB)
                            break;
                        case "Producer":
                            objA = <div className="ResultListInfoAreaRowParent">
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋關鍵字 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{this.state.metaSelectedInfo.keywordA ? this.state.metaSelectedInfo.keywordA.replace('@','/'):null}</div>
                                </div>
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋欄位 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{this.getColumnName("Movie_Producer")}</div>
                                </div>
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋模式 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{"等於"}</div>
                                </div>
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋邏輯 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{"AND"}</div>
                                </div>
                            </div>

                            output.push(objA)
                            break;
                        case "ProductionCompany":
                            objA = <div className="ResultListInfoAreaRowParent">
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋關鍵字 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{this.state.metaSelectedInfo.keywordA ? this.state.metaSelectedInfo.keywordA.replace('@','/'):null}</div>
                                </div>
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋欄位 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{this.getColumnName("Movie_ProductionCompany")}</div>
                                </div>
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋模式 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{"等於"}</div>
                                </div>
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋邏輯 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{"AND"}</div>
                                </div>
                            </div>

                            output.push(objA)
                            break;
                        case "ProductionDate":
                            objA = <div className="ResultListInfoAreaRowParent">
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋關鍵字 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{this.state.metaSelectedInfo.keywordA ? this.state.metaSelectedInfo.keywordA.replace('@','/'):null}</div>
                                </div>
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋欄位 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{this.getColumnName("Movie_ProductionDate")}</div>
                                </div>
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋模式 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{"等於"}</div>
                                </div>
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋邏輯 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{"AND"}</div>
                                </div>
                            </div>

                            output.push(objA)
                            break;
                        case "ProductionLocation":
                            objA = <div className="ResultListInfoAreaRowParent">
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋關鍵字 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{this.state.metaSelectedInfo.keywordA ? this.state.metaSelectedInfo.keywordA.replace('@','/'):null}</div>
                                </div>
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋欄位 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{this.getColumnName("Movie_ProductionLocation")}</div>
                                </div>
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋模式 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{"等於"}</div>
                                </div>
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋邏輯 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{"AND"}</div>
                                </div>
                            </div>

                            output.push(objA)
                            break;
                        case "StaffCompany":
                            objA = <div className="ResultListInfoAreaRowParent">
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋關鍵字 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{this.state.metaSelectedInfo.keywordA ? this.state.metaSelectedInfo.keywordA.replace('@','/'):null}</div>
                                </div>
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋欄位 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{this.getColumnName("Movie_Company")}</div>
                                </div>
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋模式 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{"等於"}</div>
                                </div>
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋邏輯 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{"AND"}</div>
                                </div>
                            </div>

                            objB = <div className="ResultListInfoAreaRowParent">
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋關鍵字 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{this.state.metaSelectedInfo.keywordB ? this.state.metaSelectedInfo.keywordB.replace('@','/'):null}</div>
                                </div>
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋欄位 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{this.getColumnName("Movie_Position")}</div>
                                </div>
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋模式 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{"等於"}</div>
                                </div>
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋邏輯 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{"AND"}</div>
                                </div>
                            </div>

                            output.push(objA, objB)
                            break;
                        case "StaffName":
                            objA = <div className="ResultListInfoAreaRowParent">
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋關鍵字 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{this.state.metaSelectedInfo.keywordA ? this.state.metaSelectedInfo.keywordA.replace('@','/'):null}</div>
                                </div>
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋欄位 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{this.getColumnName("Movie_StaffName")}</div>
                                </div>
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋模式 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{"等於"}</div>
                                </div>
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋邏輯 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{"AND"}</div>
                                </div>
                            </div>

                            objB = <div className="ResultListInfoAreaRowParent">
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋關鍵字 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{this.state.metaSelectedInfo.keywordB ? this.state.metaSelectedInfo.keywordB.replace('@','/'):null}</div>
                                </div>
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋欄位 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{this.getColumnName("Movie_Position")}</div>
                                </div>
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋模式 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{"等於"}</div>
                                </div>
                                <div className="ResultListInfoAreaRow">
                                    <div className="ResultListInfoAreaRowTitle">{"搜尋邏輯 : "}</div>
                                    <div className="ResultListInfoAreaRowContent">{"AND"}</div>
                                </div>
                            </div>

                            output.push(objA, objB)
                            break;
                    }           
                }



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

    }

    getMetaSearchInfoView=()=>{
        if(this.state.metaSelectedInfo)
        {
            switch(this.state.metaSelectedInfo.type){
                case "ActorName":
                    return <div> 
                        <div className="ResultListInfoAreaRowParent">
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋關鍵字 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{this.state.metaSelectedInfo.keywordA ? this.state.metaSelectedInfo.keywordA.replace('@','/'):null}</div>
                            </div>
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋欄位 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{"演員"}</div>
                            </div>
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋模式 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{"等於"}</div>
                            </div>
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋邏輯 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{"AND"}</div>
                            </div>
                        </div>
                    </div>
                case "Category":
                    return <div> 
                        <div className="ResultListInfoAreaRowParent">
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋關鍵字 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{this.state.metaSelectedInfo.keywordA ? this.state.metaSelectedInfo.keywordA.replace('@','/'):null}</div>
                            </div>
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋欄位 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{"長片短片"}</div>
                            </div>
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋模式 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{"等於"}</div>
                            </div>
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋邏輯 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{"AND"}</div>
                            </div>
                        </div>
                        <div className="ResultListInfoAreaRowParent">
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋關鍵字 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{this.state.metaSelectedInfo.keywordB ? this.state.metaSelectedInfo.keywordB.replace('@','/'):null}</div>
                            </div>
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋欄位 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{"種類"}</div>
                            </div>
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋模式 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{"等於"}</div>
                            </div>
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋邏輯 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{"AND"}</div>
                            </div>
                        </div>
                    </div>
                case "Producer":
                    return <div> 
                        <div className="ResultListInfoAreaRowParent">
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋關鍵字 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{this.state.metaSelectedInfo.keywordA ? this.state.metaSelectedInfo.keywordA.replace('@','/'):null}</div>
                            </div>
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋欄位 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{"出品人"}</div>
                            </div>
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋模式 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{"等於"}</div>
                            </div>
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋邏輯 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{"AND"}</div>
                            </div>
                        </div>
                    </div>
                case "ProductionCompany":
                    return <div> 
                        <div className="ResultListInfoAreaRowParent">
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋關鍵字 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{this.state.metaSelectedInfo.keywordA ? this.state.metaSelectedInfo.keywordA.replace('@','/'):null}</div>
                            </div>
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋欄位 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{"出品公司"}</div>
                            </div>
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋模式 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{"等於"}</div>
                            </div>
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋邏輯 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{"AND"}</div>
                            </div>
                        </div>
                    </div>
                case "ProductionDate":
                    return <div> 
                        <div className="ResultListInfoAreaRowParent">
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋關鍵字 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{this.state.metaSelectedInfo.keywordA ? this.state.metaSelectedInfo.keywordA.replace('@','/'):null}</div>
                            </div>
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋欄位 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{"出品日期"}</div>
                            </div>
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋模式 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{"等於"}</div>
                            </div>
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋邏輯 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{"AND"}</div>
                            </div>
                        </div>
                    </div>
                case "ProductionLocation":
                    return <div> 
                        <div className="ResultListInfoAreaRowParent">
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋關鍵字 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{this.state.metaSelectedInfo.keywordA ? this.state.metaSelectedInfo.keywordA.replace('@','/'):null}</div>
                            </div>
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋欄位 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{"出品地點"}</div>
                            </div>
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋模式 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{"等於"}</div>
                            </div>
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋邏輯 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{"AND"}</div>
                            </div>
                        </div>
                    </div>
                case "StaffCompany":
                    return <div> 
                        <div className="ResultListInfoAreaRowParent">
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋關鍵字 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{this.state.metaSelectedInfo.keywordA ? this.state.metaSelectedInfo.keywordA.replace('@','/'):null}</div>
                            </div>
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋欄位 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{"公司"}</div>
                            </div>
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋模式 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{"等於"}</div>
                            </div>
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋邏輯 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{"AND"}</div>
                            </div>
                        </div>
                        <div className="ResultListInfoAreaRowParent">
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋關鍵字 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{this.state.metaSelectedInfo.keywordB ? this.state.metaSelectedInfo.keywordB.replace('@','/'):null}</div>
                            </div>
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋欄位 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{"職稱"}</div>
                            </div>
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋模式 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{"等於"}</div>
                            </div>
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋邏輯 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{"AND"}</div>
                            </div>
                        </div>
                    </div>
                case "StaffName":
                    return <div> 
                        <div className="ResultListInfoAreaRowParent">
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋關鍵字 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{this.state.metaSelectedInfo.keywordA ? this.state.metaSelectedInfo.keywordA.replace('@','/'):null}</div>
                            </div>
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋欄位 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{"工作人員"}</div>
                            </div>
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋模式 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{"等於"}</div>
                            </div>
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋邏輯 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{"AND"}</div>
                            </div>
                        </div>
                        <div className="ResultListInfoAreaRowParent">
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋關鍵字 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{this.state.metaSelectedInfo.keywordB ? this.state.metaSelectedInfo.keywordB.replace('@','/'):null}</div>
                            </div>
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋欄位 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{"職稱"}</div>
                            </div>
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋模式 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{"等於"}</div>
                            </div>
                            <div className="ResultListInfoAreaRow">
                                <div className="ResultListInfoAreaRowTitle">{"搜尋邏輯 : "}</div>
                                <div className="ResultListInfoAreaRowContent">{"AND"}</div>
                            </div>
                        </div>
                    </div>
            }

        }
        else
        {
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
            let output = this.state.listData.map((row,index)=>{
                return <ResultRow rowIndex={1+index+(this.state.limitNumber*(this.state.pageNumber-1))} rowData={row} searchWord={this.state.searchWord} getSelectedRow={this.getSelectedRow}/>
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
                        <div className={this.identifiedMetaAreaSelectedOrNot(field)}>
                            <div className={"MetaInfoTitle"} onClick={()=>this.toggleMetaCatogory(field)}>
                                {this.transTitle(field)}
                            </div>
                            {
                                this.state.metaCategoryToggle[field] ?
                                <div>
                                    {this.state.metaInfo[field].map((row,index)=>{
                                        return (this.createMetaRow(field, row, index, true))
                                    })}
                                </div>
                                :
                                <div>
                                    {this.state.metaInfo[field].map((row,index)=>{
                                        return (this.createMetaRow(field, row, index, false))
                                    })}
                                </div>                       
                            }                     
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

    createMetaRow=(type, row, index, show)=>{
        switch(type){
            case "ActorName":
                return (
                    <div className={this.identifiedMetaRow(type, index, show)} onClick={()=>this.metaRowClicked(type, row.Movie_ActorName, "", index)}>
                        {show ? <div className={"MetaInfoContent"}>{row.Movie_ActorName+" ("+row.Count+")"}</div> : null }
                    </div>
                )
            case "Category":
                return (
                    <div className={this.identifiedMetaRow(type, index, show)} onClick={()=>this.metaRowClicked(type, row.Movie_SubCategoryOne, row.Movie_SubCategoryTwo, index)}>
                        {show ? <div className={"MetaInfoContent"}>{row.Movie_SubCategoryOne+" / "+row.Movie_SubCategoryTwo+" ("+row.Count+")"}</div> : null }
                    </div>
                )
            case "Producer":
                return (
                    <div className={this.identifiedMetaRow(type, index, show)} onClick={()=>this.metaRowClicked(type, row.Movie_Producer, "", index)}>
                        {show ? <div className={"MetaInfoContent"}>{row.Movie_Producer+" ("+row.Count+")"}</div> : null }
                    </div>
                )
            case "ProductionCompany":
                return (
                    <div className={this.identifiedMetaRow(type, index, show)} onClick={()=>this.metaRowClicked(type, row.Movie_ProductionCompany, "", index)}>
                        {show ? <div className={"MetaInfoContent"}>{row.Movie_ProductionCompany+" ("+row.Count+")"}</div> : null }
                    </div>
                )
            case "ProductionDate":
                return (
                    <div className={this.identifiedMetaRow(type, index, show)} onClick={()=>this.metaRowClicked(type, row.Movie_ProductionDate, "", index)}>
                        {show ? <div className={"MetaInfoContent"}>{row.Movie_ProductionDate+" ("+row.Count+")"}</div> : null }
                    </div>
                )
            case "ProductionLocation":
                return (
                    <div className={this.identifiedMetaRow(type, index, show)} onClick={()=>this.metaRowClicked(type, row.Movie_ProductionLocation, "", index)}>
                        {show ? <div className={"MetaInfoContent"}>{row.Movie_ProductionLocation+" ("+row.Count+")"}</div> : null}
                    </div>
                )
            case "StaffCompany":
                return (
                    <div className={this.identifiedMetaRow(type, index, show)} onClick={()=>this.metaRowClicked(type, row.Movie_Company, row.Movie_Position, index)}>
                        {show ? <div className={"MetaInfoContent"}>{row.Movie_Company+" / "+row.Movie_Position+" ("+row.Count+")"}</div> : null}
                    </div>
                )
            case "StaffName":
                return (
                    <div className={this.identifiedMetaRow(type, index, show)} onClick={()=>this.metaRowClicked(type, row.Movie_StaffName, row.Movie_Position, index)}>
                        {show ? <div className={"MetaInfoContent"}>{row.Movie_StaffName+" / "+row.Movie_Position+" ("+row.Count+")"}</div> : null}
                    </div>
                )
        }
    }

    identifiedMetaRow=(type, index, show)=>{

        if(show)
        {
            if(this.state.metaSelectedInfo)
            {
                if(this.state.metaSelectedInfo.type === type && this.state.metaSelectedInfo.index === index)
                {
                    return "MetaInfoRow Selected"
                }
                else
                {
                    return "MetaInfoRow Expand"
                }
            }
            else
            {
                return "MetaInfoRow Expand"
            }
        }
        else
        {
            return "MetaInfoRow"
        }    
    }

    identifiedMetaAreaSelectedOrNot=(field)=>{
        if(this.state.metaCategoryToggle[field])
        {
            return "MetaInfoArea Expand"
        }
        else
        {
            return "MetaInfoArea"
        }
    }

    toggleMetaCatogory=(field)=>{      
        let tempObj = this.state.metaCategoryToggle
        tempObj[field] = !this.state.metaCategoryToggle[field]
        this.setState({
            metaCategoryToggle:tempObj
        })
    }

    

    metaRowClicked=(type, keywordA, keywordB, index)=>{
        console.log("type : ", type)
        console.log(keywordA, keywordB)

        let outputKeywordB = 'null'

        if(keywordB || keywordB !== "")
        {
            outputKeywordB = keywordB
        }

        this.setState({
            pageNumber:1,
            limitNumber:20
        },()=>{
            if(this.state.searchType && (this.state.searchType === "basic" || this.state.searchType === "basicMeta"))
            {
                let outputObj = {
                    type : type,
                    keywordA : keywordA ? keywordA.replace('/','@'):null,
                    keywordB : keywordB ? keywordB.replace('/','@'):null,
                    index:index
                }
                this.getRecordByBasicAndMetaSearch(outputObj)
                .then(res=>{
                    this.setState({
                        searchType:"basicMeta",
                        showWarningDialog:false,
                        listData:res,
                        totalNumber:res[0].Movie_TotalCount,
                        metaSelectedInfo:outputObj
                    })   
                })
            }
            else if(this.state.searchType && (this.state.searchType === "advance" || this.state.searchType === "advanceMeta"))
            {
                let outputObj = {
                    type : type,
                    keywordA : keywordA ? keywordA.replace('/','@'):null,
                    keywordB : keywordB ? keywordB.replace('/','@'):null,
                    index:index
                }
                this.getRecordByAdvanceAndMetaSearch(outputObj)
                .then(res=>{
                    this.setState({
                        searchType:"advanceMeta",
                        showWarningDialog:false,
                        listData:res,
                        totalNumber:res[0].Movie_TotalCount,
                        metaSelectedInfo:outputObj
                    })   
                })
            }

        })
  

        
    }
    
    getSelectedRow=(sysID)=>{
        console.log("getSelectedRow")
        console.log(sysID)
        this.props.history.push("/Movie/Workinfo/"+sysID)
    }


    getPageLimitInfo=(number)=>{
        
        if(this.state.metaSelectedInfo)
        {
            this.setState({
                limitNumber:number
            },()=>{
                if(this.state.searchType && (this.state.searchType === "basic" || this.state.searchType === "basicMeta"))
                {
                    
                    this.getRecordByBasicAndMetaSearch(this.state.metaSelectedInfo)
                    .then(res=>{
                        this.setState({
                            listData:res
                        })   
                    })
                }
                else if(this.state.searchType && (this.state.searchType === "advance" || this.state.searchType === "advanceMeta"))
                {
                    this.getRecordByAdvanceAndMetaSearch(this.state.metaSelectedInfo)
                    .then(res=>{
                        this.setState({                        
                            listData:res                                   
                        })   
                    })
                }
            })
        }
        else
        {
            let query = encodeURI(JSON.stringify(this.state.searchWord))
            this.props.history.push('/SearchResult/searchType/'+this.state.searchType+'/limit/'+number+'/page/'+this.state.pageNumber+'/query/'+query)
        }
    }

    getPageNumberInfo=(number)=>{

        if(this.state.metaSelectedInfo)
        {
            this.setState({
                pageNumber:number
            },()=>{
                if(this.state.searchType && (this.state.searchType === "basic" || this.state.searchType === "basicMeta"))
                {
                    
                    this.getRecordByBasicAndMetaSearch(this.state.metaSelectedInfo)
                    .then(res=>{
                        this.setState({
                            listData:res
                        })   
                    })
                }
                else if(this.state.searchType && (this.state.searchType === "advance" || this.state.searchType === "advanceMeta"))
                {
                    this.getRecordByAdvanceAndMetaSearch(this.state.metaSelectedInfo)
                    .then(res=>{
                        this.setState({                        
                            listData:res                                   
                        })   
                    })
                }
            })
        }
        else
        {
            let query = encodeURI(JSON.stringify(this.state.searchWord))
            this.props.history.push('/SearchResult/searchType/'+this.state.searchType+'/limit/'+this.state.limitNumber+'/page/'+number+'/query/'+query)
        }
        
        
    }

    
    render(){

        return(
            <div className="ResultListMainBody">  
                <PageSelectFunctionArea getPageLimitInfo={this.getPageLimitInfo} getPageNumberInfo={this.getPageNumberInfo} storedLimitNumber={this.state.limitNumber} storedPageNumber={this.state.pageNumber} storedTotalNumber={this.state.totalNumber}/>
                <div className="ResultListLeftArea">
                    {this.createMetaInfo()}
                </div>
                <div className="ResultListRightArea">
                    {this.getSearchWords()}                     
                    {this.createRow()} 
                    <div style={{"width":"100%", "position":"absolute", "left":"0px"}}>
                        <Footer/>
                    </div>
                </div>             
            </div>
        )
    }
}

export default ResultListMainBody