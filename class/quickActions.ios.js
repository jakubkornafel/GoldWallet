import QuickActions from 'react-native-quick-actions';
// const loc = require('../loc/index');

export default class DeviceQuickActions {
  static shared = new DeviceQuickActions();
  wallets;

  static async setQuickActions() {
    if (DeviceQuickActions.shared.wallets === undefined) {
      return;
    }
    QuickActions.isSupported((error, supported) => {
      if (supported && error === null) {
        let shortcutItems = [];
        for (const wallet of DeviceQuickActions.shared.wallets) {
          shortcutItems.push({
            type: 'Wallets', // Required
            title: wallet.getLabel(), // Optional, if empty, `type` will be used instead
            // subtitle:
            //   wallet.hideBalance || wallet.getBalance() <= 0
            //     ? ''
            //     : loc.formatBalance(Number(wallet.getBalance()), wallet.getPreferredBalanceUnit(), true),
            userInfo: {
              url: `bluewallet://wallet/${wallet.getID()}`, // Provide any custom data like deep linking URL
            },
          });
        }
        QuickActions.setShortcutItems(shortcutItems);
      }
    });
  }

  static clearShortcutItems() {
    QuickActions.clearShortcutItems();
  }
}
