function ContentLetter() {
    const { state, dispatch } = React.useContext(ContextOne)
    return (
        <React.Fragment>
            <p>Nomor: {state.suratjalanDetail.nomor_surat}</p>
            <p>quantity: {state.suratjalanDetail.quantity}</p>
            <p>price: {state.suratjalanDetail.price}</p>
        </React.Fragment>
    )
}
function MenuPrint() {
    let params = (new URL(document.location)).searchParams;
    let id = params.get("id");
    
    const popup = (data) =>
        {
            var someElement = document.getElementById("body_surat");
            var someElementToString;

            if (someElement.outerHTML)
                someElementToString = someElement.outerHTML;
            else if (XMLSerializer)
                someElementToString = new XMLSerializer().serializeToString(someElement); 

            var iframe = document.createElement('iframe');
            iframe.name = 'frame1';
            // var html = '<body>Foo</body>';
            document.body.appendChild(iframe);
            var frameDoc = iframe.contentWindow
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
        }
    const doPrint = (e) => {
            e.preventDefault();
            // window.print();
            popup(null)
        }
    return (
        <React.Fragment>
            <a href={"suratjalan.html?id=" + id}>Back to Edit</a>
            <a href="#" onClick={doPrint}>Prints</a>
        </React.Fragment>
    )
}

function SjpreviewMain() {
    return (
        <React.Fragment>
              {ReactDOM.createPortal(<MenuPrint />, document.querySelector('#sjp-page'))}
              {ReactDOM.createPortal(<ContentLetter />, document.querySelector('#subpage'))}
        </React.Fragment>
      )
}

ReactDOM.render(<ContextOneProvider><SjpreviewMain/></ContextOneProvider>, document.querySelector('#root'));