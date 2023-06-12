function ContentLetter(_ref) {
    var nomor = _ref.nomor,
        quantity = _ref.quantity,
        price = _ref.price;

    return React.createElement(
        React.Fragment,
        null,
        React.createElement(
            'p',
            null,
            'Nomor: ',
            nomor
        ),
        React.createElement(
            'p',
            null,
            'quantity: ',
            quantity
        ),
        React.createElement(
            'p',
            null,
            'price: ',
            price
        )
    );
}

function SjpreviewMain() {
    var _React$useContext = React.useContext(ContextOne),
        state = _React$useContext.state,
        dispatch = _React$useContext.dispatch;

    React.useEffect(function () {
        var params = new URL(document.location).searchParams;
        var id = params.get("id");
        labkodingMain().fetchOneSuratjalanById(id, function () {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            dispatch({ type: 'setSuratjalanDetail', payload: data });
            dispatch({ type: 'setStoreSelected', payload: data.store_id });
        });
    }, []);

    return React.createElement(
        React.Fragment,
        null,
        ReactDOM.createPortal(React.createElement(ContentLetter, { nomor: state.suratjalanDetail.nomor_surat, quantity: state.suratjalanDetail.quantity, price: state.suratjalanDetail.price }), document.querySelector('#subpage'))
    );
}

ReactDOM.render(React.createElement(
    ContextOneProvider,
    null,
    React.createElement(SjpreviewMain, null)
), document.querySelector('#root'));