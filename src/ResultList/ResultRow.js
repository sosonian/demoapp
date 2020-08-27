import React from 'react'
import './ResultRow.css'
import HightlightKeywordCell from '../Function/HighlightKeywordCell'

export default function ResultRow(props) {
    const movieResultRowClick=(e,sysID)=>{
        console.log("movieResultRowClick")
        console.log(sysID)
        props.getSelectedRow(sysID)
    }

    return(
        <div className={"ResultRow"} onClick={(e)=>movieResultRowClick(e,props.rowData.Movie_SysID)}>
            <div>
                <div className={"MovieMainTitle"}>{props.rowData ? <HightlightKeywordCell text={props.rowData.Movie_TitleMain ? props.rowData.Movie_TitleMain !== " " ? props.rowData.Movie_TitleMain : props.rowData.Movie_TitleTranslation+" (翻譯片名)"  : props.rowData.Movie_TitleTranslation+" (翻譯片名)"} keywords={props.searchWord}/> :null}</div>
            </div>
            <div>
                <div className={"MovieDramaContain"}>{props.rowData ? <HightlightKeywordCell text={props.rowData.Movie_DramaContent} keywords={props.searchWord}/>:null}</div>
            </div>
        </div>
    )
}