const cheerio = require('cheerio');
const axios = require('axios');
const dienmayxanhCom = require('./crawl/dienmayxanh.com');

async function getAllResultUrls(searchQuery) {
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
  const response = await axios.get(searchUrl);
  const $ = cheerio.load(response.data);
  const resultUrls = [];
  $('a').each((index, element) => {
    const url = $(element).attr('href');
    if (url.startsWith('/url?q=') && !url.includes('youtube.com') && !url.includes('google')) {
      resultUrls.push(url.replace('/url?q=', '').split('&')[0]);
    }
  });
  return resultUrls[0];
}

// const searchQuery = 'Hướng dẫn làm món đậu tương lên men';
// getAllResultUrls(searchQuery)
//   .then(urls => {
//     console.log('All result URLs:', urls);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });

const crawl = async keywords => {
  const data = [];
  for (const iterator of keywords) {
    const firstUrl = await getAllResultUrls(iterator);
    switch (true) {
      case firstUrl.includes('dienmayxanh.com'): {
        data.push(await dienmayxanhCom(firstUrl));
        break;
      }
      default: {
        return { keywords: iterator, content: 'Không tìm thấy' };
      }
    }
    return data;
  }
};

module.exports = crawl;
