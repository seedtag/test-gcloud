const gcloud = require('gcloud')();
const datastore = gcloud.datastore();

function get(urlId) {
  return new Promise((resolve, reject) => {
    const key = datastore.key(['SherlockUrl', urlId]);
    datastore.get(key, (err, urlEntity) => {
      if (!err) {
        resolve(urlEntity);
      } else {
        reject(err);
      }
    });
  });
}

function request() {
  console.info('Requesting...')
  get('urlForTest').then((url) => {
    console.info('Request completed');
    request();
  }).catch(err => {
    console.error('Ups, it failed!');
    console.error(err);
    request();
  })
}

request();
