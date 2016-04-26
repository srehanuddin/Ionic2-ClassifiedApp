import {Injectable} from 'angular2/core';

export class AdItem {
    _id : string;
    Title : string;
    Description : string;
    Price : string;    
    MainImage : string;
    Category : string;
    Featured : boolean;
}

@Injectable()
export class AdService{
    
    ads : Array<AdItem>;
    
    
    constructor(){
        
        let ads = localStorage.getItem('ads');
        if(ads){
            this.ads = JSON.parse(ads);
        } else {
            this.ads = [];
        }
        
    }
    
    createAdInService(Title, Description, Price, MainImage, Category, Featured){
        let tmp : AdItem = {
            _id : (Date.now()).toString(),
            Title : Title,
            Description : Description,
            Price : Price,
            MainImage : MainImage,
            Category : Category,
            Featured : Featured
        }        
        this.ads.push(tmp);
        
        localStorage.setItem("ads", JSON.stringify(this.ads));
    }
    
    getAds(){
        return this.ads;
    }
    
    getFilteredAds(obj){
        var tmp = [];
        
        for(var i = 0; i < this.ads.length; i++){
            var flag = true;
            if(obj.Category && obj.Category != this.ads[i].Category){
                flag = false;
            }
            if(obj.Title && this.ads[i].Title.toLowerCase().indexOf(obj.Title.toLowerCase()) == -1){
                flag = false;
            }
            if(obj.Price && obj.Price != this.ads[i].Price){
                flag = false;
            }
            if(obj.Featured && !this.ads[i].Featured){
                flag = false;
            }
            
            if(flag){
                tmp.push(this.ads[i]);
            }            
        }
        
        return tmp;
    }
    
    getFeaturedAdsLimited(count){
        var tmp = [];
        
        let counter = 0;
        for(var i = 0; i < this.ads.length; i++){
            
            if(this.ads[i].Featured){                
                counter++;
                tmp.push(this.ads[i]);
                if(counter == count){
                    break;
                } 
            } 
  
            
        }
        
        return tmp;
    }
}

@Injectable()
export class CategoriesService{
    
    categories = [
        "Cars",
        "Cell Phones",
        "Electronics",
        "Laptops",
        "Camera"
    ]
    
    getCategories(){
        return this.categories;
    }
}

