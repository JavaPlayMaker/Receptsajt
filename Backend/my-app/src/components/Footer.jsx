import React from "react";
import logo from "../assets/logo.png";
import "./Footer.css";
import { Link } from "react-router";

function Footer() {

  return (
    <footer className="site-footer" aria-label="RISE N ROLL FOOTER">
      <div className="footer-inner">
        <div className="footer-brand">
          <h3>
            <Link to="/">
            <img src={logo} alt="RICE N ROLL" className="footer-logo" />
            </Link>
          </h3>
        </div>

        <div className="contact">
          <h4>Kontakt</h4>
          <p>
            Telefon: <a href="tel:+46123456789">+46 12 345 67 89</a>
            <br />
            E-post: <a href="mailto:info@ricenroll.se">info@ricenroll.se</a>
          </p>
        </div>

        <div className="footer-social">
          <p className="muted">Följ oss</p>
          <ul className="social-list">
            <li>
              <a href="#" aria-label="Instagram">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" aria-label="Facebook">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" aria-label="Pinterest">
                Pinterest
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <small>
          © {new Date().getFullYear()} RICE N ROLL — Alla rättigheter
          reserverade
        </small>
      </div>
    </footer>
  );
}

export default Footer;
