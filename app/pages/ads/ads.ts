import {Page, NavController, NavParams} from 'ionic-angular';

//Services 
import {AdService, AdItem} from './../../services/app.services';

@Page({
  templateUrl: 'build/pages/ads/ads.html'
})
export class AdsPage {
  
  ads : Array<AdItem>;
  
  constructor(public nav : NavController, public _AdService : AdService, public params: NavParams) {
    
    if(Object.keys(params.data).length){
        this.ads = this._AdService.getFilteredAds(params.data);
    } else {
        this.ads = this._AdService.getAds();
    }
    
    
    console.log(this.ads);
    console.log(params);
  }
  
  
}
