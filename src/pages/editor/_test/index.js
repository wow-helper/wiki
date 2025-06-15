// import React from "react";
// import "@arco-design/web-react/dist/css/arco.css";
// import {Tree} from '@arco-design/web-react';
// import {IconFile, IconFolder} from "@arco-design/web-react/icon";
//
// const TreeNode = Tree.Node;
//
// import './index.scss';
// import PageCommonEntry from "../_common/_PageCommonEntry";
// import {Editor} from "./_editor";
// import {
//     api_github_git_blobs,
//     api_github_git_trees,
//     api_github_repo_contents,
//     api_github_repo_contents_GET,
//     api_github_user
// } from "../../util/github_api";
//
// export default function EditorPage(props) {
//     return (
//         <PageCommonEntry>
//             <Content/>
//         </PageCommonEntry>
//     );
// }
//
//
// class Content extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//
//     componentDidMount() {
//         api_github_user()
//         api_github_repo_contents_GET().then(res => {
//             // this.state.markdown = res.content
//             this.state.markdown = `
// export function Thing() {
//   return <>World</>
// }
//
// # Hello <Thing />
//             `
//             this.setState({})
//         })
//         api_github_repo_contents().then(res => {
//             for (const it of res) {
//                 this.treeData.push(this.createTreeNodeData(it.path, it.sha, it.type === "dir"));
//             }
//             this.setState({})
//         })
//     }
//
//     createTreeNodeData(title, key, isNotLeaf = true) {
//         return {
//             title: title,
//             key: key,
//             isLeaf: !isNotLeaf,
//             icon: isNotLeaf ? < IconFolder/> : <IconFile />
//         }
//     }
//
//     treeData = [
//         // {
//         //     title: 'Trunk 0-0',
//         //     key: '0-0',
//         // },
//         // {
//         //     title: 'Trunk 0-1',
//         //     key: '0-1',
//         //     children: [
//         //         {
//         //             title: 'Branch 0-1-1',
//         //             key: '0-1-1',
//         //         },
//         //     ],
//         // },
//     ];
//     state = {
//         visible: false,
//         type: '',
//         markdown: '',
//     }
//     options = {
//         '图像': [
//             'PNG',
//             'JPG',
//             'GIF',
//         ],
//         '视频': [
//             'AVI',
//             'MP4',
//             'MKV',
//
//         ],
//         '文档': [
//             'PDF',
//             'PDF',
//             '7z',
//             'ZIP',
//         ],
//     }
//
//     onChange(type) {
//         this.state.type = type;
//         this.props.onChange(type);
//         this.onHide()
//     }
//
//     onShow() {
//         this.state.visible = true;
//         this.setState({})
//     }
//
//     onHide() {
//         this.state.visible = false;
//         this.setState({})
//     }
//
//     onChangeMarkdown(data) {
//         console.log(data);
//     }
//
//     loadMore = (treeNode) => {
//         return api_github_git_trees(treeNode.key).then(res=>{
//             treeNode.props.dataRef.children = [];
//             for (const it of res) {
//                 treeNode.props.dataRef.children.push(this.createTreeNodeData(it.path, it.sha, it.type === 'tree'));
//             }
//             this.setState({})
//         });
//     }
//
//     onClickTree(selectedKeys,extra) {
//         if(extra.node.props.isLeaf){
//             api_github_git_blobs(extra.node.key).then(res=>{
//                 console.log(res.content);
//             });
//         }
//     }
//
//     render() {
//         return (
//             <div className={'EditorPage'}>
//                 <div className={'EditorPage-left'}>
//                     <Tree
//                         actionOnClick={['expand', 'select']}
//                         onSelect={(selectedKeys, extra)=>this.onClickTree(selectedKeys,extra)}
//                         loadMore={(treeNode) => this.loadMore(treeNode)}
//                         treeData={this.treeData}>
//                     </Tree>
//                 </div>
//                 <div className={'EditorPage-right'}>
//                     <Editor markdown={this.state.markdown} onChange={this.onChangeMarkdown}></Editor>
//                 </div>
//             </div>
//         );
//     }
// }
