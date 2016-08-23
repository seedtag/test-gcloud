const gcloud = require('gcloud')();
const datastore = gcloud.datastore();
const shortid = require('shortid');

function getUrl(urlId) {
  const timeKey = `Time_${shortid.generate()}`;
  console.time(timeKey);
  const key = datastore.key(['UrlTest', urlId]);
  datastore.get(key, (err, urlEntity) => {
    if (err) {
      console.log(err);
    }
    console.timeEnd(timeKey);
  });
}

function findUrls() {
  console.log('Searching urls');
  const key = datastore.key(['Url', 'www.my_url.com']);
  const query = datastore.createQuery('UrlTest').filter('__key__', key);
  datastore.runQuery(query, (err, entities, info) =>{});
}

console.time('Creating url')
const key = datastore.key(['Url', 'www.test-url.com']);
const entity = {
    key: key,
    data: {url: 'www.test-url.com'}
  };
datastore.save(
    entity,
    function (err) {
      if (err) {
        console.log(err);
      }
      console.timeEnd('Creating url')
    }
  );

setInterval(() => {
  getUrl('www.test-url.com');
}, 50);
