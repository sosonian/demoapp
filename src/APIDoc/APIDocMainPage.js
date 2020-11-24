import React, { Component } from 'react';
import './APIDocMainPage.css'
import {serverIP} from '../IPAdressModule'
import {APIDoc} from './APIDoc'

class APIDocMainPage extends Component {
    constructor(props){
        super(props)
        this.state={
            
        }
        
    }

    componentDidMount(){
       
    }

    getParagraph=()=>{
        let output = APIDoc.paragraph.map(paragraph=>{
            return(
            <div className={"APIDocRightAreaMainOption"}>
                <div className={"APIDocRightAreaMainOptionTitle"}>{paragraph.number+" "+paragraph.pTitle}</div>
                <div className={"APIDocRightAreaMainOptionText"}>{paragraph.pText}</div>
                {this.getSubParagraph(paragraph.subParagraph)}
            </div>
            )
        })

        return output
    }

    getSubParagraph=(subParagraphs)=>{
        let output = subParagraphs.map(sParagraph=>{
            return(
            <div className={"APIDocRightAreaMinorOption"}>
                <div className={"APIDocRightAreaMinorOptionTitle"}>{sParagraph.number+" "+sParagraph.spTitle}</div>
                <div className={"APIDocRightAreaMinorOptionText"}>{sParagraph.spText}</div>
                <div className={"APIDocAddressLine"}>{serverIP+sParagraph.spUrl}</div>
                {this.getSubParagraphInputTable(sParagraph.inputTableText, sParagraph.inputTable)}
                {this.getSubParagraphOutputTable(sParagraph.outputTableText, sParagraph.outputTable)}
            </div>
            )
        })

        return output
    }


    getSubParagraphInputTable=(text,table)=>{
        let output =  <div className={"APIDocTable"}>
            <div className={"APIDocRightAreaTableTitle"}>輸入參數說明</div>
            <div className={"APIDocRightAreaTableText"}>{text}</div>
            <table style={{"width":"100%","borderSpacing":"0px","border": "1px solid rgb(185, 185, 185)"}}>
                <thead>
                    <tr>
                        <th className={"APIDocTableHeadTH"} style={{"width":"30%"}}>參數</th>
                        <th className={"APIDocTableHeadTH"} style={{"width":"10%"}}>類型</th>
                        <th className={"APIDocTableHeadTH"} style={{"width":"60%"}}>說明</th>
                    </tr>
                </thead>
                <tbody>
                    {this.getTableRow(table)}
                </tbody>
            </table>

        </div>

        return output
    }


    getSubParagraphOutputTable=(text,table)=>{
        let output =  <div className={"APIDocTable"}>
            <div className={"APIDocRightAreaTableTitle"}>API呼叫成功 Success 200 回傳訊息說明</div>
            <div className={"APIDocRightAreaTableText"}>{text}</div>
            <table style={{"width":"100%","borderSpacing":"0px","border": "1px solid rgb(185, 185, 185)"}}>
                <thead>
                    <tr>
                        <th className={"APIDocTableHeadTH"} style={{"width":"30%"}}>物件屬性 (資料欄位)</th>
                        <th className={"APIDocTableHeadTH"} style={{"width":"10%"}}>類型</th>
                        <th className={"APIDocTableHeadTH"} style={{"width":"60%"}}>說明</th>
                    </tr>
                </thead>
                <tbody>
                    {this.getTableRow(table)}
                </tbody>
            </table>

        </div>

        return output
    }


    getTableRow=(table)=>{
        let output = table.map(row=>{
            return(
            <tr>
                <td className={"APIDocTableBodyTD"}>{row.iTitle}</td>
                <td className={"APIDocTableBodyTD"}>{row.iType}</td>
                <td className={"APIDocTableBodyTD"} dangerouslySetInnerHTML={{__html:row.iText}}/>
            </tr>
            )
        })

        return output
    }


   
    render(){
        return(
            <div className={"APIDocMainPage"} >
                <div style={{"display":"flex","flexDirection":"row"}}>
                    <div className={"APIDocLeftArea"}>
                        <div className={"APIDocLeftAreaMainOption"}>
                            <div className={"APIDocLeftAreaMinorOption"}></div>
                            <div className={"APIDocLeftAreaMinorOption"}></div>
                        </div>
                        <div className={"APIDocLeftAreaMainOption"}>
                            <div className={"APIDocLeftAreaMinorOption"}></div>
                            <div className={"APIDocLeftAreaMinorOption"}></div>
                        </div>
                        <div className={"APIDocLeftAreaMainOption"}>
                            <div className={"APIDocLeftAreaMinorOption"}></div>
                            <div className={"APIDocLeftAreaMinorOption"}></div>
                        </div>
                    </div>
                    <div className={"APIDocRightArea"}>
                        <div className={"APIDocMainTitle"}>{APIDoc.mainTitle}</div>
                        <div className={"APIDocText"}>{APIDoc.mainText}</div>
                        {this.getParagraph()}
                    </div>
                </div>                   
            </div>
             
        )
    }
}

export default APIDocMainPage