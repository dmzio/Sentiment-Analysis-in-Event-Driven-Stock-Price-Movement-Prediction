
import csv from 'csvtojson';
import path from 'path';


export function fetchNews(req, res) {
  console.log(req.body)
  let {since, end} = req.body;
  fetchNewsBetween(since, end).then(news => {
    console.log(news)
    res.json(news);
  })
}


// by default, fetch news since last two weeks
function fetchNewsBetween(since, end) {
  // determine all the files between since and end
  // read each csv file
  return readCSV(path.resolve('./input/news/2018/news_20180526.csv'));
}

function readCSV(filePath) {
  return csv({
    noheader: true,  // since the first row is not header
    headers: ['ticker','company','date','title','body','newsType','predict'],
    ignoreColumns: /body/,
  })
  .fromFile(filePath)
  .then((jsonObj) => {
    jsonObj.forEach((item) => {
      // TODO: replace with real correctness of prediction
      // TODO: filter by newsType if needed
      item['correct'] = Math.random() > 0.5 ? true : false;
    });
    return jsonObj;
  });
}