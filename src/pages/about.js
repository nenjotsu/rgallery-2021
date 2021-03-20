import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";

import "../utils/normalize.css";
import "../utils/css/screen.css";

const AboutPage = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout title={siteTitle}>
      <SEO title="About" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />

      <article className="post-content page-template no-image">
        <div className="post-content-body">
          <h2 id="clean-minimal-and-deeply-customisable-london-is-a-theme-made-for-people-who-appreciate-simple-lines-">
            The R Gallery is one of the rising Contemporary art-led spaces in
            the Philippines.
          </h2>
          <figure className="kg-card kg-image-card kg-width-full">
            <Img
              fluid={data.photo.childImageSharp.fluid}
              className="kg-image"
            />
            <figcaption>Caption of this image</figcaption>
          </figure>
          <h3 id="dynamic-styles">History</h3>
          <p>
            Founded in 2018, the R Gallery has come to life to showcase the
            artistic minds of both established and emerging local artists in the
            contemporary art scene.
          </p>
          <p>
            With its few years of presence, it has already made an impact in the
            Filipino art community which transcends the corners of the gallery
            as each exhibit and in-house artworks promise a transformative
            experience, both in artistic and intellectual sense.
          </p>

          <p>
            In other words, R Gallery is more than just an art space − it’s a
            place where art experiences and creativity are unfolded. We seek to
            amplify Filipino’s sense of artistry in contemporary global contexts
            and local experiences. With this, the Gallery has moved forward to
            developing vigorous educational programs for the local community.
            Its diverse range of contemporary art exhibitions and programs
            reflect the thriving borderless multi-dimensional environments of
            scholarship, artistic expression and the world we lived in.
          </p>
          {/* <p>
            London comes with photo-centric main layout best suited to
            photography, graphics portfolios and other image-heavy uses.
          </p>
          <p>
            Both post and page templates are light and minimal, with all the
            focus on the content while the design of the theme gets out of the
            way. Beneath the hood, London enjoys the full power of the{" "}
            <a href="https://docs.ghost.org/api/handlebars-themes/">
              Ghost Handlebars Theme API
            </a>{" "}
            to provide limitless customisation options and dynamic styles.
          </p>
          <p>
            Don't forget to check out the{" "}
            <a href="https://docs.ghost.org/integrations/">
              Ghost Integrations Directory
            </a>{" "}
            for more ways to integrate Ghost with your favourite services.
          </p> */}
        </div>
      </article>
    </Layout>
  );
};

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    photo: file(relativePath: { eq: "about.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1360) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <AboutPage location={props.location} data={data} {...props} />
    )}
  />
);
