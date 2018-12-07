import * as React from 'react';
import ReactMde from 'react-mde';
import { Converter } from 'showdown';

class MarkdownEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value || ''
        };

        this.converter = new Converter({
            tables: true,
            simplifiedAutoLink: true,
            strikethrough: true,
            tasklists: true
        });
    }

    onValueChange = value => {
        this.setState(() => ({ value }));
    };

    render() {
        return (
            <ReactMde
                onChange={this.onValueChange}
                value={this.state.value}
                generateMarkdownPreview={markdown =>
                    Promise.resolve(this.converter.makeHtml(markdown))
                }
            />
        );
    }
}

export default MarkdownEditor;
