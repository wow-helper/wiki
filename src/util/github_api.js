import axios from "axios";

/// 创建 axios 实例
const request = axios.create({
    baseURL: '',
    timeout: 6000, // 请求超时时间
    // headers: {'Authorization': 'Bearer '},
})
/// 异常拦截处理器
const errorHandler = (error) => {
    if (error.response) {
        // tips
        console.error(error.response)
    }
    return Promise.reject(error)
}
/// request 拦截器
const token = window.atob(window.atob('WjJsMGFIVmlYM0JoZEY4eE1VRkVTbGxQUzFrd1QycFdXV1k0V2twRE5FWTVYMFUzUnpWQ2VHWjJiRFl6ZDBkMWIyNTZOVWx5ZW1FM1VWaDNiR0ZhVmpVeFVEZHhjV1F4Ukc5b2F6TktNelZNUVRNMVNYTnJkbE5NTXpGTA=='))
request.interceptors.request.use(config => {
    config.headers['Authorization'] = 'Bearer ' + token
    return config
}, errorHandler)
/// response 拦截器
request.interceptors.response.use((response) => {
    return response.status === 200 ? response.data : errorHandler({response})
}, errorHandler)


/*
* https://github.com/settings/tokens?type=beta
* 设置 Contents Issues 权限读写 默认包含 Metadata 权限读
* */
const owner = 'wow-helper'; // ismanong wow-helper
const repo = 'wiki';        // data     wiki
const message = Date.now().toString();

// 用户详情
export function api_github_user() {
    let url = 'https://api.github.com/user';
    return request({
        url: url,
        method: 'get',
        params: {}
    })
}

// 获取内容
export function api_github_repo_contents_GET() {
    let url = `https://api.github.com/repos/${owner}/${repo}/contents/README.md`;
    return request({
        url: url,
        method: 'get',
        params: {}
    }).then(res => {
        // 中间层处理后返回给调用者
        //
        // 如果文件的内容是中文的话，base64解码后，注意使用utf在解码一次。
        //
        // 使用utf-8字符集解码base64字符串
        // 1. 原生js：escape(虽然该方法已经被不推荐使用，但还是有一些特殊用途的，尤其是对中文的编码)
        // escape 暂无替代函数 文档注明已废弃 浏览器可用 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/escape
        // 2. npm package base64：...
        res.content = decodeURIComponent(escape(window.atob(res.content)));
        return res;
    })
}

// 更新内容
export function api_github_repo_contents_UPDATA(content, sha) {
    let url = `https://api.github.com/repos/${owner}/${repo}/contents/README.md`;
    return request({
        url: url,
        method: 'put',
        data: {"message": message, "content": window.btoa(content), sha: sha}// sha 需要更新文件的时候 必填
    })
}

// 创建内容
export function api_github_repo_contents_CREATE(content) {
    let url = `https://api.github.com/repos/${owner}/${repo}/contents/README.md`;
    return request({
        url: url,
        method: 'put',
        data: {"message": message, "content": window.btoa(content)}// sha 需要更新文件的时候 必填
    })
}
