import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";
import isEmpty from "lodash/isEmpty";
// import { Link } from "gatsby"
// import TransitionLink from "gatsby-plugin-transition-link"

import Layout from "../components/layout";
// import Bio from "../components/bio"
// import HomeCard from "../components/homeCard"
import SEO from "../components/seo";
// import PostCard from "../components/postCard"

import Navigation from "../components/home/navigation";
import { excerptFirst, excerptSecond } from "../utils/helpers";

// import "../utils/global.scss"
import "../utils/normalize.css";
import "../utils/css/screen.css";

const showAllConsole = false;

//TODO: switch to staticQuery, get rid of comments, remove unnecessary components, export as draft template
const BlogIndex = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title;
  // const posts = data.allMarkdownRemark.edges
  const sizes = data.allStrapiSizes.edges;
  const exhibitions = data.allStrapiExhibitions.edges;

  const [exhibitionIndex, setExhibitionIndex] = React.useState(0);
  const [exhibition, setExhibition] = React.useState(exhibitions[0]);

  const handleNext = () => {
    if (exhibitionIndex < exhibitions.length - 1) {
      setExhibitionIndex(exhibitionIndex + 1);
    }
  };
  const handlePrev = () => {
    if (exhibitionIndex > 0) {
      setExhibitionIndex(exhibitionIndex - 1);
    }
  };

  React.useEffect(() => {
    setExhibition(exhibitions[exhibitionIndex]);
    console.log("exhibition", exhibitionIndex, exhibition);
  }, [exhibitionIndex]);

  let postCounter = 0;

  if (showAllConsole) {
    console.log("exhibitions", exhibitions);
    console.log("sizes", sizes);
    console.log("exhibition", exhibition);
  }

  return (
    <Layout title={siteTitle}>
      <SEO
        title="RGallery - Contemporary Arts"
        keywords={["philippines", "art", "gallery", "contemporary"]}
      />
      <div className="row">
        <div className="col-6 no-padding landing-content">
          <Navigation logo={data.logo.childImageSharp.fixed} />
          <div className="landing-left-content">
            <a onClick={handlePrev}>
              <div className="landing-left-arrow">&lsaquo;</div>
            </a>
            <h3 className="landing-h3">
              {exhibition.node.isCurrent
                ? "Current Exhibition"
                : "Previous Exhibition"}
            </h3>

            <h1 className="landing-h1">{exhibition.node.title}</h1>
            <ul className="exhibition-date-duration">
              <li>
                {exhibition.node.dateFrom}
                <br />
              </li>
              <li className="date-duration-line" />
              <li>
                <br />
                {exhibition.node.dateTo}
              </li>
            </ul>
            <div className="divider-lg" />
            <h4>{excerptFirst(exhibition.node.description)}</h4>
            <p className="description-sm">
              {excerptSecond(exhibition.node.description)}
            </p>
            {/* <button className="button primary landing-btn">Read more...</button> */}
            {exhibition.node.virtual_tour_url && (
              <button className="button secondary">
                <a
                  href={exhibition.node.virtual_tour_url}
                  target="_blank"
                  rel="noreferrer"
                  alt="See Virtual Tour"
                >
                  See Virtual Tour
                </a>
              </button>
            )}
          </div>
        </div>
        <div className="col-6 no-padding landing-content">
          <a onClick={handleNext}>
            <div className="landing-right-arrow">&rsaquo;</div>
          </a>
          <div className="text-contemporary">
            <Img fixed={data.floatingContemporary.childImageSharp.fixed} />
          </div>
          <Img fluid={exhibition.node.thumbnail.childImageSharp.fluid} />
        </div>
        <div className="quick-preview-artworks">
          {exhibition.node.artworks.length > 0 &&
            exhibition.node.artworks
              .filter((art, index) => {
                return !isEmpty(art.thumbnail) && index < 5;
              })
              .map(art => (
                <Img
                  className="quick-preview-artworks-item"
                  fixed={art.thumbnail.childImageSharp.fixed}
                />
              ))}
        </div>
      </div>
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
    phSquare: file(relativePath: { eq: "img-placeholder-square.jpg" }) {
      childImageSharp {
        fixed(height: 150) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    landingPhoto: file(relativePath: { eq: "landing/sesami-cid.png" }) {
      childImageSharp {
        fluid(maxWidth: 1360) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    logo: file(relativePath: { eq: "horizontal-transparent.png" }) {
      childImageSharp {
        fixed(height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    burgerMenu: file(relativePath: { eq: "burger-menu.png" }) {
      childImageSharp {
        fixed(height: 17) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    floatingContemporary: file(
      relativePath: { eq: "landing/contemporary-text.png" }
    ) {
      childImageSharp {
        fixed(height: 280) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    currentExhibitions: allFile(
      filter: {
        sourceInstanceName: { eq: "exhibitions" }
        extension: { eq: "md" }
      }
      limit: 5
    ) {
      edges {
        node {
          relativeDirectory
          extension
          name
          childMarkdownRemark {
            id
            excerpt(pruneLength: 160)
            html
            fields {
              slug
            }
            frontmatter {
              title
              description
            }
          }
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
    allStrapiSizes(limit: 10) {
      edges {
        node {
          id
          title
          description
          isActive
        }
      }
    }
    allStrapiExhibitions(
      limit: 10
      sort: { fields: dateTo, order: DESC } # filter: { isActive: { eq: true } }
    ) {
      edges {
        node {
          id
          title
          isActive
          isCurrent
          dateFrom(formatString: "MMMM DD, YYYY")
          dateTo(formatString: "MMMM DD, YYYY")
          description
          thumbnail {
            childImageSharp {
              fluid(maxWidth: 1360) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          artworks {
            thumbnail {
              childImageSharp {
                fixed(height: 150) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
          virtual_tour_url
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
