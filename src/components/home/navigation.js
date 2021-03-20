import React from "react";
import Img from "gatsby-image";
import { Link } from "gatsby";

export default ({ logo }) => (
  <nav>
    <ul className="nav-wrapper" role="menu">
      <li role="menuitem">
        <Link to={`/`}>
          <Img fixed={logo} alt="RGallery Logo" />
        </Link>
      </li>
      <li className="nav-item" role="menuitem">
        <Link to={`/`}>Home</Link>
      </li>
      <li className="nav-item" role="menuitem">
        <Link to={`/exhibitions`}>Exhibitions</Link>
      </li>
      <li className="nav-item" role="menuitem">
        <Link to={`/artists`}>Artists</Link>
      </li>
      <li className="nav-item" role="menuitem">
        <Link to={`/visit`}>Visit</Link>
      </li>
    </ul>
  </nav>
);
