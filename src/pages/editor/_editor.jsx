import {compile, nodeTypes, run} from '@mdx-js/mdx'
import {createStarryNight} from '@wooorm/starry-night'
import sourceCss from '@wooorm/starry-night/source.css'
import sourceJs from '@wooorm/starry-night/source.js'
import sourceJson from '@wooorm/starry-night/source.json'
import sourceMdx from '@wooorm/starry-night/source.mdx'
import sourceTs from '@wooorm/starry-night/source.ts'
import sourceTsx from '@wooorm/starry-night/source.tsx'
import textHtmlBasic from '@wooorm/starry-night/text.html.basic'
import textMd from '@wooorm/starry-night/text.md'
import {visit as visitEstree} from 'estree-util-visit'
import {toJsxRuntime} from 'hast-util-to-jsx-runtime'
import {Fragment, jsx, jsxs} from 'react/jsx-runtime'
import ReactDom from 'react-dom/client'
import {removePosition} from 'unist-util-remove-position'
import {visit} from 'unist-util-visit'
import {VFile} from 'vfile'
import React from "react";

import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMath from 'remark-math'
import rehypeRaw from 'rehype-raw'
import ReactDOMServer from 'react-dom/server'
import {ErrorBoundary} from "react-error-boundary";

// https://www.mdxjs.cn/docs/using-mdx/
export const Context = React.createContext({isMac: true})
let isMac = false;
let codeTheme = 'xxx-codeTheme';


/** @type {ReadonlyArray<Grammar>} */
const grammars = [
    sourceCss,
    sourceJs,
    // @ts-expect-error: TS is wrong: this is not a JSON file.
    sourceJson,
    sourceMdx,
    sourceTs,
    sourceTsx,
    textHtmlBasic,
    textMd
]

/** @type {Awaited<ReturnType<typeof createStarryNight>>} */


export class Editor extends React.Component {
    starryNight = null
    html = ''
    // sample
    markdown = `# Hello, world!

Below is an example of markdown in JSX.

<div style={{backgroundColor: 'violet', padding: '1rem'}}>
  Try and change the background color to \`tomato\`.
</div>`

    componentDidMount() {
        // const editor = document.querySelector('#js-editor')
        // const root = ReactDom.createRoot(editor)
        createStarryNight(grammars).then((x) => {
            this.starryNight = x
            const missing = this.starryNight.missingScopes()
            if (missing.length > 0) {
                throw new Error('Unexpected missing required scopes: `' + missing + '`')
            }
            // root.render(<Playground />)
            this.setState({})
            this.start();
        })
    }

    async go() {
        const toc = []

        const remarkPlugins = []

        remarkPlugins.push(remarkGfm)
        remarkPlugins.push(remarkFrontmatter)
        remarkPlugins.push(remarkMath)
        // remarkPlugins.push(addDoubleBracketsLinks)
        // remarkPlugins.push([
        //     remarkTocHeadings,
        //     {
        //         exportRef: toc,
        //     },
        // ])
        // remarkPlugins.push(() =>
        //     remarkToc({
        //         heading: '目录|toc|table[ -]of[ -]contents?',
        //         maxDepth: 2,
        //     })
        // )
        const rehypePlugins = [
            // rehypeAddLineNumbers,
            // rehypeDivToSection,
            // reHypeLinkFoot,
            // rehypeMathjax,
            // [rehypeMermaid, { strategy: 'img-svg' }],
            // [rehypePrismPlus, { ignoreMissing: true, defaultLanguage: 'js' }],
            // [rehypeCodeTitle, { isMac }],
        ]

        const file = new VFile({
            basename: 'example.mdx',
            // sample,
            value: this.markdown,
        })
        await compile(file, {
            development: false, // 必须 否则报错 TypeError: _jsxDEV is not a function
            // jsx: true,
            outputFormat: 'function-body',
            recmaPlugins: [],
            rehypePlugins: rehypePlugins,
            remarkPlugins: remarkPlugins,
        })
        const {default: Content} = await run(String(file), {
            Fragment,
            jsx,
            jsxs,
            baseUrl: window.location.href,
        })

        const outputHtml = true;
        if (outputHtml) {
            return ReactDOMServer.renderToStaticMarkup(
                <Context.Provider value={{isMac, codeTheme}}>
                    <div className="playground-result">
                        {/*<Content components={{ ...MDXComponents, ...RootComponents }} />*/}
                        <Content/>
                    </div>
                </Context.Provider>
            )
        } else {
            return (<div>1111111111111</div>);
        }
    }

    start() {
        this.go().then((ok) => {
            this.html = ok
            this.setState({})
        }).catch((error) => {
            this.html = error
            this.setState({})
        })
    }

    handleMarkdownChange = (event) => {
        this.markdown = event.target.value;
        this.setState({});
        this.start();
    }

    render() {
        return (
            <div className={'EditorMDX'}>
                <div>
                    <h1>Markdown 编辑器</h1>
                    <textarea className={'playground-write'} rows={9} value={this.markdown}
                              onChange={this.handleMarkdownChange}/>
                </div>
                <div>
                    <h1>HTML 预览</h1>
                    <div dangerouslySetInnerHTML={{__html: this.html}}></div>
                </div>
            </div>
        );
    }
}

// 错误回退
// return (
//     <ErrorBoundary
//         FallbackComponent={ErrorFallback}
//         resetKeys={[value]}
//     >
//         <div className="playground-result">{result.default({})}</div>
//     </ErrorBoundary>
// )
// function ErrorFallback(properties) {
//     // type-coverage:ignore-next-line
//     const error = /** @type {Error} */ (properties.error)
//     return (
//         <div role="alert">
//             <p>Something went wrong:</p>
//             {/*<DisplayError error={error} />*/}
//             <button type="button" onClick={properties.resetErrorBoundary}>
//                 Try again
//             </button>
//         </div>
//     )
// }