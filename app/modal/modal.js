const topmost = require("ui/frame").topmost;
let closeCallback;
var dialogs = require("tns-core-modules/ui/dialogs");

let modal;
let ora;
let data_selected;

exports.onShownModally = function (args) {
    modal = args.object;
    /*
        now you can do modal.getViewById("<id of element>");
    */

    const context = args.context; // The context that was passed to this modal

    console.log("Context passed was: ");
    console.log(JSON.stringify(context));
    ora = context.context;

    modal.getViewById("hours_search").selectedIndex = ora;
    modal.getViewById("hours_search").items = ["00", "01", "02", "03", "04",
                                                            "05", "06", "07", "08", "09", "10", "11",
                                                            "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];

    closeCallback = args.closeCallback; // The closecallback method, which you can call to close the modal
};

exports.close = function (args) {
    const page = topmost().currentPage;
    if (page && page.modal) {
        page.modal.closeModal();
        /* The closecallback still does get called, so you need to handle it
           you can also simply call closeCallback() by passing nothing to close the modal
           this is just an alternate way */
    }
};

exports.onDateSelected = function (args) {
    let data = new Date(args.date);
    let data_now = new Date();
    let data_min = new Date(2019, 0, 1);
    let anno, mese, giorno;
    anno = data.getFullYear();
    mese = data.getMonth() + 1;
    giorno = data.getDate();

    if(data > data_now.setDate(data_now.getDate() + 5) || data < data_min)
        dialogs.alert({
            title : "Attenzione",
            message : "La data selezionata non è corretta. Riprova.",
            okButtonText : "OK"
        }).then(function () {

        });

    else{
        if(mese < 10)
            mese = "0" + mese;
        if(giorno < 10)
            giorno = "0" + giorno;

        data_selected = anno + "" + mese + "" + giorno;
        console.log(data_selected);

        modal.getViewById("calendar").visibility = "collapsed";
        modal.getViewById("ora").visibility = "visible";
    }
};

exports.back = function () {
    modal.getViewById("calendar").visibility = "visible";
    modal.getViewById("ora").visibility = "collapsed";
};

exports.confirm = function () {
    ora = modal.getViewById("hours_search").selectedIndex;

    let data_final = data_selected + "Z" + ora + "00";

    console.log(data_final);

    closeCallback(data_final);
};
