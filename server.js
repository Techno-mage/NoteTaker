var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = process.env.PORT || 6660;

var notes;

function loadFile(){
    fs.readFile(__dirname+ "/db/db.json", "utf-8", (err, data) => {
        if (err) {
            return err;
        }else{
            console.log(data) 
            return data;
        }
    });
}




app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    return res.json(notes)

});


app.listen(PORT, function () {
    notes =loadFile();
    console.log("App listening on PORT " + PORT);
});
