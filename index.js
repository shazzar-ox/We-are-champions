import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import {getDatabase, ref, push, onValue,set, update} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://real-time-database-36371-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)

const dataBase = getDatabase(app)

const endorcementList = ref(dataBase, 'endorecementList')




const displayEL = document.querySelector('#display-el')
const publishEL = document.querySelector('#publish-el')
const endorcementEl = document.querySelector('#endorcement-el')
const fromEl = document.querySelector('#from-el')
const toVal = document.querySelector('#to-el')
let statChecker= false


publishEL.addEventListener('click', function()
{
   let value = displayEL.value
   let fromValue = fromEl.value
   let toValue = toVal.value
   if (value && fromValue && toValue)
        {
        clearDom()
        let arrayValue = {"value": value, "from" : fromValue , 'toEL' : toValue, 'counter': 0, status: false}
        //console.log(arrayValue.counter)
        push(endorcementList,arrayValue)
        displayEL.value = ''
        fromEl.value=''
        toVal.value=''
        }
   else{

        }
  
    
})



function clearDom()
{
    endorcementEl.textContent= ''
}

onValue(endorcementList, function(snapshot)
{
    if (snapshot.val())
    {
    let dataInDatabase = snapshot.val()
    let data=Object.entries(dataInDatabase)
    //console.log(dataInDatabase)
    loopThroughDatabase(data)
    }
    else{
        endorcementEl.textContent= 'There is no data in the database'
    }
    
})

function loopThroughDatabase(arg)
{
    for (let i=0; i < arg.length; i++)
    {
        
        let createDiv = document.createElement('div')
        let fromDiv = document.createElement('h4')
        let toDiv = document.createElement('span')
        let finalDiv =  document.createElement('div')
        let likes = document.createElement('span')
        let countLikes = document.createElement('span')
        let statusChecker= false
        let arrayId = arg[i]

        let {from , value ,toEL, counter, status } = arrayId [1]
        
              
        fromDiv.textContent = `From ${from}`
        createDiv.textContent =  `${value}` 
        toDiv.textContent = `To ${toEL}`
        let counted = counter
        
        likes.textContent = status ? '❤️':`🤍`
        countLikes.textContent = `${counted}`
            // likes.textContent


        // style each div section and its content content
        finalDiv.style.background= 'white'
        finalDiv.style.color='black'
        finalDiv.style.padding ='2px 20px'
        finalDiv.style.border ='10px solid black'
        finalDiv.style.textAlign ='justify'
        toDiv.style.fontSize= '18px'
        toDiv.style.fontWeight ='bolder'
        createDiv.style.margin ='8% 0%'
       
        countLikes.style.float ='right'
        likes.style.float ='right'
      
       
        


        finalDiv.append(fromDiv, createDiv, toDiv, countLikes, likes)

        finalDiv.addEventListener('click',function()
        {
            const voteChecker = likes.textContent
            console.log(statChecker)
           
            if (status)
            {
                counted -=1
                console.log(arrayId[1])
                console.log(likes)
                
                // let {counter} = arrayId [1]
                
                likes.textContent =`🤍 ${counted}`
                statChecker= false
                
                console.log(counter)
                let  newStatus = !status
                
                endorcementEl.textContent=''
                update(ref(dataBase, 'endorecementList/'+ arrayId [0]),{counter : counted, status: newStatus})
 
            }
            else
            {
                console.log('true')
                counted +=1
                
                //  let {counter} = arrayId [1] 
                 console.log(arrayId[1])
                 console.log(likes)
                
                likes.textContent =` 😁 ${counted}`
                console.log(counter)
                statChecker= true
                let  newStatus = !status
                console.log(newStatus)
                
                endorcementEl.textContent=''
                update(ref(dataBase, 'endorecementList/'+ arrayId [0]),{counter : counted, status: newStatus})
                
                
            }
            
           
            
        })
      
        
        endorcementEl.prepend(finalDiv)
        endorcementEl.style.marginTop ='0px'
    }
}




// let abnormal = {'Age': {'25': 'pale blue', 'ink': {'final': 'data'}}, 'Gender': 'male'}
// let v = abnormal.Age[25]
// v = abnormal.Age.ink.final

// console.log(v)

// const posts = [post]

// const {from, to, message} = posts[0]


// from

// const post = {from: 'bright', to: 'mayowa', message: ''}