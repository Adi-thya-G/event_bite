import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaRegSmile, FaRegMeh, FaRegFrown } from "react-icons/fa";
import {useSelector} from "react-redux"
import Feedback_OBJ from "../Appwrite/Feedback";
const FeedbackComponent = () => {
  // use for rating variable
  const [rating, setRating] = useState(0);
  // username fetch
  var data=useSelector((state)=>state.auth.userData)

  const [hover, setHover] = useState(0);
  // feedback message  
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  // display emoji on the bases rating
  const getEmojiByRating = (rating) => {
    if (rating == 5) return <FaRegSmile className="text-3xl text-green-600" />
    if (rating == 4) return <FaRegSmile className="text-3xl text-green-400" />;
    if (rating >= 2) return <FaRegMeh className="text-3xl text-yellow-500" />;
    return <FaRegFrown className="text-3xl text-red-500" />;
  };
  // handling form 
  const handleSubmit =async (e) => {
    e.preventDefault();
    // set error message if rating not selected
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }
    // set error message if message is less than 10 character
    if (message.length < 10) {
      setError("Please provide feedback with at least 10 characters");
      return;
    }
    try{
      let res=await Feedback_OBJ.Create_Feedback({username:data?.email,message:message,rating:rating})
      console.log(res,data?.name)
    setSubmitted(true);
    setError("");
    }
    catch(error)
    {
      console.log(error)
    }
    
  };
 // reset all to empty
  const handleReset = () => {
    setRating(0);
    setHover(0);
    setMessage("");
    setSubmitted(false);
    setError("");
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="text-primary text-4xl mb-4">✨</div>
          <h2 className="text-heading font-heading mb-4">Thank You!</h2>
          <p className="text-body mb-6">Your feedback has been submitted successfully.</p>
          <button
            onClick={handleReset}
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Submit Another Feedback
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-card p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-heading font-heading mb-6 text-center">Rate Your Experience</h2>
        
        <div className="flex flex-col items-center mb-6">
          <div className="flex space-x-2 mb-4">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <button
                  key={index}
                  className="transition-transform hover:scale-110 focus:outline-none"
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(ratingValue)}
                >
                  <FaStar
                    className={`text-4xl ${
                      ratingValue <= (hover || rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              );
            })}
          </div>
          
          {rating > 0 && (
            <div className="animate-fade-in transition-all">
              {getEmojiByRating(rating)}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <textarea
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent resize-none bg-white"
              rows="4"
              placeholder="Tell us about your experience..."
              maxLength="500"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value)
              }}
            ></textarea>
            <p className="text-sm text-accent mt-1">
              {message.length}/500 characters
            </p>
          </div>

         
            <p className="text-destructive text-sm py-2 text-center">{(message.length<10)?error:null}</p>
          

          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackComponent;