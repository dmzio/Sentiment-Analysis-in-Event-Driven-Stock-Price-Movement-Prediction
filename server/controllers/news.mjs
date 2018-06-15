
import csv from 'csvtojson';
import path from 'path';
import Moment from 'moment';
import momentRange from 'moment-range';

const moment = momentRange.extendMoment(Moment);

export function fetchNews(req, res) {
  let {since, end} = req.body;
  fetchNewsBetween(since, end).then(news => {
    res.json(news)
  })
}


// by default, fetch news since last two weeks
function fetchNewsBetween(since, end) {
  // determine all the files between since and end
  // read each csv file

  // TODO: set a maximum range
  let from, to;
  if (since) {
    from = moment(since, 'YYYYMMDD')
    to = end ? moment(end, 'YYYYMMDD') : from.clone().add(2, 'weeks')
  } else {
    to = end ? moment(end, 'YYYYMMDD') : moment()
    from = to.clone().subtract(2, 'weeks')
  }
  let range = moment.range(from, to)
  return Promise.all(Array.from(range.by('day')).map(date => {
    let year = String(date.year())
    let str = date.format('YYYYMMDD')
    let filePath = path.resolve(path.join('./input/news', year, `news_${str}.csv`))
    // console.log(year, str)
    return readCSV(filePath)
  })).then(allNews => {
    console.log(allNews.length)
    let data = []
    allNews.forEach(news => {
      data = data.concat(news)
    })
    return data
  })
  // return readCSV(path.resolve('./input/news/2018/news_20180526.csv'));
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
  })
  .catch(err => {
    // console.log(err)
    return []
  });
}