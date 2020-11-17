import React, { Component } from 'react';
import './APIDocMainPage.css'

import IPAddress from '../IPAddress'

class APIDocMainPage extends Component {
    constructor(props){
        super(props)
        this.state={
            
        }
        
    }

    componentDidMount(){
       
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
                        <div className={"APIDocMainTitle"}>國家電影及視聽文化中心 藏品資料庫查詢平台 API 使用說明</div>
                        <div className={"APIDocText"}>為擴展國家電影及視聽文化中心(後文簡稱為本中心)所藏之資料之運用，並符合政府資訊公開原則，本藏品資料庫建置有API資料串接介面。以下為各API之說明</div>
                        <div className={"APIDocRightAreaMainOption"}> 
                            <div className={"APIDocRightAreaMainOptionTitle"}>1. 電影權威資料查詢 </div>
                            <div className={"APIDocRightAreaMainOptionText"}> 藏品資料庫查詢平台提供電影權威資料查詢相關 API，有下列2隻： </div>
                            <div className={"APIDocRightAreaMinorOption"}></div>
                            <div className={"APIDocRightAreaMinorOption"}></div>
                        </div>
                        <div className={"APIDocRightAreaMainOption"}>
                            <div className={"APIDocRightAreaMinorOption"}></div>
                            <div className={"APIDocRighttAreaMinorOption"}></div>
                        </div>
                        <div className={"APIDocRightAreaMainOption"}>
                            <div className={"APIDocRightAreaMinorOption"}></div>
                            <div className={"APIDocRightAreaMinorOption"}></div>
                        </div>
                    </div>
                </div>                  
            </div>
             
        )
    }
}

export default APIDocMainPage