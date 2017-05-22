$(document).ready(function() {

    $(document).on('click', '#submit-btn', getTangoByInitial);
    $(document).on('click', '.projectRow', rowLink);


    function getTangoByInitial(event) {

        event.preventDefault();

        var initials = $('#initialsSelect').val().trim();

        $.get('/api/scientist/' + initials, function(data) {

            $('#stuffHere').html('');

            for (var i = 0; i < data.length; i++) {

                var projectName = data[i].ProjectName;
                var scientistInt = data[i].ScientistInitials;
                var sampleSheet = data[i].SampleSheets;
                var projectID = data[i].id;

                console.log(data[i]);

                var tableRow = $('<tr>');
                tableRow.attr('data-href', '#');
                tableRow.attr('data-name', projectID);
                tableRow.addClass('projectRow');
                var columnOne = $('<td>').text(projectName);
                var columnTwo = $('<td>').text(scientistInt);

                tableRow.append(columnOne);
                tableRow.append(columnTwo);

                $('#stuffHere').append(tableRow);
            }

        });


    }

    function rowLink() {

        var clickedProjectID = $(this).attr('data-name');

        alert(clickedProjectID);

        $.get('/api/nextseq/' + clickedProjectID, function(data) {

            $('#stuffHere').html('');

            console.log(data);

            var projectName = data.ProjectName;
            var scientistInt = data.ScientistInitials;
            var sampleSheet = data.SampleSheets;

            for (var i = 0; i < sampleSheet.length; i++) {

                console.log(sampleSheet[i]);

                var sampleName = sampleSheet[i].SampleName;
                var experimentType = sampleSheet[i].ExperimentType;
                var adapterName = sampleSheet[i].AdapterName;
                var adapterSeq = sampleSheet[i].AdapterSequence;
                var genome = sampleSheet[i].Genome;
                var project = sampleSheet[i].ProjectName;

                var tableRow = $('<tr>');
                tableRow.attr('data-href', '#');
                tableRow.attr('data-name', sampleName);
                tableRow.addClass('sampleRow');
                var columnOne = $('<td>').text(sampleName);
                var columnTwo = $('<td>').text(experimentType);
                var columnThree = $('<td>').text(adapterName);
                var columnFour = $('<td>').text(adapterSeq);

                tableRow.append(columnOne);
                tableRow.append(columnTwo);
                tableRow.append(columnThree);
                tableRow.append(columnFour);

                $('#stuffHere').append(tableRow);
            }

        });

    }

});
