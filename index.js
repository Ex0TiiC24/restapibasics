const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const port = 8000

let users = []
let counter = 0

app.use(bodyparser.json())
app.use(bodyparser.text())

app.listen(port,(req,res) => {
    console.log('run at '+port)
})

app.get('/test',(req,res)=>{
    
    res.json(users)

    
})
app.get('/find/:id',(req,res)=>{
    let sid = parseInt(req.params.id) 
    for (let i = 0;i<users.length;i++) {
        if (users[i].id === sid) {
            res.json({
                status: "found",
                user: users[i]
            })
            return 
        }
    }
    
    res.json({
        status: "not found"
    })
})

app.post('/user',(req,res)=>{
    let coming = req.body
    coming.id = users.length
    counter+=1
    users.push(coming)
    res.json({
        messagefromserver: 'Added',
        user: users

    })
})

app.put('/user/edit/:id',(req,res)=>{ //change all 
    let sid = parseInt(req.params.id)
    let updateUser = req.body
    for (let i = 0;i<users.length;i++) {
        if (updateUser == {}){
            return
        }
        if (users[i].id === sid) {
            
            if (updateUser.firstname){
                users[i].firstname = updateUser.firstname
            }
            if (updateUser.lastname){
                users[i].lastname = updateUser.lastname
            }
            

            res.json({
                message:"updated",
                user:users[i]
            })
            return 
        }
    }
    res.send("Not found")

})


app.delete('/user/delete/:id',(req,res)=>{
    let sid = parseInt(req.params.id)
    for (let i = 0;i<users.length;i++) {

        
        if (users[i].id === sid) {
            users.splice(sid,1)
            for(let k=0;k<users.length;k++){
                users[k].id = k
            }
            res.json({
                message:"deleted",
                deleted: sid
            })
            return 
        }
}})


