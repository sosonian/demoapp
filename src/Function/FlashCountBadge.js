import React,{useState,useEffect, useRef} from 'react'
import './FlashCountBadge.css'


const usePreviousValue=(value)=>{
    const ref = useRef()
    useEffect(()=>{
        ref.current = value
    })
    return ref.current
}

export default function FlashCountBadge(props) {
    //console.log("FlashCountBadge")
    const [currentCount,setCount] = useState(0)
    const [backColor, setBackColor] = useState(null)
    //const [countNumber, setCountNumber] = useState(props.countNumber)
    const timer=()=>{
        setCount(currentCount + 1)
    }

    const bgStyle = {
        backgroundColor:backColor
    }

    const preValue = usePreviousValue(props.countNumber)

    useEffect(
        ()=>{

            if(preValue !== props.countNumber)
            {
                setCount(0)
            }

            if(props.badgeType === "red-blue")
            {
                if(props.countNumber === 0)
                {
                    if(currentCount > 3)
                    {
                        return
                    }
                    else
                    {
                        if(currentCount === 0 || currentCount === 2)
                        {
                            setBackColor("red")
                        }
                        else if(currentCount === 1 || currentCount === 3)
                        {
                            setBackColor("blue")
                        }
                    }
                }
                else
                {
                    if(currentCount > 3)
                    {
                        return
                    }
                    else
                    {
                        if(currentCount === 0 || currentCount === 2)
                        {
                            setBackColor("blue")
                        }
                        else if(currentCount === 1 || currentCount === 3)
                        {
                            setBackColor("red")
                        }
                    }
                }
            }
            else if(props.badgeType === "blue")
            {
                if(currentCount > 3)
                {
                    return
                }
                else
                {
                    if(currentCount === 0 || currentCount === 2)
                    {
                        setBackColor("green")
                    }
                    else if(currentCount === 1 || currentCount === 3)
                    {
                        setBackColor("blue")
                    }
                }
            }

            
            
            const timerFunction = setInterval(timer,1000)
            return ()=>clearInterval(timerFunction)
        }
    )
    
    return (
        <div className={"FlashCountBadge"} style={bgStyle}>
            {props.countNumber}
        </div>
    )
}
