import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import ReactMarkdown from "react-markdown";
import { Link } from "gatsby";
import isUndefined from "lodash/isUndefined";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Navigation from "../components/home/navigation";
import { elipsis } from "../utils/helpers";

const RelatedPost = ({ node }) => (
  <div className="col-6" key={node.id}>
    <Link to={`/${node.id}`}>
      <figure className="kg-card-exhibitions kg-image-card">
        {!isUndefined(node.thumbnail) && (
          <Img
            fluid={node.thumbnail.childImageSharp.fluid}
            className="kg-image"
          />
        )}
        <figcaption>{node.title}</figcaption>
      </figure>
    </Link>
    <Link to={`/${node.id}`}>
      <h4>{node.title}</h4>
    </Link>
    <p>{elipsis(node.description, 200)}</p>
  </div>
);

class ExhibitionPostTemplate extends React.Component {
  render() {
    const { data, location } = this.props;
    const post = data.exhibition;
    const all = data.allStrapiExhibitions.edges;
    const currentIndex = all.findIndex(a => a.node.id === post.id);
    const siteTitle = data.site.siteMetadata.title;
    const prev = all[currentIndex - 1];
    const next = all[currentIndex + 1];
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title={post.title} description={post.description || post.title} />
        <div className="row">
          <Navigation logo={data.logo.childImageSharp.fixed} />
        </div>
        <article className={`post-content-md ${post.thumbnail || `no-image`}`}>
          <header className="post-content-header">
            <h1 className="post-content-title">
              {post.title}{" "}
              {post.isCurrent === true && (
                <>
                  <br />
                  <small>CURRENT EXHIBITION</small>
                </>
              )}
            </h1>
          </header>
          {post.description && (
            <p className="post-content-excerpt">{post.description}</p>
          )}
          <ul className="exhibition-date-duration">
            <li>
              {post.dateFrom}
              <br />
            </li>
            <li className="date-duration-line" />
            <li>
              <br />
              {post.dateTo}
            </li>
          </ul>
          <hr />
          {post.published_at && (
            <p>
              <small>Date Published:</small> {post.published_at}
            </p>
          )}
          {post.thumbnail && (
            <div className="post-content-image">
              <Img
                className="kg-image"
                fluid={post.thumbnail.childImageSharp.fluid}
                alt={post.title}
              />
            </div>
          )}

          {post.content && (
            <ReactMarkdown
              className="post-content-body"
              source={post.content}
              transformImageUri={uri => `https://rgallery.link${uri}`}
            />
          )}
          <hr />
          <h2 className="post-content-title">Related Exhibitions</h2>

          <div className="row main-news">
            {prev && <RelatedPost node={prev.node} />}
            {next && <RelatedPost node={next.node} />}
          </div>

          <footer className="post-content-footer">
            <hr />
            <p>
              For any questions and inquiries, feel free to send us a message,
              or connect with us through any of our channels below. To inquire
              on available work of art, please call or text us at
              (+639)17-7180-777. You may also send us an email to{" "}
              <a href="mailto:admin@rgallery.ph">admin@rgallery.ph</a>.
            </p>
          </footer>
        </article>
      </Layout>
    );
  }
}

export default ExhibitionPostTemplate;

export const pageQuery = graphql`
  query ExhibitionPostBySlug($id: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    logo: file(relativePath: { eq: "horizontal-transparent.png" }) {
      childImageSharp {
        fixed(height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    exhibition: strapiExhibitions(id: { eq: $id }) {
      id
      title
      isActive
      isCurrent
      dateFrom(formatString: "MMMM DD, YYYY")
      dateTo(formatString: "MMMM DD, YYYY")
      description
      content
      published_at(formatString: "MMMM DD, YYYY")
      thumbnail {
        childImageSharp {
          fluid(maxWidth: 1360) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      virtual_tour_url
    }
    allStrapiExhibitions(
      sort: { fields: published_at, order: DESC }
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
          content
          thumbnail {
            childImageSharp {
              fluid(maxWidth: 1360) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          virtual_tour_url
        }
      }
      totalCount
    }
  }
`;
