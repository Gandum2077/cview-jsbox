const {
  UIAlertActionStyle,
  UIAlertControllerStyle,
  UIAlertAction,
  UIAlertController
} = require("cview-uialert");

const { l10n } = require("cview-util-localization");

function loginAlert({
  title = "",
  message,
  placeholder1,
  placeholder2,
  cancelText = l10n("CANCEL"),
  confirmText = l10n("OK")
} = {}) {
  return new Promise((resolve, reject) => {
    const alertVC = new UIAlertController(
      title,
      message,
      UIAlertControllerStyle.Alert
    );

    alertVC.addTextField({
      placeholder: placeholder1
    });

    alertVC.addTextField({
      placeholder: placeholder2,
      secure: true,
      events: {
        shouldReturn: () => {
          const username = alertVC.getText(0);
          const password = alertVC.getText(1);
          const isValid = username.length > 0 && password.length > 0;
          return isValid;
        }
      }
    });

    alertVC.addAction(
      new UIAlertAction(cancelText, UIAlertActionStyle.Destructive, cancelEvent)
    );
    alertVC.addAction(
      new UIAlertAction(confirmText, UIAlertActionStyle.Default, confirmEvent)
    );
    alertVC.present();

    function confirmEvent() {
      const username = alertVC.getText(0);
      const password = alertVC.getText(1);
      resolve({
        username,
        password
      });
    }
    function cancelEvent() {
      reject("cancel");
    }
  });
}

module.exports = loginAlert;
