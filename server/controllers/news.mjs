
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


// by default, fetch news since last week
// determine all the files between since and end
// read each csv file
function fetchNewsBetween(since, end) {

  // TODO: set a maximum range
  let from, to;
  if (since) {
    from = moment(since, 'YYYYMMDD')
    to = end ? moment(end, 'YYYYMMDD') : from.clone().add(3, 'days')
  } else {
    to = end ? moment(end, 'YYYYMMDD') : moment()
    from = to.clone().subtract(3, 'days')
  }
  let range = moment.range(from, to)
  if (range.diff('days') > 31) {
    return Promise.resolve('The date range is too big')
  }
  return Promise.all(Array.from(range.reverseBy('day')).map(date => {
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
}

function readCSV(filePath) {
  return csv({
    noheader: true,  // since the first row is not header
    headers: ['ticker','company','date','title','body','newsType','predict'],
    ignoreColumns: /body/,
  })
  .fromFile(filePath)
  .then((jsonObj) => {
    return jsonObj.filter(item => {
      // TODO: replace with real correctness of prediction
      // TODO: filter by newsType if needed
      let sign = Math.random() > 0.5 ? '+' : '-'
      item['day-on-day'] = sign + Math.random().toFixed(2) + '%';
      return item['newsType'] === 'topStory'
    });
  })
  .catch(err => {
    // console.log(err)
    return []
  });
}