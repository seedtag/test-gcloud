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
  const timeKey = `Time_${shortid.generate()}`;
  console.time(timeKey);
  const key = datastore.key(['Url', 'www.my_url.com']);
  const query = datastore.createQuery('UrlTest').filter('__key__', key);
  datastore.runQuery(query, (err, entities, info) =>{
    if (err) {
      console.log(err);
    }
    console.timeEnd(timeKey);
  });
}

setInterval(() => {
  //getUrl('www.test-url.com');
  findUrls();
}, 50);
