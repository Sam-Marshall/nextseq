var db = require('../models');

module.exports = function(app) {

    app.get('/api/nextseq', function(req, res) {
        db.NextSeq.findAll({
            include: [db.SampleSheet]
        }).then(function(response) {
            res.json(response);
        })
    });

    app.get('/api/nextseq/:id', function(req, res) {
        db.NextSeq.findOne({
            include: [db.SampleSheet],
            where: { id: req.params.id }
        }).then(function(response) {
            res.json(response);
        })
    });

    app.get('/api/tango/:tango', function(req, res) {
        db.NextSeq.findAll({
            include: [db.SampleSheet],
            where: { ProjectName: req.params.tango }
        }).then(function(response) {
            res.json(response);
        })
    });

    app.get('/api/scientist/:initials', function(req, res) {
        db.NextSeq.findAll({
            include: [db.SampleSheet],
            where: { ScientistInitials: req.params.initials }
        }).then(function(response) {
            res.json(response);
        })
    });

    // app.get('/api/scientist/:initials', function(req, res) {
    //     db.SampleSheet.findAll({
    //         where: { ScientistInitials: req.params.initials }
    //     }).then(function(response) {
    //         res.json(response);
    //     })
    // });

}
