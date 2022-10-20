function SjpreviewMain() {
    var params = new URL(document.location).searchParams;
    var id = params.get("id");
    return React.createElement(
        React.Fragment,
        null,
        React.createElement(
            "h1",
            null,
            "Preview Surat Jalan"
        ),
        React.createElement("img", { src: "https://img.freepik.com/free-vector/pack-red-mailboxes-isometric-style_23-2147609238.jpg?w=996&t=st=1665029887~exp=1665030487~hmac=e15a8a66d8c4051fccd46bf7879350ec63fd96e0f3563426e0721215c6d4df9a", className: "imgsj", alt: "Gambar memerlukan akses secara online" }),
        React.createElement(
            "a",
            { href: "suratjalan.html?id=" + id },
            "Back to Edit"
        ),
        React.createElement(
            "a",
            { href: "" },
            "Print"
        )
    );
}

ReactDOM.render(React.createElement(
    ContextOneProvider,
    null,
    React.createElement(SjpreviewMain, null)
), document.querySelector('#sjp-page'));