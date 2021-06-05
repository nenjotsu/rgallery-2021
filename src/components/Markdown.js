import React from 'react';
import ReactMarkdown from 'react-markdown';

const Markdown = ({ children, ...props }) => (
  <ReactMarkdown {...props} transformImageUri={uri => `https://rgallery.link${uri}`}>
    {typeof children === 'string' ? children.replace(/<br \/>/g, '  \n') : children}
  </ReactMarkdown>
);

export default Markdown;