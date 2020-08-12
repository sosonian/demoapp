import React from 'react'

const HightlightKeywordCell=(props)=>{

    const getText=()=>{
        if(props.text)
        {
            if(props.keywords)
            {
                let keywordArray= getKeywordIndex()
                //console.log('keywordArray')
                //console.log(keywordArray)
                return getFinalText(keywordArray)
            }
            else
            {            
                return props.text
            }
        }
        else
        {
            return props.text
        }
    }

    const getKeywordIndex=()=>{
        let tempArray=[]
        props.keywords.forEach((keyword,kIndex) => {
            let color = getColor(kIndex)
            let tempResult = [...props.text.matchAll(new RegExp(keyword.keyword,'gi'))]
            tempResult.forEach(element=>{
                let tempObj = {
                    keyword:element[0],
                    keywordID:kIndex,
                    color:color,
                    sIndex:element.index,
                    eIndex:element.index+element[0].length
                }
                tempArray.push(tempObj)
            })
        })
        tempArray.sort((a,b)=>{
            return a.sIndex-b.sIndex
        })
        return tempArray
    }

    const getFinalText=(keywordArray)=>{

        if(props.text && keywordArray.length>0)
        {
            let story = props.text
            let count = 0
            let sliceSIndex = 0
            return(
                keywordArray.map(keyword=>{                     
                    let s = keyword.sIndex
                    let e = keyword.eIndex

                    if(count === 0)
                    {
                        sliceSIndex = 0    
                    }
   
                    let suffix = null
                    let prefix = story.slice(sliceSIndex,s)
                       
                    if(count === keywordArray.length-1)
                    {
                        suffix = story.slice(e,-1)
                    }
                        
                    count = count + 1
                    sliceSIndex = e
                    return <span>{prefix}<span style={{backgroundColor:keyword.color}}>{story.slice(s,e)}</span>{suffix}</span>
                })
            )
        }
        else
        {
            return props.text
        }
    }

    const getColor=(index)=>{        
        switch(index){
            case 0:
                return '#ffff5e';
            case 1:
                return '#5efaff';
            case 2:
                return '#c1ffbf';
            case 3:
                return '#ff6b6b';
            default:
                return '#d9d9d9'
        }
    }

    return <div>{getText()}</div>
}

export default HightlightKeywordCell
