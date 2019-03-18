let application = require("tns-core-modules/application");
var frame = require("ui/frame");
require('tns-i18n')('en');

global.contatore = 0;
global.place_selected = "";
global.global_id = " ";

application.run({ moduleName: "app-root" });

application.on(application.suspendEvent, (args) => {
    if (args.android) {
        contatore = 0;
        global_id = " ";
        console.log("Activity: " + args.android);
    } else if (args.ios) {
        contatore = 0;
        global_id = " ";
        console.log("UIApplication: " + args.ios);
    }
});