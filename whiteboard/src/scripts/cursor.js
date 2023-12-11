const canvas = document.getElementById('drawing-board');
    const ctx = canvas.getContext('2d');

    let cursorSize = 20; // Initial size of the cursor
    const borderWidth = 2; // Border width for the cursor

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function updateCursorSize(event) {
      event.preventDefault();
      cursorSize += event.deltaY * -0.1; // Change the scaling factor here
      cursorSize = Math.min(Math.max(cursorSize, 10), 50); // Limit cursor size between 10 and 50

      drawCursor();
    }

    function drawCursor() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.arc(
        mouseX,
        mouseY,
        cursorSize / 2,
        0,
        Math.PI * 2
      );
      ctx.strokeStyle = '#000';
      ctx.lineWidth = borderWidth;
      ctx.stroke();
    }

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    function updateCursorPosition(event) {
      const rect = canvas.getBoundingClientRect();
      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;

      drawCursor();
    }

    document.addEventListener('wheel', updateCursorSize);

    canvas.addEventListener('mousemove', (event) => {
      updateCursorPosition(event);
    });

    drawCursor(); // Initial draw