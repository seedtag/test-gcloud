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
  const query = datastore.createQuery('Url');
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
  getUrl('www.my_url.com');
}, 50);
