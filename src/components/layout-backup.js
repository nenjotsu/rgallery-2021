import React, { useState } from "react";
import window from "global";
// import { Link } from "gatsby"
import TransitionLink from "gatsby-plugin-transition-link";
import Link from "gatsby-plugin-transition-link";
import AniLink from "gatsby-plugin-transition-link/AniLink";

const Layout = props => {
  const { title, children } = props;

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`main-height ${toggleNav ? `site-head-open` : ``}`}>
      {/* <header className="site-wrapper site-head ">
        <div className="site-head-container">
          <a
            className="nav-burger"
            href={`#`}
            onClick={() => setToggleNav(!toggleNav)}
          >
            <div
              className="hamburger hamburger--collapse"
              aria-label="Menu"
              role="button"
              aria-controls="navigation"
            >
              <div className="hamburger-box">
                <div className="hamburger-inner" />
              </div>
            </div>
          </a>
          <nav id="swup" className="site-head-left">
            <ul className="nav" role="menu">
              <li className="nav-about" role="menuitem">
                <Link to={`/about`}>About</Link>
              </li>
              <li className="nav-visit" role="menuitem">
                <Link to={`/visit`}>Visit</Link>
              </li>
              <li className="nav-artists" role="menuitem">
                <Link to={`/artists`}>Artists</Link>
              </li>
              <li className="nav-exhibitions" role="menuitem">
                <Link to={`/exhibitions`}>Exhibitions</Link>
              </li>
              <li className="nav-education" role="menuitem">
                <Link to={`/education`}>Education</Link>
              </li>
            </ul>
          </nav>
          <div className="site-head-center">
            <Link className="site-head-logo" to={`/`}>
              {title}
            </Link>
          </div>
          <div className="site-head-right">
            <div className="social-links">
              <a
                href="https://www.instagram.com/rgallery.ph/"
                title="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/rgalleryph"
                title="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
              <a
                href="https://twitter.com"
                title="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
              <Link
                to={`/rss.xml`}
                title="RSS"
                target="_blank"
                rel="noopener noreferrer"
              >
                RSS
              </Link>
            </div>
          </div>
        </div>
      </header>
       */}
      <main id="site-main" className="site-main">
        <div id="swup" className="transition-fade">
          {children}
        </div>
      </main>
      {/* <a
        className="scrollTop"
        onClick={scrollTop}
        style={{ height: 40, display: showScroll ? "block" : "none" }}
      >
        Back to top &#x2191;
      </a> */}
      <footer className="site-foot">
        &mdash; &copy; {new Date().getFullYear()} <Link to={`/`}>{title}</Link>{" "}
        &mdash;
        {/* Built with{" "} */}
        {/* <a
          href="https://gatsbyjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gatsby
        </a> */}
      </footer>
    </div>
  );
};

export default Layout;
