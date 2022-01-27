import React from 'react';
import { useState } from 'react';
import poster from '../img/poster.png'

const Review = ({movieName,movieReview,rating,deleteReview,updateReview}) => {
    const [updatedReview,setupdatedReview]=useState('')
    const [modalActive,setModalActive]=useState(false)

    const update=()=>{
        updateReview(movieName,updatedReview)
        setModalActive(prev=>!prev)
    }
    return (
        <div className='review position-relative d-flex flex-column justify-content-between'>
            <div>
                <img className='img-fluid' src={poster} alt=""/>
                <h2 className='review__title mt-2'>{movieName.length===0?'Placeholder':movieName}</h2>
                <p className='px-2'>{movieReview.length===0?'This Placeholder movie was awesome! pls dont trick me':movieReview}</p>
            </div>
            <div className='p-3 d-flex'>
                { [...Array(parseInt(rating))].map((e, i) => <i key={i} class="fas fa-star text-warning d-flex align-items-center"></i>)}
                <button className='ms-auto btn' onClick={()=>{setModalActive(prev=>!prev)}}>update</button>
                <button className="btn btn-outline-danger btn-sm" onClick={()=>deleteReview(movieName)}>delete</button>
            </div>
            <div className={'review__modal position-absolute text-center p-5 ' + (modalActive? "d-block":"d-none")}>
                <textarea className='mb-3' onChange={(e)=>setupdatedReview(e.target.value)} type="text"></textarea>
                <button className='ms-auto btn btn-light' onClick={update}>update review</button>
            </div>
        </div>
    );
};

export default Review;


