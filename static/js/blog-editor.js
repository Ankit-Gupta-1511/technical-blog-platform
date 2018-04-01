$(document).ready(
    function(){
        
        var options = {
            debug: 'info',
            bounds: document.getElementById('quill-editor'),
            modules: {
                formula: true,
                syntax: true,
                toolbar: '#quill-toolbar'
            },
            placeholder: 'Write your Blog here...',
            readOnly: false,
            theme: 'snow'
          };

        var editor = new Quill('.quill-editor', options);
    


    // handling form submit

    $('#upload-btn').click(
        function(){

                var contents = editor.getContents();
                var title = $("#title").val();
                editor.disable();

                var data = {
                    title: title,
                    body: JSON.stringify(contents)
                };

                 $.post('/post/new-blog', data);
                
        }
    );

   }
);