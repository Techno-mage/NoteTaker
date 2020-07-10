var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var PORT = process.env.PORT || 6660;



function loadFile(){
    return fs.readFileSync(__dirname+ "/db/db.json", "utf-8", (err, data) => {
        if (err) {
            return err;
        }else{
            
            return data;
        }

    });
    
}

var notes = loadFile();


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
    
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    var notes = loadFile();
    console.log("sending notes: " + notes)
    res.json(JSON.parse(notes))
    res.end()

});


app.listen(PORT, function () {
    notes =loadFile();
    
    console.log("App listening on PORT " + PORT);
});
