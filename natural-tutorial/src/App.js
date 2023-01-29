// import logo from './logo.svg';
import axios from 'axios';
import React, { useState } from 'react';
import './App.css';


function App() {
  
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const options = {
    method: 'POST',
    url: 'https://api.cohere.ai/classify',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: 'Bearer vHX4GRPt73GMRGWQdTrChynoQr9s8qfCO5s9YZpF'
    },
    data: {
      inputs: [
        'This item was broken when it arrived',
        'The product is amazing',
        'The product was not too bad'
      ],
      examples: [
        {text: 'The order came 5 days early', label: 'positive review'},
        {text: 'The item exceeded my expectations', label: 'positive review'},
        {text: 'I ordered more for my friends', label: 'positive review'},
        {text: 'I would buy this again', label: 'positive review'},
        {text: 'I would recommend this to others', label: 'positive review'},
        {text: 'The package was damaged', label: 'negative review'},
        {text: 'The order is 5 days late', label: 'negative review'},
        {text: 'The order was incorrect', label: 'negative review'},
        {text: 'I want to return my item', label: 'negative review'},
        {text: 'The item\'s material feels low quality', label: 'negative review'},
        {text: 'The product was okay', label: 'neutral review'},
        {text: 'I received five items in total', label: 'neutral review'},
        {text: 'I bought it from the website', label: 'neutral review'},
        {text: 'I used the product this morning', label: 'neutral review'},
        {text: 'The product arrived yesterday', label: 'neutral review'}
      ],
      truncate: 'END',
      model: 'medium',
      outputIndicator: 'Classify this product review',
      taskDescription: 'Classify these product reviews as positive, negative, or neutral'
    }
  };
  
  
  const onSubmitHandler = e => {
    e.preventDefault();
    console.log("Button clicked")
    axios
    .request(options)
    .then(function (response) {
      setResult(response.data);
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  }

  return (
    <div className="App flex flex-col items-center gap-14 p-10">
      <form className="flex flex-col gap-5 mt-4 justify-center items-center" onSubmit={onSubmitHandler}>
        <div className="form-control w-full max-w-xl">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" 
          onChange={e => setInput(e.target.value)} value={input}/>
        </div>
        <input className="btn btn-primary btn-sm" type="submit" value="Submit"/>
      </form>
      <div>
        <h1>Results:</h1>
        <p>{result.summary}</p>
      </div>
    </div>
  );
}

export default App;
