

$(function(){
    loadPhoto(function (photo) {
        tzacco(photo);
    });
 });



function tzacco (photo){
	var instructionsContent = {
				instructionsHTMLContent : "<div class='p'>"+
				"<div class='step1'><span class='step-index'>1.- </span>1</div>"+
				"<div class='step2'><span class='step-index'>2.- </span>2</div>"+
				"<div class='step3'><span class='step-index'>3.- </span>3</div>"+
				"</div>"
			};

	var photoScaleFactor = photo.hFov * photo.auxRender.hSize / 360 / photo.hSize;
	var initialPosition = {"x": photo.auxRender.hSize / 2, "y": photo.auxRender.vSize / 2};
	if (photo.auxAlignment) {
		initialPosition.x = goodMod(photo.auxAlignment.centerAzimuth - photo.auxRender.centerAzimuth + 180, 360) * photo.auxRender.hSize / 360;
		initialPosition.y = goodMod(photo.auxRender.vSize / photo.auxRender.hSize * 360 / 2 - photo.auxAlignment.centerPitch + photo.auxRender.centerPitch, 360) * photo.auxRender.hSize / 360;
	}
			
	var data = {"urlRender": photo.auxRender.auxFileAbsUrl,
				"urlImage": "./php/image_proxy.php?url="+encodeURIComponent(photo.auxFileAbsUrlOriginal),
				"photoScaleFactor": photoScaleFactor,
				"idRender": photo.auxRender.id,
				"initialPosition": initialPosition
				};

	var options = $.extend(data, instructionsContent);
	options = $.extend(data, {peaks: photo.auxRenderPeaks});
	$("#fine").append(options.urlImage);
	$(".warpingArea").warpingMatcher(options);
}