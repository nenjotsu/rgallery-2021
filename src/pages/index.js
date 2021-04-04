import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";
import { Carousel } from "react-responsive-carousel";
import ReactMarkdown from "react-markdown";
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
import "../utils/css/carousel.css";

const showAllConsole = true;

//TODO: switch to staticQuery, get rid of comments, remove unnecessary components, export as draft template
const BlogIndex = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title;
  // const posts = data.allMarkdownRemark.edges
  // const sizes = data.allStrapiSizes.edges;
  const exhibitions = data.allStrapiExhibitions.edges;
  const banners = data.allStrapiBanners.edges;
  const articles = data.allStrapiArticles.edges;

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
  }, [exhibitionIndex]);

  let postCounter = 0;

  if (showAllConsole) {
    // console.log("exhibitions", exhibitions);
    // console.log("sizes", sizes);
    // console.log("exhibition", exhibition);
    console.log("articles", articles);
  }

  return (
    <Layout title={siteTitle}>
      <SEO
        title="RGallery - Contemporary Arts"
        keywords={["philippines", "art", "gallery", "contemporary"]}
      />
      <div className="row">
        <Navigation logo={data.logo.childImageSharp.fixed} />
      </div>
      <div className="row">
        <Carousel
          showArrows={true}
          onChange={() => {}}
          onClickItem={() => {}}
          onClickThumb={() => {}}
          autoPlay={false}
          stopOnHover={false}
          infiniteLoop={true}
          swipeable
          dynamicHeight
          emulateTouch
          interval={5000}
        >
          {banners.map(({ node: b }) => (
            <div key={b.id}>
              <Img fluid={b.cover.childImageSharp.fluid} />
              <div className="legend">
                <h4>{b.title}</h4>
                <p>{b.description}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <article className="post-content-lg page-template no-image">
        <div className="post-content-body">
          <h2 id="grid-system">News</h2>
          <hr />

          <div className="row main-news">
            {articles.map(({ node: a }) => (
              <div className="col-4" key={a.id}>
                <figure className="kg-card-exhibitions kg-image-card">
                  <Img
                    fluid={a.cover_photo.childImageSharp.fluid}
                    className="kg-image"
                  />
                  <figcaption>{a.slug}</figcaption>
                </figure>
                <h4>{a.title}</h4>
                <p>{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </article>
      <div className="row">
        <div className="col-6 no-padding landing-content">
          <div className="landing-left-content">
            {/* <a onClick={handlePrev}>
              <div className="landing-left-arrow">&lsaquo;</div>
            </a> */}
            <h3 className="landing-h3">
              {exhibition.node.isCurrent
                ? "Current Exhibition"
                : "Previous Exhibition"}
            </h3>
            <hr />

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

            {/* <ReactMarkdown
              source={exhibition.node.content} 
              transformImageUri={uri =>
                uri.startsWith("http") ? uri : `http://3.1.35.180:1337${uri}`
              }
            /> */}
          </div>
        </div>
        <div className="col-6 no-padding landing-content">
          {/* <a onClick={handleNext}>
            <div className="landing-right-arrow">&rsaquo;</div>
          </a> */}
          <div className="text-contemporary">
            <Img fixed={data.floatingContemporary.childImageSharp.fixed} />
          </div>
          <Img fluid={exhibition.node.thumbnail.childImageSharp.fluid} />
        </div>
        {/* <div className="quick-preview-artworks">
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
        </div> */}
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
    # allStrapiSizes(limit: 10) {
    #   edges {
    #     node {
    #       id
    #       title
    #       description
    #       isActive
    #     }
    #   }
    # }
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
          content
          thumbnail {
            childImageSharp {
              fluid(maxWidth: 1360) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          # artworks {
          #   thumbnail {
          #     childImageSharp {
          #       fixed(height: 150) {
          #         ...GatsbyImageSharpFixed
          #       }
          #     }
          #   }
          # }
          virtual_tour_url
        }
      }
    }
    allStrapiBanners(limit: 20) {
      edges {
        node {
          id
          title
          description
          cover {
            childImageSharp {
              fluid(maxWidth: 1360) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    allStrapiArticles(limit: 3) {
      edges {
        node {
          id
          title
          slug
          description
          created_at(formatString: "MMMM DD, YYYY")
          cover_photo {
            childImageSharp {
              fluid(maxWidth: 1360) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          body
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
