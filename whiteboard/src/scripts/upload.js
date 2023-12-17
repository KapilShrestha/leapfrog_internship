window.addEventListener("load", function(){
  const uploadImage = document.getElementById('upload-image');

    uploadImage.addEventListener('change', function(e) {
      const file = e.target.files[0];
      // console.log(file)
      const reader = new FileReader();

      reader.onload = function(event) {
        img = new Image();

        img.onload = function() {
          img.width = canvas.width;
          img.height = canvas.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);
        };

        img.src = event.target.result;
      };

      reader.readAsDataURL(file);
    });

})