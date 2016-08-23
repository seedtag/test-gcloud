const gcloud = require('gcloud')();
const datastore = gcloud.datastore();
const shortid = require('shortid');

function getUrl(urlId) {
  const timeKey = `Time_${shortid.generate()}`;
  console.time(timeKey);
  const key = datastore.key(['Url', urlId]);
  datastore.get(key, (err, urlEntity) => {
    console.timeEnd(timeKey);
  });
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
