import React from "react";

export class Editor extends React.Component {

    constructor(props) {
        super(props);
        this.markdown = props.markdown;
        this.onChange = props.onChange; // 通知父组件更新
    }

    html = ''
    markdown = `# Hello, world!

Below is an example of markdown in JSX.

<div style={{backgroundColor: 'violet', padding: '1rem'}}>
  Try and change the background color to \`tomato\`.
</div>`

    componentDidMount() {
        // const editor = document.querySelector('#js-editor')
        // const root = ReactDom.createRoot(editor)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.markdown !== prevProps.markdown) {
            this.markdown = this.props.markdown;
            this.setState({});
        }
    }

    handleMarkdownChange = (event) => {
        this.markdown = event.target.value;
        this.setState({});
        this.onChange(this.markdown);
    }

    render() {
        return (
            <div className={'Editor'}>
                {/*<h1>Markdown 编辑器</h1>*/}
                <textarea className={'playground-write'} rows={9} value={this.markdown}
                          onChange={this.handleMarkdownChange}/>
            </div>
        );
    }
}