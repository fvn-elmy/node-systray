/* eslint-disable @typescript-eslint/naming-convention */
import os from 'os'
import SysTray from './index.js'
import { spawn } from 'node:child_process'
import buildProxiesMenuItems from './proxies.mjs';

const PROXY_BIN='cloud-sql-proxy';

let runnings = [];

const startProxy = (entryName, cluster, instance, port) => ({
  entryName,
  process: spawn(PROXY_BIN, [`${cluster}:europe-west1:${instance}`, '-p', `${port}`, '--auto-iam-authn'])
});

const itemExit = {
  title: 'Exit',
  tooltip: 'bb',
  checked: false,
  enabled: true,
  click: () => {
    runnings.forEach( ({process }) => process.kill());
    systray.kill(false)
  }
}

const sendAction = (self, entryName, displayName) => {
  return systray.sendAction({
    type: 'update-item',
    item: {
      ...self,
      tooltip: `${displayName} is ${self.checked ? 'up' : 'down'}`,
      title: entryName
    }
  });
};

const systray = new SysTray.default({
  menu: {
    // you should use .png icon on macOS/Linux, and .ico format on Windows
    icon: os.platform() === 'win32' ? './logo_s.ico' : './logo_s.png',
    isTemplateIcon: os.platform() === 'darwin',
    title: 'SQL',
    tooltip: 'Cloud SQL Proxy switcher',
    items: buildProxiesMenuItems({deps: { sendAction, startProxy, runningProxies: runnings }, exitButton: itemExit })
  },
  debug: false,
  copyDir: false // copy go tray binary to outside directory, useful for packing tool like pkg.
})

systray.onClick(action => {
  if (action.item.click != null) {
    action.item.click()
  }
})

// Systray.ready is a promise which resolves when the tray is ready.
systray.ready().then(() => {
  systray.process.stderr?.on('data', (chunk) => {
    console.log(chunk.toString())
  })
  console.log('systray started!')
})
