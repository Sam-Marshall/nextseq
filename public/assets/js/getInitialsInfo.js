$(document).ready(function() {

    $(document).on('click', '#submit-btn', getInfoByScientistInit);
    $(document).on('click', '.projectRow', projectLinkToSampleInfo);

    function getInfoByScientistInit(event) {

        event.preventDefault();

        $('#tangoTable').css('display', 'block');

        var initials = $('#initialsSelect').val().trim();

        $.get('/api/scientist/' + initials, function(data) {

            projectsByPersonTable(data, initials);

        });


    }

    function projectLinkToSampleInfo() {

        var clickedProjectID = $(this).attr('data-name');

        $('#tangoTable').css('display', 'block');
        $('#geoBtn').css('display', 'block');

        $.get('/api/nextseq/' + clickedProjectID, function(data) {

            samplesByProjectTable(data);

        });

    }

    // function checkProjectMatching() {
    //     $.get('/api/nextseq', function(data) {

    //         var mismatchArray = [];
    //         console.log(data.length);

    //         for (var i = 0; i < data.length; i++) {
    //             var projName1 = data[i].ProjectName;
    //             var projName2 = data[i].SampleSheets.ProjectName;

    //             if (projName1 !== projName2 && projName1 !== "undefined" && projName2 !== "undefined") {
    //                 mismatchArray.push(data[i].id);
    //             }

    //         }

    //         return mismatchArray;
    //         console.log(mismatchArray);
    //     });
    // }

    function samplesByProjectTable(data) {

        $('#tableStuffHere').html('');

        var table = $('<table>');
        table.addClass("table table-striped table-bordered table-hover");
        var tableHead = $('<thead>');
        tableHead.addClass('text-center');
        var headerRow = $('<tr>');
        var headerOne = $('<th>').addClass('text-center').text('Sample Number');
        var headerTwo = $('<th>').addClass('text-center').text('Sample Name');
        var headerThree = $('<th>').addClass('text-center').text('Genome');
        var headerFour = $('<th>').addClass('text-center').text('Experiment Type');
        var headerFive = $('<th>').addClass('text-center').text('Adapter Name');
        var headerSix = $('<th>').addClass('text-center').text('Adapter Sequence');

        headerRow.append(headerOne);
        headerRow.append(headerTwo);
        headerRow.append(headerThree);
        headerRow.append(headerFour);
        headerRow.append(headerFive);
        headerRow.append(headerSix);

        tableHead.append(headerRow);
        table.append(tableHead);

        var tableBody = $('<tbody>');

        console.log(data);

        var projectName = data.ProjectName;
        var scientistInt = data.ScientistInitials;
        var sampleSheet = data.SampleSheets;

        $('#tableTitle').html('Samples in project ' + projectName);

        for (var i = 0; i < sampleSheet.length; i++) {

            console.log(sampleSheet[i]);

            var sampleName = sampleSheet[i].SampleName;
            var sampleNumber = sampleSheet[i].SampleNumber;
            var experimentType = sampleSheet[i].ExperimentType;
            var adapterName = sampleSheet[i].AdapterName;
            var adapterSeq = sampleSheet[i].AdapterSequence;
            var genome = sampleSheet[i].Genome;
            var project = sampleSheet[i].ProjectName;

            var tableRow = $('<tr>');

            tableRow.attr('data-name', sampleName);
            tableRow.addClass('sampleRow');

            var columnOne = $('<td>').text(sampleNumber);
            var columnTwo = $('<td>').text(sampleName);
            var columnThree = $('<td>').text(genome);
            var columnFour = $('<td>').text(experimentType);
            var columnFive = $('<td>').text(adapterName);
            var columnSix = $('<td>').text(adapterSeq);

            tableRow.append(columnOne);
            tableRow.append(columnTwo);
            tableRow.append(columnThree);
            tableRow.append(columnFour);
            tableRow.append(columnFive);
            tableRow.append(columnSix);

            tableBody.append(tableRow);
        }

        table.append(tableBody);

        $('#tableStuffHere').append(table);

    }

    function projectsByPersonTable(data, initials) {

        $('#tableStuffHere').html('');

        var table = $('<table>');
        table.addClass("table table-striped table-bordered table-hover");
        var tableHead = $('<thead>');
        var headerRow = $('<tr>');
        var headerOne = $('<th>').addClass('text-center').text('Date Sequenced');
        var headerTwo = $('<th>').addClass('text-center').text('Project Name');
        var headerThree = $('<th>').addClass('text-center').text('Scientist');
        var headerFour = $('<th>').addClass('text-center').text('Experiment Type');
        var headerFive = $('<th>').addClass('text-center').text('Sequenced Alongside Another Project');

        headerRow.append(headerOne);
        headerRow.append(headerTwo);
        headerRow.append(headerThree);
        headerRow.append(headerFour);
        headerRow.append(headerFive);

        tableHead.append(headerRow);
        table.append(tableHead);

        var tableBody = $('<tbody>');

        var Scientist = getScientistName(initials);

        $('#tableTitle').html('Sequencing projects by ' + Scientist);

        for (var i = 0; i < data.length; i++) {

            var projectName = data[i].ProjectName;
            var scientistInt = data[i].ScientistInitials;
            var sampleSheet = data[i].SampleSheets;
            var projectID = data[i].id;
            var experimentType = sampleSheet[0].ExperimentType;
            var multProjects = data[i].MultipleProjects;
            var dateSequenced = (data[i].DateRan).split('T', 1);

            dateSequenced = dateSequenced[0];

            console.log(data[i]);

            var tableRow = $('<tr>');

            tableRow.attr('data-name', projectID);
            tableRow.addClass('projectRow');

            var columnOne = $('<td>').text(dateSequenced);
            var columnTwo = $('<td>').text(projectName);
            var columnThree = $('<td>').text(scientistInt);
            var columnFour = $('<td>').text(experimentType);
            var columnFive = $('<td>').text(multProjects);

            tableRow.append(columnOne);
            tableRow.append(columnTwo);
            tableRow.append(columnThree);
            tableRow.append(columnFour);
            tableRow.append(columnFive);

            tableBody.append(tableRow)

        }

        table.append(tableBody);
        $('#tableStuffHere').append(table);

    }

    function getScientistName(initials) {
        var Scientist = '';
        switch (initials) {
            case 'aew':
                Scientist = 'Anna Woo';
                break;
            case 'agv':
                Scientist = 'Andrew Volk';
                break;
            case 'alm':
                Scientist = 'Amanda Saratsis';
                break;
            case 'ami':
                Scientist = 'Alexander Misharin';
                break;
            case 'apj':
                Scientist = 'Andrea Piunti';
                break;
            case 'ccs':
                Scientist = 'Christie Sze';
                break;
            case 'ckc':
                Scientist = 'Clayton Collings';
                break;
            case 'dhu':
                Scientist = 'Deqing Hu';
                break;
            case 'dja':
                Scientist = 'Delphine Albrecht';
                break;
            case 'drf':
                Scientist = 'Dan Foltz';
                break;
            case 'ekl':
                Scientist = '';
                break;
            case 'ers':
                Scientist = 'Edwin Smith';
                break;
            case 'etb':
                Scientist = 'Elizabeth Bartom';
                break;
            case 'fec':
                Scientist = 'Fei Chen';
                break;
            case 'hhe':
                Scientist = 'Hans-Martin Herz';
                break;
            case 'jsk':
                Scientist = 'Jaydeep Singh';
                break;
            case 'kal':
                Scientist = 'Kaiwei Liang';
                break;
            case 'kca':
                Scientist = 'Kaixiang Cao';
                break;
            case 'kma':
                Scientist = 'Kelly Arcipowski';
                break;
            case 'ksj':
                Scientist = 'Krish Suresh';
                break;
            case 'lww':
                Scientist = 'Lu Wang';
                break;
            case 'mlm':
                Scientist = '';
                break;
            case 'mmn':
                Scientist = 'Marc Morgan';
                break;
            case 'mtd':
                Scientist = 'Mathew Dyson';
                break;
            case 'muf':
                Scientist = 'Michal Ugarenko';
                break;
            case 'nwb':
                Scientist = 'Noah Birch';
                break;
            case 'pnn':
                Scientist = 'Panagiotis Ntziachristos';
                break;
            case 'rar':
                Scientist = 'Ryan Rickels';
                break;
            case 'sam':
                Scientist = 'Stacy Marshall';
                break;
            case 'tss':
                Scientist = 'Takeshi Shimi';
                break;
            case 'yac':
                Scientist = 'Yuki Aoi';
                break;
            case 'yht':
                Scientist = 'Yohhei Takahashi';
                break;
            case 'zlo':
                Scientist = 'Zhoujuan Luo';
                break;
            case 'zzj':
                Scientist = 'Zibo Zhao';
                break;
            default:
                Scientist = 'Unknown Scientist';
                break;
        }

        return Scientist;
    }

});
