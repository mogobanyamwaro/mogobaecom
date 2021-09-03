import React, { Fragment } from 'react';

const Footer = () => {
  return (
    <Fragment>
      <footer>
        <div className="main-content">
          <div className="left box">
            <h2>About Us</h2>
            <div className="content">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perferendis, repellendus nostrum, asperiores earum assumenda
                nobis recusandae deserunt delectus nihil, quo enim molestias
                accusantium nam corrupti facere quasi minus illum? Laudantium!
              </p>
              <div className="social">
                <a href="#">
                  <span className="fab fa-facebook"></span>
                </a>
                <a href="#">
                  <span className="fab fa-twitter"></span>
                </a>
                <a href="#">
                  <span className="fab fa-linkedin"></span>
                </a>
                <a href="#">
                  <span className="fab fa-youtube"></span>
                </a>
              </div>
            </div>
          </div>
          <div className="center box">
            <h2>Address</h2>
            <div className="content">
              <div className="place">
                <div className="fas fa-map-market-alt"></div>
                <span className="text">Nairobi,Kenya</span>
              </div>
              <div className="phone">
                <div className="fas fa-phone-alt"></div>
                <span className="text">0725523820</span>
              </div>
              <div className="email">
                <div className="fas fa-envelope"></div>
                <span className="text">douglasmogoba@gmail.com</span>
              </div>
            </div>
          </div>
          <div className="right box">
            <h2>contact us</h2>
            <div className="content">
              <form action="#">
                <div className="email">
                  <div className="text">Email *</div>
                  <input required type="email" name="" id="" />
                </div>
                <div className="msg">
                  <div className="text">Message *</div>
                  <textarea required cols="30" rows="2"></textarea>
                </div>
                <button className="btn">Send</button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
