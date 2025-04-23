# node-systray

> SysTray2 library for nodejs using [systray-portable](https://github.com/felixhao28/systray-portable) (a portable version of [the go systray library](https://github.com/getlantern/systray)).

> cloud SQL **proxy switch** that you can dock into your **traybar**.
> - can start/stop proxy on the fly
> - a tick is indicating status for each listed instances
> - shutdown running proxies when closing traybar

![](https://github.com/fvn-bcm-oui/node-systray/blob/main/sqlProxyTray.gif)

## Install
```sh
npm install
npm run build
```

## Usage

```sh
npm start
```

## Configuration

Edit file `./proxiesConfiguration.json`

```json
{
  "configs": {
    "dbInstanceTitle": {
      "cluster": "gcloud-projectName",
      "instance": "dbInstanceName",
      "region": "europe-west1",
      "port": 54320
    },
    ...
  }
}
```

- with `gcloud-projectName`
  - `bcm-development`
  - ...
- with `dbInstanceName` & `dbInstanceTitle` (could be identical to dbInstanceName)
  - `cascade`
  - `atlantis-14`
  - ...


## Known Issues


