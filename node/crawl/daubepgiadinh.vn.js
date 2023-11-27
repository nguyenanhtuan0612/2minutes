const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const ignoreText = ['Tham khảo hình ảnh và công thức từ kênh YouTube PiTi Family'];

module.exports = async function daubepgiadinhVn(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const contentArray = [];

    // Remove unwanted elements
    $('div.woocommerce-Reviews').remove();
    $('h3:contains("Mô tả khóa học")').remove();
    //$('div#tab-description').remove();

    // Extract the content from the HTML using CSS selectors
    $('div.tab-panels').each((index, element) => {
      const elementHtml = $(element).html();
      const modifiedHtml1 = elementHtml.replace(/\[toc\]/gi, '');
      const modifiedHtml2 = modifiedHtml1.replace(/<a\b[^>]*>/gi, match => {
        return match.replace(/href="[^"]*"/gi, '');
      });
      contentArray.push(`<${element.name}>${modifiedHtml2}</${element.name}>`);
    });
    const contentHtml = contentArray.join('');
    fs.writeFile('output.html', contentHtml, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
    return contentHtml;
  } catch (error) {
    console.error('Error crawling content:', error);
    return null;
  }
};
