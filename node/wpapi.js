const WPAPI = require('wpapi');
const { default: axios } = require('axios');

async function createPost(domain, username, password, title, content, status = 'draft') {
  const wp = new WPAPI({
    endpoint: `${domain}/wp-json`,
    // This assumes you are using basic auth, as described further below
    username,
    password,
  });
  await wp.posts().create({
    // "title" and "content" are the only required properties
    title,
    content,
    // Post will be created as a draft by default if a specific "status"
    // is not specified
    status,
  });

  //   const data = await axios.post(`${domain}/wp-json/wp/v2/posts`, {
  //     username,
  //     password,
  //     title,
  //     content,
  //     status,
  //   });
}

module.exports = { createPost };
