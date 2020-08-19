import React from 'react'

const Alert = ({message, color, intensity}) => {
  return (
    <div className={`bg-${color}-${intensity} py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto`}>
      {message}
    </div>
  );
}
 
export default Alert;