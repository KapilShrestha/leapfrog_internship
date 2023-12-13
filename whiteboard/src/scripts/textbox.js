const textBoxTool = document.getElementById("text-box");
let isTextToolSelected = false;
textBoxTool.addEventListener("click", function(e){
    isPenActive = false;
    isErasing = false;
    if (isHandSelected) {
        return;
    }
    isTextToolSelected = true;
})

function createTextBox() {
    var canvas = document.getElementById("drawing-board");
    var ctx = canvas.getContext('2d');
    
    canvas.addEventListener('click', function(event) {
        var x = event.clientX - canvas.getBoundingClientRect().left;
        var y = event.clientY - canvas.getBoundingClientRect().top;
        
        var input = document.createElement('input');
        input.type = 'text';
        input.style.position = 'absolute';
        input.style.left = x + 'px';
        input.style.top = y + 'px';
        input.style.minWidth = '50px'; // Set a minimum width
        
        document.body.appendChild(input);
        
        input.addEventListener('input', function() {
            var text = input.value;
            ctx.font = window.getComputedStyle(input).getPropertyValue('font');
            var textWidth = ctx.measureText(text).width + 5; // Add some extra space
            
            // Adjust width based on text content
            input.style.width = textWidth + 'px';
        });

        // Set focus to the newly created text box
        input.focus();
    });
}
