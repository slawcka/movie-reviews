import React from "react";

const Form = ({ submitForm, updateRating, starRating }) => {
    
  return (
    <div className="hero__form mb-5">
      <form onSubmit={submitForm}>
        <div>
        <input className="form-control mb-3" name="movieName" id="movieName" type="text" placeholder="Movie Name"/>
        </div>
        <textarea className="form-control mb-3" name="movieReview" placeholder="Movie Review"></textarea>
        <div className="d-flex position-relative justify-content-between">
          <fieldset className="rate ps-0">
              <input onClick={updateRating} type="radio" id="star5" name="rate" value="5" />
              <label htmlFor="star5" title="text">5 stars</label>
              <input onClick={updateRating} type="radio" id="star4" name="rate" value="4" />
              <label htmlFor="star4" title="text">4 stars</label>
              <input onClick={updateRating} type="radio" id="star3" name="rate" value="3" />
              <label htmlFor="star3" title="text">3 stars</label>
              <input onClick={updateRating} type="radio" id="star2" name="rate" value="2" />
              <label htmlFor="star2" title="text">2 stars</label>
              <input onClick={updateRating} type="radio" id="star1" name="rate" value="1" />
              <label htmlFor="star1" title="text">1 star</label>
          </fieldset>
          <input className="btn btn-danger ms-auto" type="submit" value="Submit" />
          <p className="rating-text position-absolute d-none d-sm-block">{starRating}</p>
        </div>
      </form>
    </div>
  );
};

export default Form;
