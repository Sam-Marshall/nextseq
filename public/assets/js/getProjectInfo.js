$(document).ready(function() {


    $.get('/api/nextseq', function(data) {
        var projectArray = [];
        for (var i = 0; i < data.length; i++) {
            projectArray.push(data[i].ProjectName);
        }
        console.log(projectArray);
        generateProjectOptions(projectArray);
    });

    function generateProjectOptions(projectArray) {

        $('#projectsHere').html('');
        var select = $('<select>');
        select.addClass('form-control');
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


    // $(document).on('click', '#submit-btn', getInfoByScientistInit);
    // $(document).on('click', '.projectRow', projectLinkToSampleInfo);

});
