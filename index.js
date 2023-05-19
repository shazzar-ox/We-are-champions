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


publishEL.addEventListener('click', function()
{
   let value = displayEL.value
   let fromValue = fromEl.value
   let toValue = toVal.value
   if (value && fromValue && toValue)
        {
        clearDom()
        let arrayValue = {"value": value, "from" : fromValue , 'toEL' : toValue, 'counter': 0}
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
        let arrayId = arg[i]

        let {from , value ,toEL, counter } = arrayId [1]
        
              
        fromDiv.textContent = `From ${from}`
        createDiv.textContent =  `${value}` 
        toDiv.textContent = `To ${toEL}`
        
        likes.textContent =`❤️️ ${counter}`
        


        // style each div section and its content content
        finalDiv.style.background= 'white'
        finalDiv.style.color='black'
        finalDiv.style.padding ='2px 20px'
        finalDiv.style.border ='10px solid black'
        finalDiv.style.textAlign ='justify'
        toDiv.style.fontSize= '18px'
        toDiv.style.fontWeight ='bolder'
        createDiv.style.margin ='8% 0%'
       
        likes.style.float ='right'
        countLikes.style.float ='right'
       
        


        finalDiv.append(fromDiv, createDiv, toDiv , likes)

        finalDiv.addEventListener('click',function()
        {
            arrayId[1].counter +=1
            let {counter} = arrayId [1]
            
            likes.textContent =`❤️️ ${counter}`
            
            endorcementEl.textContent=''
            update(ref(dataBase, 'endorecementList/'+ arrayId [0]),{counter : counter})
           
            
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