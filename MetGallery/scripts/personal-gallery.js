'use strict';
function appendListItem(gallery){
    let li = document.createElement('li');
              li.innerHTML = `<div lass="gallery-item">
              <div class="gallery-item__column">
                <img class="gallery-item__image" src='${gallery.primaryImageSmall}'></img>
                <div class="gallery-item__details">
                <div><strong>Title : </strong>${gallery.title}</div>
                <div><strong>Artist Name : </strong>${gallery.artistDisplayName || 'NA'}</div>
                
                <a href='${gallery.objectURL}'>${gallery.objectURL}</a>
                </div>
               
              </div>
              </div>`;
              ol.append(li);
  }
(function(){
    window.onload = function(){
    const ol = document.getElementById('ol');
    const selectedItems = JSON.parse(localStorage.getItem('selectedItems'));
    if(selectedItems && selectedItems.length === 0){
        
        let li = document.createElement('li');
        li.innerHTML = 'No selected Items';
        ol.append(li);
    }
    else if (selectedItems && selectedItems.length > 0 ){
        selectedItems.forEach((gallery) => {
            appendListItem(gallery);
        });
       
    }
}
}
)();

function Back(){
    window.location.href = "master-gallery.html";
}