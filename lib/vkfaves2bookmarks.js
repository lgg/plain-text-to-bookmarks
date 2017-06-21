//load modules
var templating = require('./templating');
var fs = require('./files');

//load links list
var links = fs.loadToArray('links.txt');

//create vars
var sorted = {};

//group links by group or user id of original post
for (var i = 0; i < links.length; i++) {

    var gid = getGroupId(links[i]);

    //check if we already have this group of posts
    if (!sorted.hasOwnProperty(gid)) {
        //create new group
        sorted[gid] = [];
    }

    //push to existing group
    sorted[gid].push(links[i]);
}

//parse folders and links
var content = '';
for (var key in sorted) {

    var linksContent = '';

    //create bookmark-html for all links
    for (i = 0; i < sorted[key].length; i++) {
        linksContent += templating.createLink(sorted[key][i].replace(/(?:\r\n|\r|\n)/g, ''));
    }

    //create folder
    content += templating.createFolder('vk ' + key, linksContent);
}

//save as bookmarks
fs.save(templating.fixNewLines(templating.createHtml(content)));

//parsing group id
function getGroupId(url) {
    url = url.substr(0, url.indexOf('_'));
    url = url.substr(19); //constant for https
    return url;
}