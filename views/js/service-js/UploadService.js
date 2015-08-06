var fs = require('fs');
var crypto = require('crypto');
var path = require('path');

var self = {
    uploadImage: function(req,res) {
        fs.readFile(req.files.image.path, function(err, data) {
            // content based hash
            var hash = crypto.createHash('sha1');
            hash.setEncoding('hex');
            hash.write(data);
            hash.end();
            var actualName = req.files.image.name;
            var ext = path.extname(actualName).substring(1);
            var sha1sum = hash.read();
            var imageName = sha1sum + '.' + ext; 

            var newPath = __dirname + "/../../../views/uploads/original/" + imageName;
            var url =  "uploads/original/" + imageName;
            fs.writeFile(newPath, data, function (err) {
                if(err) {
                    res.send(JSON.stringify({
                        code : 404,
                        message : "Ozur dileriz, " + req.files.image.name + " eklenemedi. !!! " + err
                    }));
                    return;
                }

                res.send(JSON.stringify({
                    code : 200,
                    actualName : actualName,
                    pathName : imageName,
                    url : url,
                    message : req.files.image.name + " basari ile yuklendi"
                }));
            });
        });
    },


    uploadProfileImage: function(req,res) {
        fs.readFile(req.files.image.path, function(err, data) {
            // content based hash
            var hash = crypto.createHash('sha1');
            hash.setEncoding('hex');
            hash.write(data);
            hash.end();
            var actualName = req.files.image.name;
            var ext = path.extname(actualName).substring(1);
            var sha1sum = hash.read();
            var imageName = sha1sum + '.' + ext; 

            var newPath = __dirname + "/../../../views/uploads/original/profile/" + imageName;
            var url =  "/uploads/original/profile/" + imageName;
            fs.writeFile(newPath, data, function (err) {
                if(err) {
                    console.log(JSON.stringify(err));
                    res.send(JSON.stringify({
                        code : 404,
                        message : "Ozur dileriz, " + req.files.image.name + " eklenemedi. !!!"
                    }));
                    return;
                }

                // thumbnail olustur
                req.session.user.pictureUrl = url;

                res.send(JSON.stringify({
                    code : 200,
                    actualName : actualName,
                    imageName : imageName,
                    imageURL : url,
                    message : req.files.image.name + " basari ile yuklendi"
                }));
            });
        });
    },
    
    
    uploadDocument: function(req,res) {
        fs.readFile(req.files.doc.path, function(err, data) {
            // content based hash
            var hash = crypto.createHash('sha1');
            hash.setEncoding('hex');
            hash.write(data);
            hash.end();
            var actualName = req.files.doc.name;
            var ext = path.extname(actualName).substring(1);
            var sha1sum = hash.read();
            var docName = sha1sum + '.' + ext; 

            var newPath = __dirname + "/../public/uploads/" + docName;
            var url =  "uploads/" + docName;
            
            fs.writeFile(newPath, data, function (err) {
                if(err) {
                    res.send(JSON.stringify({
                        code : 404,
                        message : "Ozur dileriz, " + req.files.doc.name + " eklenemedi. !!!"
                    }));
                    return;
                }

                // thumbnail olustur
                req.session.uploadedDocuments.push({
                    actualName: actualName,
                    docName: docName,
                });

                res.send(JSON.stringify({
                    code : 200,
                    actualName : actualName,
                    docName : docName,
                    docUrl : url,
                    message : req.files.doc.name + " basari ile yuklendi"
                }));
            });
        });
    }
};

module.exports = self;
