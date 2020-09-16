'use strict';



//  variable initialized
const items = [];
const selectedItems = [];
let galleryPromises = [];

//  gets a gallery item ids.returns list of ids with image.
function getGalleryItems() {
  return fetch('https://collectionapi.metmuseum.org/public/collection/v1/search?q=true').then(function(response) {
     return response.json()
  });

}
//  get each gallery item. returns a promise object.
function getGalleries(galleryIds) {
  galleryIds.forEach(id => {
    const promise = fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`).then(function(response) {
     return response.json();
    });
    galleryPromises.push(promise);
  });
}

//  updates selected list when checkbox is checked/unchecked.
function updateList(e, objectID){
  if(e.checked) {
    selectedItems.push(items[items.findIndex((item) => item.objectID === objectID)]);
  }
  else {
    const idx = selectedItems.findIndex((item) => item.objectID === objectID);
    if(idx>-1) {
      selectedItems.splice(idx,1);
    }
  }
}
//  saves the selectedItems in localStorage.
function Save(){
  localStorage.setItem('selectedItems',JSON.stringify(selectedItems));
  window.location.href = "personal-gallery.html";
}
//  appends the list item for each gallery
function appendListItem(gallery){
  let li = document.createElement('li');
  li.innerHTML = `<div class="gallery-item">
  <input type='checkbox' onchange='updateList(this,${gallery.objectID})'/>
  <div class="gallery-item__column">
    <img class="gallery-item__image" src='${gallery.primaryImageSmall}'></img>
    <div class="gallery-item__details">
    <div><strong>Title : </strong>${gallery.title}</div>
    <div><strong>Artist Name : </strong>${gallery.artistDisplayName || 'NA'}</div>
    <a href='${gallery.objectURL}'>${gallery.objectURL}</a></div>
  </div>
  </div>`;
  ol.append(li);
}

//  iif to load gallery items and attach the gallery items to dom.
(function(){
  window.onload = function(){
    if (localStorage.getItem('selectedItems')) {
      localStorage.removeItem('selectedItems');
    }
    getGalleryItems().then(res => { 
       const galleryIds = res.objectIDs.slice(0,25);
       getGalleries(galleryIds)
       Promise.all(galleryPromises).then(galleries => { 
          galleries.forEach((gallery)=>{
            const nGallery = new Gallery(gallery.objectID,gallery.title,gallery.primaryImageSmall,gallery.artistDisplayName,gallery.objectURL);
            items.push(nGallery);
            appendListItem(nGallery);
          });
          console.log(items);
       
       })
       
     });

    }
}
)();