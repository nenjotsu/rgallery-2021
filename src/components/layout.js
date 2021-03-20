import React, { useState } from "react";
import Img from "gatsby-image";
// import { Link } from "gatsby"
import TransitionLink from "gatsby-plugin-transition-link";
import Link from "gatsby-plugin-transition-link";
import AniLink from "gatsby-plugin-transition-link/AniLink";

const Layout = props => {
  const { title, children } = props;
  const [toggleNav, setToggleNav] = React.useState(false);

  const [showScroll, setShowScroll] = useState(false);
  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };
  window.addEventListener("scroll", checkScrollTop);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // className={`main-height ${toggleNav ? `site-head-open` : ``}`}
  // transition-fade
  return (
    <main id="site-main" className="site-main">
      {children}
    </main>
  );
};

export default Layout;
