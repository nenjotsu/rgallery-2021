import React from "react";
import { graphql, StaticQuery } from "gatsby";
import _get from "lodash/get";

import Layout from "../components/layout";
import SEO from "../components/seo";

import Navigation from "../components/home/navigation";
import Slider from "../components/slider";

import "../utils/normalize.css";
import "../utils/css/screen.css";

//TODO: switch to staticQuery, get rid of comments, remove unnecessary components, export as draft template
const ExhibitionsPage = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title;
  const exhibitions = data.allStrapiExhibitions.edges;

  const exhibitionsSlides = exhibitions.map(({ node }, index) => ({
    id: node.id,
    index,
    headline: node.title,
    virtualTourUrl: node.virtual_tour_url,
    dateFrom: node.dateFrom,
    dateTo: node.dateTo,
    thumbnail: _get(node, "thumbnail.childImageSharp", null)
  }));

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
        <section id="right-scroll">
          <Slider heading="Exhibitions" slides={exhibitionsSlides} />
        </section>
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
