// const allApps = require('./applications.json');
// const deletedApps = require('./deleted-apps.json');
// const fs = require('fs/promises');
const { remove, getAll } = require('@clevercloud/client/cjs/api/v2/application.js');
const { sendToApi } = require('./src/models/send-to-api.js');

function sleep (delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const ORGA_ID = 'orga_932b0d2f-b29b-41f3-a36e-845ce9d0f9ed';

async function run () {

  console.log('Fetching all apps')
  const allApps = await getAll({ id: ORGA_ID }).then(sendToApi);

  let i = 0;
  console.log(allApps.length, 'apps to delete');

  for (const app of allApps) {
    if (app.name.startsWith('Jenkins agent ')) {

      try {
        remove({ id: ORGA_ID, appId: app.id }).then(sendToApi)
          .then(() => {
            i += 1;
            console.log(String(i).padStart(5, ' '), String(allApps.length - i).padStart(5, ' '), allApps.length, app.id);
          });
      }
      catch (e) {
        console.log(e);
      }

      await sleep(750);
    }
  }
}

run()
  .then(console.log)
  .catch(console.error);
