import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Navigation from "../components/home/navigation";

import "../utils/normalize.css";
import "../utils/css/screen.css";

const ArtistsPage = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title;
  const artists = data.allStrapiArtists.edges;

  console.log("artists", artists);

  return (
    <Layout title={siteTitle}>
      <SEO
        title="Artists"
        keywords={[`artist`, `rgallery`, `artwork`, `contemporary`]}
      />
      <Navigation logo={data.logo.childImageSharp.fixed} />

      <article className="post-content-md page-template no-image">
        <div className="post-content-body">
          <h2 id="grid-system">Represented Artists Bio</h2>
          <hr />
          {artists.map(({ node: a }) => {
            return (
              <div className="row" id="mori">
                <div className="col-6">
                  <figure className="kg-card kg-image-card pad-2">
                    <Img
                      fluid={a.profilePicture.childImageSharp.fluid}
                      className="kg-image"
                    />
                    {/* <figcaption>caption here</figcaption> */}
                  </figure>
                </div>
                <div className="col-6">
                  <div className="pad-2">
                    <h4>{a.name}</h4>
                    <p>{a.biography}</p>
                  </div>
                </div>
              </div>
            );
          })}
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
    logo: file(relativePath: { eq: "horizontal-transparent.png" }) {
      childImageSharp {
        fixed(height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    photo: file(relativePath: { eq: "about.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1360) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allStrapiArtists(
      # limit: 10
      # sort: { fields: dateTo, order: DESC }
      filter: { isFeaturedArtist: { eq: true } }
    ) {
      edges {
        node {
          id
          name
          nickname
          biography
          # dateJoined(formatString: "MMMM DD, YYYY")
          profilePicture {
            childImageSharp {
              fluid(maxWidth: 1360) {
                ...GatsbyImageSharpFluid
              }
              fixed(width: 450) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          # featuredArts {
          #   thumbnail {
          #     childImageSharp {
          #       fixed(width: 1024) {
          #         ...GatsbyImageSharpFixed
          #       }
          #     }
          #   }
          # }
        }
      }
    }
  }
`;

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <ArtistsPage location={props.location} data={data} {...props} />
    )}
  />
);
