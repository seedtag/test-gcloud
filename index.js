const gcloud = require('gcloud')();
const datastore = gcloud.datastore();

function getUrl(urlId) {
  console.log('Getting a new url');
  const key = datastore.key(['Url', urlId]);
  datastore.get(key, (err, urlEntity) => {
    if (!err) {
      console.log('Worked!');
    } else {
      console.log(err);
    }
  });
}

setInterval(() => {
  getUrl('http://not_existing.com');
}, 50);
