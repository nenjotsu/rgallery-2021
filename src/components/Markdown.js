import React from "react";
import ReactMarkdown from "react-markdown";

const Markdown = ({ children, ...props }) => (
  <ReactMarkdown
    {...props}
    transformImageUri={(uri, children) => {
      // console.log('props', props, uri, children);
      return `https://rgallery.link${uri}`;
    }}
  >
    {typeof children === "string"
      ? children.replace(/<br \/>/g, "  \n")
      : children}
  </ReactMarkdown>
);

export default Markdown;
