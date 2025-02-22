function browserTemplateEngine(block) {
    if (block === undefined || block === null || block === false) {
        return document.createTextNode('');
    }
    if (typeof block === 'string' || typeof block === 'number' || block === true) {
        return document.createTextNode(block);
    }
    if (Array.isArray(block)) {
        const fragment = document.createDocumentFragment();
        for (const item of block) {
            const itemElem = browserTemplateEngine(item);
            fragment.appendChild(itemElem);
        }
        return fragment;
    }
    const elem = document.createElement(block.block);

    elem.appendChild(browserTemplateEngine(block.content));
    if (block.cls) {
        const classes = [].concat(block.cls);
        elem.classList.add(...classes);
    }
    if (block.attrs) {
        for (const [key, value] of Object.entries(block.attrs)) {
            elem.setAttribute(key, value);
        }
    }
    return elem;
}

function renderScreen(template) {
    app.innerHTML = browserTemplateEngine(template).innerHTML;
}

function renderBlock(template) {
    app.appendChild(browserTemplateEngine(template));
}
