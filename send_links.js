// Grab all img elements from the current tab,
// then push their sources (Strings) into an array.

//Added by Shiraz
//grabbing images from <a>
var aTagLinks = document.getElementsByTagName('a');

//grabbing images from <img> 
var imgTagLinks = document.getElementsByTagName('img');

var links = [];

//parsing URLs from <a>
for (var i = 0; i < aTagLinks.length; i++) {
    
    var imageAddress = aTagLinks[i].href;
    var fileExtension = imageAddress.split('.').pop();
    
    if (fileExtension == "jpg" || fileExtension == "jpeg" || fileExtension == "gif" || fileExtension == "png" || fileExtension == "bmp"){

		//debugging purposes        
        //console.log("imageAddress of <a> = " + imageAddress);
		//console.log("FileExt of <a> = " + fileExt);
        
        links.push(imageAddress);
    }
 
}

//parsing URLs from <img>
for (var i = 0; i < imgTagLinks.length; i++) {
    
    var imageAddress = imgTagLinks[i].src;
    var fileExtension = imageAddress.split('.').pop();
    
    if (fileExtension == "jpg" || fileExtension == "jpeg" || fileExtension == "gif" || fileExtension == "png" || fileExtension == "bmp"){

		//debugging purposes        
        //console.log("imageAddress of <img>= " + imageAddress);
        //console.log("FileExt <img>= " + fileExt);
        
        links.push(imageAddress);
    }
}
chrome.extension.sendRequest(links);