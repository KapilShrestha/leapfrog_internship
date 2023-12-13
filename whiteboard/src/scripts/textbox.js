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
      
      document.body.appendChild(input);

      // Set focus to the newly created text box
      input.focus();
    });
  }