const gcloud = require('gcloud')();
const datastore = gcloud.datastore();

function getUrl(urlId) {
  console.log('Getting a new url');
  const key = datastore.key(['Url', urlId]);
  datastore.get(key, (err, urlEntity) => {});
}

function findUrls() {
  console.log('Searching urls');
  const key = datastore.key(['Url', 'www.my_url.com']);
  const query = datastore.createQuery('Url').filter('__key__', key);
  datastore.runQuery(query, (err, entities, info) =>{});
}

setInterval(() => {
  getUrl('www.test-url.com');
}, 25);

process.on('SIGUSR2', () => {
  logging.log('Running GC');
  global.gc();
});
