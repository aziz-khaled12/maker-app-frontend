import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ButtonLink = ({ to, children, className, style }) => {
  return (
    <Link to={to} className={`button-link ${className}`} style={style}>
      {children}
    </Link>
  );
};

ButtonLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string, // Allow the className to be optional
  style: PropTypes.object, // Allow custom inline styles
};

export default ButtonLink;
