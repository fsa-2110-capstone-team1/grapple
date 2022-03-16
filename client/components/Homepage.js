import React from 'react';
import AuthForm from './Auth/AuthForm';

export const Home = () => {
  return (
    <div>
      <div>
        <div className="home-title">
          <h1>Challenge your friends. Challenge yourself.</h1>
        </div>
      </div>
      <div className="home-text-div">
        <div className="nother-div">
          <h4>
            Welcome to Grapple! The only app where you get serious about your
            phsyical and mental health. Compete in challenges alone or with a
            friend to see if you can achieve your goals.
          </h4>
        </div>
      </div>
      <div className="home-img-div">
        <img className="home-img" src="homeImgs/grapple-home-runner.jpeg" />
      </div>
      <AuthForm />
    </div>
  );
};
export default Home;
