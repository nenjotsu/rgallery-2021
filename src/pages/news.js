import React from "react";
import { graphql, StaticQuery } from "gatsby";
import { Link } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";

import Navigation from "../components/home/navigation";

import "../utils/normalize.css";
import "../utils/css/screen.css";

const ArticlesPage = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title;
  const articles = data.allStrapiArticles.edges;

  return (
    <Layout title={siteTitle}>
      <SEO
        title="RGallery - Contemporary Arts"
        keywords={["philippines", "art", "gallery", "contemporary"]}
      />
      <div className="row">
        <div className="col-6 no-padding landing-content">
          <Navigation logo={data.logo.childImageSharp.fixed} />
        </div>
        <article className="post-content-lg page-template no-image">
          <div className="post-content-body">
            <h2 id="grid-system">News</h2>
            <hr />

            <div className="row main-news">
              {articles.map(({ node: a }) => (
                <div className="col-4" key={a.id}>
                  <Link to={`/${a.slug}`}>
                    <figure className="kg-card-exhibitions kg-image-card">
                      <Img
                        fluid={a.cover_photo.childImageSharp.fluid}
                        className="kg-image"
                      />
                      <figcaption>{a.slug}</figcaption>
                    </figure>
                  </Link>
                  <Link to={`/${a.slug}`}>
                    <h4>{a.title}</h4>
                  </Link>

                  <p>{a.description}</p>
                </div>
              ))}
            </div>
          </div>
        </article>
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
    logo: file(relativePath: { eq: "horizontal-transparent.png" }) {
      childImageSharp {
        fixed(height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    allStrapiArticles(limit: 20, sort: { fields: published_at, order: DESC }) {
      edges {
        node {
          id
          title
          slug
          description
          body
          created_at(formatString: "MMMM DD, YYYY")
          cover_photo {
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
`;

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <ArticlesPage location={props.location} props data={data} {...props} />
    )}
  />
);
