import React from 'react';

import TextField from '../TextField';
// import ReactMde from 'react-mde';
// import * as Showdown from 'showdown';
// import { Editor, EditorState } from 'draft-js';

// import 'react-mde/lib/styles/scss/react-mde-all.scss';
// import 'draft-js/dist/Draft.css';

class PostsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.post ? props.post.title : '',
            author: props.post ? props.post.author : '',
            description: props.post ? props.post.description : '',
            content: props.post ? props.post.content : '',
            link: props.post ? props.post.link : ''
        };

        // this.converter = new Showdown.Converter({
        //     tables: true,
        //     simplifiedAutoLink: true,
        //     strikethrough: true,
        //     tasklists: true
        // });
    }

    onDescriptionChange = e => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };

    onTitleChange = e => {
        const title = e.target.value;
        this.setState(() => ({ title }));
    };

    onContentChange = e => {
        const content = e.target.value;
        this.setState(() => ({ content }));
    };

    onLinkChange = e => {
        const link = e.target.value;
        this.setState(() => ({ link }));
    };

    onMdeChange = mdeState => {
        console.log(mdeState);
        // this.setState((prevState) => {
        //     if (prevState.mdeState.markdown !== mdeState.markdown) {
        //         return {mdeState};
        //     }
        // });
        this.setState(() => ({ mdeState }));
    };

    onAuthorChange = e => {
        const author = e.target.value;
        this.setState(() => ({ author }));
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
                    <div className="text-field text-field--fullwidth">
                        <label className="text-field__label">Title: </label>
                        <input
                            type="text"
                            className="text-field__input"
                            placeholder="Post Title"
                            value={this.state.title}
                            onChange={this.onTitleChange}
                        />
                    </div>
                    <div className="text-field text-field--fullwidth">
                        <label className="text-field__label">Author: </label>
                        <input
                            type="text"
                            className="text-field__input"
                            placeholder="Author of post"
                            value={this.state.author}
                            onChange={this.onAuthorChange}
                        />
                    </div>
                    <div className="text-field text-field--fullwidth">
                        <label className="text-field__label">
                            Description:
                        </label>
                        <input
                            type="text"
                            className="text-field__input"
                            placeholder="Post preview content"
                            value={this.state.description}
                            onChange={this.onDescriptionChange}
                        />
                    </div>
                    <div className="text-field text-field--fullwidth">
                        <label className="text-field__label">Link:</label>
                        <input
                            type="text"
                            className="text-field__input"
                            placeholder="Post preview content"
                            value={this.state.link}
                            onChange={this.onLinkChange}
                        />
                    </div>
                    <div className="text-field text-field--fullwidth">
                        <label className="text-field__label">Content: </label>
                        <textarea
                            className="text-field__textarea"
                            value={this.state.content}
                            onChange={this.onContentChange}
                        />

                        {/* <ReactMde
                        onChange={this.onMdeChange}
                        value={this.state.mdeState}
                        generateMarkdownPreview={markdown =>
                            Promise.resolve(this.converter.makeHtml(markdown))
                        }
                    /> */}

                        {/* <Editor
                        editorState={this.state.mdeState}
                        onChange={this.onMdeChange}
                    /> */}
                    </div>
                </div>

                {/* <div>
                    <label>Tags: </label>
                    <input />
                </div> */}
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
