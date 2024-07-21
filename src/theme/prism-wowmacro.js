// https://github.com/wasp-lang/wasp/blob/2ce28f9e6f210a33c5b6eff263ba78a816136302/web/src/prism/wasp.js


// Converted from the TextMate definition at https://github.com/wasp-lang/vscode-wasp/blob/main/syntaxes/wasp.tmLanguage.yaml
// module.exports = (Prism) => {
//     Prism.languages['wowmacro'] = {
//         'token-name': /nochanneling/,
//     };
// }
// import {Prism} from "prism-react-renderer";

Prism.languages.wowmacro = {
    "comment": {
        "pattern": /\/\/.*$/,
        "alias": "comment" //  使用预定义的 "comment" 样式
    },
    "keyword": [
        {
            "pattern": /\/(cast|use|targetenemy|startattack|stopattack|say|yell|whisper|channel|reload|logout|help|roll|who|join|leave|invite|raidinvite|cancelaura)/g,
            "alias": "keyword" //  使用预定义的 "keyword" 样式
        },
        {
            "pattern": /\b(?:reset|help|nodead|exists|harm|noharm|noexists|mouseover|player|target|enemy|dead|nochanneling)\b/g,
            "alias": "keyword2", // 使用预定义的 "keyword" 样式
            "greedy": true,
        }
    ],
    // "keyword2": {
    //     "pattern": /reset|help|nodead|exists|harm|noharm|noexists|mouseover|player|target|enemy|dead|nochanneling/g,
    //     "alias": "keyword2" // 使用预定义的 "function" 样式
    // },
    "function": {
        "pattern": /run/g,
        "alias": "function" // 使用预定义的 "function" 样式
    },
    "operator": {
        "pattern": /[@\[\]]/g,
        "alias": "operator" // 使用预定义的 "operator" 样式
    },
    "condition": {
        "pattern": /\[.+?\]/g,
        "alias": "punctuation" // 使用预定义的 "punctuation" 样式
    }
};

// Prism.hooks.add('before-tokenize', function (env) {
//     var liquidPattern = /\{%\s*comment\s*%\}[\s\S]*?\{%\s*endcomment\s*%\}|\{(?:%[\s\S]*?%|\{\{[\s\S]*?\}\}|\{[\s\S]*?\})\}/g;
//     var insideRaw = false;
//
//     // Prism.languages['markup-templating'].buildPlaceholders(
//     //     env,
//     //     'wowmacro',
//     //     liquidPattern,
//     //     function (match) {
//     //         var tagMatch = /^\{%-?\s*(\w+)/.exec(match);
//     //         if (tagMatch) {
//     //             var tag = tagMatch[1];
//     //             if (tag === 'raw' && !insideRaw) {
//     //                 insideRaw = true;
//     //                 return true;
//     //             } else if (tag === 'endraw') {
//     //                 insideRaw = false;
//     //                 return true;
//     //             }
//     //         }
//     //
//     //         return !insideRaw;
//     //     }
//     // );
// });
//
// Prism.hooks.add('after-tokenize', function (env) {
//     Prism.languages['markup-templating'].tokenizePlaceholders(env, 'wowmacro');
// });