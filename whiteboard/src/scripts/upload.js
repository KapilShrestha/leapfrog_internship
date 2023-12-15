window.onload = function() {
    const uploadImage = document.getElementById('upload-image');

    uploadImage.addEventListener('change', function(e) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = function(event) {
        const img = new Image();

        img.onload = function() {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
        };

        img.src = event.target.result;
      };

      reader.readAsDataURL(file);
    });
  };