function ContentLetter() {
    var _React$useContext = React.useContext(ContextOne),
        state = _React$useContext.state,
        dispatch = _React$useContext.dispatch;

    return React.createElement(
        React.Fragment,
        null,
        React.createElement(
            "p",
            null,
            "Nomor: ",
            state.suratjalanDetail.nomor_surat
        ),
        React.createElement(
            "p",
            null,
            "quantity: ",
            state.suratjalanDetail.quantity
        ),
        React.createElement(
            "p",
            null,
            "price: ",
            state.suratjalanDetail.price
        )
    );
}
function MenuPrint() {
    var params = new URL(document.location).searchParams;
    var id = params.get("id");

    var popup = function popup(data) {
        var someElement = document.getElementById("body_surat");
        var someElementToString;

        if (someElement.outerHTML) someElementToString = someElement.outerHTML;else if (XMLSerializer) someElementToString = new XMLSerializer().serializeToString(someElement);

        var iframe = document.createElement('iframe');
        iframe.name = 'frame1';
        // var html = '<body>Foo</body>';
        document.body.appendChild(iframe);
        var frameDoc = iframe.contentWindow;
        // frameDoc.document.open();
        // frameDoc.document.write(html);
        // iframe.contentWindow.document.close();


        // var ifrm = document.getElementById('myIframe');
        // const ifrm = document.createElement("iframe");
        // var ifrm = document.createElement("iframe");
        // var frameDoc = ifrm.contentWindow
        // var frameDoc = ifrm
        // var frameDoc = ifrm.contentWindow || ifrm.contentDocument.document || ifrm.contentDocument;

        // var frame1 = $('<iframe />');
        // frame1[0].name = "frame1";
        // $("body").append(frame1);
        // document.body.appendChild(ifrm);
        // var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
        frameDoc.document.open();
        //Create a new HTML document.
        frameDoc.document.write('<html>');
        frameDoc.document.write('<head>');
        frameDoc.document.write('<title></title>');
        // frameDoc.document.write('<link rel="stylesheet" href="' + base_url + 'backend/dist/css/idcard.css">');
        frameDoc.document.write('</head>');
        frameDoc.document.write('<body>');
        frameDoc.document.write(someElementToString);
        frameDoc.document.write('</body>');
        frameDoc.document.write('</html>');
        frameDoc.document.close();

        // document.open();
        // document.write("<h1>Out with the old, in with the new!</h1>");
        // document.close();

        setTimeout(function () {
            // window.frames["iframe"].focus();
            // window.frames["iframe"].print();
            window.frames["frame1"].focus();
            window.frames["frame1"].print();
            iframe.remove();
        }, 500);
        return true;
    };
    var doPrint = function doPrint(e) {
        e.preventDefault();
        // window.print();
        popup(null);
    };
    return React.createElement(
        React.Fragment,
        null,
        React.createElement(
            "a",
            { href: "suratjalan.html?id=" + id },
            "Back to Edit"
        ),
        React.createElement(
            "a",
            { href: "#", onClick: doPrint },
            "Prints"
        )
    );
}

function SjpreviewMain() {
    return React.createElement(
        React.Fragment,
        null,
        ReactDOM.createPortal(React.createElement(MenuPrint, null), document.querySelector('#sjp-page')),
        ReactDOM.createPortal(React.createElement(ContentLetter, null), document.querySelector('#subpage'))
    );
}

ReactDOM.render(React.createElement(
    ContextOneProvider,
    null,
    React.createElement(SjpreviewMain, null)
), document.querySelector('#root'));