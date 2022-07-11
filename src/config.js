class API_Fabric {
  constructor () {}
  API_URL = 'https://www.cheapshark.com/api/1.0/'
  setParams(params) {
    console.log(params);
    params.storeID ? this.storeID = params.storeID : this.storeID = undefined
    params.pageNumber ? this.pageNumber = params.pageNumber : this.pageNumber = undefined
    params.pageSize ? this.pageSize = params.pageSize : this.pageSize =undefined
    params.sortBy ? this.sortBy = params.sortBy : this.sortBy = undefined
    params.desc ? this.desc = params.desc : this.desc = undefined
    params.lowerPrice ? this.lowerPrice = params.lowerPrice : this.lowerPrice = undefined
    params.upperPrice ? this.upperPrice = params.upperPrice : this.upperPrice = undefined
    params.metacritic ? this.metacritic = params.metacritic : this.metacritic = undefined
    params.steamRating ? this.steamRating = params.steamRating : this.steamRating = undefined
    params.steamAppID ? this.steamAppID = params.steamAppID : this.steamAppID = undefined
    params.title ? this.title = params.title : this.title = undefined
    params.exact ? this.exact = params.exact : this.exact = undefined
    params.AAA ? this.AAA = params.AAA : this.AAA =  undefined
    params.steamworks ? this.steamworks = params.steamworks : this.steamworks =  undefined
    params.onSale ? this.onSale = params.onSale : this.onSale = undefined
    params.output  ? this.output = params.output : this.output = undefined
    params.id ? this.id = params.id : this.id = undefined
    params.ids ? this.ids = params.ids : this.ids = undefined
    params.limit ? this.limit = params.limit : this.limit = undefined
  }
  // Getters
  getURL(type, params) {
    params ? this.setParams(params) : null
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
    console.log(str);
    console.log(str.lastIndexOf('&'))
    console.log(str.length);
    if (str.lastIndexOf('&') === str.length-1) {
      str = str.slice(0, str.length-1)
      console.log('HERE', str);
    }
    return str
  }
  // Methods

}
export default {
  API_URL: 'https://www.cheapshark.com/api/1.0/',
  API_Fabric
}