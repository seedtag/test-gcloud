const gcloud = require('gcloud')();
const datastore = gcloud.datastore();

function getUrl(urlId) {
  console.log('Getting a new url');
  const key = datastore.key(['Url', urlId]);
  datastore.get(key, (err, urlEntity) => {
    if (!err) {
      console.log('Worked!');
      console.log(urlEntity);
    } else {
      console.log(err);
    }
  });
}

function findUrls() {
  console.log('Searching urls');
  const key = datastore.key(['Url', 'www.my_url.com']);
  const query = datastore.createQuery('Url').filter('__key__', key);
  datastore.runQuery(query, (err, entities, info) =>{
    if (!err) {
      console.log('Worked!');
      console.log(entities);
    } else {
      console.log(err);
    }
  });
}

setInterval(() => {
  findUrls();
}, 50);
