var express = require("express");
var path = require("path");
var fs = require("fs");
const { networkInterfaces } = require("os");

var app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var PORT = process.env.PORT || 6660;

//Todo Add an id element
//todo add a create method
//todo add a delete method
/*
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
console.log(notes)
*/
var noteHandler = {
    notes:[],

    loadNotes(){
        var output = fs.readFileSync(__dirname+ "/db/db.json", "utf-8", (err, data) => {
            if (err) {
                return err;
            }else{
                
                return data;
            }
    
        });
        this.notes = JSON.parse(output)
    },

    newNote(title, text, id){
        this.notes.push({
            title:title, text:text, id:id
        })
    }


}

noteHandler.loadNotes();
noteHandler.newNote("NewTitle","NewNote","8739")

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
    
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    //var notes = loadFile();
    console.log("sending notes: " + noteHandler.notes)
    res.json(noteHandler.notes)
    res.end()

});


app.listen(PORT, function () {
    
    console.log("App listening on PORT " + PORT);
});
