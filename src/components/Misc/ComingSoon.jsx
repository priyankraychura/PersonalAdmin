import './Misc.css'
import CommingSoon from '../../assets/comming-soon.json'
import Lottie from 'lottie-react';

const ComingSoon = () => {
  return (
    <div className="page-container">
      <div className="content-card">
        <Lottie
          animationData={CommingSoon}
          loop={true}
          className="lottie-animation"
        />
        <h1 className="main-title">Coming Soon</h1>
        <p className="page-text">
          Our website is under construction. We'll be here soon with our new awesome site.
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;