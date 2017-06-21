var files = {};
module['exports'] = files;

var fs = require('fs');
files.load = function (templateName) {
    var content = fs.readFileSync(__dirname + '/../templates/' + templateName + '.html').toString();
    return content.replace(/(?:\r\n|\r|\n)/g, '\r\n');
}

files.save = function (content) {
    var d = new Date();
    var now = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + '_' + d.getHours() + '' + d.getMinutes() + '' + d.getSeconds();

    content = content.replace(/(?:\r\n|\r|\n)/g, '\r\n');

    fs.writeFile(__dirname + '/../output/bookmarks' + now + '.html', content, function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("File saved successfully!");
    });
}

files.loadToArray = function (filename) {
    return fs.readFileSync(__dirname + '/../' + filename).toString().split("\n");
}