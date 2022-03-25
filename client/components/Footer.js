import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <>
      <hr />
      <div className="footer-container">
        <ul>
          <h4>Menu</h4>
          <li>Features</li>
          <li>About</li>
          <li>Careers</li>
          <li>Terms</li>
        </ul>
        <ul>
          <h4>Follow</h4>
          <li>Facebook</li>
          <li>Instagram</li>
          <li>Youtube</li>
        </ul>
      </div>
    </>
  );
};
export default Footer;
