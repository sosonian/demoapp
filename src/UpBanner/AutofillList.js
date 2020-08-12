import React, {Component} from 'react'
import './AutofillList.css'


class AutofillList extends Component {
    constructor(props) {
        super(props)
        this.state = {
           autofillWord:null,
        }
    }

    componentDidMount(){
        this.loadAutofillWord()
    }

    componentDidUpdate(prevProps){
        if(this.props.basicSearchWord !== prevProps.basicSearchWord && this.props.selectedIndex === 0)
        {           
            this.loadAutofillWord()        
        }

        if(this.props.selectedIndex !== prevProps.selectedIndex)
        {
            if(this.state.autofillWord && this.state.autofillWord[this.props.selectedIndex-1])
            {
                this.props.returnKeyword(this.state.autofillWord[this.props.selectedIndex-1].Keyword)

            }
        }
    }

    createRecommandWord=()=>{
        if(this.state.autofillWord)
        {
            let list = this.state.autofillWord.map((word,index)=>{
                return <div className={index === this.props.selectedIndex-1 ?"basicSearchAreaAutofillListOptionSelected" :"basicSearchAreaAutofillListOption"} onClick={(e)=>{this.getKeyword(e,word.Keyword)}}>{word.Keyword}</div>
            })
            return list
        }
        else
        {
            return null
        }
    }

    getKeyword=(e, keyword)=>{
        //e.preventDefault()
        //e.stopPropagation()
        console.log("getKeyword...")
        this.props.getKeyword(keyword)
    }

    loadAutofillWord=async()=>{
        let msg = await fetch(this.props.ipAddress+'/api/keyword/autofill/'+this.props.basicSearchWord)
        let output = await msg.json()
    
        if(msg.status !== 200) throw Error(msg.message)
        console.log("autofill :")
        console.log(output)
        this.setState({
            autofillWord:output
        })
    }

    render(){
        return(
            <div className={this.state.autofillWord && this.state.autofillWord[0]?"basicSearchAreaAutofillList":"basicSearchAreaAutofillList Hide"} >
                {this.createRecommandWord()}
            </div>    
        )
    }
}

export default AutofillList