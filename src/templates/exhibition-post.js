import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { Link } from "gatsby";
import isUndefined from "lodash/isUndefined";
import isEmpty from "lodash/isEmpty";

// import ShareButton from "../components/share";
// import CustomShareButton from '../components/customShare';

import Markdown from "../components/Markdown";

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
    const siteMetadata = data.site.siteMetadata;
    const prev = all[currentIndex - 1];
    const next = all[currentIndex + 1];

    let ogImage = "";
    if (!isEmpty(post.thumbnail.childImageSharp.fixed.src)) {
      ogImage = `${siteMetadata.url}${post.thumbnail.childImageSharp.fixed.src}`;
    }

    const fbShareHandle = () => {
      console.log("url fbshare", `${siteMetadata.siteUrl}${post.id}`);
      // window.FB.init({
      //   appId            : '1676983692485901',
      //   autoLogAppEvents : true,
      //   xfbml            : true,
      //   version          : 'v2.10'
      // });
      // window.FB.AppEvents.logPageView();

      window.FB.ui(
        {
          display: "popup",
          method: "share",
          href: `${siteMetadata.siteUrl}${post.id}`
        },
        function(response) {}
      );
    };

    return (
      <Layout location={location} title={siteTitle}>
        <SEO
          title={post.title}
          description={post.description || post.title}
          meta={[
            {
              property: "og:url",
              content: `${siteMetadata.siteUrl}/${post.id}`
            },
            {
              property: "og:image",
              content: ogImage
            },
            {
              property: "og:site_name",
              content: `${siteTitle} - ${post.title}`
            }
          ]}
        />
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
            <Markdown
              className="post-content-body"
              // source={post.content}
            >
              {post.content}
            </Markdown>
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
        {/* <ShareButton
          title={`${post.title} - ${post.description}`}
          url={`${siteMetadata.url}/${post.id}`}
          twitterHandle={siteMetadata.twitterHandle}
          tags={["exhibitions"]}
        /> */}
        {/* <button onClick={fbShareHandle}>Share FB</button> */}
        {/* <a
          href=""
          data-layout="button"
          // onClick={window.open(`https://www.facebook.com/sharer.php?u=${siteMetadata.siteUrl}%2F${post.id}%2F&summary=MySummary&title=MyTitle&description=MyDescription&picture=${ogImage}`, 'ventanacompartir', 'toolbar=0, status=0, width=650, height=450')}
        >
          Share
        </a> */}
        {/* <CustomShareButton url={`${siteMetadata.siteUrl}/${post.id}`} text="short text" longtext="longtext" /> */}
        {/* <ShareButton
          socialConfig={{
            twitterHandle: siteMetadata.twitterHandle,
            config: {
              url: `${siteMetadata.siteUrl}${currentIndex.id}`,
              title: siteMetadata.title,
            },
          }}
          tags={['exhibitions']}
        /> */}
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
        siteUrl
        url
        twitterHandle
        instagramHandle
        facebookHandle
      }
    }
    logo: file(relativePath: { eq: "square-logo.png" }) {
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
          fixed(height: 350) {
            ...GatsbyImageSharpFixed
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
