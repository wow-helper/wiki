// https://github.com/wasp-lang/wasp/blob/2ce28f9e6f210a33c5b6eff263ba78a816136302/web/src/theme/prism-include-languages.js

import "./prism-wowmacro.css";

// This file gets auto-generated when you "eject" to add custom languages to Docosaurus
// We use it to add support for Prisma and Wasp syntax highlighting

import siteConfig from '@generated/docusaurus.config'
export default function prismIncludeLanguages(PrismObject) {
    const {
        themeConfig: { prism },
    } = siteConfig
    const { additionalLanguages } = prism
    // Prism components work on the Prism instance on the window, while prism-
    // react-renderer uses its own Prism instance. We temporarily mount the
    // instance onto window, import components to enhance it, then remove it to
    // avoid polluting global namespace.
    // You can mutate PrismObject: registering plugins, deleting languages... As
    // long as you don't re-assign it
    globalThis.Prism = PrismObject
    additionalLanguages.forEach((lang) => {
        // eslint-disable-next-line global-require, import/no-dynamic-require
        require(`prismjs/components/prism-${lang}`)
    })

    require('./prism-wowmacro')
    delete globalThis.Prism
}