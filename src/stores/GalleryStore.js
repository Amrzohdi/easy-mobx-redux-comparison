import { observable, action, runInAction } from "mobx";
import axios from "axios";

export default class GalleryStore {
  @observable term = "";
  @observable images = [];
  @observable status = "initial";
  @observable likesCount = 0;
  constructor(){
    this.like = this.like.bind(this);
  }

  @action
  fetchImages = async term => {
    this.status = "searching";
    this.term = term;
    this.images = [];
    this.likesCount =0;
    try {
      await setTimeout(function(){
            axios.get(
                "https://api.unsplash.com/search/photos",
                {
                    params: {
                        client_id:
                            "4070052047e85343f77f7bbfb056ca4da387e25b3114baff0644247779a29964",
                        query: term
                    }
                }
            ).then(function(response){
                this.setImages(response.data.results);
            }.bind(this));
        }.bind(this),1000);

    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
    }
  };

  @action
  setImages = images => {
    this.images = images;
    this.status = "done";
    images.forEach(image => {this.likesCount+=image.likes} );
  };

  @action
  like = function (id){
    this.likesCount++;
    this.images = this.images.map( image => {
      if(image.id == id)
        image.likes++;
      return image;
    });
  }


}
