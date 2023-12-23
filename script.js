const togglecBtn = document.getElementById("togglecBtn");
const listIcon = document.getElementById("list-icon");
const closeIcon = document.getElementById("close-icon");
const content = document.getElementById("content");
const features = document.getElementById("features");
const build = document.getElementById("build");
const dropArea = document.getElementById("dropArea");
const uploadedImage = document.getElementById("uploadedImage");
const successMessage = document.getElementById("success");

dropArea.addEventListener("dragover", dragOverHandler);
dropArea.addEventListener("drop", dropHandler);

togglecBtn.addEventListener("click", () => {
  if (listIcon.style.display !== "none") {
    listIcon.style.display = "none";
    closeIcon.style.display = "block";
  } else {
    closeIcon.style.display = "none";
    listIcon.style.display = "block";
  }
});

$(document).ready(function () {
  $.get("http://numbersapi.com/1/30/date?json", (data, status) => {
    content.innerHTML = data.text;
    features.innerHTML = features.innerHTML + " " + data.number;

    build.innerHTML = build.innerHTML + " " + data.year;
  });
});

function dragOverHandler(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "copy";
}

function dropHandler(event) {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  showImage(file);
  uploadImage(event, file);
}

function uploadImage(event, file) {
  const formData = new FormData();
  formData.append("image", file);

  fetch("http://localhost:5000/api/image", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      event.preventDefault();
      console.log(data);
      successMessage.innerHTML = data.message;
    })
    .catch((error) => {
      // Handle error here
      console.error("Error uploading image:", error);
    });
}
function showImage(file) {
  const reader = new FileReader();
  reader.onload = function (event) {
    uploadedImage.src = event.target.result;
    uploadedImage.style.display = "block";
  };

  reader.readAsDataURL(file);
}
