import React from 'react';

import TextField from '../TextField';

class PostsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.post ? props.post.title : '',
            author: props.post ? props.post.author : '',
            description: props.post ? props.post.description : '',
            content: props.post
                ? props.post.content.replace(/<br\/>/gi, '\n')
                : '',
            link: props.post ? props.post.link : ''
        };

        this.formFields = [
            {
                name: 'title',
                label: 'Title',
                placeholder: 'Post\'s title'
            },
            {
                name: 'author',
                label: 'Author',
                placeholder: 'Author of this post'
            },
            {
                label: 'Description',
                name: 'description',
                placeholder: 'Post\'s description or preview'
            },
            {
                label: 'Link',
                name: 'link',
                placeholder: 'Original link for this post'
            },
            {
                label: 'Content',
                name: 'content',
                placeholder: 'Content in markdown',
                textarea: true
            }
        ];
    }

    onChange = e => {
        const { name, value } = e.target;
        this.setState(() => ({ [name]: value }));
    };

    onFormSubmit = e => {
        e.preventDefault();

        if (!this.state.content) {
            this.setState(() => ({
                error: 'Please add content for post'
            }));
        } else {
            this.setState(() => ({ error: '' }));
            this.props.onSubmit({
                title: this.state.title,
                author: this.state.author,
                content: this.state.content,
                description: this.state.description,
                link: this.state.link
            });
        }
    };

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <div className="blog-post-form__content">
                    {this.formFields.map((field, key) => {
                        return (
                            <TextField
                                {...field}
                                key={key}
                                value={this.state[field.name]}
                                onChange={this.onChange}
                            />
                        );
                    })}
                </div>
                <div className="blog-post-form__action">
                    <button className="btn btn--secondary" type="submit">
                        Save Post
                    </button>
                </div>
            </form>
        );
    }
}

export default PostsForm;
