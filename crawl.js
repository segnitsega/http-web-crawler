function normalizeUrl(url) {
    const urlObj = new URL(url);
    url = `${urlObj.hostname}${urlObj.pathname}`;
    if(url.endsWith("/")) {
        url = url.slice(0, -1);
    }
    return url
}

module.exports = {
    normalizeUrl
}