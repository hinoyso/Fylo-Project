const totalSizeLimit = 15;
let totalUploadedSize = 0;
const MB = 1024 * 1024;

const fileSelection = () => {
  const selectedFiles = Array.from(document.getElementById('fileInput').files);
  const validFileExtensionsRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
  const remainingStorage = calculateRemainingStorage();

  selectedFiles.forEach((selectedFile) => {
    const fileName = selectedFile.name;

    if (validFileExtensionsRegex.test(fileName)) {
      const fileSize = selectedFile.size;

      if (fileSize / MB > remainingStorage) {
        alert("There is not enough space on the disk for file: " + fileName);
        return;
      }
      totalUploadedSize += fileSize;
    } else {
      alert("File format isn't supported for file: " + fileName);
    }
  });

  updateProgressBar(remainingStorage);
  updateUploadedStorage();
};

const updateProgressBar = (remainingStorage) => {
  const progressBar = document.querySelector('.gradient-bar');
  const mbLeft = document.getElementById('mbLeft');
  const percentageCalc = (totalUploadedSize / (totalSizeLimit * MB)) * 100;
  progressBar.style.width = percentageCalc + '%';
  mbLeft.textContent = remainingStorage.toFixed(2) + ' MB LEFT';
};

const updateUploadedStorage = () => {
  const usedStorageElement = document.getElementById('usedStorage');
  const uploadedSizeInMB = totalUploadedSize / MB;
  usedStorageElement.textContent = uploadedSizeInMB.toFixed(2) + ' MB';
};

const calculateRemainingStorage = () => totalSizeLimit - (totalUploadedSize / MB);

window.onload = () => {
  const remainingStorage = calculateRemainingStorage();
  updateProgressBar(remainingStorage);
};
