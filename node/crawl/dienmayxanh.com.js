const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const ignoreText = ['Tham khảo hình ảnh và công thức từ kênh YouTube PiTi Family'];

async function dienmayxanhCom(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const contentArray = [];

    // Remove unwanted elements
    $('div.staple > h2 > small').remove();
    $('div.rate-view').remove();
    $('ul.ready').remove();
    $('div.list-recipe').remove();
    $('div.video').remove();
    $('h1').remove();
    $('b.tlt').remove();
    $('div.boxpromote').remove();
    $('div.infobox').remove();
    $('div.txtAuthor').remove();
    $('div.content-step').remove();
    $('div.customerSurvey').remove();
    $('div.food-similar').remove();
    $('div.box-commentCook').remove();
    $('div.infoprod').remove();
    $('a.btn__noibat').remove();

    // Extract the content from the HTML using CSS selectors
    $('div.detail-content').each((index, element) => {
      const elementHtml = $(element).html();

      //Xóa định danh web cũ
      const modifiedHtml1 = elementHtml.replace(/Điện máy XANH/gi, match => {
        return match.replace(/Điện máy XANH/gi, '');
      });

      //Xóa href trong thẻ a
      const modifiedHtml2 = modifiedHtml1.replace(/<a\b[^>]*>/gi, match => {
        return match.replace(/href="[^"]*"/gi, '');
      });

      contentArray.push(`<${element.name}>${modifiedHtml2}</${element.name}>`);
    });
    const contentHtml = contentArray.join('');
    // fs.writeFile('output.html', contentHtml, function (err) {
    //   if (err) throw err;
    //   console.log('Saved!');
    // });
    return contentHtml;
  } catch (error) {
    console.error('Error crawling content:', error);
    return null;
  }
}

module.exports = dienmayxanhCom;
