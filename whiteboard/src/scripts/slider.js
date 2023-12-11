const slider = document.getElementById("myRange");
  const output = document.getElementById("sliderValue");
  output.innerHTML = slider.value;

  slider.oninput = function() {
    output.innerHTML = this.value;
  };