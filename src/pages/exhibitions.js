import React from "react";
import { graphql, StaticQuery } from "gatsby";
import _get from "lodash/get";
import Img from "gatsby-image";
import { Link } from "gatsby";
import isUndefined from "lodash/isUndefined";

import Layout from "../components/layout";
import SEO from "../components/seo";

import Navigation from "../components/home/navigation";

import "../utils/normalize.css";
import "../utils/css/screen.css";

//TODO: switch to staticQuery, get rid of comments, remove unnecessary components, export as draft template
const ExhibitionsPage = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title;
  const exhibitions = data.allStrapiExhibitions.edges;

  return (
    <Layout title={siteTitle}>
      <SEO
        title="RGallery - Contemporary Arts"
        keywords={["philippines", "art", "gallery", "contemporary"]}
      />
      <Navigation logo={data.logo.childImageSharp.fixed} />

      <article className="post-content-md page-template no-image">
        <div className="post-content-body">
          <h2 id="grid-system">Exhibitions</h2>
          <hr />
          {exhibitions.map(({ node: a }) => {
            return (
              <div className="row" key={a.id}>
                <div className="col-6">
                  <h3 className="landing-h3">
                    {a.isCurrent ? "Current Exhibition" : "Previous Exhibition"}
                  </h3>
                  {!isUndefined(a.thumbnail) && (
                    <Link to={`/${a.id}`}>
                      <figure className="kg-card-exhibitions kg-image-card pad-1">
                        <Img
                          fluid={a.thumbnail.childImageSharp.fluid}
                          className="kg-image"
                          alt={a.title}
                        />
                      </figure>
                    </Link>
                  )}
                </div>
                <div className="col-6">
                  <div className="pad-2">
                    <Link to={`/${a.id}`}>
                      <h4>{a.title}</h4>
                    </Link>
                    <ul className="exhibition-date-duration">
                      <li>{a.dateFrom}</li>
                      <li>{`--->`}</li>
                      <li>{a.dateTo}</li>
                    </ul>
                    <p>{a.description}</p>
                    <button className="button default">
                      <Link to={`/${a.id}`}>Read more...</Link>
                    </button>
                    {a.virtual_tour_url && (
                      <button className="button primary">
                        <a
                          href={a.virtual_tour_url}
                          target="_blank"
                          rel="noreferrer"
                          alt="See Virtual Tour"
                        >
                          See Virtual Tour
                        </a>
                      </button>
                    )}
                    <div className="divider-full" />
                  </div>
                </div>
                <hr />
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
        description
      }
    }
    logo: file(relativePath: { eq: "horizontal-transparent.png" }) {
      childImageSharp {
        fixed(height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    allStrapiExhibitions(
      sort: { fields: dateTo, order: DESC }
      filter: { isActive: { eq: true } }
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
              fixed(width: 450) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          # artworks {
          #   thumbnail {
          #     childImageSharp {
          #       fixed(width: 450) {
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

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <ExhibitionsPage location={props.location} props data={data} {...props} />
    )}
  />
);
