import React from 'react'
import loading from './loading.gif'
import './spinner.css';

const Spinner = () => {
  
    return (
      <div className="Spinner text-center">
        <img src={loading} alt="loading"/>
      </div>
    )
  
}

export default Spinner