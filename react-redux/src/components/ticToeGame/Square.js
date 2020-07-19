import React from 'react';
import './index.css';
import PropTypes from "prop-types";

const Square = (props) =>{
  return (
    <button 
      className="square" 
      onClick={() => props.onClick()}
    >
        {props.value}
    </button>
  )
}

Square.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Square;