import {Page, NavController, ActionSheet} from 'ionic-angular';
import {Camera} from 'ionic-native';

//Services 
import {AdService, CategoriesService} from './../../services/app.services';

//PAGES
import {HomePage}  from './../home/home';

@Page({
  templateUrl: 'build/pages/ad_add/ad_add.html'
})
export class AdAddPage {

  image = "";
  categories = null;
  featured = null;

  constructor(
      public nav : NavController, 
    public _AdService : AdService, 
    public _CategoriesService : CategoriesService) {
        
        this.categories = _CategoriesService.getCategories();
              
  }
  
  captureImage(){
    
    let imageFromCamera = false;
    
    let actionSheet = ActionSheet.create({
    title: 'Select Method',
    buttons: [
      {
        text: 'Camera',
        handler: () => {
          console.log('Camera clicked');
          imageFromCamera = true;
          getImage();
        }
      },
      {
        text: 'Gallery',
        handler: () => {
          console.log('Gallery clicked');
          imageFromCamera = false;
          getImage();
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });

  this.nav.present(actionSheet);
    
  let getImage = () => {
      
        let options = {
            destinationType : 0,
            sourceType : (imageFromCamera ? 1 : 0)
        };
        Camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:

            let base64Image = "data:image/jpeg;base64," + imageData;

            this.image = base64Image;

        }, (err) => {
            console.log(err);
            alert(err);
        });
  }

    
  }

  createAd(Title, Description, Price, Category){
      Title = Title.value
      Description = Description.value;
      Price = Price.value;
      Category = Category.text;
      
      let Featured = this.featured;
      let MainImage = this.image;
      
      this._AdService.createAdInService(Title, Description, Price, MainImage, Category, Featured);
      
      this.nav.push(HomePage);
      
  }
  

}
