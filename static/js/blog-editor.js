$(document).ready(function () {
    var rowID = 1;
    $(".add-btn").click(function () {
        rowID++;
        var row = '<div class="row justified-content-center content-box" id="content-box-' + rowID + '">' +
            '<div class="col" id="content-' + rowID + '">' +
            '<div class="input-group mb-3">' +
            '<div class="input-group-prepend">' +
            '<label class="input-group-text" for="inputGroupSelec' + rowID + '">Options</label>' +
            '</div>' +
            '<select class="custom-select" id="inputGroupSelect' + rowID + '">' +
            '<option selected>Content Type</option>' +
            '<option value="subtitle">Sub Title</option>'+
            '<option value="paragraph">Paragraph</option>' +
            '<option value="image">Image</option>' +
            '<option value="video">Video</option>' +
            '<option value="formula">Formula</option>' +
            '<option value="code">Code Snippet</option>' +
            '<option value="quote">Quote</option>' +
            '</select>' +
            '</div>' +
            '<div class="input-group" id="content-body-' + rowID + '">' +

            '</div>' +
            '</div>' +
            '</div>';

        $('#main-content-container').append(row);

        $(".custom-select").each(function () {
            $(this).change(customSelectChange);
    
    
    
        });

    });

    $(".custom-select").change(customSelectChange);

    $('#upload-btn').click(function(){
        var data = getContents();
        
        $.post('/post/new-blog', data);
    });

    
});

function customSelectChange(){
    var value = $(this).val();
    console.log(value);
    var requiredID = $(this).get(0).id;
    requiredID = requiredID[requiredID.length - 1];
    console.log("required ID is " + requiredID)
    switch (value) {
        case "subtitle":
            {
                var element = '<div class="input-group">' +
                    '<div class="input-group-prepend">' +
                    '<span class="input-group-text">Add subtitle</span>' +
                    '</div>' +
                    '<input type="text" id="text-' + requiredID + '" class="form-control" aria-label="subtitle" aria-describedby="basic-addon1">' +
                    '</div>';
                $('#content-body-' + requiredID).html(element);
                break;
            }
        case "paragraph":
            {
                var element = '<div class="input-group">' +
                    '<div class="input-group-prepend">' +
                    '<span class="input-group-text">Add paragraph</span>' +
                    '</div>' +
                    '<textarea id="text-' + requiredID + '" class="form-control" aria-label="With textarea"></textarea>' +
                    '</div>';
                $('#content-body-' + requiredID).html(element);
                break;
            }
        case "image":
            {
                var element = '<textarea id="text-' + requiredID + '" cols="30" rows="10"></textarea>';
                $('#content-body-' + requiredID).html(element);
                break;
            }
        case "video":
            {
                var element = '<div class="input-group">' +
                    '<div class="input-group-prepend">' +
                    '<span class="input-group-text">Video Url</span>' +
                    '</div>' +
                    '<input type="url" id="text-' + requiredID + '" class="form-control" aria-label="video" aria-describedby="basic-addon1">' +
                    '</div>';
                $('#content-body-' + requiredID).html(element);
                break;
            }
        case "formula":
            {
                var element = '<textarea id="text-' + requiredID + '" cols="30" rows="10"></textarea>';
                $('#content-body-' + requiredID).html(element);
                break;
            }
        case "code":
            {
                var element = '<div class="input-group">' +
                    '<div class="input-group-prepend">' +
                    '<span class="input-group-text">Add Code</span>' +
                    '</div>' +
                    '<textarea id="text-' + requiredID + '" class="form-control" aria-label="code"></textarea>' +
                    '</div>';
                $('#content-body-' + requiredID).html(element);
                break;
            }
        case "quote":
            {
                var element = '<div class="input-group">' +
                    '<div class="input-group-prepend">' +
                    '<span class="input-group-text">Add Quote</span>' +
                    '</div>' +
                    '<textarea id="text-' + requiredID + '" class="form-control" aria-label="With textarea"></textarea>' +
                    '</div>';
                $('#content-body-' + requiredID).html(element);
                break;
            }
    }
}

function getContents(){
    var title = $("#title").val();
    var body = {};
    body.title = title;
    var contents = document.getElementsByClassName("custom-select");
    // var contentBody = document.getElementsByClassName("");
    $(".content-box").each(function(index){
        var contentType = $(this).find(".custom-select").get(0).value;
        var contentBody = $(this).find(".form-control").get(0).value;
        body[index] = {
            type: contentType,
            body: contentBody
        };
    });
    console.log(body);

    return body;
}