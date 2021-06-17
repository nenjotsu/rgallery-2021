const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  // const blogPost = path.resolve(`./src/templates/blog-post.js`);
  const newsPost = path.resolve(`./src/templates/news-post.js`);
  const exhibitionPost = path.resolve(`./src/templates/exhibition-post.js`);
  // allMarkdownRemark(
  //   sort: { fields: [frontmatter___date], order: DESC }
  //   limit: 1000
  // ) {
  //   edges {
  //     node {
  //       fields {
  //         slug
  //       }
  //       frontmatter {
  //         title
  //       }
  //     }
  //   }
  // }
  return graphql(
    `
      {
        allStrapiExhibitions(
          limit: 1000
          sort: { fields: dateTo, order: DESC }
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
              virtual_tour_url
              thumbnail {
                childImageSharp {
                  fluid(maxWidth: 1360) {
                    base64
                    aspectRatio
                    src
                    srcSet
                    sizes
                  }
                }
              }
            }
          }
        }
        allStrapiArticles(
          limit: 1000
          sort: { fields: published_at, order: DESC }
        ) {
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
                    base64
                    aspectRatio
                    src
                    srcSet
                    sizes
                  }
                }
              }
              body
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    // Create blog posts pages.
    // const posts = result.data.allMarkdownRemark.edges;
    const exhibitions = result.data.allStrapiExhibitions.edges;
    const news = result.data.allStrapiArticles.edges;

    news.forEach((item, index) => {
      const previous = index === news.length - 1 ? null : news[index + 1].node;
      const next = index === 0 ? null : news[index - 1].node;

      createPage({
        path: item.node.slug,
        component: newsPost,
        context: {
          slug: item.node.slug,
          previous,
          next
        }
      });
    });

    exhibitions.forEach((item, index) => {
      const previous =
        index === exhibitions.length - 1 ? null : exhibitions[index + 1].node;
      const next = index === 0 ? null : exhibitions[index - 1].node;

      createPage({
        path: item.node.id,
        component: exhibitionPost,
        context: {
          id: item.node.id,
          previous,
          next
        }
      });
    });

    // posts.forEach((post, index) => {
    //   const previous =
    //     index === posts.length - 1 ? null : posts[index + 1].node;
    //   const next = index === 0 ? null : posts[index - 1].node;

    //   createPage({
    //     path: post.node.fields.slug,
    //     component: blogPost,
    //     context: {
    //       slug: post.node.fields.slug,
    //       previous,
    //       next
    //     }
    //   });
    // });

    return null;
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};
