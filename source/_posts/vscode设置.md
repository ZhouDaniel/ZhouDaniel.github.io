---
title: vscode设置
date: 2021-04-08 15:45:22
tags:
---

```js
{
    "open-in-browser.default": "chrome",
    "[html]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[jsonc]": {
        "editor.defaultFormatter": "vscode.json-language-features"
    },
    "[typescriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[json]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[vue]": {
        "editor.defaultFormatter": "octref.vetur"
    },
    "workbench.preferredDarkColorTheme": "Monokai",
    "workbench.colorTheme": "Eva Light",
    "html.autoClosingTags": false,
    "sync.autoDownload": true,
    "sync.removeExtensions": false,
    "sync.autoUpload": true,
    "sync.gist": "81953e5e4b9a9c770993ff3ebb2ab3a0",
    "files.associations": {
        "*.cjson": "jsonc",
        "*.wxss": "css",
        "*.wxs": "javascript",
        "*.js": "javascript"
    },
    "emmet.includeLanguages": {
        "wxml": "html"
    },
    "minapp-vscode.disableAutoConfig": true,
    "explorer.confirmDelete": false,
    "colorHelper.formatsOrder": [],
    "emmet.triggerExpansionOnTab": true,
    "workbench.iconTheme": "vscode-icons",
    "generateCssTree.cssFlavor": "less",
    "window.zoomLevel": -1,
    // 以下自己添加的
    "prettier.tabWidth": 4,
    //"eslint.autoFixOnSave": true, //文件保存时是否根据eslint进行格式化
    // "editor.codeActionsOnSave": {
    //     "source.fixAll.eslint": true
    // },
    // "eslint.validate": [
    //     "javascript",
    //     "javascriptreact",
    //     {
    //         "language": "vue",
    //         "autoFix": true
    //     },
    // ],
    "prettier.endOfLine": "crlf",
    "javascript.updateImportsOnFileMove.enabled": "never",
    "typescript.updateImportsOnFileMove.enabled": "never",
    "diffEditor.ignoreTrimWhitespace": false,
    "cSpell.userWords": [
        "heaveneye",
        "react"
    ],
    "liveServer.settings.donotShowInfoMsg": true,
    "vetur.format.options.tabSize": 4,
    "editor.detectIndentation": false,
    "workbench.tree.indent": 20,
    "editor.formatOnSave": true,
    "html.format.enable": false,
    "vetur.experimental.templateInterpolationService": true,
    "vetur.validation.template": true,
    "vetur.validation.style": true,
    "vetur.validation.script": true
}
```

1. 以上为 vscode 的`setting.json`配置，
2. 其中 ts，js，vue，html，json 等设置为 prettier 的格式化，前提要先下载 prettier 插件，然后设置 vscode 的格式化方式
3. 在项目中，可以设置`.editorconfig`文件，里面的配置优先级比 vscode 的设置里面的高，设置此文件，前提是 vscode 要先下载 editorconfig 插件
