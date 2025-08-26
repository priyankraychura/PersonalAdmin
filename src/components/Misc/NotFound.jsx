import React from 'react';
import notFoundAnimation from '../../assets/404 Animation.json'; // Import your downloaded file
import './Misc.css'; 
import Lottie from 'lottie-react';

const NotFound = () => {
  return (
    <div className="page-container">
      <div className="content-card">
        <Lottie
          animationData={notFoundAnimation}
          loop={true}
          className="lottie-animation"
        />
        <h1 className="main-title">404</h1>
        <p className="page-text">
          Oops! The page you're looking for does not exist.
        </p>
      </div>
    </div>
  );
};

export default NotFound;