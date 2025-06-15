// import { jsx, jsxs, Fragment } from 'react/jsx-runtime'
// import React, { useEffect, useState } from 'react'
// import ReactDOMServer from 'react-dom/server'
//
// import {compile, run} from '@mdx-js/mdx'
// import { VFile } from 'vfile';
// import {Context} from "./_editor3";
//
// // 示例虚拟文件系统
// const fileSystem = {
//     '/pages/Home.mdx': `
// import Button from '../components/Button.mdx';
//
// # 主页标题
//
// 这是主页内容。
//
// <Button />
//   `,
//     '/components/Button.mdx': `
// export default function Button() {
//   return <button style={{color: 'red'}}>我是红色按钮</button>;
// }
//   `,
// };
//
// // 简单解析 import 语句（只支持 import X from 'path'）
// function parseImports(mdxSource) {
//     const importLines = mdxSource.match(/^import\s+(\w+)\s+from\s+['"](.*)['"]/gm) || [];
//     return importLines.map(line => {
//         const [, varName, relPath] = line.match(/^import\s+(\w+)\s+from\s+['"](.*)['"]/);
//         return { varName, relPath };
//     });
// }
//
// // 路径解析：基于文件路径和相对路径计算绝对路径
// function resolvePath(basePath, relativePath) {
//     // basePath 示例：/pages/Home.mdx
//     // relativePath 示例：../components/Button.mdx
//     // 用 new URL 相对路径解析（加个虚拟协议）
//     const baseDir = basePath.substring(0, basePath.lastIndexOf('/') + 1);
//     const resolved = new URL(relativePath, 'file://' + baseDir).pathname;
//     return resolved;
// }
//
// // 递归编译函数
// async function compileMdxWithImports(filePath) {
//     const mdxSource = fileSystem[filePath];
//     if (!mdxSource) throw new Error(`文件未找到: ${filePath}`);
//
//     // 解析 import
//     const imports = parseImports(mdxSource);
//
//     // 递归加载并编译依赖组件
//     const importComponents = {};
//     for (const { varName, relPath } of imports) {
//         const absPath = resolvePath(filePath, relPath);
//         importComponents[varName] = await compileMdxWithImports(absPath);
//     }
//
//     // 去掉 import 语句，MDX 语法里不能重复 import
//     const mdxWithoutImports = mdxSource.replace(/^import .* from .*$/gm, '');
//
//     // 编译 MDX 源码，outputFormat 用 'function-body' 可以返回函数体内容
//     const pathParts = filePath.split('/');
//     const basename = pathParts[pathParts.length - 1]; // 取最后一段文件名，比如 Home.mdx
//     const file = new VFile({ basename: basename, value: mdxWithoutImports });
//     await compile(file, {
//         development: false,
//         outputFormat: 'function-body',
//     });
//
//     // 运行编译后的代码，传入 React JSX 函数及导入的组件
//     const { default: Content } = await run(String(file), {
//         Fragment,
//         jsx,
//         jsxs,
//         ...importComponents,
//         baseUrl: window.location.href,
//     });
//
//     return Content;
// }
//
//
// // 虚拟文件系统
// const vfs = {
//     '/index.mdx': `import MyButton from './components/MyButton.jsx'
//
// # Hello, VFS World!
//
// <MyButton />`,
//
//     '/components/MyButton.jsx': `export default function MyButton() {
//   return <button style={{ padding: '0.5rem', background: 'tomato' }}>Click Me</button>
// }`,
// }
//
// // esbuild 插件，用于加载 vfs
// const vfsPlugin = (vfs) => ({
//     name: 'vfs-loader',
//     setup(build) {
//         build.onResolve({ filter: /.*/ }, args => {
//             const importerPath = args.importer.startsWith('file://')
//                 ? args.importer.slice(7)
//                 : args.importer
//             const resolvedPath = new URL(args.path, 'file://' + importerPath).pathname
//             if (vfs[resolvedPath]) return { path: resolvedPath, namespace: 'vfs' }
//             throw new Error(`Cannot resolve ${args.path}`)
//         })
//
//         build.onLoad({ filter: /.*/, namespace: 'vfs' }, args => {
//             const content = vfs[args.path]
//             return {
//                 contents: content,
//                 loader: args.path.endsWith('.jsx') ? 'jsx' : 'js'
//             }
//         })
//     }
// })
//
// // 动态加载脚本工具函数
// function loadScript(src) {
//     return new Promise((resolve, reject) => {
//         if (document.querySelector(`script[src="${src}"]`)) {
//             resolve();
//             return;
//         }
//         const script = document.createElement('script');
//         script.src = src;
//         script.onload = () => resolve();
//         script.onerror = () => reject(new Error(`加载脚本失败：${src}`));
//         document.head.appendChild(script);
//     });
// }
//
// // 初始化 esbuild-wasm（只需一次）
// let isInitialized = false
// async function ensureEsbuildInitialized() {
//     if (isInitialized) return
//
//     // 1. 动态加载 esbuild-wasm 浏览器版本库
//     await loadScript('https://unpkg.com/esbuild-wasm@0.20.0/lib/browser.min.js');
//     console.log('result', 2)
//     try {
//         await window.esbuild.initialize({
//             wasmURL: 'https://unpkg.com/esbuild-wasm@0.20.0/esbuild.wasm',
//             worker: false, // 也可以用 true 试试，取决你需求
//         });
//         console.log('esbuild initialized successfully')
//     } catch (e) {
//         console.error('esbuild init failed:', e)
//     }
//     console.log('result', 3)
//
//     isInitialized = true
// }
//
// // 编译 MDX 并执行
// async function compileMDXWithVFS(entryPath = '/index.mdx') {
//     console.log('result', 1)
//     await ensureEsbuildInitialized()
//     console.log('result', 4)
//
//     // 将入口 .mdx 文件先转成 JS 代码
//     const mdxJsCode = String(await compile(vfs[entryPath], {
//         outputFormat: 'program', // 生成完整模块代码，不是函数体
//         development: false
//     }))
//
//     const allVfs = { ...vfs, [entryPath]: mdxJsCode }
//
//     const result = await esbuild.build({
//         entryPoints: [entryPath],
//         bundle: true,
//         write: false,
//         format: 'esm',
//         plugins: [vfsPlugin(allVfs)],
//         jsx: 'automatic',
//         external: ['react', 'react/jsx-runtime'],  // 这里标记外部模块
//     })
//     console.log('result', result)
//
//     const code = result.outputFiles[0].text
//     const blob = new Blob([code], { type: 'text/javascript' })
//     const mod = await import(URL.createObjectURL(blob))
//
//     const Content = mod.default
//     return ReactDOMServer.renderToStaticMarkup(
//         <React.StrictMode>
//             <Content />
//         </React.StrictMode>
//     )
// }
//
// // 示例 React 组件
// export function Editor() {
//     const [html, setHtml] = useState('Loading...')
//
//     useEffect(() => {
//         // compileMDXWithVFS('/index.mdx')
//         //     .then(setHtml)
//         //     .catch(err => setHtml(String(err)))
//         compileMdxWithImports('/pages/Home.mdx').then((Content) => {
//             const html = ReactDOMServer.renderToStaticMarkup(
//                 <div className="playground-result">
//                     {/*<Content components={{ ...MDXComponents, ...RootComponents }} />*/}
//                     <Content/>
//                 </div>
//             )
//             console.log('html', html)
//         }).catch(console.error);
//     }, [])
//
//     return (
//         <div>
//             <h2>VFS-based MDX Renderer</h2>
//             <div dangerouslySetInnerHTML={{ __html: html }} />
//         </div>
//     )
// }
