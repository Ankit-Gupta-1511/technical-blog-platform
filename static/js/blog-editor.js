$(document).ready(
    function(){
        var toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
          
            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction
          
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['formula']
          
                                
        ];

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