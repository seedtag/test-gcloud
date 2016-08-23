const gcloud = require('gcloud')();
const datastore = gcloud.datastore();
const shortid = require('shortid');

function getUrl(urlId) {
  const timeKey = `Time_${shortid.generate()}`;
  console.time(timeKey);
  const key = datastore.key(['SherlockUrl', urlId]);
  datastore.get(key, (err, urlEntity) => {
    if (err) {
      console.log(err);
    }
    console.timeEnd(timeKey);
  });
}

function findUrls() {
  console.log('Searching urls');
  const key = datastore.key(['SherlockUrl', 'www.my_url.com']);
  const query = datastore.createQuery('UrlTest').filter('__key__', key);
  datastore.runQuery(query, (err, entities, info) =>{});
}

setInterval(() => {
  getUrl('www.test-url.com');
}, 50);
