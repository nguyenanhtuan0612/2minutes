const cheerio = require('cheerio');
const axios = require('axios');
const dienmayxanhCom = require('./crawl/dienmayxanh.com');
const disantranganVn = require('./crawl/disantrangan.vn');
const thucphamsieuthiVn = require('./crawl/thucphamsieuthi.vn');
const daubepgiadinhVn = require('./crawl/daubepgiadinh.vn');
const { createPost } = require('./wpapi');
const { Site } = require('./models/site');
const { Keyword } = require('./models/keyword');

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

const getNextKeyword = async () => {
  try {
    const sites = await Site.findAll();
    const keywords = [];
    for (const site of sites) {
      const keyword = await Keyword.findOne({ where: { siteId: site.id, done: false } });
      if (keyword) {
        keywords.push(keyword);
      }
    }
    return keywords;
  } catch (error) {
    throw error;
  }
};

const crawl = async keyword => {
  try {
    const site = await Site.findOne({ where: { id: keyword.siteId } });
    if (!site) throw new Error('Site not found');

    const firstUrl = await getAllResultUrls(keyword.keyword);
    switch (true) {
      case firstUrl.includes('dienmayxanh.com'): {
        const content = await dienmayxanhCom(firstUrl);
        await createPost(site.site, site.username, site.password, 'Test', keyword.categoryId, content);
        await Keyword.update({ done: true, error: false, url: firstUrl }, { where: { id: keyword.id } });
        return { keywords: keyword, content: 'Cào thành công', url: firstUrl };
      }
      case firstUrl.includes('disantrangan.vn'): {
        const content = await disantranganVn(firstUrl);
        await createPost(site.site, site.username, site.password, 'Test', keyword.categoryId, content);
        await Keyword.update({ done: true, error: false, url: firstUrl }, { where: { id: keyword.id } });
        return { keywords: keyword, content: 'Cào thành công', url: firstUrl };
      }
      case firstUrl.includes('thucphamsieuthi.vn'): {
        const content = await thucphamsieuthiVn(firstUrl);
        await createPost(site.site, site.username, site.password, 'Test', keyword.categoryId, content);
        await Keyword.update({ done: true, error: false, url: firstUrl }, { where: { id: keyword.id } });
        return { keywords: keyword, content: 'Cào thành công', url: firstUrl };
      }
      case firstUrl.includes('daubepgiadinh.vn'): {
        const content = await daubepgiadinhVn(firstUrl);
        await createPost(site.site, site.username, site.password, 'Test', keyword.categoryId, content);
        await Keyword.update({ done: true, error: false, url: firstUrl }, { where: { id: keyword.id } });
        return { keywords: keyword, content: 'Cào thành công', url: firstUrl };
      }
      default: {
        await Keyword.update({ error: true, url: firstUrl }, { where: { id: keyword.id } });
        return { keywords: keyword, content: 'Không tìm thấy', url: firstUrl };
      }
    }
  } catch (error) {
    await Keyword.update({ error: true }, { where: { id: keyword.id } });
    throw error;
  }
};

const addSite = async (site, username, password) => {
  try {
    const newSite = await Site.create({ site, username, password });
    return newSite;
  } catch (error) {
    throw error;
  }
};

const listSite = async offset => {
  try {
    const sites = await Site.findAll({ offset, limit: 10 });
    return sites;
  } catch (error) {
    throw error;
  }
};

const updateSite = async (id, site, username, password) => {
  try {
    const site = await Site.update({ site, username, password }, { where: { id } });
    return site;
  } catch (error) {
    throw error;
  }
};

const deleteSite = async id => {
  try {
    const site = await Site.destroy({ where: { id } });
    return site;
  } catch (error) {
    throw error;
  }
};

const addKeyword = async (siteId, keywords, categoryId) => {
  try {
    for (const keyword of keywords) {
      await Keyword.create({ siteId, keyword, categoryId, done: false, error: false });
    }
    return true;
  } catch (error) {
    throw error;
  }
};

const listKeyword = async (siteId, categoryId) => {
  try {
    const done = await Keyword.findAll({ where: { siteId, categoryId, done: true } });
    const undone = await Keyword.findAll({ where: { siteId, categoryId, done: false, error: false } });
    const error = await Keyword.findAll({ where: { siteId, categoryId, error: true } });
    return { done, undone, error };
  } catch (error) {
    throw error;
  }
};

const deleteKeyword = async id => {
  try {
    const keyword = await Keyword.destroy({ where: { id } });
    return keyword;
  } catch (error) {
    throw error;
  }
};

module.exports = { crawl, addSite, listSite, updateSite, deleteSite, addKeyword, deleteKeyword, getNextKeyword, listKeyword };
