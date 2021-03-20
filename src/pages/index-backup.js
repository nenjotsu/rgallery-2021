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
      {/* <Bio /> */}
      {/* <main className="app-wrapper"> */}
      {/* <div class="app"> */}
      {/* <h1>Some headline</h1> */}

      {/* <ul class="hs full"> */}
      {/* <li class="item transparent">
              {data.site.siteMetadata.description && (
                <header className="page-head">
                  <h2 className="page-head-title">
                    {data.site.siteMetadata.description}
                    This is a placeholder description about RGallery
                  </h2>
                  <p>Another text of lorem ipsum</p>
                </header>
              )}
            </li> */}
      {/* <li class="item exhibition-card"> */}
      {/* <li class=""> */}
      {/* <HomeCard /> */}
      {/* <figure class="snip0016">
                <img
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample42.jpg"
                  alt="sample42"
                />
                <figcaption>
                  <h2>
                    I suppose if we couldn't <span>laugh</span>
                  </h2>
                  <p>
                    At things that don't make sense, we couldn't react to a lot
                    of life.
                  </p>
                  <a href="#" />
                </figcaption>
              </figure> */}
      {/* </li>
            <li class="item exhibition-card">test</li>
            <li class="item exhibition-card">test</li>
            <li class="item exhibition-card">test</li>
            <li class="item transparent">test</li>
          </ul> */}

      {/* <figure class="snip1482 hover">
            <figcaption>
              <h2>Desmond Eagle</h2>
              <p>Until you stalk and overrun, you can't devour anyone.</p>
            </figcaption>
            <a href="#" />
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample59.jpg"
              alt="sample59"
            />
          </figure>
          <figure class="snip1482">
            <figcaption>
              <h2>Benjamin Evalent</h2>
              <p>There's never enough time to do all the nothing you want.</p>
            </figcaption>
            <a href="#" />
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample60.jpg"
              alt="sample60"
            />
          </figure> */}

      {/* <div className="app-wrapper">
            <ul class="hs2 full no-scrollbar">
              <li class="item">test</li>
              <li class="item">test</li>
              <li class="item">test</li>
              <li class="item">test</li>
              <li class="item">test</li>
              <li class="item">test</li>
              <li class="item">test</li>
              <li class="item">test</li>
              <li class="item">test</li>
              <li class="item">test</li>
              <li class="item">test</li>
              <li class="item">test</li>
            </ul>
          </div> */}

      {/* <div class="container">
            <div class="item">
              <h3>Block for context</h3>
            </div>
          </div> */}
      {/* </div> */}
      {/* </main> */}
      {/* <div className="post-feed">
        {posts.map(({ node }) => {
          postCounter++

          return (
            <PostCard
              key={node.fields.slug}
              count={postCounter}
              node={node}
              postClass={`post`}
            />
          )
        })}
      </div> */}

      {/* <article className="post-content-md page-template no-image">
        <div className="post-content-body">
          <h2 id="grid-system">What to know before investing in art?</h2>
          <div className="row">
            <div className="col-4">
              <div
                style={{
                  padding: "2rem",
                  textAlign: "center",
                  background: "#eee",
                }}
              >
                <h4 id="heading-level-4">Research the artist</h4>
                <p>
                  Generally, an artist with an interesting Back-story tends to
                  generate more interest among buyers.
                </p>
              </div>
            </div>
            <div className="col-4">
              <div
                style={{
                  padding: "2rem",
                  textAlign: "center",
                  background: "#eee",
                }}
              >
                <h4 id="heading-level-4">Research the artwork</h4>
                <p>
                  First on your list should be the question of it's
                  authenticity. If a work of art is damaged or substantially
                  restored, it can effect its value greatly.
                </p>
              </div>
            </div>
            <div className="col-4">
              <div
                style={{
                  padding: "2rem",
                  textAlign: "center",
                  background: "#eee",
                }}
              >
                <h4 id="heading-level-4">Investigate the gallery</h4>
                <p>
                  Researching the reputability of a gallery an be much easier.
                  They feature their top artists, and information on past
                  exhibits can be found on their websites and through
                  word-of-mouth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article> */}
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
