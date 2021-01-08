import React, { Component } from 'react';
import './MovieWorkInfoMainBody.css';
import { FacebookProvider, Like } from 'react-facebook';
import IPAddress from '../IPAddress'
import Footer from '../Footer/Footer'

class MovieWorkInfoMainBody extends Component {
    constructor(props){
        super(props)
        this.state = {
            movieMainInfo:null,
            movieFilmList:null,
            movieStaffList:null,
            movieActorList:null
        }
    }

    componentDidMount(){
        this.initialState()
    }

    initialState=async()=>{
        let movieSysID = this.props.match.params.movie_id
        let tempIP = new IPAddress()
        if(movieSysID)
        {
            let msg1 = await fetch(tempIP.state.ip+'/api/movie/fetch/MovieMainInfo/'+movieSysID)
            let output1 = await msg1.json()
            console.log("MovieMainInfo : ")
            console.log(output1[0])  

            if(output1[0])
            {
                this.setState({
                    movieMainInfo:output1[0]
                }) 
            }

            // let msg2 = await fetch(tempIP.state.ip+'/api/movie/fetch/MovieRelatedFilm/'+movieSysID)
            // let output2 = await msg2.json()
            // console.log("MovieFilm : ")
            // console.log(output2)  

            // if(output2)
            // {
            //     this.setState({
            //         movieFilmList:output2
            //     }) 
            // }

            let msg3 = await fetch(tempIP.state.ip+'/api/movie/fetch/MovieStaffList/'+movieSysID)
            let output3 = await msg3.json()
            console.log("MovieStaffList : ")
            console.log(output3)  

            if(output3)
            {
                this.setState({
                    movieStaffList:output3
                }) 
            }

            let msg4 = await fetch(tempIP.state.ip+'/api/movie/fetch/MovieActorList/'+movieSysID)
            let output4 = await msg4.json()
            console.log("MovieActorList : ")
            console.log(output4)  

            if(output4)
            {
                this.setState({
                    movieActorList:output4
                }) 
            }
        }

    }

    removeSpaceFromString=(str)=>{
        let result = ""
        if(str)
        {
            result = str.replace(/\s/g,"")
        }
        return result
    }

    getNumberOfFilm=()=>{
        if(this.state.movieFilmList)
        {
            return this.state.movieFilmList.length
        }
        else
        {
            return 0
        }
    }

    createFilmRow=()=>{
        if(this.state.movieFilmList)
        {
            let output = this.state.movieFilmList.map(film=>{
                return <div className="itemArea">
                    <div className="itemRowContainer">
                        <div className="itemRowTitle">{"膠片編號"}</div>
                        <div className="itemRowContent">{film.Film_SysID}</div>
                    </div>
                    {
                        film.Film_Spec !== ""? 
                        <div className="itemRowContainer">
                            <div className="itemRowTitle">{"膠片規格 (寬幅)"}</div>
                            <div className="itemRowContent">{film.Film_Spec}</div>
                        </div>
                        :
                        null
                    }
                    {
                        film.Film_Emulsion !== ""? 
                        <div className="itemRowContainer">
                            <div className="itemRowTitle">{"膠片規格 (乳劑型式)"}</div>
                            <div className="itemRowContent">{film.Film_Emulsion}</div>
                        </div>
                        :
                        null
                    }
                </div>
            })

            return output

        }
        else
        {
            return null
        }
    }

    createActorList=()=>{
        if(this.state.movieActorList && this.state.movieActorList.length > 0 )
        {
            return <div className="MovieActorListArea">
                <div className="MovieRowTitle">{"演員列表"}</div>
                {this.createActorRow()}

            </div>
        }
        else
        {
            return null
        }
    }

    createStaffList=()=>{
        if(this.state.movieStaffList && this.state.movieStaffList.length > 0 )
        {
            return <div className="MovieStaffListArea">
                <div className="MovieRowTitle">{"職員列表"}</div>
                {this.createStaffRow()}

            </div>
        }
        else
        {
            return null
        }
    }

