import { App } from 'vue';
import 'highlight.js/styles/base16/horizon-dark.css';
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
// @ts-expect-error: no types
import registerGraphql from 'highlightjs-graphql';

export function Vue3HighlightJs(app: App) {
  hljs.registerLanguage('bash', bash);
  registerGraphql(hljs);

  app.directive('highlightjs', (el, binding) => {
    const codeNodes = el.querySelectorAll('code');

    for (let i = 0; i < codeNodes.length; i++) {
      const codeNode = codeNodes[i];

      if (typeof binding.value === 'string') {
        codeNode.textContent = binding.value;
      }

      hljs.highlightBlock(codeNode);
    }
  });
}
