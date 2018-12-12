import React from 'react';
import { Link } from 'react-router-dom';

const HeaderBrand = () => (
  <Link className="blog-header__brand blog-header__brand--link" to="/">
    <h1 className="blog-header__brand-title">Redux Blog</h1>
    <h4 className="blog-header__brand-subtitle">Hand-on dev digest</h4>
  </Link>
);

export default HeaderBrand;
