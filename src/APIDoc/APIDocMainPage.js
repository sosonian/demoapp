import React, { Component } from 'react';
import './APIDocMainPage.css'
import {serverIP} from '../IPAdressModule'

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
                            <div className={"APIDocRightAreaMinorOption"}>
                                <div className={"APIDocRightAreaMinorOptionTitle"}>1.1 電影權威資料簡目搜尋 API (全欄位)</div>
                                <div className={"APIDocRightAreaMinorOptionText"}> 使用者輸入查詢字詞、每頁筆數、第幾頁、排序欄位、排序方式等參數後，API將以輸入字詞搜尋電影權威資料內所有欄位，搜尋後回傳與此字詞相關的電影簡目資料 </div>
                                <div className={"APIDocAddressLine"}>{serverIP+'/api/movie/basicQuery/frontend/limit/:limitNumber/pageNumber/:pageNumber/orderColumn/:orderColumn/orderType/:orderType/query/:query'}</div>
                                <div className={"APIDocTable"}>
                                    <div className={"APIDocRightAreaTableTitle"}>輸入參數說明</div>
                                    <table style={{"width":"100%","borderSpacing":"0px","border": "1px solid rgb(185, 185, 185)"}}>
                                        <thead>
                                            <tr>
                                                <th className={"APIDocTableHeadTH"} style={{"width":"30%"}}>參數</th>
                                                <th className={"APIDocTableHeadTH"} style={{"width":"10%"}}>類型</th>
                                                <th className={"APIDocTableHeadTH"} style={{"width":"60%"}}>說明</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>limitNumber</td>
                                                <td className={"APIDocTableBodyTD"}>Integer</td>
                                                <td className={"APIDocTableBodyTD"}>回傳每頁筆數：有時搜尋結果會有幾百幾千筆，所以API會分頁回傳。此參數設定回傳結果一頁有幾筆資料。<p>允許數值：此數值為大於0正整數，無上限</p></td>
                                            </tr>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>pageNumber</td>
                                                <td className={"APIDocTableBodyTD"}>Integer</td>
                                                <td className={"APIDocTableBodyTD"}>回傳第幾頁資料：有時搜尋結果會有幾百幾千筆，所以API會分頁回傳。此參數設定要回傳搜尋結果的第幾頁資料。<p>允許數值：此數值為大於0正整數，上限不超過搜尋結果總筆數除以每頁筆數。</p></td>
                                            </tr>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>orderColumn</td>
                                                <td className={"APIDocTableBodyTD"}>String</td>
                                                <td className={"APIDocTableBodyTD"}>排序欄位：此參數為欄位名，設定參數後系統會將搜尋結果依該欄位進行升冪或降冪排序。<p>允許數值：符合之欄位名，<code>Movie_SysID</code> (系統識別號)、<code>Movie_SubCategoryOne</code>(電影種類-長短片)、<code>Movie_SubCategoryTwo</code> (電影種類)、<code>Movie_TitleMain</code> (電影主要名稱)、<code>Movie_TitleTranslation</code> (電影翻譯名稱)、<code>Movie_TitleOther</code> (電影其他名稱)、<code>Movie_ProductionDate</code> (電影出品日期)、<code>Movie_ProductionLocation</code> (電影製作國家)、<code>Movie_ProductionCompany</code> (電影製作公司)、<code>Movie_Producer</code> (電影製作者)、<code>Movie_DramaContent</code> (電影劇情大綱)、<code>Movie_Rating</code> (電影分級)、<code>Movie_Language</code> (電影語言)。</p></td>
                                            </tr>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>orderType</td>
                                                <td className={"APIDocTableBodyTD"}>String</td>
                                                <td className={"APIDocTableBodyTD"}>排序方式：設定搜尋果為升冪或降冪排序 (依orderColumn欄位)。<p>允許數值：<code>asc</code> (升冪)、<code>desc</code>(降冪)</p></td>
                                            </tr>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>query</td>
                                                <td className={"APIDocTableBodyTD"}>ObjectArray</td>
                                                <td className={"APIDocTableBodyTD"}>搜尋字詞：使用者於此設定想要查詢的關鍵字，因本隻API允許複數關鍵字的搜尋，所以回傳為字詞組成的陣列。<p>允許數值：符合下列形式之物件陣列： <code>{`[{boolean:BOOLEAN1,keyword:KEYWORD1},{boolean:BOOLEAN2,keyword:KEYWORD2},...]`}</code>，並且須將此物件陣列經由 <code> URI 加密為字串</code>始傳入API。</p><p>物件屬性：</p><p><code>boolean</code>: 為此關鍵字與其他關鍵字之關係是 <code>AND</code> (交集) 或 <code>OR</code> (聯集)。</p><p><code>keyword</code>: 為使用者想搜尋的關鍵字，一個關鍵字的中文字數勿超過50字。</p></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className={"APIDocTable"}>
                                    <div className={"APIDocRightAreaTableTitle"}>API呼叫成功 Success 200 回傳訊息說明</div>
                                    <div className={"APIDocRightAreaTableText"}>本隻API呼叫成功後，搜尋結果將會以陣列回傳，每筆資料為此陣列中的一個物件，資料的欄位以物件屬性呈現，以下說明各物件屬性 (也就是資料欄位)</div>
                                    <table style={{"width":"100%","borderSpacing":"0px","border": "1px solid rgb(185, 185, 185)"}}>
                                        <thead>
                                            <tr>
                                                <th className={"APIDocTableHeadTH"} style={{"width":"30%"}}>物件屬性 (資料欄位)</th>
                                                <th className={"APIDocTableHeadTH"} style={{"width":"10%"}}>類型</th>
                                                <th className={"APIDocTableHeadTH"} style={{"width":"60%"}}>說明</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>Movie_SysID</td>
                                                <td className={"APIDocTableBodyTD"}>String</td>
                                                <td className={"APIDocTableBodyTD"}>電影系統識別號：該筆電影的系統唯一ID，藉由此ID可再進一步查詢該電影的細節內容、演職員表、相關藏品等。</td>
                                            </tr>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>Movie_SubCategoryOne</td>
                                                <td className={"APIDocTableBodyTD"}>String</td>
                                                <td className={"APIDocTableBodyTD"}>電影種類 (長短片)：該電影是長片或短片。</td>
                                            </tr>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>Movie_SubCategoryTwo</td>
                                                <td className={"APIDocTableBodyTD"}>String</td>
                                                <td className={"APIDocTableBodyTD"}>電影種類：該電影的種類，如劇情片、紀錄片等</td>
                                            </tr>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>Movie_TitleMain</td>
                                                <td className={"APIDocTableBodyTD"}>String</td>
                                                <td className={"APIDocTableBodyTD"}>電影主要片名：該電影的主要片名</td>
                                            </tr>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>Movie_TitleTranslation</td>
                                                <td className={"APIDocTableBodyTD"}>String</td>
                                                <td className={"APIDocTableBodyTD"}>電影翻譯片名：該電影的英譯或其他語言的譯名</td>
                                            </tr>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>Movie_TitleOther</td>
                                                <td className={"APIDocTableBodyTD"}>String</td>
                                                <td className={"APIDocTableBodyTD"}>電影其他片名：該電影其他片名</td>
                                            </tr>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>Movie_ProductionDate</td>
                                                <td className={"APIDocTableBodyTD"}>String</td>
                                                <td className={"APIDocTableBodyTD"}>電影出品日期：該電影的出品日期</td>
                                            </tr>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>Movie_ProductionLocation</td>
                                                <td className={"APIDocTableBodyTD"}>String</td>
                                                <td className={"APIDocTableBodyTD"}>電影出品國家：該電影的出品國家</td>
                                            </tr>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>Movie_ProductionCompany</td>
                                                <td className={"APIDocTableBodyTD"}>String</td>
                                                <td className={"APIDocTableBodyTD"}>電影製作公司：該電影的製作公司</td>
                                            </tr>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>Movie_Producer</td>
                                                <td className={"APIDocTableBodyTD"}>String</td>
                                                <td className={"APIDocTableBodyTD"}>電影製作公司：該電影的製作公司</td>
                                            </tr>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>Movie_DramaContent</td>
                                                <td className={"APIDocTableBodyTD"}>String</td>
                                                <td className={"APIDocTableBodyTD"}>電影劇情大綱：該電影的劇情介紹</td>
                                            </tr>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>Movie_Rating</td>
                                                <td className={"APIDocTableBodyTD"}>String</td>
                                                <td className={"APIDocTableBodyTD"}>電影分級：該電影的分級</td>
                                            </tr>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>Movie_Language</td>
                                                <td className={"APIDocTableBodyTD"}>String</td>
                                                <td className={"APIDocTableBodyTD"}>電影語言：該電影的語言</td>
                                            </tr>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>Movie_TotalCount</td>
                                                <td className={"APIDocTableBodyTD"}>String</td>
                                                <td className={"APIDocTableBodyTD"}>搜尋結果總筆數：本次搜尋所搜尋到的電影總筆數</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className={"APIDocRightAreaMinorOption"}>
                                <div className={"APIDocRightAreaMinorOptionTitle"}>1.2 電影權威資料簡目搜尋 API (個別欄位)</div>
                                <div className={"APIDocRightAreaMinorOptionText"}> 使用者輸入查詢字詞(含指定搜尋欄位)、每頁筆數、第幾頁、排序欄位、排序方式等參數後，API將以輸入字詞搜尋電影權威資料內指定搜尋欄位，搜尋後回傳與此字詞相關的電影簡目資料 </div>
                                <div className={"APIDocAddressLine"}>{serverIP+'/api/movie/basicQuery/frontend/limit/:limitNumber/pageNumber/:pageNumber/orderColumn/:orderColumn/orderType/:orderType/query/:query'}</div>
                                <div className={"APIDocTable"}>
                                    <div className={"APIDocRightAreaTableTitle"}>輸入參數說明</div>
                                    <table style={{"width":"100%","borderSpacing":"0px","border": "1px solid rgb(185, 185, 185)"}}>
                                        <thead>
                                            <tr>
                                                <th className={"APIDocTableHeadTH"} style={{"width":"30%"}}>參數</th>
                                                <th className={"APIDocTableHeadTH"} style={{"width":"10%"}}>類型</th>
                                                <th className={"APIDocTableHeadTH"} style={{"width":"60%"}}>說明</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>limitNumber</td>
                                                <td className={"APIDocTableBodyTD"}>Integer</td>
                                                <td className={"APIDocTableBodyTD"}>回傳每頁筆數：有時搜尋結果會有幾百幾千筆，所以API會分頁回傳。此參數設定回傳結果一頁有幾筆資料。<p>允許數值：此數值為大於0正整數，無上限</p></td>
                                            </tr>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>pageNumber</td>
                                                <td className={"APIDocTableBodyTD"}>Integer</td>
                                                <td className={"APIDocTableBodyTD"}>回傳第幾頁資料：有時搜尋結果會有幾百幾千筆，所以API會分頁回傳。此參數設定要回傳搜尋結果的第幾頁資料。<p>允許數值：此數值為大於0正整數，上限不超過搜尋結果總筆數除以每頁筆數。</p></td>
                                            </tr>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>orderColumn</td>
                                                <td className={"APIDocTableBodyTD"}>String</td>
                                                <td className={"APIDocTableBodyTD"}>排序欄位：此參數為欄位名，設定參數後系統會將搜尋結果依該欄位進行升冪或降冪排序。<p>允許數值：符合之欄位名，<code>Movie_SysID</code> (系統識別號)、<code>Movie_SubCategoryOne</code>(電影種類-長短片)、<code>Movie_SubCategoryTwo</code> (電影種類)、<code>Movie_TitleMain</code> (電影主要名稱)、<code>Movie_TitleTranslation</code> (電影翻譯名稱)、<code>Movie_TitleOther</code> (電影其他名稱)、<code>Movie_ProductionDate</code> (電影出品日期)、<code>Movie_ProductionLocation</code> (電影製作國家)、<code>Movie_ProductionCompany</code> (電影製作公司)、<code>Movie_Producer</code> (電影製作者)、<code>Movie_DramaContent</code> (電影劇情大綱)、<code>Movie_Rating</code> (電影分級)、<code>Movie_Language</code> (電影語言)。</p></td>
                                            </tr>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>orderType</td>
                                                <td className={"APIDocTableBodyTD"}>String</td>
                                                <td className={"APIDocTableBodyTD"}>排序方式：設定搜尋果為升冪或降冪排序 (依orderColumn欄位)。<p>允許數值：<code>asc</code> (升冪)、<code>desc</code>(降冪)</p></td>
                                            </tr>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>query</td>
                                                <td className={"APIDocTableBodyTD"}>ObjectArray</td>
                                                <td className={"APIDocTableBodyTD"}>搜尋字詞：使用者於此設定想要查詢的關鍵字，因本隻API允許複數關鍵字的搜尋，所以回傳為字詞組成的陣列。<p>允許數值：符合下列形式之物件陣列： <code>{`[{boolean:BOOLEAN1,keyword:KEYWORD1},{boolean:BOOLEAN2,keyword:KEYWORD2},...]`}</code>，並且須將此物件陣列經由 <code> URI 加密為字串</code>始傳入API。</p><p>物件屬性：</p><p><code>boolean</code>: 為此關鍵字與其他關鍵字之關係是 <code>AND</code> (交集) 或 <code>OR</code> (聯集)。</p><p><code>keyword</code>: 為使用者想搜尋的關鍵字，一個關鍵字的中文字數勿超過50字。</p></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className={"APIDocTable"}>
                                    <div className={"APIDocRightAreaTableTitle"}>API呼叫成功 Success 200 回傳訊息說明</div>
                                    <div className={"APIDocRightAreaTableText"}>本隻API呼叫成功後，搜尋結果將會以陣列回傳，每筆資料為此陣列中的一個物件，資料的欄位以物件屬性呈現，以下說明各物件屬性 (也就是資料欄位)</div>
                                    <table style={{"width":"100%","borderSpacing":"0px","border": "1px solid rgb(185, 185, 185)"}}>
                                        <thead>
                                            <tr>
                                                <th className={"APIDocTableHeadTH"} style={{"width":"30%"}}>物件屬性 (資料欄位)</th>
                                                <th className={"APIDocTableHeadTH"} style={{"width":"10%"}}>類型</th>
                                                <th className={"APIDocTableHeadTH"} style={{"width":"60%"}}>說明</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>Movie_SysID</td>
                                                <td className={"APIDocTableBodyTD"}>String</td>
                                                <td className={"APIDocTableBodyTD"}>電影系統識別號：該筆電影的系統唯一ID，藉由此ID可再進一步查詢該電影的細節內容、演職員表、相關藏品等。</td>
                                            </tr>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>Movie_SubCategoryOne</td>
                                                <td className={"APIDocTableBodyTD"}>String</td>
                                                <td className={"APIDocTableBodyTD"}>電影種類 (長短片)：該電影是長片或短片。</td>
                                            </tr>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>Movie_SubCategoryTwo</td>
                                                <td className={"APIDocTableBodyTD"}>String</td>
                                                <td className={"APIDocTableBodyTD"}>電影種類：該電影的種類，如劇情片、紀錄片等</td>
                                            </tr>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>Movie_TitleMain</td>
                                                <td className={"APIDocTableBodyTD"}>String</td>
                                                <td className={"APIDocTableBodyTD"}>電影主要片名：該電影的主要片名</td>
                                            </tr>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>Movie_TitleTranslation</td>
                                                <td className={"APIDocTableBodyTD"}>String</td>
                                                <td className={"APIDocTableBodyTD"}>電影翻譯片名：該電影的英譯或其他語言的譯名</td>
                                            </tr>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>Movie_TitleOther</td>
                                                <td className={"APIDocTableBodyTD"}>String</td>
                                                <td className={"APIDocTableBodyTD"}>電影其他片名：該電影其他片名</td>
                                            </tr>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>Movie_ProductionDate</td>
                                                <td className={"APIDocTableBodyTD"}>String</td>
                                                <td className={"APIDocTableBodyTD"}>電影出品日期：該電影的出品日期</td>
                                            </tr>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>Movie_ProductionLocation</td>
                                                <td className={"APIDocTableBodyTD"}>String</td>
                                                <td className={"APIDocTableBodyTD"}>電影出品國家：該電影的出品國家</td>
                                            </tr>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>Movie_ProductionCompany</td>
                                                <td className={"APIDocTableBodyTD"}>String</td>
                                                <td className={"APIDocTableBodyTD"}>電影製作公司：該電影的製作公司</td>
                                            </tr>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>Movie_Producer</td>
                                                <td className={"APIDocTableBodyTD"}>String</td>
                                                <td className={"APIDocTableBodyTD"}>電影製作公司：該電影的製作公司</td>
                                            </tr>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>Movie_DramaContent</td>
                                                <td className={"APIDocTableBodyTD"}>String</td>
                                                <td className={"APIDocTableBodyTD"}>電影劇情大綱：該電影的劇情介紹</td>
                                            </tr>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>Movie_Rating</td>
                                                <td className={"APIDocTableBodyTD"}>String</td>
                                                <td className={"APIDocTableBodyTD"}>電影分級：該電影的分級</td>
                                            </tr>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>Movie_Language</td>
                                                <td className={"APIDocTableBodyTD"}>String</td>
                                                <td className={"APIDocTableBodyTD"}>電影語言：該電影的語言</td>
                                            </tr>
                                            <tr>
                                                <td className={"APIDocTableBodyTD"}>Movie_TotalCount</td>
                                                <td className={"APIDocTableBodyTD"}>String</td>
                                                <td className={"APIDocTableBodyTD"}>搜尋結果總筆數：本次搜尋所搜尋到的電影總筆數</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
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