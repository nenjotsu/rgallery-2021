import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";
// import TransitionLink from "gatsby-plugin-transition-link"

import Layout from "../components/layout";
import Bio from "../components/bio";
import HomeCard from "../components/homeCard";
import SEO from "../components/seo";
import PostCard from "../components/postCard";

// import "../utils/global.scss"
import "../utils/normalize.css";
import "../utils/css/screen.css";
//TODO: switch to staticQuery, get rid of comments, remove unnecessary components, export as draft template
const BlogIndex = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;
  let postCounter = 0;

  return (
    <Layout title={siteTitle}>
      <SEO
        title="All posts"
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />
      <main className="landing-main">
        <div className="logo">
          <Img
            fixed={data.logo.childImageSharp.fixed}
            alt="RGallery Logo"
            className=""
          />
        </div>
        <section className="landing-img">
          <Img fluid={data.landingPhoto.childImageSharp.fluid} className="" />
        </section>
        <div className="left-text row">
          <div className="left-text-lg">contemporary</div>
          <div className="left-text-sm">arts</div>
        </div>
        <div className="right-text row">
          <div className="right-text-lg">creativity</div>
          <div className="right-text-sm">unfolded</div>
        </div>
        <div className="btn-start-wrapper row">
          <button className="btn-start">Start & Discover</button>
        </div>
        <nav
          style={{
            // position: "absolute",
            zIndex: 4
            // bottom: "-3rem",
            // right: "11rem",
          }}
          className="row"
        >
          <ul
            style={{
              display: "inline-flex"
            }}
          >
            <li>About</li>
            <li>Visit</li>
            <li>Artists</li>
            <li>Exhibitions</li>
            <li>Blog</li>
          </ul>
        </nav>
      </main>
    </Layout>
  );
};

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    photo: file(relativePath: { eq: "about.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1360) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    landingPhoto: file(relativePath: { eq: "landing.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1360) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    logo: file(relativePath: { eq: "logo-v2.png" }) {
      childImageSharp {
        fixed(width: 361, height: 220) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 1360) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <BlogIndex location={props.location} props data={data} {...props} />
    )}
  />
);
