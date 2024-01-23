export default async function getBlocks(url) {
  try {
    const parsedURL = new URL(url);
    const relativePath = parsedURL.pathname.slice(1).split('/');
    relativePath.pop();
    const {default: pageData} = await import(`./docs/cc/${relativePath.join('/')}/info.json`, {
      assert: {
        type: 'json'
      }
    });
    // const parsedURL = new URL(url);
    // const relativePath = parsedURL.pathname.slice(1).split('/');
    // relativePath.pop();
    // const jsonPath = ['https://zagi25.github.io/docs/cc', relativePath.join('/'), 'info.json'].join('/');
    // const response = await fetch(jsonPath);
    return pageData;
  } catch (err) {
    console.log(err);
    return {};
  }
}
