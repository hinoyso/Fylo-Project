var totalSizeLimit = 15; // 15 MB maximum
var totalUploadedSize = 0; // aggregated size of all files uploaded in bytes

function openFile() {
  document.getElementById('fileInput').click(); // opens the Finder/File Explorer
}

function fileSelection() {
  var selectedFiles = document.getElementById('fileInput').files;
  var validFiles = [".png", ".jpg", ".gif", ".jpeg"];

  for (var i = 0; i < selectedFiles.length; i++) {
    var selectedFile = selectedFiles[i];
    var filesFormat = selectedFile.name.split('.').pop().toLowerCase(); // split the files extensions by "." (.jpg, .jpeg ...)

    if (validFiles.indexOf('.' + filesFormat) === -1) {
      alert("File format isn't supported: " + selectedFile.name);
    } else {
      var fileSize = selectedFile.size;
      var remainingStorage = totalSizeLimit - (totalUploadedSize / (1024 * 1024));

      if (fileSize / (1024 * 1024) > remainingStorage) { // (fileSize / (1024 * 1024)) -> convert to MB
        alert("There is not enough space on the disk");
        return;
      }
      totalUploadedSize += fileSize;
    }
  }
  updateProgressBar();
  updateUploadedStorage();
}

function updateProgressBar() {

  var progressBar = document.querySelector('.gradient-bar');
  var progressDot = document.getElementById('progressDot');
  var mbLeft = document.getElementById('mbLeft');
  var percentageCalc = (totalUploadedSize / (totalSizeLimit * 1024 * 1024)) * 100; // (totalSizeLimit * 1024 * 1024) convert from MB to bytes and multiply by 100 to convert to a percentage
  progressBar.style.width = percentageCalc + '%';
  var remainingStorage = totalSizeLimit - (totalUploadedSize / (1024 * 1024));
  mbLeft.textContent = remainingStorage.toFixed(2) + ' MB LEFT';
}

function updateUploadedStorage() {
  var usedStorageElement = document.getElementById('usedStorage');
  var uploadedSizeInMB = totalUploadedSize / (1024 * 1024); // convert bytes to MB
  usedStorageElement.textContent = uploadedSizeInMB.toFixed(2) + ' MB';
}

// place the progress bar at starting point
window.onload = function () {
  updateProgressBar();
}