import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Navigation from "../components/home/navigation";

import "../utils/normalize.css";
import "../utils/css/screen.css";

const VisitPage = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout title={siteTitle}>
      <SEO title="Visit" keywords={[`rgallery`, `schedule`, `visit`]} />
      <Navigation logo={data.logo.childImageSharp.fixed} />

      <article className="post-content-md page-template no-image">
        <div className="post-content-body">
          <h2 id="clean-minimal-and-deeply-customisable-london-is-a-theme-made-for-people-who-appreciate-simple-lines-">
            Important Announcements
          </h2>
          <hr />
          <p>
            <strong>Covid-19 Advisory</strong>: As a precautionary measure, the
            R Gallery is closed to the public until further notice. The public’s
            safety and well-being are our priority at this time. In the
            meantime, special on-site viewings are by appointment only and can
            be scheduled with the R Gallery by sending an email to{" "}
            <a href="mailto:rgallery.ph@gmail.com">rgallery.ph@gmail.com</a>.
            Further announcements about the re-opening of the Gallery will be
            made through our online platforms.
          </p>

          <div className="card">
            <div className="shadow">
              {/* <div
                className="shadowImage"
                // style={imageName(this.state.imageNumber)}
                style={{
                  backgroundImage: data.photo2.childImageSharp.fluid,
                }}
              /> */}
              <Img
                fluid={data.photo2.childImageSharp.fluid}
                className="shadowImage"
              />
            </div>
            <Img fluid={data.photo2.childImageSharp.fluid} className="image" />
            {/* <div
              className="image"
              style={{
                backgroundImage: data.photo2.childImageSharp.fluid,
              }}
            /> */}
          </div>

          {/* <figure className="kg-card kg-image-card kg-width-full">
            <Img
              fluid={data.photo.childImageSharp.fluid}
              className="kg-image"
            />
            <figcaption>Caption of this image</figcaption>
          </figure> */}
          <h3 id="dynamic-styles">Visitor’s Information</h3>
          <div className="row">
            <div className="col-6">
              <div
                style={{
                  padding: "2rem",
                  textAlign: "left"
                  //   background: "#eee",
                }}
              >
                <h4 id="heading-level-4">Hours and Admission:</h4>
              </div>
            </div>
            <div className="col-6">
              <div
                style={{
                  padding: "2rem",
                  textAlign: "left"
                  //   background: "#eee",
                }}
              >
                <h4 id="heading-level-4">Opening Hours</h4>
                <p>Monday-Saturday 11AM - 6PM</p>
                <p>The Gallery will be closed by Sunday and Holidays</p>
              </div>
            </div>
          </div>
          <h5 id="dynamic-styles">Guided Tours</h5>
          <p>
            If you plan to visit the Gallery, please contact us ahead of time so
            we can help you plan your day. To book our tour, please email{" "}
            <a href="mailto:rgallery.ph@gmail.com">rgallery.ph@gmail.com</a> or
            call (+639)17-7180-777.
          </p>
          <h5 id="dynamic-styles">Contact us</h5>
          <p>
            For any questions and inquiries, feel free to send us a message, or
            connect with us through any of our channels below. To inquire on
            available work of art, please call or text us at (+639)17-7180-777.
            You may also send us an email to{" "}
            <a href="mailto:rgallery.ph@gmail.com">rgallery.ph@gmail.com</a>.
          </p>
          <p>26 V. Luna Ave, Diliman, Quezon City, 1100 Metro Manila.</p>
          {/* <p>
            London comes with photo-centric main layout best suited to
            photography, graphics portfolios and other image-heavy uses.
          </p>
          <p>
            Both post and page templates are light and minimal, with all the
            focus on the content while the design of the theme gets out of the
            way. Beneath the hood, London enjoys the full power of the{" "}
            <a href="https://docs.ghost.org/api/handlebars-themes/">
              Ghost Handlebars Theme API
            </a>{" "}
            to provide limitless customisation options and dynamic styles.
          </p>
          <p>
            Don't forget to check out the{" "}
            <a href="https://docs.ghost.org/integrations/">
              Ghost Integrations Directory
            </a>{" "}
            for more ways to integrate Ghost with your favourite services.
          </p> */}
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
    photo: file(relativePath: { eq: "landing.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1360) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    photo2: file(relativePath: { eq: "07.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 360) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <VisitPage location={props.location} data={data} {...props} />
    )}
  />
);
