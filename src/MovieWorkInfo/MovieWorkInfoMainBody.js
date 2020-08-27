import React, { Component } from 'react';
import './MovieWorkInfoMainBody.css';
import { FacebookProvider, Like } from 'react-facebook';
import IPAddress from '../IPAddress'

class MovieWorkInfoMainBody extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    componentDidMount(){
        
    }

    initialState=()=>{
        let movieSysID = this.props.match.params.movie_id
        let tempIP = new IPAddress()

    }

    render(){
        return(          
            <div className="MovieWorkInfoMainBody">  
                <div>{"Movie Work Info Main Body"}</div>
                <FacebookProvider appId="1608677022605093">
                    <Like href={""} colorScheme="dark" showFaces share />
                </FacebookProvider>
            </div>
        )
    }
}

export default MovieWorkInfoMainBody 