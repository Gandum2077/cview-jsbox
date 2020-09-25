const {
  UIAlertActionStyle,
  UIAlertControllerStyle,
  UIAlertAction,
  UIAlertController
} = require("cview-uialert");

const { l10n } = require("cview-util-localization");

function plainAlert({
  title = "",
  message,
  cancelText = l10n("CANCEL"),
  confirmText = l10n("OK")
} = {}) {
  return new Promise((resolve, reject) => {
    const alertVC = new UIAlertController(
      title,
      message,
      UIAlertControllerStyle.Alert
    );

    alertVC.addAction(
      new UIAlertAction(cancelText, UIAlertActionStyle.Destructive, cancelEvent)
    );
    alertVC.addAction(
      new UIAlertAction(confirmText, UIAlertActionStyle.Default, confirmEvent)
    );
    alertVC.present();

    function confirmEvent() {
      resolve("ok");
    }
    function cancelEvent() {
      reject("cancel");
    }
  });
}

module.exports = plainAlert;
