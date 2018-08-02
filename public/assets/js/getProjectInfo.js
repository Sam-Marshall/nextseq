$(document).ready(function() {


    $.get('/api/nextseq', function(data) {

        var projectArray = [];
        for (var i = 0; i < data.length; i++) {
            projectArray.push(data[i].ProjectName);
        }
        generateProjectOptions(projectArray);

    });

    function generateProjectOptions(projectArray) {

        $('#projectsHere').html('');
        var select = $('<select>');
        select.addClass('form-control');
        select.attr('id', 'projInput')
        var disOption = $('<option>');
        // disOption.attr('disabled', 'selected');
        // disOption.attr('value', '""');
        disOption.text('Choose Project');
        select.append(disOption);

        for (var i = 0; i < projectArray.length; i++) {

            var option = $('<option>').text(projectArray[i]);
            option.addClass('projOption');
            option.attr('data-name', projectArray[i]);
            option.attr('value', projectArray[i]);
            select.append(option);

        }

        $('#projectsHere').append(select);

    }

    function getInfoByProjName(event) {

        event.preventDefault();

        $('#tangoTable').css('display', 'block');
        $('#geoBtn').css('display', 'block');

        var tango = $('#projInput').val();

        $.get('/api/tango/' + tango, function(data) {

            samplesByProjectTable(data);

        });

    }


    $(document).on('click', '#submit-btn', getInfoByProjName);

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

        var projectName = data[0].ProjectName;
        var scientistInt = data[0].ScientistInitials;
        var sampleSheet = data[0].SampleSheets;

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


});
