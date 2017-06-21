/**
 read more: https://github.com/krasimir/absurd/blob/master/lib/processors/html/helpers/TemplateEngine.js

 */
var templating = {};
module['exports'] = templating;

var fs = require('./files')

//load templates
var folderTemplate = fs.load('folder');
var linkTemplate = fs.load('link');
var mainTemplate = fs.load('main');

templating.templater = function (html, options) {
    var re = /<%(.+?)%>/g,
        reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g,
        code = 'with(obj) { var r=[];\n',
        cursor = 0,
        result,
        match;
    var add = function (line, js) {
        js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    }
    while (match = re.exec(html)) {
        add(html.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(html.substr(cursor, html.length - cursor));
    code = (code + 'return r.join(""); }').replace(/[\r\t\n]/g, ' ');
    try {
        result = new Function('obj', code).apply(options, [options]);
    }
    catch (err) {
        console.error("'" + err.message + "'", " in \n\nCode:\n", code, "\n");
    }
    return result;
}

templating.createFolder = function (name, links) {
    return templating.templater(folderTemplate, {
        FOLDERNAME: name,
        LINKSHERE: links
    });
}

templating.createLink = function (url, name) {
    //if name not set - make it equals to url
    if (name == undefined) {
        name = url;
    }
    return templating.templater(linkTemplate, {
        LINKNAME: name,
        LINKURL: url
    });
}

templating.createHtml = function (content) {
    return templating.templater(mainTemplate, {
        BOOKMARKSHERE: content
    });
}

templating.fixNewLines = function (content){
    content = content.replace(/(?:<META)/g, '\r\n<META');
    content = content.replace(/(?:<TITLE)/g, '\r\n<TITLE');
    content = content.replace(/(?:<H1)/g, '\r\n<H1');
    content = content.replace(/(?:<DL)/g, '\r\n<DL');
    content = content.replace(/(?:<DT)/g, '\r\n<DT');
    content = content.replace(/(?:<\/DL)/g, '\r\n<\/DL');
    return content;
};