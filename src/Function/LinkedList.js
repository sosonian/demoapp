class LinkedListNode {
    constructor(data, next=null, index=null){
        this.data=data
        this.next=next
    }
}

class LinkedList {
    constructor(){
        this.head = null;
        this.length = 0;
    }

    insertFirst(data){
        this.head = new LinkedListNode(data, this.head)
        this.length++
    }

    insertLast(data){
        let node = new LinkedListNode(data);
        let current;
        if(!this.head)
        {
            this.head = node;
        }
        else
        {
            current = this.head
            while(current.next)
            {
                current=current.next
            }
            current.next=node
        }
        this.length++
    }

    insertAtPrefix(data, index){
        
        // Index Over Range, stop the function
        if(index>this.length)
        {
            //console.log('Index Over Range')
        }
        // Insert at index[0], means insert first
        else if(index===0)
        {
            this.insertFirst(data)
        }
        // Index is negtive, not valid, stop function
        else if(index<0)
        {
            //console.log('Index is negtive, not valid')
        }
        else
        {
            let node = new LinkedListNode(data);
            let current
            let previous
            let count = 0

            current=this.head

            while(count < index){
                previous = current
                count++
                current = current.next
            }
            node.next = current
            previous.next = node

            this.length ++
        }
    }

    insertAtSurfix(data, index){
        
        // Index Over Range, stop the function
        if(index>this.length)
        {
            //console.log('Index Over Range')
        }
        // Insert at index[0], means insert first
        else if(index===this.length)
        {
            this.insertLast(data)
        }
        // Index is negtive, not valid, stop function
        else if(index<0)
        {
            //console.log('Index is negtive, not valid')
        }
        else
        {
            let node = new LinkedListNode(data);
            let current
            let previous
            let count = 0

            current=this.head

            while(count < index+1){
                previous = current
                count++
                current = current.next
            }
            node.next = current
            previous.next = node

            this.length ++
        }
    }

    getAt(index) {
        let current = this.head
        let count = 0
        //let outputData

        while(current)
        {
            if(count === index)
            {
                //return outputData = {...current.data}
                return {...current.data}
            }
            count++
            current= current.next
        }

        return null
    }

    shiftToPrefix(index, targetIndex){
        if(index<0 || targetIndex <0 || index>this.length || targetIndex> this.length)
        {
            return 
        }
        else
        {
            if(index===targetIndex)
            {
                return
            }
            else
            {
                let tempData = this.getAt(index)
                this.removeAt(index)
                if(index>targetIndex)
                {
                    this.insertAtPrefix(tempData, targetIndex)
                }
                else
                {
                    this.insertAtPrefix(tempData, targetIndex-1)
                }   
            }
        }
    }

    shiftToSurfix(index, targetIndex){
        if(index<0 || targetIndex <0 || index>this.length || targetIndex> this.length)
        {
            return 
        }
        else
        {
            if(index===targetIndex)
            {
                return
            }
            else
            {
                let tempData = this.getAt(index)
                this.removeAt(index)
                if(index>targetIndex)
                {
                    this.insertAtSurfix(tempData, targetIndex)
                }
                else
                {
                    this.insertAtSurfix(tempData, targetIndex-1)
                }
            }
        }
    }

     //// BigO = (n)

     shiftToLast(index){
        if(index<0 || index > this.length-1)
        {
            const errMsg = new Error('index not valid (out of length or is negtive)')
            throw errMsg
        }
        else
        {
            if(index === this.length-1)
            {
                return
            }
            else if(index === 0)
            {
                let tempData= this.head.data
                this.head=this.head.next
                this.insertLast(tempData)
                this.length--
            }
            else
            {
                let tempNode = new LinkedListNode();
                let previous = null
                let current = this.head
                let count = 0

               while(current.next)
                {
                    if(count === index)
                    {
                        tempNode.data = current.data
                        previous.next=current.next
                    }
                    count++
                    previous = current
                    current = current.next
                }
                current.next = tempNode
            }
        }
    }

    removeLast(){
        this.removeAt(this.length-1)
    }

    removeAt(index) {
        if(index<0 || index > this.length)
        {
            return
        }
        else if(index===0)
        {
            this.head=this.head.next
            this.length--
        }
        else
        {
            let current=this.head
            let previous
            let count=0
            while(count<index)
            {
                count++
                previous=current
                current=current.next
            }
            previous.next=current.next
            this.length--
        }
    }

    //// BigO = (n)

    cloneList(){
        let clone = new LinkedList()
        let current = this.head
        
        while(current)
        {
            let tempNodeData = {...current.data}
            clone.insertLast(tempNodeData)
            current = current.next
        }

        return clone

    }


    printList(){
        let current = this.head
        while(current){
            console.log(current.data)
            current= current.next
        }
    }

    clearList(){
        this.head = null
        this.length = 0
    }

    transArray(keyName){
        let tempArray=[]
        if(keyName)
        {
            let current = this.head
            
            while(current)
            {
                let outputData = {...current.data}

                if(keyName in outputData)
                {
                    tempArray.push(outputData[keyName])
                }
                current= current.next
            }
        }
        else
        {
            let current = this.head

            while(current)
            {
                let outputData = {...current.data}
                tempArray.push(outputData)
                current= current.next
            }
        }
        return tempArray
    }
}



export default LinkedList
