// TODO: query a real API
import Unsplash, { toJson } from 'unsplash-js';
var jsonfile = require('jsonfile');

const unsplash = new Unsplash({
  applicationId: "44f861574db65daf9d0a5138f021e9283fd5449f27a6c690d791eb50a5c37eef",
  secret: "13ec03ee18974be10fec679dee285d637f158fb78ab28095efc5c98de5616afd",
  callbackUrl: "http://localhost:3333"
});

let arr = [];
var jsons = JSON.parse(localStorage.getItem("arr"));

if(jsons === null){
  for(let i = 1; i <= 10; i++){
    unsplash.photos.listPhotos(i, 30, "latest")
    .then(toJson)
    .then(json => {
      json.map((item) => {
        let url = item.urls.raw+"?fm=jpg";
        let tag = item.user.location;
        if(tag === null)
          tag = '';
        let val = {url:url,tags: [tag]};
        arr.push(val);      
      });    
      localStorage.setItem("arr", JSON.stringify(arr));
    });
  }
  console.log('vô rồi');
}

var arrImages = JSON.parse(localStorage.getItem("arr"));
// localStorage.clear();
const images = arrImages;

export const getPopularImages = () => Promise.resolve(images);

// export const searchImages = (query) => {
//   const filteredImages = images.filter(img => {
//     return img.tags.some(tag => {
//       return tag.indexOf(query) !== -1;
//     });
//   });
//   // console.log(filteredImages)
//   return Promise.resolve(filteredImages);
// };

//search images from unsplash api
var imagesArr = [];
export const searchImages = (query) => {
    const search_ = unsplash.search.all(query, 2)
    .then(toJson)
    .then(json => {
      var result = json.photos.results;
      imagesArr = [];
      result.map((item) => {
          let url = item.urls.raw+"?fm=jpg";
          let tag = item.user.location;
          if(tag === null)
            tag = '';
          let val = {url:url,tags: [tag]};
          imagesArr.push(val);      
        });  
        console.log(imagesArr);
        return imagesArr;
    });
    return Promise.resolve(search_);
};
