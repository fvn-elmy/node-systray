function logRunningProxies(runningProxies) {
  console.log(
    runningProxies
    .map(({entryName}) => `${entryName}`)
    .join(', '));
}

const buildMenuItem = ([ entryName, {cluster, instance, region, port}]) =>
  ({ sendAction, startProxy, runningProxies }) => {
    const proxy = {
      title: entryName,
      tooltip: `${instance} sur ${cluster}`,
      checked: false,
      enabled: true,
      click: () => {
        const itemTitle = entryName;
        const instanceName = instance;
        const portNumber = port;
        const envName = cluster;
        const regionName = region;
        if (!proxy.checked) {
          console.log(`Starting proxy for ${entryName}: ${envName}:${regionName}-${instanceName} at ${portNumber} ...`);
          runningProxies.push(startProxy(entryName, envName, regionName, instanceName, portNumber));
        }
        else {
          console.log(`... Stopping proxy for  ${entryName}: ${envName}:${regionName}-${instanceName} at ${portNumber}`);
          logRunningProxies(runningProxies);
          runningProxies
            .filter(({entryName}) => entryName === itemTitle)
            .forEach(({process}) => process.kill());
          runningProxies = runningProxies.filter(({process}) => !process.killed);
          logRunningProxies(runningProxies);
        }
        proxy.checked = !proxy.checked
        sendAction(proxy, itemTitle, `${instanceName} sur ${envName}]`);
      }
    };
    return proxy;
  }

export default buildMenuItem;
