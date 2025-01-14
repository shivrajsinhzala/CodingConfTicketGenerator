const avatarInput = document.getElementsByClassName("avatar_input")[0];
const avatarPreview = document.getElementsByClassName("avatar_preview")[0];
const uploadText = document.getElementsByClassName("upload_text")[0];
const ButtonContainer = document.getElementsByClassName(
  "img_button_container"
)[0];
const avatarContainer = document.getElementsByClassName("avatar_container")[0];

console.log("this is avatar input, ", avatarInput);
console.log("this is avatar files, ", avatarInput.files);

// Prevent default behavior for drag events
["dragenter", "dragover", "dragleave", "drop"].forEach((event) => {
  avatarContainer.addEventListener(event, (e) => e.preventDefault());
  avatarContainer.addEventListener(event, (e) => e.stopPropagation());
});

// Highlight avatar container on drag over
avatarContainer.addEventListener("dragover", () => {
  avatarContainer.classList.add("highlight");
});

// Remove highlight when dragging leaves
avatarContainer.addEventListener("dragleave", () => {
  avatarContainer.classList.remove("highlight");
});

// Handle drop event (file selection)
avatarContainer.addEventListener("drop", (event) => {
  avatarContainer.classList.remove("highlight");
  const files = event.dataTransfer.files;

  console.log("avatarInput in drop event, ", avatarInput);

  console.log("this is files in drop event, ", files);

  if (files.length) {
    // console.log("this is files in drop event , ", files);
    avatarInput.files = files; // Set the selected file
    previewImage();
    checkAvatar();
  }
});

// Function to remove the selected image
function removeImage() {
  // console.log("this is avatar input in removeImage, ", avatarInput);

  avatarInput.value = ""; // Clear the input field
  avatarPreview.src = "./assets/images/icon-upload.svg"; // Reset preview image
  avatarPreview.style.padding = "20px"; // Reset padding
  uploadText.style.display = "block"; // Show upload text
  ButtonContainer.style.display = "none"; // Hide button container
}

// Function to trigger file input click
function changeImage() {
  avatarInput.click(); // Trigger file selection dialog
}

// Function to set the preview image
function setImage(src) {
  // console.log("this is src in setImage, ", src);

  avatarPreview.src = src; // Set the image source
  avatarPreview.style.padding = "0px"; // Remove padding
}

// Function to preview the selected image
function previewImage() {
  const file = avatarInput.files[0]; // Get the selected file
  const reader = new FileReader(); // Create a FileReader to read the file

  console.log("this is avatar input in previewImage, ", file);

  if (file) {
    reader.onload = function (e) {
      setImage(e.target.result); // Set image preview
      uploadText.style.display = "none"; // Hide upload text
      ButtonContainer.style.display = "block"; // Show button container
    };
    reader.readAsDataURL(file); // Read the file as a data URL
  }
}

// Function to check the avatar file validity
function checkAvatar() {
  const file = avatarInput.files[0]; // Get the file from the input

  console.log("this is avatar input in checkAvatar, ", file);
  console.log("this is avatar input in checkAvatar, ", file);
  console.log("this is avatar input in checkAvatar, ", file);
  console.log("this is avatar input in checkAvatar, ", file);
  console.log("this is avatar input in checkAvatar, ", file);
  // Check if the file is missing
  if (!file) {
    console.log("check 1");
    createErrorAvatar("Please upload an image");
    return false;
  }

  // Check if file size exceeds 500KB
  if (file.size > 500 * 1024) {
    console.log("check 2");
    createErrorAvatar("File size must be less than 500KB");
    return false;
  }

  // Check if the file is an image
  if (!file.type.startsWith("image/")) {
    console.log("check 3");
    createErrorAvatar("File must be an image");
    return false;
  }

  // Check if the file is a GIF (disallow GIF)
  if (file.type === "image/gif") {
    console.log("check 4");

    createErrorAvatar("File must be a JPG, PNG, or BMP");
    return false;
  }

  //if file is svg then throw error
  if (
    file.type == "image/svg" ||
    file.type == "image/svg+xml" ||
    file.type == "image/xml"
  ) {
    console.log("check 5");

    createErrorAvatar("File must be a JPG, PNG, or BMP");
    return false;
  }

  if (!file.type === "image/jpeg" || !file.type === "image/png") {
    console.log("check 6");
    createErrorAvatar("File must be a JPG, PNG, or BMP");
    return false;
  }

  if (file.type === "image/jpeg" || file.type === "image/png") {
    console.log("check 7");
    resolveErrorAvatar();
  } else {
    resolveErrorAvatar(); // Resolve the error if everything is fine
  }

  return true;
}

