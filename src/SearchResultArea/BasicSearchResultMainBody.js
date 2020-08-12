import React, { Component } from 'react';
import './BasicSearchResultMainBody.css';


class MovieWorkInfoMainBody extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount(){
        alert('start!')
        //window.addEventListener("beforeunload",(e)=>{
        //    e.preventDefault()
        //    return this.endAlert()
        //})
    }

    componentWillUnmount(){
        alert("fine!")
        //window.removeEventListener("beforeunload", this.endAlert())
     }


    endAlert=()=>{
        console.log("Fuck !!!!!")
        alert("End alert")
    }

    render(){
        return(          
            <div className="BasicSearchMainBody"> 
            </div>
        )
    }
}

export default MovieWorkInfoMainBody 