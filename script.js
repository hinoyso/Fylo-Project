const totalSizeLimitBytes = 15 * 1024 * 1024;
let totalUploadedSize = 0;

const fileSelection = () => {
  const selectedFiles = Array.from(document.getElementById('fileInput').files);
  const validFileExtensionsRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;

  selectedFiles.forEach((selectedFile) => {
    const fileName = selectedFile.name;

    if (validFileExtensionsRegex.test(fileName)) {
      const fileSizeBytes = selectedFile.size;

      if ((totalUploadedSize + fileSizeBytes) <= totalSizeLimitBytes) {
        totalUploadedSize += fileSizeBytes;
      } else {
        alert("There is not enough space on the disk for file: " + fileName);
        return;
      }
    } else {
      alert("File format isn't supported for file: " + fileName);
    }
  });

  const remainingStorageBytes = totalSizeLimitBytes - totalUploadedSize;
  updateProgressBar(remainingStorageBytes);
  updateUploadedStorage();
};

const updateProgressBar = (remainingStorageBytes) => {
  const progressBar = document.querySelector('.gradient-bar');
  const mbLeft = document.getElementById('mbLeft');
  const percentageCalc = (totalUploadedSize / totalSizeLimitBytes) * 100;
  progressBar.style.width = percentageCalc + '%';
  mbLeft.textContent = (remainingStorageBytes / (1024 * 1024)).toFixed(2) + ' MB LEFT';
};

const updateUploadedStorage = () => {
  const usedStorageElement = document.getElementById('usedStorage');
  const uploadedSizeInMB = totalUploadedSize / (1024 * 1024);
  usedStorageElement.textContent = uploadedSizeInMB.toFixed(2) + ' MB';
};

const calculateRemainingStorage = () => totalSizeLimitBytes;

window.onload = () => {
  updateProgressBar(totalSizeLimitBytes);
  updateUploadedStorage();
};

