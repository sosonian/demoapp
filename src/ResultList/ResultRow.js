import React from 'react'
import './ResultRow.css'
import HightlightKeywordCell from '../Function/HighlightKeywordCell'

export default function ResultRow(props) {
    const movieResultRowClick=(e,sysID)=>{
        console.log("movieResultRowClick")
        console.log(sysID)
        props.getSelectedRow(sysID)
    }

    const productionInfo=()=>{
        let productionDate = props.rowData.Movie_ProductionDate.replace(/\s/g,"")
        let productionLocation = props.rowData.Movie_ProductionLocation.replace(/\s/g,"")

        if(productionDate !== "" && productionLocation !== "")
        {
            return <HightlightKeywordCell text={ "( "+props.rowData.Movie_ProductionDate+"  "+props.rowData.Movie_ProductionLocation+" )"}/>
        }
        else if(productionDate !== "" && productionLocation == "")
        {
            return <HightlightKeywordCell text={ "( "+props.rowData.Movie_ProductionDate+" )"}/>
        }
        else if(productionDate == "" && productionLocation !== "")
        {
            return <HightlightKeywordCell text={ "( "+props.rowData.Movie_ProductionLocation+" )"}/>
        }
        else
        {
            return null
        }

    }

    return(
        <div className={"ResultRow"} onClick={(e)=>movieResultRowClick(e,props.rowData.Movie_SysID)}>
            <div className={"MovieResultRowCheckBoxCell"}>
                <input className={"MovieResultRowCheckBox"} name="selectedToExportTable" type="checkbox" checked={false}/>
                <div className={"MovieResultRowCheckBoxNumber"} >{props.rowIndex ? props.rowIndex+"." : null}</div>
            </div>
            <div className={"MovieResultRowCell"}>
                <div className={"MovieMainTitle"}>{props.rowData ? <HightlightKeywordCell text={props.rowData.Movie_TitleMain ? props.rowData.Movie_TitleMain !== " " ? props.rowData.Movie_TitleMain : props.rowData.Movie_TitleTranslation+" (翻譯片名)"  : props.rowData.Movie_TitleTranslation+" (翻譯片名)"} keywords={props.searchWord}/> :null}</div>
                <div className={"MovieProductionDate"}>{props.rowData ? productionInfo() :null}</div>
            </div>
            <div className={"MovieResultRowCell"}>
                <div className={"MovieDramaContain"}>{props.rowData ? props.rowData.Movie_DramaContent !== "" ? <HightlightKeywordCell text={props.rowData.Movie_DramaContent} keywords={props.searchWord}/> : <div style={{color:"gray"}}>目前無劇情簡介 </div>: null}</div>
            </div>
        </div>
    )
}