import {Prism} from "prism-react-renderer";

loadLanguages([languageDefinition]);
Prism.languages.xxx = languageDefinition;
// Prism.languages.wowmacro = Prism.languages.extend('bash', {
//   'command': {
//     pattern: /\/cast\b/i,
//     alias: 'keyword'
//   },
//   'condition': {
//     pattern: /\[.+?\]/i,
//     alias: 'keyword'
//   },
//   'spell': {
//     pattern: /\b[a-zA-Z]+\b/i,
//     alias: 'variable'
//   },
//   'target': {
//     pattern: /\btarget=[\w\.]+\b/i,
//     alias: 'variable'
//   },
//   'mouseover': {
//     pattern: /\bmouseover\b/i,
//     alias: 'variable'
//   },
//   'modifier': {
//     pattern: /\bshift|ctrl|alt\b/i,
//     alias: 'variable'
//   }
// });

Prism.languages.wowmacro = Prism.languages.extend('clike', {
  'keyword': /\b(?:abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while)\b/,
  'number': /\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp-]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?[df]?/i,
  'operator': {
    pattern: /(^|[^.])(?:\+[+=]?|-[-=]?|!=?|<<?=?|>>?>?=?|==?|&[&=]?|\|[|=]?|\*=?|\/=?|%=?|\^=?|[?:~])/m,
    lookbehind: true
  }
});

Prism.hooks.add('before-tokenize', function (env) {
  var liquidPattern = /\{%\s*comment\s*%\}[\s\S]*?\{%\s*endcomment\s*%\}|\{(?:%[\s\S]*?%|\{\{[\s\S]*?\}\}|\{[\s\S]*?\})\}/g;
  var insideRaw = false;

  Prism.languages['markup-templating'].buildPlaceholders(env, 'wowmacro', liquidPattern, function (match) {
    var tagMatch = /^\{%-?\s*(\w+)/.exec(match);
    if (tagMatch) {
      var tag = tagMatch[1];
      if (tag === 'raw' && !insideRaw) {
        insideRaw = true;
        return true;
      } else if (tag === 'endraw') {
        insideRaw = false;
        return true;
      }
    }

    return !insideRaw;
  });
});

Prism.hooks.add('after-tokenize', function (env) {
  Prism.languages['markup-templating'].tokenizePlaceholders(env, 'wowmacro');
});