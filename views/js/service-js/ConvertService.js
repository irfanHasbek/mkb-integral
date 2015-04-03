require('iced-coffee-script/register');
LineReaderSync = require("line-reader-sync")
var path = require('path')
var fs = require('fs')

var beautify = require('js-beautify').js_beautify

function getFiles (dir, files_, extension){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        if(path.extname(files[i]).substring(1) == extension) {
            var name = dir + '/' + files[i];
            if (fs.statSync(name).isDirectory()){
                getFiles(name, files_);
            } else {
                files_.push(name);
            }
        }  
    }
    return files_;
}

function convert2Json(filename, callback)  {
    lrs = new LineReaderSync(filename)

    // first line is heights
    var heights = lrs.readline().split(';')

    // Bu database eklenecek olan tum verilerin arrayi
    var result = [];

    while(true) {
        var line = lrs.readline();
        if(line === null){
            callback(false, null);
            break;
        }

        var prices = line.split(';')

        // first element is width
        var width = prices[0];

        for(var i=1; i<heights.length; ++i) {

            // Bu database eklenecek olan obje
            var price_tag = {
                width : width.trim(),
                height : heights[i].trim(),
                price : prices[i].trim()
            };

            result.push(price_tag);
        }
        callback(true, result);
    }
}

module.exports = {
    getFiles : getFiles,
    convertToJson : convert2Json
}

