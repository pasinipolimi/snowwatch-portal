;(function($, window, undefined) {
    'use strict';        
    /**
     * jQuery Warping Matcher
     * v1.0
     */ 
    $.warpingMatcher = function(options, element) {
        // this element
        this.$el = $(element);
        this._init(options); 
    };

    $.warpingMatcher.defaults = {
        dragIconUrl: "images/drag-icon.png",

        instructionsHTMLContent: "",

        urlRender: "",
	    urlImage: "",
	    url: "",
	    photoScaleFactor: 0.5,
        zoomUnit: 0.05,
	    renderPeaks: []
    };

    $.warpingMatcher.prototype = {
        /**
        * Public methods
        */
        currentPeaks: function() {
        	var self = this;
        	if (arguments.length == 0){ //no argument -> get
        		return self.peakValues;
        	}
        	else{
        		$.each(arguments,function(i,d){
        			self.peakValues.push(d);
        		});
        	}
        	return self;
        },

        generateCoordinates: function  () {
        
        	var plugin = this;
        	
			var peaksList = plugin.options.peaks;
			
			var scale = plugin.$photo.width() / plugin.$photo[0].naturalWidth / plugin.options.photoScaleFactor;
			
			var startImageX = plugin.$canvasContainer.position().left;
			var endImageX = startImageX + plugin.$photo.width();
			
			var startImageY = plugin.$canvasContainer.position().top;
			var endImageY = startImageY + plugin.$photo.height();
			
			console.log("image.left: "+startImageX);
			console.log("image.end: "+endImageX)
			console.log("render width: "+plugin.$render.width());
			console.log("scale: "+scale);
			
			for(var i=0; i<peaksList.length; i++)
			{
				var p = peaksList[i];
				
				p.x = p.x*scale;
				p.y = p.y*scale;
			
				p.x = p.x + plugin.$renderPhotoContainer.position().left - startImageX;
				p.y = p.y + plugin.$renderPhotoContainer.position().top - startImageY;
				
				if(p.x > plugin.$render.width())
				{
					p.x = p.x - plugin.$render.width();
				}
				
				if(p.x < 0)
				{
					p.x = p.x + plugin.$render.width();
				}
								
				if(p.x > 0 && p.x < plugin.$photo.width())
				{	
					var oldIdx = (Math.round(p.y) * ImgWarper.ptMatrixWidth) + Math.round(p.x);
					
					console.log("Old Coords: "+p.x+" - "+p.y);
					
					if(typeof ImgWarper.ptMatrix[oldIdx] != "undefined")
					{	
						var newIdx = ImgWarper.ptMatrix[oldIdx];
						
						console.log("oldIdx: "+oldIdx+" - NewIdx:"+newIdx);
						
						var newY = Math.floor(newIdx/ImgWarper.ptMatrixWidth);
						var newX = newIdx % ImgWarper.ptMatrixWidth;
						
						p.x = newX / plugin.$photo.width();
						p.y = newY / plugin.$photo.height();
						
						console.log("New Coords: "+newX+ " - "+ newY);
					}
				}
				
				if(!(p.x > 0 && p.x < plugin.$photo.width()))
				{
					p.idRender = -1;
					p.idRender = p.idRender.toString();
				}
			}
			
			var imageId = getURLParameter("var1");
			var alignId = getURLParameter("var4");
			
			$.ajax({ 
    			type: 'post',
    			url: "http://localhost:8080/SnowWatch_new/savePeaks.jsp", 
    			data: {alignId: alignId, imageId: imageId, peaksList: JSON.stringify(peaksList)},
    			success: function(xhr,status){    
    			},
    			error: function(xhr,status){
    			}
   			});
		},

        /**
        * Private methods
        */
        _init: function(options) {
            // options
            var plugin = this;
            plugin.options = $.extend(true, {}, $.warpingMatcher.defaults, options);
            console.log(plugin.options);
            plugin.warper = null;
            plugin.invertedDrag = false;
            plugin.currentZoom = 1;
            plugin.peakValues = plugin.options.renderPeaks;
            plugin.$el.children().remove();

            plugin.$el.addClass("warpingMatcher step1");
            plugin.$el.css({position:"relative",overflow:"hidden",visibility:"hidden"});
           
			plugin.$el.append("<div class='warper-controls fixed-content'>"+
                  "</div>"+
                  "<div class='component-images-thumb'>"+
                      "<img class='image-render-thumb'></img>"+
                      "<div class='thumb-mask'>"+
                        "<div class='thumb-darker-bg'></div>" + 
                        "<div class='thumb-lighter-bg'>"+
                            "<div class='thumb-submask1' style='width:100%;height:75px;background-color:black;position:relative;opacity:0.6;'></div>"+
                            "<div class='thumb-submask2' style='width:100%;height:75px;position:relative;'></div>"+
                            "<div class='thumb-submask3' style='width:100%;height:75px;background-color:black;position:relative;opacity:0.6;'></div>"+
                        "</div>" + 
                        "<div class='thumb-darker-bg'></div>" + 
                        "<div class='thumb-submask-right' style='width:100%;position:absolute;'>" +
                            "<div class='thumb-submask1' style='width:100%;height:75px;background-color:black;position:relative;opacity:0.6;'></div>"+
                            "<div class='thumb-submask2' style='width:100%;height:75px;position:relative;'></div>"+
                            "<div class='thumb-submask3' style='width:100%;height:75px;background-color:black;position:relative;opacity:0.6;'></div>"+
                        "</div>" +
                      "</div>"+
 	              "</div>"+
                  "<div class='component-images'>"+
                    "<div class='render-photo-container'>"+
                        "<div class='image-render-parent mirror-left'><img class='image-render-mirror mirror-left'></img></div>"+
                        "<div class='image-render-parent'><img class='image-render'></img></div>" +
    			     "</div>"+
                      "<div class='image-photo-container'>"+
                        "<img class='image-photo'></img>"+
                        "<div class='canvas-container'>"+
                            "<canvas class='warper-canvas'></canvas>"+
                        "</div>"+
    				 "</div>" + 
 	              "</div>"+
				"<div style='display:none' id='fps'></div>" +
				"<input style='display:none' type='checkbox' name='show-grid' class='redraw' id='show-grid'>" + 
				"<input style='display:none' type='checkbox' name='show-control' class='redraw' id='show-control' checked=''>");
            plugin.$render = plugin.$el.find('.image-render');
            plugin.$renderMirrorLeft = plugin.$el.find('.image-render-mirror.mirror-left');
            plugin.$renderParents = plugin.$el.find('.image-render-parent');
            plugin.$renderParentMirrorLeft = plugin.$el.find('.image-render-parent.mirror-left');
            plugin.$renderThumb = plugin.$el.find('.image-render-thumb');
            plugin.$photo = plugin.$el.find('.image-photo');
            plugin.$canvas = plugin.$el.find('.warper-canvas');
            plugin.$canvasContainer = plugin.$el.find('.canvas-container');
            plugin.$photoContainer = plugin.$el.find('.image-photo-container');
            plugin.$renderPhotoContainer = plugin.$el.find('.render-photo-container');
            plugin.$mask = plugin.$el.find('.thumb-lighter-bg');
            plugin.$maskBg = plugin.$el.find('.thumb-darker-bg');
            plugin.$imagesThumb = plugin.$el.find('.component-images-thumb');
            plugin.$thumbContainer = plugin.$el.find('.thumb-mask');
            plugin.$submask1 = plugin.$el.find('.thumb-submask1');
            plugin.$generateCoordsButton = plugin.$el.find('.generate-coords');
            plugin.$increaseZoomButton = plugin.$el.find('.increase-zoom');
            plugin.$decreaseZoomButton = plugin.$el.find('.decrease-zoom');
            plugin.$resetValidation = plugin.$el.find('.reset');
            plugin.$instructions = plugin.$el.find('.instructions');
            plugin.$pinPanorama = plugin.$el.find('.pin-panorama');

            plugin.$instructions.html(plugin.options.instructionsHTMLContent);

            var htmlPeaks = "";
            _(plugin.options.peaks).each(function  (d,i) {
                htmlPeaks += "<div class='render-peak' title='"+ d.name +" (" + d.gpsAlt + " m)' data-peakid='"+ d.id +"' style='left:"+ d.x +"px;top:"+ d.y +"px'></div>";
            });

            plugin.$renderParents.append(htmlPeaks);

            $("#ln14").click(function (e) {
            	e.preventDefault();
                plugin.generateCoordinates();
                $(".successAlign").show();
            });

            plugin.$increaseZoomButton.click(function (e) {
                if ( plugin.$increaseZoomButton.hasClass("disabled"))
                    return;
                var oldWidth = plugin.$render.width();
                var newWidth = oldWidth*(1 + plugin.options.zoomUnit);
                var oldLeft = parseInt(plugin.$renderPhotoContainer.css("left"));
                var oldTop = parseInt(plugin.$renderPhotoContainer.css("top"));
                plugin.$renderParents.width(newWidth);
                plugin.$render.width(newWidth);
                plugin.$renderMirrorLeft.width(newWidth);
                plugin.$renderMirrorLeft.css("left",((-1) * newWidth) + "px");
                plugin.$renderMirrorLeft.parent().css("left",((-1) * newWidth) + "px");
                plugin.$renderPhotoContainer.css("left", oldLeft*(1 + plugin.options.zoomUnit)  + "px");
                plugin.$renderPhotoContainer.css("top", oldTop*(1 + plugin.options.zoomUnit) + "px");
                //plugin.currentZoom = plugin.currentZoom + plugin.options.zoomUnit;
                //plugin._resizeChildren();
                //plugin._renderCanvas();
            });

            plugin.$decreaseZoomButton.click(function (e) {
                if ( plugin.$decreaseZoomButton.hasClass("disabled"))
                    return;
                var previousWidth = plugin.$render.width();
                var newWidth = previousWidth * (1 - plugin.options.zoomUnit); 
                var oldLeft = parseInt(plugin.$renderPhotoContainer.css("left"));
                var oldTop = parseInt(plugin.$renderPhotoContainer.css("top"));
                plugin.$renderParents.width(newWidth);
                plugin.$render.width(newWidth);
                plugin.$renderMirrorLeft.width(newWidth);
                plugin.$renderMirrorLeft.parent().css("left",((-1) * newWidth) + "px");
                plugin.$renderPhotoContainer.css("left", oldLeft*(1 - plugin.options.zoomUnit)  + "px");
                plugin.$renderPhotoContainer.css("top", oldTop*(1 - plugin.options.zoomUnit) + "px");
               // plugin.currentZoom = plugin.currentZoom - plugin.options.zoomUnit;
                //plugin._resizeChildren();
                //plugin._renderCanvas();
            });
			
            $("#ln18").click(function (e) {
            	e.preventDefault();
                plugin.warper.deleteAllPoints();
                plugin.warper.redraw();
                $("#ln17").show();
                $("#ln18").hide();
            });

            plugin.$render.on("load", function(){ 
                plugin.$photo.on("load",function  () {
                    setTimeout(function () {
                        plugin.$renderPhotoContainer.css("left",0);
                        plugin._resizeChildren();
                        plugin._renderCanvas();
                        plugin._setDraggableStatus(true);
                        plugin.$render.on("resize", function(){
                            plugin._resizeChildren();
                        });
                        if ( plugin.options.initialPosition != undefined ){
                        	
                        	var renderCalculatedScaleInit = plugin.$photo.width() / plugin.$photo[0].naturalWidth / plugin.options.photoScaleFactor;
                        	
            				var scaledRenderWidthInit = plugin.$render[0].naturalWidth*renderCalculatedScaleInit;
            				var scaledRenderHeightInit = plugin.$render[0].naturalHeight*renderCalculatedScaleInit;
            				
            				var imagePosition = plugin.$canvasContainer.position();
            				
            				var originalScaledPointX = (plugin.options.initialPosition.x/plugin.$render[0].naturalWidth)*scaledRenderWidthInit;
            				var originalScaledPointY = (plugin.options.initialPosition.y/plugin.$render[0].naturalHeight)*scaledRenderHeightInit;
            				
            				var realX = originalScaledPointX - imagePosition.left - plugin.$photo.width()/2;
            				var realY = originalScaledPointY - imagePosition.top - plugin.$photo.height()/2;
            				
            				plugin.options.initialPosition.x = realX;
            				plugin.options.initialPosition.y = realY;
            				
                            plugin._movePanorama(
                                plugin.options.initialPosition.x,
                                plugin.options.initialPosition.y
                            );
                        }else{
                            plugin._movePanorama(
                                plugin.$render.width()/2,
                                plugin.$render.height()/4
                            );
                        }
                        plugin._automoveThumb();
                        plugin.$el.css("visibility","visible");
                    },200);
            	});
            	plugin.$photo.attr("src",plugin.options.urlImage);

            });
            $("#ln17").click(function (e) {
            	e.preventDefault();
                plugin._goToStep(2);
                $("#ln18").show();
                $("#ln17").hide();
            });
            plugin.$renderThumb.attr("src", plugin.options.urlRender);
            plugin.$render.attr("src", plugin.options.urlRender);
            plugin.$renderMirrorLeft.attr("src", plugin.options.urlRender);
        }, 

        _goToStep: function(step) {
            var plugin = this;
            plugin.$el.removeClass("step1 step2 step3");
            plugin.$el.addClass("step" + step);
            switch (step){
                case 1:
                    plugin._setDraggableStatus(true);
                break;
                case 2:
                    plugin._setDraggableStatus(false);
                break;
            }
        },

        _renderCanvas: function() {
			var plugin = this;
			var image = plugin.$photo[0];
            var imageWidth = parseInt(plugin.$photo.width());
            var imageHeight = parseInt(plugin.$photo.height());
            console.log(plugin.$photo.width() + " "+ plugin.$canvasContainer.position().left);
			var canvas = plugin.$canvas[0];
			var ctx = canvas.getContext("2d");

			ctx.clearRect(0, 0, canvas.width, canvas.height);
			canvas.width = imageWidth;
			canvas.height = imageHeight;
			ctx.fillStyle = "rgba(0, 0, 200, 0)";
            console.log(image,imageWidth,imageHeight,image.complete);
			ctx.drawImage(image, 0, 0, imageWidth, imageHeight);
			
			
			// if (warper) 
				// delete warper;
			var imageData = ctx.getImageData(0, 0, imageWidth, imageHeight);
			plugin.warper = new ImgWarper.PointDefiner(canvas, image,imageData );
			
            plugin.warper.on("beforeAddPoint",function(){
                plugin._beforeAddPoint();
            });
            plugin.warper.on("afterRemovePoint",function(){
                plugin._afterRemovePoint();
            });
            plugin.warper.on("afterAddPoint",function(){
                plugin._afterAddPoint();
            });

			var  xMin = -100
				,yMin = -100
				,xMed = imageWidth / 2
				,yMed = imageHeight / 2
				,xMax = imageWidth + 100
				,yMax = imageHeight +100;
			var initialPoints = [{x:xMin,y:yMin},{x:xMin,y:yMax},{x:xMax,y:yMin},{x:xMax,y:yMax},
								 {x:xMin,y:yMed},{x:xMax,y:yMed},{x:xMed,y:yMin},{x:xMed,y:yMax}];
			$.each(initialPoints,function  (i,d) {
				var q = new ImgWarper.Point(d.x, d.y,true);
				plugin.warper.oriPoints.push(q);
				plugin.warper.dstPoints.push(q);
			});
			$.each(plugin.options.renderPeaks,function  (i,d) {
				var q = new ImgWarper.Point(d.x, d.y);
				plugin.warper.oriPoints.push(q);
				plugin.warper.dstPoints.push(q);
			});
			plugin.warper.redraw();
			plugin.$photo.css("display","none");
            plugin.$canvasContainer.css("left", plugin.$photoContainer.width()/2 - plugin.$canvasContainer.width()/2);
            plugin.$canvasContainer.css("top", 100);
            
            },

        _afterRemovePoint: function() {
            var plugin = this;
            if ( plugin.warper.dstPoints.length == plugin.warper.originalAuxPointsNumber )
                plugin._goToStep(1);
        },
        _afterAddPoint: function() {
            var plugin = this;
            if ( plugin.warper.dstPoints.length == plugin.warper.originalAuxPointsNumber )
                plugin._goToStep(2);
        },

        _beforeAddPoint: function() {
            var plugin = this;
            if ( plugin.warper.dstPoints.length == plugin.warper.originalAuxPointsNumber ){
                plugin._goToStep(3);
                var points = _($(".render-peak")).map(function(d,i){
                    if ($(d).is_on_screen()){
                        var offset = $(d).offset();
                        return {
                            left : parseInt(offset.left),
                            top : parseInt(offset.top),
                            id: $(d).data("peakid")
                        };
                    } 
                });
                plugin.warper.setReferencePoints(_(points).compact())
            }
        },

        _setDraggableStatus: function(enabled) {
        	var plugin = this;
            var disabled = !enabled ; 
            plugin.$increaseZoomButton.toggleClass("disabled",true); //TODO handle zoom with fixed elements 
            plugin.$decreaseZoomButton.toggleClass("disabled",true); //TODO handle zoom with fixed elements 

            plugin.warper.enableClick(disabled);

            plugin.$canvasContainer.unbind("mousedown");
            if ( enabled ){
                plugin.$canvasContainer.mousedown(function(e) {
                    plugin.$renderPhotoContainer.trigger(e);
                });
            }

            plugin.$renderPhotoContainer.draggable({
                disabled : disabled,
                scroll: false,
                revert : function(e){

                    var y = parseInt(this.css("top")),
                        maxY = plugin.$render.height() - plugin.$canvas.height()/2,
                        minY = plugin.$canvas.height()/2 - plugin.$render.height(); 
                    console.log(parseInt(this.css("left")),y,maxY,minY);
                    //if ( y > maxY || y < minY)
                        //return true;
                    return false;
                },
                drag: function(e) {
                    plugin._automoveThumb();
                },
                stop: function(e) {
                    plugin._checkPanoramaLimits();
                    plugin._automoveThumb();
                } 
            });

            plugin.$thumbContainer.draggable({
                disabled : disabled,
                cancel: ".thumb-darker-bg",
                revert : function(e){
                    var y = parseInt(this.css("top")),
                        maxY = 0,
                        minY = plugin.$renderThumb.height() * (-2); 
                    if ( y > maxY || y < minY)
                        return true;
                    return false;
                },
                drag: function(e) {
                    plugin._automovePanorama(e);
                },
                stop: function(e) {
                    plugin._checkThumbLimits();
                    plugin._automovePanorama();
                }
            }); 
        },

        _resizeChildren: function() {
            var plugin = this;
            var renderCalculatedScale = plugin.$photo.width() / plugin.$photo[0].naturalWidth / plugin.options.photoScaleFactor;
            var scaledRenderWidth = plugin.$render[0].naturalWidth*renderCalculatedScale;
            plugin.$render.width(scaledRenderWidth);
            plugin.$renderMirrorLeft.width(scaledRenderWidth);
            var screenScale = plugin.$render.height() / plugin.$render[0].naturalHeight; 
            plugin.$photoContainer.height(plugin.$render.height()); //TODO add the graph
            $(".render-peak").each(function (i,d) {
                var peakId = $(d).data("peakid");
                var peak = _(plugin.options.peaks).find(function (d2) {
                    return d2.id == peakId;
                })
                $(d).css("left", screenScale * peak.x);
                $(d).css("top", screenScale * peak.y);
            });

            plugin.$renderParentMirrorLeft.css("left", - plugin.$render.width());

            var thumbScale = plugin.$renderThumb.width() / plugin.$renderThumb[0].naturalWidth;
            var visibleRenderWidth =  plugin.$renderPhotoContainer.width()/screenScale;
            var computedMaskWidth = visibleRenderWidth * thumbScale;
            plugin.$mask.width(computedMaskWidth);
            plugin.$maskBg.width( plugin.$imagesThumb.width() - computedMaskWidth);
            plugin.$thumbContainer.width(plugin.$imagesThumb.width()*2);
            plugin._automoveThumb();
        },

        _checkPanoramaLimits: function() {
            var plugin = this;
            if ( $(".render-photo-container").position().left > plugin.$render.width() )
                $(".render-photo-container").css("left", $(".render-photo-container").position().left - plugin.$render.width() + "px");
            else if ( $(".render-photo-container").position().left < (plugin.$render.width() * (-1) + plugin.$renderPhotoContainer.width() ))
                $(".render-photo-container").css("left", plugin.$render.width() + $(".render-photo-container").position().left  + "px");
        },

        _checkThumbLimits: function() {
            var plugin = this;
            if ( plugin.$thumbContainer.position().left > 0 )
                plugin.$thumbContainer.css("left", plugin.$thumbContainer.position().left - plugin.$thumbContainer.parent().width() + "px");
            else if ( plugin.$thumbContainer.parent().width() + plugin.$thumbContainer.position().left < 0 )
                plugin.$thumbContainer.css("left", plugin.$thumbContainer.parent().width() + plugin.$thumbContainer.position().left  + "px");
        },

        _movePanorama: function(x,y) {
            var plugin = this;
            if ( x != undefined )
                plugin.$renderPhotoContainer.css("left", -x + "px");
            if ( y != undefined )
                plugin.$renderPhotoContainer.css("top", -y + "px");
            plugin._checkPanoramaLimits();
        },

        _moveThumb: function(x,y) {
            var plugin = this;
            if ( x != undefined )
                plugin.$thumbContainer.css("left", -x + "px");
            if ( y != undefined )
                plugin.$thumbContainer.css("top", -y + "px");
            plugin._checkThumbLimits();
        },

        _automoveThumb: function() {
            var plugin = this;
            //TODO take into account negative position and zoom
            var screenScale = plugin.$render.height() / plugin.$render[0].naturalHeight; 
            var panoramaX = parseInt(plugin.$renderPhotoContainer.css("left"))/screenScale;
            var panoramaY = parseInt(plugin.$renderPhotoContainer.css("top"))/screenScale;
            var thumbScaleX = plugin.$renderThumb.width() / plugin.$renderThumb[0].naturalWidth;
            var thumbScaleY = plugin.$renderThumb.height() / plugin.$renderThumb[0].naturalHeight;
            var newX = (panoramaX*thumbScaleX) + plugin.$renderThumb.width() - plugin.$mask.width();
            var newY =  panoramaY*thumbScaleY;
            $(".thumb-submask-right").css("left", plugin.$thumbContainer.width() - plugin.$mask.width());
            plugin._moveThumb(newX,newY+ plugin.$submask1.height());
        },

        _automovePanorama: function(e) {
            var plugin = this;
            //TODO take into account negative position and zoom
            var screenScale = plugin.$render.height() / plugin.$render[0].naturalHeight; 
            var thumbScaleX = plugin.$renderThumb.width() / plugin.$renderThumb[0].naturalWidth;
            var thumbScaleY = plugin.$renderThumb.height() / plugin.$renderThumb[0].naturalHeight;
            var thumbX = parseInt(plugin.$thumbContainer.css("left")) + plugin.$renderThumb.width() - plugin.$mask.width();
            var thumbY = parseInt(plugin.$thumbContainer.css("top")) + plugin.$submask1.height();
            var newX = (thumbX/thumbScaleX)*screenScale;
            var newY = (thumbY/thumbScaleY)*screenScale;
            plugin._movePanorama(newX,newY);
        }
    }; 
    
    var logError = function(message) {
        if(window.console) {
            window.console.error(message);
        }                                   
    };

    $.fn.warpingMatcher = function(options) {
		
		$("#warpingFunction").append("Sono in warping!");
    	var originalArguments = arguments;
    	var returnValue = new Array();
        $.each(this,function() {
            var self = $.data(this, 'warpingMatcher');
            if(typeof options === 'string') {
                var args = Array.prototype.slice.call(originalArguments, 1);

                if(!self) {
                    logError('cannot call methods on warpingMatcher prior to initialization; ' +
                    'attempted to call method ' + options);
                    return;               
                }

                if(!$.isFunction(self[options]) || options.charAt(0) === '_') {
                    logError('no such method ' + options + ' for warpingMatcher self');
                    return;                                                     
                }
                returnValue.push(self[options].apply(self, args));
            } else {     
                if(self) {      
                    self._init(options);  
                } else {             
                    self = $.data(this, 'warpingMatcher', new $.warpingMatcher(options, this));
                }
            } 
        });
		if (returnValue == undefined || returnValue.length == 0)
        	return this;		
        else
        	return returnValue;
    }; 
})(jQuery, window);   

$.fn.is_on_screen = function(){
    var win = $(window);
    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
 
    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();
 
    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};

$(document).ready(function(){

	$("#ln18").hide();
	$(".successAlign").hide();
			
});