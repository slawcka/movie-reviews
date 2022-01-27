const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const app=express()
const mysql=require('mysql')
const path = require('path');
const port=8080

const db=mysql.createPool({
    host:"sql11.freesqldatabase.com",
    user:"sql11466939",
    password :"QkJapBxVVZ",
    database :"sql11466939"
})
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/api/get',(req,res)=>{
    const sqlSelect="SELECT * FROM movie_reviews"
    db.query(sqlSelect,(err,result)=>{
        res.send(result)
        })
})

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });

app.post("/api/insert",(req,res)=>{
    const movieName=req.body.movieName
    const movieReview=req.body.movieReview
    const movieRating=req.body.movieRating
    console.log(`star rating: ${movieRating}`)
    const sqlInsert="INSERT INTO movie_reviews (movieName, movieReview, rating) VALUES (?,?,?);"
    db.query(sqlInsert,[movieName,movieReview,movieRating],(err,result)=>{
    if(err) console.log(err)
    })
})

app.delete('/api/delete/:movieName',(req,res)=>{
    const name=req.params.movieName
    console.log(`movie name to delete: ${name}`)
    const sqlDelete="DELETE FROM movie_reviews WHERE movieName = ?"
    db.query(sqlDelete,name, (err,res)=>{
        if(err) console.log(err)
    })
})

app.put('/api/update/',(req,res)=>{
    const name=req.body.movieName
    const review=req.body.newReview
    console.log(`movie update: ${name}`)
    const sqlUpdate="UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";
    db.query(sqlUpdate,[review,name], (err,res)=>{
        if(err) console.log(err)
    })
})


app.get('/',(req,res)=>{

    const sqlInsert="INSERT INTO movie_reviews (movieName, movieReview) VALUES ('inception', 'good movie');"
    db.query(sqlInsert,(err,result)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log(result)
        res.send('hello worlds') 
    })
    
})
app.listen(port,()=>{
    console.log(`running on port ${port}`);
})