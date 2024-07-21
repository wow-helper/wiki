import LayoutProvider from "@theme/Layout/Provider";
import {HtmlClassNameProvider, PageMetadata} from "@docusaurus/theme-common";
import React from "react";

/*
* WrapperPageEntry
* */
export default function PageCommonEntry({ children }) {
    const title = `首页 from `;
    const description = `欢迎 from `;
    return (
        <LayoutProvider>
            <HtmlClassNameProvider className={'myPageHtmlClassName'}>
                <PageMetadata title={title} description={description}/>
                { children }
            </HtmlClassNameProvider>
        </LayoutProvider>
    );
}