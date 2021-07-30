function downloadString(text, fileType, fileName) {
	var blob = new Blob([text], { type: fileType });

	var a = document.createElement('a');
	a.download = fileName;
	a.href = URL.createObjectURL(blob);
	a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
	a.style.display = "none";
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	setTimeout(function() { URL.revokeObjectURL(a.href); }, 1500);
}

function updateDownload(text) {
	downloadString(text, '.pgn', 'merged.pgn')
}

$(document).ready(function() {
	$('#pgnUpload').change(function(e) {
		let fileList = e.target.files
		let files = new Array(fileList.length)
		let completed = 0

		if (fileList.length === 0) return

		for(let i = 0; i < fileList.length; i++) {
			let current = fileList.item(i)
			current.text().then(text => {
				files[i] = text
				completed++
			})
		}

		let waitForPromises = setInterval(function() {
			if (completed === fileList.length) {
				updateDownload(files.join('\n\n'))
				clearInterval(waitForPromises)
			}
		}, 100) 
	})
})