// everything below is working as expected

// please dont touch it
// Function to check the full name field
function checkName() {
  const fullName = document.getElementById("full_name").value;

  if (!fullName) {
    createError("Please enter full name", 0); // Show error if empty
    return false;
  } else {
    resolveError(0); // Resolve error if name is valid
  }
  return true;
}

// Function to check the email field
function checkEmail() {
  const email = document.getElementById("email").value;
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Validate email format
  if (!emailPattern.test(email)) {
    createError("Please enter a valid email address", 1);
    return false;
  } else {
    resolveError(1); // Resolve error if email is valid
  }
  return true;
}

// Function to check the GitHub username field
function checkUsername() {
  const username = document.getElementById("github").value;

  if (!username) {
    createError("Please enter your GitHub username", 2); // Show error if username is missing
    return false;
  } else {
    resolveError(2); // Resolve error if username is valid
  }
  return true;
}

// everything below is working as expected
// please dont touch it

// Function to validate the entire form

// Function to create an error message for the avatar input
function createErrorAvatar(txt) {
  const errorEl = document.getElementsByClassName("info_text_label_img")[0];
  const errorIcon = document.getElementsByClassName("info_icon_img")[0];
  errorEl.innerHTML = txt; // Set the error message
  errorEl.style.color = "red"; // Set the error color
  errorIcon.style.stroke = "red"; // Set the error icon color
}

// Function to create a generic error message for a field
function createError(txt, index) {
  const infoEl = document.getElementsByClassName("info_text");
  const errorEl = document.getElementsByClassName("info_text_label");
  const errorIcon = document.getElementsByClassName("info_icon");
  infoEl.item(index + 1).style.display = "flex";
  // console.log(infoEl.item(index));
  errorEl.item(index).style.display = "block"; // Show the error message
  errorEl.item(index).innerHTML = txt; // Set the error message
  errorEl.item(index).style.color = "red"; // Set the error color
  errorIcon.item(index).style.stroke = "red"; // Set the error icon color
}

// Function to resolve a specific error by index
function resolveError(index) {
  const errorEl = document.getElementsByClassName("info_text_label");
  const errorIcon = document.getElementsByClassName("info_icon");
  errorEl.item(index).style.display = "none"; // Hide the error message
  errorIcon.item(index).style.display = "none"; // Hide the error icon
}

// Function to resolve the avatar error
function resolveErrorAvatar() {
  const errorEl = document.getElementsByClassName("info_text_label_img")[0];
  const errorIcon = document.getElementsByClassName("info_icon_img")[0];
  errorEl.innerHTML = "Image uploaded successfully!"; // Success message
  errorEl.style.color = "#f1f1f1ba"; // Subtle success color
  errorIcon.style.stroke = "#f1f1f1ba"; // Subtle success icon color
}

function validateForm() {
  if (!checkAvatar()) {
    console.log("Avatar validation failed");
    return false;
  }
  if (!checkName()) {
    console.log("Name validation failed");
    return false;
  }
  if (!checkEmail()) {
    console.log("Email validation failed");
    return false;
  }
  if (!checkUsername()) {
    console.log("Username validation failed");
    return false;
  }

  console.log("All validations passed");

  // Save details to localStorage
  const fullName = document.getElementById("full_name").value;
  const email = document.getElementById("email").value;
  const githubUsername = document.getElementById("github").value;

  // Store avatar image as Base64
  const avatarInput = document.getElementsByClassName("avatar_input")[0];
  const file = avatarInput.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const avatarData = e.target.result; // Base64 data of the image

    // Save all data in localStorage
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("email", email);
    localStorage.setItem("githubUsername", githubUsername);
    localStorage.setItem("avatar", avatarData);

    // Redirect to ticket.html
    window.location.href = "CodingConfTicketGenerator/ticket.html";
  };

  if (file) {
    reader.readAsDataURL(file); // Convert image to Base64 and process it
  } else {
    // Save data and redirect if there's no avatar uploaded
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("email", email);
    localStorage.setItem("githubUsername", githubUsername);
    localStorage.setItem("avatar", ""); // Save an empty avatar value
    window.location.href = "ticket.html";
  }

  return true;
}
