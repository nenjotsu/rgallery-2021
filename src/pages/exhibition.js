import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";
import _get from "lodash/get";

import Layout from "../components/layout";
import SEO from "../components/seo";

import Navigation from "../components/home/navigation";
import Slider from "../components/slider";

import "../utils/normalize.css";
import "../utils/css/screen.css";

//TODO: switch to staticQuery, get rid of comments, remove unnecessary components, export as draft template
// class BlogPostTemplate extends React.Component {
const ExhibitionSinglePage = ({ data, location }) => {
  // render() {
  // const data = this.props.data;
  const siteTitle = data.site.siteMetadata.title;
  const exhibitions = data.allStrapiExhibitions.edges;

  console.log("exhibitions", exhibitions);

  const exhibitionsSlides = exhibitions.map(({ node }, index) => ({
    index,
    headline: node.title,
    virtualTourUrl: node.virtual_tour_url,
    dateFrom: node.dateFrom,
    dateTo: node.dateTo,
    thumbnail: node.thumbnail.childImageSharp
  }));

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title="RGallery - Contemporary Arts"
        keywords={["philippines", "art", "gallery", "contemporary"]}
      />
      <div className="row">
        <div className="col-6 no-padding landing-content">
          <Navigation logo={data.logo.childImageSharp.fixed} />
        </div>
      </div>
      <div className="row">
        <article className="col-12 post-content page-template no-image">
          <div className="post-content-body">
            <h2 id="grid-system">Grid system</h2>
            <figure className="kg-card kg-image-card">
              <Img
                fluid={data.smallPic.childImageSharp.fluid}
                className="kg-image"
              />
              <figcaption>Regular image</figcaption>
            </figure>
            <div className="row">
              <div className="col-12">
                <div
                  style={{
                    padding: "1rem 0",
                    textAlign: "center",
                    background: "#eee"
                  }}
                >
                  12
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <div
                  style={{
                    padding: "1rem 0",
                    textAlign: "center",
                    background: "#eee"
                  }}
                >
                  3
                </div>
              </div>
              <div className="col-9">
                <div
                  style={{
                    padding: "1rem 0",
                    textAlign: "center",
                    background: "#eee"
                  }}
                >
                  9
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
};

const indexQuery = exhibitionId => graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    smallPic: file(
      relativePath: { eq: "fabio-comparelli-696506-unsplash.jpg" }
    ) {
      childImageSharp {
        fluid(maxWidth: 1360) {
          ...GatsbyImageSharpFluid
        }
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
    allStrapiExhibitions(limit: 10) # filter: { id: { eq: exhibitionId } }
    {
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
              fixed(width: 450) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          # artworks {
          #   thumbnail {
          #     childImageSharp {
          #       fixed(width: 1024) {
          #         ...GatsbyImageSharpFixed
          #       }
          #     }
          #   }
          # }
          virtual_tour_url
        }
      }
    }
  }
`;

export default props => {
  console.log("location", props.location);

  const getParameterByName = (name, url = props.location.href) => {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  };

  const id = getParameterByName("id");
  console.log("id", getParameterByName("id"));

  return (
    <StaticQuery
      query={indexQuery(id)}
      render={data => (
        <ExhibitionSinglePage
          location={props.location}
          props
          data={data}
          {...props}
        />
      )}
    />
  );
};
