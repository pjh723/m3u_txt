// File Format
const FileFormatList = [
	"dpl", "m3u", "m3u8"
];

var fileExtension, fileText, fileConvert;

// Upload
const fileUpload = document.getElementById("upload-file");
fileUpload.addEventListener("change", function () {
	const textArea = document.getElementById("upload-display");

	textArea.value = "文件读取中 ...";

	fileExtension = getFileExtension(fileUpload.files[0].name);
	const reader = new FileReader();

	reader.onload = function (event) {
		fileText = event.target.result;
		textArea.value = fileText;
	};

	reader.onerror = function (error) {
		console.error("wtf:", error);
		alert("Unable to read file, please ensure that the file is a valid text file.");
	};

	if (fileUpload.files && fileUpload.files[0]) {
		reader.readAsText(fileUpload.files[0]);
	}
});

function getFileExtension(fileName) {
	const lastDotIndex = fileName.lastIndexOf('.');
	let extension = '';
	if (lastDotIndex > -1 && lastDotIndex < fileName.length - 1) {
		extension = fileName.substring(lastDotIndex + 1);
	}

	const extensionSpan = document.getElementById("input-format-auto-extension");
	extensionSpan.innerHTML = extension;
	return extension;
}

// Start