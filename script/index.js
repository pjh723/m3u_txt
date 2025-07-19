// File Format
let fileName, fileText, fileExtension, fileConvert;

// Upload
const fileUpload = document.getElementById("upload-file");
fileUpload.addEventListener("change", function () {
	const textArea = document.getElementById("upload-display");

	textArea.value = "文件读取中 ...";

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
		fileName = fileUpload.files[0].name;
		autoGetFileExtension();
	}
});

// Set file extension
function autoGetFileExtension() {
	const lastDotIndex = fileName.lastIndexOf(".");
	let extension = "";
	if (lastDotIndex > -1 && lastDotIndex < fileName.length - 1) {
		extension = fileName.substring(lastDotIndex + 1);
	}

	const extensionSpan = document.getElementById("input-format-auto-extension");
	extensionSpan.innerHTML = extension;

	return extension;
}

// Start
const startBtn = document.getElementById("start");
startBtn.addEventListener("click", function () {
	if (!fileName) {
		window.alert("未上传文件");
	} else {
		fileExtension = null;
		let inputFormatRadios = document.getElementsByName("input-format");
		if (inputFormatRadios[0].checked) {
			fileExtension = autoGetFileExtension();
		} else {
			for (const element of inputFormatRadios) {
				if (element.checked) {
					fileExtension = element.value;
					break;
				}
			}
		}


		fileConvert = null;
		let outputFormatRadios = document.getElementsByName("output-format");
		for (const element of outputFormatRadios) {
			if (element.checked) {
				fileConvert = element.value;
				break;
			}
		}

		if (fileExtension && fileConvert) {
			console.log(fileExtension + " => " + fileConvert);
		} else {
			window.alert("未选择输出格式");
		}
	}
});