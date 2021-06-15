import React from "react";
import Img from "gatsby-image";
import { Link } from "gatsby";
import { IconInstagram, IconFacebook } from "../icons";

export default ({ logo }) => (
  <nav>
    <ul className="nav-wrapper">
      <li>
        <Link to={`/`}>
          <Img fixed={logo} alt="RGallery Logo" />
        </Link>
      </li>
      <li className="nav-item">
        <Link to={`/`}>Home</Link>
      </li>
      <li className="nav-item">
        <Link to={`/exhibitions`}>Exhibitions</Link>
      </li>
      <li className="nav-item">
        <Link to={`/news`}>News</Link>
      </li>
      <li className="nav-item">
        <Link to={`/artists`}>Artists</Link>
      </li>
      <li className="nav-item">
        <Link to={`/visit`}>Visit</Link>
      </li>
      <li className="nav-item">
        <a
          href="https://www.instagram.com/rgallery.ph/"
          title="Instagram"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-flex" }}
        >
          <img
            style={{
              height: "1.5em",
              marginRight: 4
            }}
            src={IconInstagram}
            alt="instagram"
          />
          Instagram
        </a>
      </li>
      <li className="nav-item">
        <a
          href="https://www.facebook.com/rgalleryph"
          title="Facebook"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-flex" }}
        >
          <img
            style={{
              height: "1.5em",
              marginRight: 4
            }}
            src={IconFacebook}
            alt="facebook"
          />
          Facebook
        </a>
      </li>
    </ul>

    <ul className="nav-wrapper-mobile">
      <li>
        <Link to={`/`}>
          <Img fixed={logo} alt="RGallery Logo" />
        </Link>
      </li>
      <li className="nav-item">
        <Link to={`/`}>Home</Link>
      </li>
      <li className="nav-item">
        <Link to={`/exhibitions`}>Exhibitions</Link>
      </li>
      <li className="nav-item">
        <Link to={`/news`}>News</Link>
      </li>
      <li className="nav-item">
        <Link to={`/artists`}>Artists</Link>
      </li>
      <li className="nav-item">
        <Link to={`/visit`}>Visit</Link>
      </li>
      <li className="nav-item">
        <a
          href="https://www.instagram.com/rgallery.ph/"
          title="Instagram"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-flex" }}
        >
          <img
            style={{
              height: "1.5em",
              marginRight: 4
            }}
            src="data:image/png;base64,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"
            alt="instagram"
          />
          Instagram
        </a>
      </li>
      <li className="nav-item">
        <a
          href="https://www.facebook.com/rgalleryph"
          title="Facebook"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-flex" }}
        >
          <img
            style={{
              height: "1.5em",
              marginRight: 4
            }}
            src="data:image/png;base64,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"
            alt="instagram"
          />
          Facebook
        </a>
      </li>
    </ul>
  </nav>
);
