function SjpreviewMain() {
    let params = (new URL(document.location)).searchParams;
    let id = params.get("id");
    return (
        <React.Fragment>
            <h1>Preview Surat Jalan</h1>
            <img src="https://img.freepik.com/free-vector/pack-red-mailboxes-isometric-style_23-2147609238.jpg?w=996&t=st=1665029887~exp=1665030487~hmac=e15a8a66d8c4051fccd46bf7879350ec63fd96e0f3563426e0721215c6d4df9a" className="imgsj" alt="Gambar memerlukan akses secara online" />
            <a href={"suratjalan.html?id=" + id}>Back to Edit</a>
            <a href="">Print</a>
        </React.Fragment>
    )
}

ReactDOM.render(<ContextOneProvider><SjpreviewMain/></ContextOneProvider>, document.querySelector('#sjp-page'));