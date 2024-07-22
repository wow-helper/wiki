import React from "react";

import './index.scss';
import PageCommonEntry from "../_common/_PageCommonEntry";
import {Editor} from "./_editor";
import {api_github_repo_contents_GET, api_github_user} from "../../util/github_api";

export default function EditorPage(props) {
    return (
        <PageCommonEntry>
            <Content/>
        </PageCommonEntry>
    );
}

class Content extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        api_github_user()
        api_github_repo_contents_GET().then(response => {
            this.state.markdown = response.content
            this.setState({})
        })
    }

    state = {
        visible: false,
        type: '',
        markdown: '',
    }
    options = {
        '图像': [
            'PNG',
            'JPG',
            'GIF',
            'ICO',
            'ICO',
            'ICO',
            'ICO',
            'ICO',
            'ICO',
            'ICO',
            'ICO',
            'ICO',
            'ICO',
            'ICO',
            'ICO',
            'ICO',
            'ICO',
            'ICO',
            'ICO',
            'ICO',
            'ICO',
            'ICO',
            'ICO',
            'ICO',
            'ICO',
            'ICO',
            'ICO',
        ],
        '视频': [
            'AVI',
            'MP4',
            'MKV',
            'WEBM',
            'WEBM',
            'WEBM',
            'WEBM',
            'WEBM',
            'WEBM',
            'WEBM',
            'WEBM',
            'WEBM',
            'WEBM',
            'WEBM',
            'WEBM',
            'WEBM',
            'WEBM',
            'WEBM',
        ],
        '文档': [
            'PDF',
            'PDF',
            '7z',
            'ZIP',
            'ZIP',
            'ZIP',
            'ZIP',
            'ZIP',
            'ZIP',
            'ZIP',
            'ZIP',
            'ZIP',
        ],
    }

    onChange(type) {
        this.state.type = type;
        this.props.onChange(type);
        this.onHide()
    }

    onShow() {
        this.state.visible = true;
        this.setState({})
    }

    onHide() {
        this.state.visible = false;
        this.setState({})
    }

    onChangeMarkdown(data) {
        console.log(data);
    }

    render() {
        return (
            <div className={'EditorPage'}>
                <Editor markdown={this.state.markdown} onChange={this.onChangeMarkdown}></Editor>
                {/*{Object.keys(this.options).map((category, index) => (*/}
                {/*    <ul key={index}>*/}
                {/*        {this.options[category].map(type => (*/}
                {/*            <li key={type} onClick={() => this.onChange(type)}>{type}</li>*/}
                {/*        ))}*/}
                {/*    </ul>*/}
                {/*))}*/}
            </div>
        );
    }
}
