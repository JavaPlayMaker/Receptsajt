import React from "react";
import logo from "../assets/RICE-N-ROLL.png";
import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
import pinterest from "../assets/pinterest.png";
import "./Interactive/Footer.css";

function Footer() {
  return (
    <footer className="site-footer" aria-label="RISE N ROLL FOOTER">
      <div className="footer-inner">
        <div className="footer-brand">
          <h3>
            <img src={logo} alt="RICE N ROLL" className="footer-logo" />
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
              <a href="https://www.facebook.com" aria-label="Facebook">
                  <img src={facebook} alt="Facebook" />

              </a>
            </li>
            <li>
              <a href="https://www.instagram.com" aria-label="Instagram">
                  <img src={instagram} alt="Instagram" />
              </a>
            </li>
            <li>
              <a href="https://www.pinterest.com" aria-label="Pinterest">
                  <img src={pinterest} alt="Pinterest"/>
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
