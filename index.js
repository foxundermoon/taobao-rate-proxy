const fetch = require('node-fetch')
const url = require('url')
const baseUrl = url.parse('https://rate.taobao.com/feedRateList.htm?auctionNumId=537425825910&currentPageNum=1&pageSize=100&rateType=3', true)

module.exports = async function (req, res) {
    const _url = url.parse(req.url, true)
    let {
        query
    } = _url
    let newQuery = Object.assign({}, baseUrl.query)
    if (query) {
        for (let k in query) {
            newQuery[k] = query[k]
        }
    }
    let newUrl = Object.assign({}, baseUrl)
    newUrl.search = null
    delete newQuery.callback
    newUrl.query = newQuery
    let response = await fetch(url.format(newUrl))
    let origin = await response.text()
    let text = origin.trim()
    let jsonStr = text.substring(1, text.length - 1)
    return JSON.parse(jsonStr)
}