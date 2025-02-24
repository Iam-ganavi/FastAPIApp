const API_BASE_URL = "http://127.0.0.1:8000"; // Your FastAPI backend

// Upload Files Function
async function uploadFiles() {
    const fileInput = document.getElementById("fileInput");
    const status = document.getElementById("status");

    if (fileInput.files.length === 0) {
        status.textContent = "Please select a file.";
        return;
    }

    let formData = new FormData();
    for (let file of fileInput.files) {
        formData.append("files", file);
    }

    try {
        const response = await fetch(`${API_BASE_URL}/upload/`, {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            status.textContent = "Files uploaded successfully!";
            fileInput.value = ""; // Clear file input
            loadFiles(); // Refresh the file list
        } else {
            status.textContent = "Failed to upload files.";
        }
    } catch (error) {
        console.error("Error:", error);
        status.textContent = "Error uploading files.";
    }
}

// Load Files Function
async function loadFiles() {
    const fileList = document.getElementById("fileList");
    fileList.innerHTML = ""; // Clear existing list

    try {
        const response = await fetch(`${API_BASE_URL}/files/`);
        const data = await response.json();

        data.files.forEach((filename) => {
            let li = document.createElement("li");
            li.innerHTML = `
                <a href="${API_BASE_URL}/files/${filename}" target="_blank">${filename}</a>
                <button onclick="deleteFile('${filename}')">Delete</button>
            `;
            fileList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching files:", error);
    }
}

// Delete File Function
async function deleteFile(filename) {
    if (!confirm(`Are you sure you want to delete "${filename}"?`)) return;

    try {
        const response = await fetch(`${API_BASE_URL}/files/${filename}`, {
            method: "DELETE",
        });

        if (response.ok) {
            alert(`"${filename}" deleted successfully!`);
            loadFiles(); // Refresh file list
        } else {
            alert("Failed to delete file.");
        }
    } catch (error) {
        console.error("Error deleting file:", error);
        alert("Error deleting file.");
    }
}

// Load files when the page loads
window.onload = loadFiles;
