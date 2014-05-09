var visibleLinks = []; // stores URLs
var allLinks = [];	   // stores all URLs from send_links.js
var images = [];	   // stores images

// Display all visible links.
function showImages() {
	// Clear and repopulate visibleLinks
	visibleLinks = [];
	for (var i = 0; i < allLinks.length; i++) {
		visibleLinks.push(allLinks[i]);
	}
	
	// Grab the HTML5 section element to load images into
	var linksTable = document.getElementById('links');
	linksTable.innerHTML = "";

    // Remove all the previous images, if any.
    while (linksTable.firstChild) {
		linksTable.removeChild(linksTable.firstChild);
	}

    // Creating HTML elements and append them into popup.html.
    var picFigure, picCaption, picContainer, checkbox, imageW, imageH, fileExt; // removed image
	
	//implementing jQuery to get rid of duplicates
	visibleLinks = jQuery.unique( visibleLinks );
	
	//image = new Image();
    for (var i = 0; i < visibleLinks.length; i++) {
        // Create HTML5 elements to store images,
		// checkboxes, and dimensions
        picContainer = document.createElement('article');
        picFigure = document.createElement('figure');
        picCaption = document.createElement('figcaption');
        checkbox = document.createElement('input');
        
		// needed for dynamic add/remove
		picContainer.id = 'container' + i;

		// Grab image dimensions and display them
 		imageW = images[i].naturalWidth;
		imageH = images[i].naturalHeight;
		fileExt = visibleLinks[i].substr(visibleLinks[i].lastIndexOf('.')+1);
		if (fileExt.length > 4) {
			
			// 2Long is omitted temporarily to show extension (...) 
			fileExt = "..";
		}
		
		// necessary for selecting multiple at a time
        checkbox.type = 'checkbox';
        checkbox.id = 'check' + i;
		
		// Display picture
 		picFigure.innerHTML = '<img src="' + visibleLinks[i] + '" id="pic' + i + '""></img><br>';
		picFigure.id = 'figure' + i;
		
		// Display picture dimensions and file extension
		picCaption.innerHTML = imageW + 'x' + imageH + ' (.' + fileExt + ')';
		
		// Add checkbox
        picFigure.style.whiteSpace = 'nowrap';
        picCaption.appendChild(checkbox);
    
		// Append HTML5 elements to picContainer
		// Then picContainer to linksTable for display
        picContainer.appendChild(picFigure);
        picContainer.appendChild(picCaption);
        linksTable.appendChild(picContainer);
  }
}

// Check all checkboxes of jpg/jpeg images.
function checkJpg() {
	var checked = document.getElementById('jpg').checked;
	if (checked) {
		var toRemove = []; // necessary for proper removal
		// if checked, check the boxes and remove the rest
		for (var i = 0; i < visibleLinks.length; ++i) {
			if (visibleLinks[i].substr(visibleLinks[i].lastIndexOf('.')+1) == "jpg" ||
				visibleLinks[i].substr(visibleLinks[i].lastIndexOf('.')+1) == "jpeg") {
				document.getElementById('check' + i).checked = checked;
			} else {
				toRemove.push(i);
				var linksTable = document.getElementById('links');
				linksTable.removeChild(document.getElementById('container' + i));
			}
		}
		// Remove URLs from visibleLinks
		for (var i = toRemove.length - 1; i >= 0; i--) {
			visibleLinks.splice(toRemove[i], 1);
		}
	} else { // repopulate
		showImages();
	}
}

// Check all checkboxes of png images.
function checkPng() {
	var checked = document.getElementById('png').checked;
	if (checked) {
		var toRemove = []; // necessary for proper removal
		// if checked, check the boxes and remove the rest
		for (var i = 0; i < visibleLinks.length; i++) {
			if (visibleLinks[i].substr(visibleLinks[i].lastIndexOf('.')+1) == "png") {
				document.getElementById('check' + i).checked = checked;
			} else {
				toRemove.push(i);
				var linksTable = document.getElementById('links');
				linksTable.removeChild(document.getElementById('container' + i));
			}
		}
		// Remove URLs from visibleLinks
		for (var i = toRemove.length - 1; i >= 0; i--) {
			visibleLinks.splice(toRemove[i], 1);
		}
	} else { // repopulate
		showImages();
	}
}

// Check all checkboxes of gif images.
function checkGif() {
	var checked = document.getElementById('gif').checked;
	if (checked) {
		var toRemove = []; // necessary for proper removal
		// if checked, check the boxes and remove the rest
		for (var i = 0; i < visibleLinks.length; i++) {
			if (visibleLinks[i].substr(visibleLinks[i].lastIndexOf('.')+1) == "gif") {
				document.getElementById('check' + i).checked = checked;
			} else {
				toRemove.push(i);
				var linksTable = document.getElementById('links');
				linksTable.removeChild(document.getElementById('container' + i));
			}
		}
		// Remove URLs from visibleLinks
		for (var i = toRemove.length - 1; i >= 0; i--) {
			visibleLinks.splice(toRemove[i], 1);
		}
	} else { // repopulate
		showImages();
	}
}

