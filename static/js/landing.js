// close and open crop box
$("#doi-btn").click(() => {
  $("#container1").toggleClass("hide-container");
  $("#container2").toggleClass("hide-container");
});

$("#close-btn").click(() => {
  $("#container1").toggleClass("hide-container");
  $("#container2").toggleClass("hide-container");
  $("#crop-btn").addClass("hide-container");
  $("#image").attr("src", "");
  $("#image-box").addClass("hide-container");
});

// upload btn click
$("#pic-upload").change(() => {
  const [file] = $("#pic-upload").prop("files");
  if (file) {
    $("#image").attr("src", URL.createObjectURL(file));
  }
  $("#image-box").removeClass("hide-container");
  $("#crop-btn").removeClass("hide-container");

  const image = document.getElementById("image");

  const cropper = new Cropper(image, {
    autoCropArea: 1,
    viewMode: 1,
    scalable: false,
    zoomable: false,
    movable: false,
    minCropBoxWidth: 200,
    minCropBoxHeight: 200,
  });

  // crop button click
  $("#crop-btn").click(() => {
    cropper.getCroppedCanvas().toBlob((blob) => {
      let fileInputElement = document.getElementById("pic-upload");
      let file = new File([blob], $("#pic-upload").prop("files")[0].name, {
        type: "image/*",
        lastModified: new Date().getTime(),
      });
      let container = new DataTransfer();
      container.items.add(file);
      fileInputElement.files = container.files;

      const reader = new FileReader();
      reader.onload = function (e) {
        $("#planImage").val(this.result);
        $("#imgForm").submit();
      };
      reader.readAsDataURL(fileInputElement.files[0]);
    });
  });
});
