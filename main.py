from fastapi import FastAPI, File, UploadFile
from fastapi.responses import HTMLResponse
import os

app = FastAPI()

@app.get("/", response_class=HTMLResponse)
def get_html_form():
    html_content = """
    <html>
        <body>
            <h2>Upload a File  this is from flask</h2>
            <form action="/uploadfile/" enctype="multipart/form-data" method="post">
                <input name="file" type="file">
                <input type="submit">
            </form>
        </body>
    </html>
    """
    return html_content


@app.post("/uploadfile/")
async def upload_file(file: UploadFile = File(...)):
    with open(f"uploaded_{file.filename}", "wb") as f:
        f.write(file.file.read())
    return {"filename": file.filename}
