// TODO: query a real API
// import Unsplash from 'unsplash-api';
var $ = require('jquery');
import Unsplash, { toJson } from 'unsplash-js';
var jsonfile = require('jsonfile');
// var unsplash = require('unsplash-api');

var file = '/public/data.json'
// var photo = new UnsplashPhoto();
// photo.fetch();
const unsplash = new Unsplash({
  applicationId: "44f861574db65daf9d0a5138f021e9283fd5449f27a6c690d791eb50a5c37eef",
  secret: "13ec03ee18974be10fec679dee285d637f158fb78ab28095efc5c98de5616afd",
  callbackUrl: "http://localhost:3333"
});
const authenticationUrl = unsplash.auth.getAuthenticationUrl([
  "public",
  "read_user",
  "write_user",
  "read_photos",
  "write_photos"
]);
// location.assign(authenticationUrl);
let arr = [];
var jsons = JSON.parse(localStorage.getItem("jsons"));

if(jsons !== null){
  for(let i = 1; i <= 10; i++){
    unsplash.photos.listPhotos(i, 30, "latest")
    .then(toJson)
    .then(json => {
      json.map((item) => {
        // console.log(item);
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
  // console.log('vô rồi');
}

var arrImages = JSON.parse(localStorage.getItem("arr"));
// console.log(arrImages);
// localStorage.clear();
const images = arrImages;
// const images = [
//   { url: 'https://images.unsplash.com/photo-1461016951828-c09537329b3a?fm=jpg', tags: [null] },
//   { url: 'https://images.unsplash.com/photo-1461295025362-7547f63dbaea?fm=jpg', tags: ['crops'] },
//   { url: 'https://images.unsplash.com/photo-1465326117523-6450112b60b2?fm=jpg', tags: ['forest', 'hill'] },
//   { url: 'https://images.unsplash.com/photo-1458640904116-093b74971de9?fm=jpg', tags: ['dark', 'field'] },
//   //{ url: 'https://images.unsplash.com/photo-1453227588063-bb302b62f50b?fm=jpg' },
//   //{ url: 'https://images.unsplash.com/photo-1451906278231-17b8ff0a8880?fm=jpg' },
//   { url: 'https://images.unsplash.com/photo-1447969025943-8219c41ea47a?fm=jpg', tags: ['cat', 'kitten'] },
//   { url: 'https://images.unsplash.com/photo-1421749810611-438cc492b581?fm=jpg', tags: ['water', 'landscape'] },
//   { url: 'https://images.unsplash.com/photo-1449960238630-7e720e630019?fm=jpg', tags: ['water', 'seaside'] },
//   { url: 'https://images.unsplash.com/photo-1433190152045-5a94184895da?fm=jpg', tags: ['water', 'cliff'] },
//   { url: 'https://images.unsplash.com/9/fields.jpg?ixlib=rb-0.3.5&q=80&fm=jpg', tags: ['field', 'stack'] }
// ];
// console.log(images)
export const getPopularImages = () => Promise.resolve(images);

export const searchImages = (query) => {
  const filteredImages = images.filter(img => {
    return img.tags.some(tag => {
      return tag.indexOf(query) !== -1;
    });
  });
  // console.log(filteredImages)
  return Promise.resolve(filteredImages);
};

// let imagesArr = [];
// export const searchImages = (query) => {
//   var research = JSON.parse(localStorage.getItem("filteredImages"));
//   if(research !== null)
//     localStorage.setItem("filteredImages", JSON.stringify([]));
//   else {
//     unsplash.search.all(query, 2)
//     .then(toJson)
//     .then(json => {
//       var result = json.photos.results;
//       result.map((item) => {
//           // console.log(item);
//           let url = item.urls.raw+"?fm=jpg";
//           let tag = item.user.location;
//           if(tag === null)
//             tag = '';
//           let val = {url:url,tags: [tag]};
//           imagesArr.push(val);      
//         });    
//         localStorage.setItem("filteredImages", JSON.stringify(imagesArr));
//     });
//   }
// // var arrImagess = JSON.parse(localStorage.getItem("filteredImages"));
// // console.log(arrImagess);
//   const filteredImages = JSON.parse(localStorage.getItem("filteredImages"));
//   return Promise.resolve(filteredImages);
// };
