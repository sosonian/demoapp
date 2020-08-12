import React from 'react'
import './ResultRow.css'
import HightlightKeywordCell from '../Function/HighlightKeywordCell'

export default function ResultRow(props) {
    return(
        <div className={"ResultRow"}>
            <div>
                <div className={"MovieMainTitle"}>{props.rowData ? <HightlightKeywordCell text={props.rowData.Movie_TitleMain} keywords={props.searchWord}/> :null}</div>
            </div>
            <div>
                <div className={"MovieDramaContain"}>{props.rowData ? <HightlightKeywordCell text={props.rowData.Movie_DramaContent} keywords={props.searchWord}/>:null}</div>
            </div>
        </div>
    )
}