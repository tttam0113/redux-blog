import React from 'react';
import { Link } from 'react-router-dom';

const PostItem = ({ item, authenticated }) => (
    <div className="blog-post-preview-container">
        <div className="blog-post-preview">
            <h1 className="blog-post-preview__title">{item.title}</h1>
            <p className="blog-post-preview__subtitle">
                Published by {item.author}
            </p>
            {/* {item.image ? (
                <div className="blog-post-preview__media">
                    <div className="blog-post-preview__media-content">
                        <img src={item.image} />
                    </div>
                </div>
            ) : null} */}
            <p className="blog-post-preview__description">
                {item.description
                    ? item.description
                    : item.content.substring(0, 40)}
            </p>
        </div>
        <div className="blog-post-action">
            <Link
                to={`/posts/${item.id}`}
                className="blog-post-action__button btn btn--surface"
            >
                More detail
            </Link>
            {authenticated ? (
                <Link
                    to={`/posts/edit/${item.id}`}
                    className="blog-post-action__button btn btn--surface"
                >
                    Edit
                </Link>
            ) : null}
        </div>
    </div>
);

export default PostItem;