// Utilizes Pixastic API to check for greyscale
function checkGrey() {
	var checked = document.getElementById('grey').checked;
	if(checked) {
		var toRemove = []; // necessary for proper removal
		for(var i = 0; i < visibleLinks.length; i++) {
			var img = new Image();
			img.src = visibleLinks[i];
			var hist = {}; 
			
			Pixastic.process(img, "colorhistogram", {
				paint:false, returnValue:hist});
			if((hist.rvals.toString() == hist.gvals.toString()) && (hist.gvals.toString() == hist.bvals.toString())) {
				document.getElementById('check' + i).checked = checked;
			} else {
				toRemove.push(i);
				var linksTable = document.getElementById('links');
				linksTable.removeChild(document.getElementById('container' + i));
			}
		}
		// Remove URLs from visibleLinks
		for (var i = toRemove.length - 1; i >= 0; i--) {
			visibleLinks.splice(toRemove[i], 1);
		}
	} else { // repopulate
		showImages();
	}
}

// Impossible because facedetection/cvv.js violates
// Google Chrome Content Security Policy for Inline Scripts
// See here: 
// https://developer.chrome.com/extensions/tut_migration_to_manifest_v2#inline_scripts
/*
function checkFaces() {
	var checked = document.getElementById('face').checked;
	if (checked) {
		for (var i = 0; i < visibleLinks.length; i++) {
			var image = document.getElementById("pic" + i);
			var coordinates = jQuery(image).faceDetection();
			if (coordinates.length) {
				alert(coordinates);
			}
		}
	} else {
		showImages();
	}
}
*/

// Toggle the checked state of all visible images.
function toggleAll() {
	var checked = document.getElementById('toggle_all').checked;
	for (var i = 0; i < visibleLinks.length; i++) {
		document.getElementById('check' + i).checked = checked;
	}
}

// Download all visible checked images.
function downloadCheckedImages() {
	var togglechecked, jpgchecked, pngchecked, gifchecked, greychecked;
	togglechecked = document.getElementById("toggle_all").checked;
	jpgchecked = document.getElementById("jpg").checked;
	pngchecked = document.getElementById("png").checked;
	gifchecked = document.getElementById("gif").checked;
	greychecked = document.getElementById("grey").checked;
	// if any of the checkboxes are checked, iterate through visibleLinks
	if (togglechecked || jpgchecked || pngchecked || gifchecked || greychecked) {
		for (var i = 0; i < visibleLinks.length; i++) {
			chrome.downloads.download({url: visibleLinks[i]},
												function(id) {
			});
		}
	} else { // otherwise, use allLinks
		for (var i = 0; i < allLinks.length; i++) {
			var checked = document.getElementById("check" + i).checked;
			if (checked) {
				chrome.downloads.download({url: allLinks[i]},
												function(id) {
				});
			}
		}
	}
}

// Implements the Sonic API to
// create a custom loading animation
// while the extension loads the images
function drawLoader() {
	var infinity = new Sonic({
		width: 100,
		height: 100,
		padding: 10,
		
		stepsPerFrame: 2,
		trailLength: 1,
		pointDistance: .03,
		
		strokeColor: '#FF7B24',
		
		step: 'fader',
		
		multiplier: 2,
		
		setup: function() {
			this._.lineWidth = 10;
		},
		
		path: [
		
			['arc', 10, 10, 10, -270, -90],
			['bezier', 10, 0, 40, 20, 20, 0, 30, 20],
			['arc', 40, 10, 10, 90, -90],
			['bezier', 40, 0, 10, 20, 30, 0, 20, 20]
		]
	});
	
	infinity.play();
	infinity.canvas.id = "loader";
	document.getElementById("footer").appendChild(infinity.canvas);
}

// 5 second timeout required to load images before
// displaying dimensions. Works for 4K images and most gifs
window.setTimeout(function() {
	showImages();
	document.getElementById("footer").innerHTML = ""; // clear out loading image
}, 5000);

// Old implementation for injecting scripts
// Set up event handlers and inject send_links.js into all frames in the active
// tab.
window.onload = function() {
	// Add functions to respective checkboxes and buttons
	document.getElementById('jpg').onchange = checkJpg;
	document.getElementById('png').onchange = checkPng;
	document.getElementById('gif').onchange = checkGif;
	document.getElementById('grey').onchange = checkGrey;
	document.getElementById('toggle_all').onchange = toggleAll;
	document.getElementById('download0').onclick = downloadCheckedImages;
	
	// Inject send_links.js into current tab
	chrome.windows.getCurrent(function (currentWindow) {
		chrome.tabs.query({active: true, windowId: currentWindow.id},
						  function(activeTabs) {
		  chrome.tabs.executeScript(
			activeTabs[0].id, {file: 'send_links.js', allFrames: true});
		});
	});
	
	drawLoader();

	// Answer request from send_links.js and push URLs into
	// new array allLinks. Construct JS Image objects
	// and push these into the images array
	chrome.extension.onRequest.addListener(function(links) {
		for (var index in links) {
			allLinks.push(links[index]);
			visibleLinks.push(links[index]);
		}
		var tmp;
		for (var i = 0; i < visibleLinks.length; i++) {
			tmp = new Image();
			tmp.src = visibleLinks[i];
			images.push(tmp);
		}
	});
}