    createActorRow=()=>{
        let output = this.state.movieActorList.map((actor,index)=>{
            return <div className="MovieActorRowContent">
                <div className="MovieActorName">{actor.Movie_ActorName}</div>
                <div className="MovieRoleName">{actor.Movie_RoleName !== "" ? "飾演 " +actor.Movie_RoleName : null}</div>
            </div>

        })

        return output
    }

    createStaffRow=()=>{
        let output = this.state.movieStaffList.map((actor,index)=>{
            if(actor.Movie_StaffName || actor.Movie_Company)
            {
                return <div className="MovieStaffRowContent">
                    <div className="MovieStaffName">{actor.Movie_StaffName ? actor.Movie_StaffName : actor.Movie_Company }</div>
                    <div className="MoviePositionName">{actor.Movie_Position !== "" ? " " +actor.Movie_Position : null}</div>
                </div>
            }
            else
            {
                return null
            }
        })

        return output
    }

    render(){
        return(  
            <div>        
                <div className="MovieMainBody">  
                    {
                        this.state.movieMainInfo?
                        <div className="MovieLeftArea">
                            <div className="MovieTitle">{this.removeSpaceFromString(this.state.movieMainInfo.Movie_TitleMain) !== "" ? this.state.movieMainInfo.Movie_TitleMain : this.removeSpaceFromString(this.state.movieMainInfo.Movie_TitleTranslation) !== ""? this.state.movieMainInfo.Movie_TitleTranslation+ " (翻譯片名)":"暫無片名"}</div>
                            <div className="MovieRowTitle">{"劇情簡介"}</div>
                            <div className="MovieRowContent">{this.state.movieMainInfo.Movie_DramaContent ? this.state.movieMainInfo.Movie_DramaContent:"暫無劇情簡介"}</div>
                            { (this.removeSpaceFromString(this.state.movieMainInfo.Movie_SubCategoryOne) !== "" || this.removeSpaceFromString(this.state.movieMainInfo.Movie_SubCategoryTwo) !== "") ? <div className="MovieRowContainer"><div className="MovieRowTitle">{"種類"}</div><div className="MovieRowContent">{this.state.movieMainInfo.Movie_SubCategoryOne + " "+ this.state.movieMainInfo.Movie_SubCategoryTwo}</div></div>:null}
                            { this.removeSpaceFromString(this.state.movieMainInfo.Movie_Language) !== "" ? <div className="MovieRowContainer"><div className="MovieRowTitle">{"語言"}</div><div className="MovieRowContent">{this.state.movieMainInfo.Movie_Language}</div></div>:null}
                            { this.removeSpaceFromString(this.state.movieMainInfo.Movie_ProductionDate) !== "" ? <div className="MovieRowContainer"><div className="MovieRowTitle">{"出品日期"}</div><div className="MovieRowContent">{this.state.movieMainInfo.Movie_ProductionDate}</div></div>:null}
                            { this.removeSpaceFromString(this.state.movieMainInfo.Movie_Producer ) !== ""? <div className="MovieRowContainer"><div className="MovieRowTitle">{"製作人"}</div><div className="MovieRowContent">{this.state.movieMainInfo.Movie_Producer}</div></div>:null}
                            { this.removeSpaceFromString(this.state.movieMainInfo.Movie_ProductionCompany ) !== ""? <div className="MovieRowContainer"><div className="MovieRowTitle">{"製作公司"}</div><div className="MovieRowContent">{this.state.movieMainInfo.Movie_ProductionCompany}</div></div>:null}
                            { this.removeSpaceFromString(this.state.movieMainInfo.Movie_ProductionLocation ) !== ""? <div className="MovieRowContainer"><div className="MovieRowTitle">{"出品國家"}</div><div className="MovieRowContent">{this.state.movieMainInfo.Movie_ProductionLocation}</div></div>:null}
                            <div style={{display:"flex"}}>
                                {this.createActorList()}
                                {this.createStaffList()}
                            </div>
                            <FacebookProvider appId="1608677022605093">
                                <Like href={""} colorScheme="dark" showFaces share />
                            </FacebookProvider>
                        </div>
                        :
                        null
                    }
                
                </div>
                <div style={{"width":"100%"}}>
                    <Footer/>
                </div>
            </div>
        )
    }
}

export default MovieWorkInfoMainBody 