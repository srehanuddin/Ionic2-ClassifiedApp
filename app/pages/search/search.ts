import {Page, NavController} from 'ionic-angular';

//Services 
import {CategoriesService} from './../../services/app.services';

//PAGES
import {AdsPage}  from './../ads/ads';

@Page({
  templateUrl: 'build/pages/search/search.html'
})
export class SearchPage {

  categories = null; 
    
  constructor(public nav : NavController, public _CategoriesService : CategoriesService) {
      this.categories = _CategoriesService.getCategories();
  }
  
  
  gotoPage(page){
      this.nav.push(page);
  }
  
  searchAd(Title, Price, Category){
      Title = Title.value
      Price = Price.value;
      Category = Category.text;

      this.nav.push(AdsPage, { 
          Category : Category,
           Title : Title,
           Price : Price
        });      
  }
  
  
}
