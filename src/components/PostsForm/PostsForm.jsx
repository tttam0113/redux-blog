import React from 'react';
import TextField from '../TextField';

class PostsForm extends React.Component {
  constructor(props) {
    super(props);

    const { post = {} } = this.props;
    const { title = '', author = '', description = '', content = '', link = '' } = post;

    this.state = {
      title,
      author,
      description,
      link,
      content: content.replace(/<br\/>/gi, '\n'),
    };

    this.formFields = [
      {
        name: 'title',
        label: 'Title',
        placeholder: "Post's title",
      },
      {
        name: 'author',
        label: 'Author',
        placeholder: 'Author of this post',
      },
      {
        label: 'Description',
        name: 'description',
        placeholder: "Post's description or preview",
      },
      {
        label: 'Link',
        name: 'link',
        placeholder: 'Original link for this post',
      },
      {
        label: 'Content',
        name: 'content',
        placeholder: 'Content in markdown',
        textarea: true,
      },
    ];
  }

  handleOnChange = e => {
    const { name, value } = e.target;
    this.setState(() => ({ [name]: value }));
  };

  handleOnSubmit = e => {
    e.preventDefault();

    if (!this.state.content) {
      this.setState(() => ({
        error: 'Please add content for post',
      }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        title: this.state.title,
        author: this.state.author,
        content: this.state.content,
        description: this.state.description,
        link: this.state.link,
      });
    }
  };

  renderFields = () => (
    <div className="blog-post-form__content">
      {this.formFields.map(field => (
        <TextField
          {...field}
          key={field.name}
          value={this.state[field.name]}
          onChange={this.handleOnChange}
        />
      ))}
    </div>
  );

  renderActions = () => (
    <div className="blog-post-form__action">
      <button className="btn btn--secondary" type="submit">
        Save Post
      </button>
    </div>
  );

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        {this.renderFields()}
        {this.renderActions()}
      </form>
    );
  }
}

export default PostsForm;
