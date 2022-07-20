class API_Fabric {
  constructor () {}
  API_URL = 'https://www.cheapshark.com/api/1.0/'
  setParams(params) {
    console.log(params);
    // params.storeID    ? this.storeID = params.storeID       : this.storeID = undefined
    this.storeID = params.storeID
    this.pageSize = params.pageSize
    this.pageNumber = params.pageNumber
    this.sortBy = params.sortBy
    this.desc = params.desc
    this.lowerPrice = params.lowerPrice
    this.upperPrice = params.upperPrice
    this.metacritic = params.metacritic
    this.steamRating = params.steamRating 
    this.steamAppID = params.steamAppID
    this.title = params.title
    this.exact = params.exact
    this.AAA = params.AAA
    this.steamworks = params.steamworks
    this.onSale = params.onSale
    this.output = params.output 
    this.id = params.id
    this.ids = params.ids 
    this.limit = params.limit
  }
  // Getters
  createURL(type, params) {
    params ? this.setParams(params) : null
    // this.setParams(params)
    const API = this.getAPI()
    return this.API_URL + type + API

    // console.log(url);
  }
  getAPI() {
    let str = ''
    this.storeID ? str += 'storeID='+String(this.storeID)+'&' : null
    this.pageNumber ? str += 'pageNumber='+String(this.pageNumber)+'&' : null
    this.pageSize ? str += 'pageSize='+String(this.pageSize)+'&' : null
    this.sortBy ? str += 'sortBy='+String(this.sortBy)+'&' : null
    this.desc ? str += 'desc='+String(this.desc)+'&' : null
    this.lowerPrice ? str += 'lowerPrice='+String(this.lowerPrice)+'&' : null
    this.upperPrice ? str += 'upperPrice='+String(this.upperPrice)+'&' : null
    this.metacritic ? str += 'metacritic='+String(this.metacritic)+'&' : null
    this.steamRating ? str += 'steamRating='+String(this.steamRating)+'&' : null
    this.steamAppID ? str += 'steamAppID='+String(this.steamAppID)+'&' : null
    this.title ? str += 'title='+String(this.title)+'&' : null
    this.exact ? str += 'exact='+String(this.exact)+'&' : null
    this.AAA ? str += 'AAA='+String(this.AAA)+'&' : null
    this.steamworks ? str += 'steamworks='+String(this.steamworks)+'&' : null
    this.onSale ? str += 'onSale='+String(this.onSale)+'&' : null
    this.output ? str += 'output='+String(this.output)+'&' : null
    this.id ? str += 'id='+String(this.id)+'&' : null
    this.ids ? str += 'ids='+String(this.ids)+'&' : null
    this.limit ? str += 'limit='+String(this.limit)+'&' : null
    if (str.length > 0) {
      str = str.slice(0, str.length-1)
    }
    console.log('RequestParams', str);
    // console.log(str);
    // console.log(str.lastIndexOf('&'))
    // console.log(str.length);
    // if (str.lastIndexOf('&') === str.length-1) {
    // }
    return str
  }
  // Methods

}
export default {
  API_URL: 'https://www.cheapshark.com/api/1.0/',
  API_Section: {
    List_of_Deals: 'deals?',
    Deal_Lookup: 'deals?',
    List_of_Games: 'games?',
    Game_Lookup: 'games?',
    Multiple_Game_Lookup: 'games?',
    Stores_Info: 'stores',
  },
  API_Fabric
}