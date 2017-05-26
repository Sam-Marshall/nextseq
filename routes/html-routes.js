var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

    // Each of the below routes just handles the HTML page that the user gets sent to.

    // // Stacy: test html file loaded so I can test jQuery calls in the console
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    app.get("/scientist", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/initialsSearch.html"));
    });

    app.get("/project", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/projectSearch.html"));
    });


};
