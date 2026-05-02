import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="main">
        <div className="up">
          <div className="loaders">
            <div className="loader" />
            <div className="loader" />
            <div className="loader" />
            <div className="loader" />
            <div className="loader" />
            <div className="loader" />
            <div className="loader" />
            <div className="loader" />
            <div className="loader" />
            <div className="loader" />
          </div>
          <div className="loadersB">
            <div className="loaderA">
              <div className="ball0" />
            </div>
            <div className="loaderA">
              <div className="ball1" />
            </div>
            <div className="loaderA">
              <div className="ball2" />
            </div>
            <div className="loaderA">
              <div className="ball3" />
            </div>
            <div className="loaderA">
              <div className="ball4" />
            </div>
            <div className="loaderA">
              <div className="ball5" />
            </div>
            <div className="loaderA">
              <div className="ball6" />
            </div>
            <div className="loaderA">
              <div className="ball7" />
            </div>
            <div className="loaderA">
              <div className="ball8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
