const cheerio = require('cheerio');
const axios = require('axios');
const dienmayxanhCom = require('./crawl/dienmayxanh.com');
const disantranganVn = require('./crawl/disantrangan.vn');
const thucphamsieuthiVn = require('./crawl/thucphamsieuthi.vn');
const daubepgiadinhVn = require('./crawl/daubepgiadinh.vn');
const { createPost } = require('./wpapi');

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
    try {
      const firstUrl = await getAllResultUrls(iterator);
      switch (true) {
        case firstUrl.includes('dienmayxanh.com'): {
          data.push(await dienmayxanhCom(firstUrl));
          break;
        }
        case firstUrl.includes('disantrangan.vn'): {
          data.push(await disantranganVn(firstUrl));
          break;
        }
        case firstUrl.includes('thucphamsieuthi.vn'): {
          data.push(await thucphamsieuthiVn(firstUrl));
          break;
        }
        case firstUrl.includes('daubepgiadinh.vn'): {
          const content = await daubepgiadinhVn(firstUrl);
          await createPost('https://daytiengnhat.edu.vn', 'admin', 'Ha2000$$$', 'Test', content);
          data.push({ keywords: iterator, content: 'Cào thành công', url: firstUrl });
          break;
        }
        default: {
          data.push({ keywords: iterator, content: 'Không tìm thấy', url: firstUrl });
        }
      }
    } catch (error) {
      console.error('Error:', error);
      data.push({ keywords: iterator, content: 'Không tìm thấy', url: 'Không tìm thấy' });
    }
  }
  return data;
};

module.exports = crawl;
