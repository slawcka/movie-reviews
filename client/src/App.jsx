import './App.css';
import './style.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState,useEffect } from 'react';
import Axios from 'axios'
import Review from './components/review'
import Form from './components/Form'

function App() {
  const[movieName,setmovieName]=useState('')
  const[review,setReview]=useState('')
  const[starRating,updateStarRating]=useState(1)
  const [movieReviewList,setmovieReviewList]=useState([])
  const [errorMessage,setErrorMessage]=useState('')

  useEffect(()=>{
    Axios.get('http://localhost:8080/api/get')
    .then((response)=>{
      setmovieReviewList(response.data)
    })
  },[])
  
  const submitReview=()=>{
    Axios.post("http://localhost:8080/api/insert",{
      movieName:movieName,
      movieReview:review,
      rating:starRating
    })
  }
  
  const updateRating=(e)=>{
    updateStarRating(e.target.defaultValue)
    console.log(e.target.defaultValue)
  }

  const checkInputText=(movie,review)=>{
    if(movie.length<2 || review.length<3){
      setErrorMessage('pls, cannot be empty or to short.. next time')
    } else {
      setErrorMessage('')
    }
  }
  const submitForm=(ev)=>{
    ev.preventDefault()
    const name=document.querySelector('[name="movieName"]').value;
    const review=document.querySelector('[name="movieReview"]').value;
    const ratings=document.querySelectorAll('[name="rate"]');
    let rating= starRating;
      checkInputText(name,review)
      Axios.post("http://localhost:8080/api/insert",{
        movieName:name,
        movieReview:review,
        movieRating:rating 
      })
      setmovieReviewList([...movieReviewList,{movieName:name,movieReview:review,rating:rating}])
  }

  const deleteReview=(movie)=>{
    Axios.delete(`http://localhost:8080/api/delete/${movie}`)
    let newlist=[...movieReviewList]
    for(let i=0; i< movieReviewList.length ; i++){
      if(movieReviewList[i].movieName===movie){
        newlist.splice(i,1)
      }
    }
    setmovieReviewList(newlist)
  }
  
  const updateReview=(movie,newReview)=>{
    Axios.put("http://localhost:8080/api/update",{
        movieName:movie,
        newReview:newReview
    })
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-10 col-md-6  mx-auto">
            <div className="hero text-center">
              <h1 className='my-4'>movie<span><i className="fas fa-film mx-2 text-danger"></i></span>reviewer</h1>
              <h6>{errorMessage}</h6>
                <Form
                  submitForm={submitForm}
                  updateRating={updateRating}
                  starRating={starRating}
                />
            </div>
          </div>
        </div>
      </div>
       <div className="container">
         <div className="row">
            {movieReviewList.map((val)=>{
            return <div key={val.id} className="col-md-6 col-lg-4 mb-4">
                      <Review
                        movieName={val.movieName}
                        movieReview={val.movieReview}
                        rating={val.rating}
                        deleteReview={deleteReview}
                        updateReview={updateReview}
                        checkInputText={checkInputText}
                      />
                   </div> 
            })}
         </div>
       </div>
       
    </div>
  );
}
export default App;
