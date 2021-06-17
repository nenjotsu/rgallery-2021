import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { Link } from "gatsby";
import isEmpty from "lodash/isEmpty";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Navigation from "../components/home/navigation";
import Markdown from "../components/Markdown";

const RelatedArticles = ({ node }) => (
  <div className="col-6" key={node.id}>
    <Link to={`/${node.slug}`}>
      <figure className="kg-card-exhibitions kg-image-card">
        <Img
          fluid={node.cover_photo.childImageSharp.fluid}
          className="kg-image"
        />
        <figcaption>{node.slug}</figcaption>
      </figure>
    </Link>
    <Link to={`/${node.slug}`}>
      <h4>{node.title}</h4>
    </Link>
    <p>{node.description}</p>
  </div>
);

class NewsPostTemplate extends React.Component {
  render() {
    const { data, location } = this.props;
    const post = data.article;
    const allArticles = data.allStrapiArticles.edges;
    const currentIndex = allArticles.findIndex(a => a.node.id === post.id);
    const siteTitle = data.site.siteMetadata.title;
    const siteMetadata = data.site.siteMetadata;
    const prev = allArticles[currentIndex - 1];
    const next = allArticles[currentIndex + 1];

    let ogImage = "";
    if (!isEmpty(post.cover_photo.childImageSharp.fixed.src)) {
      ogImage = `${siteMetadata.siteUrl}/${post.cover_photo.childImageSharp.fixed.src}`;
    }

    return (
      <Layout location={location} title={siteTitle}>
        <SEO
          title={post.title}
          description={post.description || post.title}
          ogImage={ogImage}
        />
        <div className="row">
          <Navigation logo={data.logo.childImageSharp.fixed} />
        </div>
        <article
          className={`post-content-md ${post.cover_photo || `no-image`}`}
        >
          <header className="post-content-header">
            <h1 className="post-content-title">{post.title}</h1>
          </header>
          {post.description && (
            <p className="post-content-excerpt">{post.description}</p>
          )}
          <hr />
          {post.published_at && (
            <p>
              <small>Date Published:</small> {post.published_at}
            </p>
          )}
          {post.cover_photo && (
            <div className="post-content-image">
              <Img
                className="kg-image"
                fluid={post.cover_photo.childImageSharp.fluid}
                alt={post.title}
              />
            </div>
          )}

          {post.body && (
            <Markdown
              className="post-content-body"
              // source={post.body}
            >
              {post.body}
            </Markdown>
          )}
          <hr />
          <h2 className="post-content-title">Related News</h2>

          <div className="row main-news">
            {prev && <RelatedArticles node={prev.node} />}
            {next && <RelatedArticles node={next.node} />}
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

    // return (
    //   <Layout location={this.props.location} title={siteTitle}>
    //     <SEO
    //       title={post.frontmatter.title}
    //       description={post.frontmatter.description || post.excerpt}
    //     />
    //     <article
    //       className={`post-content ${post.frontmatter.thumbnail || `no-image`}`}
    //     >
    //   <header className="post-content-header">
    //     <h1 className="post-content-title">{post.frontmatter.title}</h1>
    //   </header>

    //   {post.frontmatter.description && (
    //     <p className="post-content-excerpt">
    //       {post.frontmatter.description}
    //     </p>
    //   )}

    //   {post.frontmatter.thumbnail && (
    //     <div className="post-content-image">
    //       <Img
    //         className="kg-image"
    //         fluid={post.frontmatter.thumbnail.childImageSharp.fluid}
    //         alt={post.frontmatter.title}
    //       />
    //     </div>
    //   )}

    //   <div
    //     className="post-content-body"
    //     dangerouslySetInnerHTML={{ __html: post.html }}
    //   />

    //       <footer className="post-content-footer">
    //         {/* There are two options for how we display the byline/author-info.
    //     If the post has more than one author, we load a specific template
    //     from includes/byline-multiple.hbs, otherwise, we just use the
    //     default byline. */}
    //       </footer>
    //     </article>
    //   </Layout>
    // );
  }
}

export default NewsPostTemplate;

export const pageQuery = graphql`
  query NewsPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    logo: file(relativePath: { eq: "square-logo.png" }) {
      childImageSharp {
        fixed(height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    article: strapiArticles(slug: { eq: $slug }) {
      id
      title
      slug
      description
      body
      created_at(formatString: "MMMM DD, YYYY")
      published_at(formatString: "MMMM DD, YYYY")
      cover_photo {
        childImageSharp {
          fluid(maxWidth: 1360) {
            ...GatsbyImageSharpFluid
          }
          fixed(height: 350) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
    allStrapiArticles(sort: { fields: published_at, order: DESC }) {
      edges {
        node {
          id
          slug
          title
          cover_photo {
            childImageSharp {
              fluid(maxWidth: 300) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
      totalCount
    }
  }
`;
