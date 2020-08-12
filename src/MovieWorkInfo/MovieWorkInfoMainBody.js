import React, { Component } from 'react';
import './MovieWorkInfoMainBody.css';
import { FacebookProvider, Like } from 'react-facebook';

class MovieWorkInfoMainBody extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount(){
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