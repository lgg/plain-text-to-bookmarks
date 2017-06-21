//load modules
var templating = require('./templating');
var fs = require('./files');

//load links list
var links = fs.loadToArray('links.txt');

var linksContent = '';
//create bookmark-html for all links
for (var i = 0; i < links.length; i++) {
    linksContent += templating.createLink(links[i].replace(/(?:\r\n|\r|\n)/g, ''));
}

//save as bookmarks
fs.save(templating.fixNewLines(templating.createHtml(linksContent)));