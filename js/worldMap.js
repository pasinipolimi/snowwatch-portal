var map;
var markers = [];

$(document).ready(function(){
		
       //google.maps.event.addDomListener(window, 'load', getPosition);
       //getPosition();
       //45.91779855278828, F: 12.372802734375007
       showMap(46, 12);

});

function getPosition(){

	 if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(positionFound);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }

}

function positionFound(position) {
		
	var centreLat = position.coords.latitude;
    var centreLon = position.coords.longitude;
  
  	showMap(centreLat, centreLon);
}

function showMap(centreLat, centreLon){
	
	var infoBubble;
	
	var myLatlng = new google.maps.LatLng(centreLat,centreLon);
	
	console.log(myLatlng);
	
  	var mapOptions = {
    	zoom: 7,
    	center: myLatlng,
    	mapTypeId: google.maps.MapTypeId.HYBRID,
    	minZoom: 6
  	};
  	
  	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	
	
	
	
	var startCenter = myLatlng;
	var endCenter;
	var startZoom = map.getZoom();
	var endZoom;
     
    google.maps.event.addListener(map, 'idle', function() {

		reloadMap();
		
	});
	
	google.maps.event.addListener(map, 'zoom_changed', function() {
		
		$('.image_big').remove();
		$('.image_small').remove();
		
	});
    
    
}


function reloadMap(){
	var filters= computeFilterString();

  
  		deleteMarkers();
  		
       	endCenter = map.getCenter();
    	
		startCenter = endCenter;
		
		var bounds = map.getBounds();
		
		var ne = bounds.getNorthEast();
		var sw = bounds.getSouthWest();
		
		var leftPos = new google.maps.LatLng(ne.lat(), sw.lng());
		var rightPos = new google.maps.LatLng(ne.lat(), ne.lng());
		
		var gpsLatMin = sw.lat();
		var gpsLatMax = ne.lat();
		
		var gpsLngMin = sw.lng();
		var gpsLngMax = ne.lng();
		
		
		var viewDegrees = gpsLngMax - gpsLngMin;
		
		var screenResWidth = $(window).width();
		
		var photos;
		
		var mapClasses = {classes: []};
		
		var bigDegree = (viewDegrees/screenResWidth)*120;
		var smallDegree = (viewDegrees/screenResWidth)*50;
		
		mapClasses.classes.push({'classId': 'big', 'imgDimDeg': bigDegree, 'imgDimPx': 120});
		mapClasses.classes.push({'classId': 'small', 'imgDimDeg': smallDegree, 'imgDimPx': 50});
		
		$.ajax({ 
    			type: 'get',
    			url: engineHost+"searchMedia?"+filters,
    			data: {gpsLatMin: gpsLatMin, gpsLatMax: gpsLatMax, gpsLngMin: gpsLngMin, gpsLngMax: gpsLngMax, mapClasses: JSON.stringify(mapClasses.classes)},
    			dataType: 'jsonp',
    			success: function(xhr,status){
    	
    				photos = xhr.result;
    				
    				for(var i=0; i<photos.length; i++)
					{
						var p = photos[i];
			
						var coordinates = new google.maps.LatLng(p.gpsLat, p.gpsLng);
						
						createMarker(p, coordinates);
						
					}
					
    			},
    			error: function(xhr,status){
    				console.log(status);
    			}
   			});
		
		
}

function createMarker(photo, coordinates)
{
	var zindex=photo.auxMapClassId=="small"?1:2;
	var content='<div class="thumbdiv_'+photo.auxMapClassId+'" style="background-image: url('+photo.auxMapClassThumbnailAbsUrl+
          		')" src_large="'+retrieveUrl(photo, 2)+'" p_id="'+photo.id+'"/>';
	if(photo.type=="W"){
		content+='<div class="wcicon wcicon_'+photo.auxMapClassId+'" style="background-image: url(images/videoicon.png)"></div>';
	}
	content+='</div>';

	
	var marker = new RichMarker({
    	  		position: coordinates,
          		map: map,
          		draggable: false,
          		zIndex: zindex,
          		content: content
	
          	});




	google.maps.event.addListener(marker, 'click', function() {
		$('#imagepreview').attr('src', $($(this)[0].content).attr('src_large')); 
            $('#mediaMoreButton').attr('photoId',$($(this)[0].content).attr('p_id') ); 
            $('#imagemodal').modal('show'); 
            $('#mediaMoreButton').click(function(){
                window.location.href="photo.php?photoId="+$(this).attr('photoId');
            })
    	$('#imagemodal').prop('style', '"z-index : 30px;"');

	});

	
    
    markers.push(marker);
}


function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setAllMap(null);
}



// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}
