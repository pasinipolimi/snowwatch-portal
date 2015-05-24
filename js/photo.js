

// ********************************************************************************** UPLOAD DETAILS ******************************************************************************************

function fillPhoto(photoDetails) {
    
          
        document.getElementById("imageid").src=retrieveUrl(photoDetails, 3);
        $('#imageid').on('resize',function(){alert("ima");  });

       


        if(photoDetails.gpsLng && photoDetails.gpsLat){
            document.getElementById("mapImg").src="https://maps.googleapis.com/maps/api/staticmap?center="+photoDetails.gpsLat+","+photoDetails.gpsLng+"&size=300x250&zoom=9&markers=color:red|"+photoDetails.gpsLat+","+photoDetails.gpsLng;
            document.getElementById("lat").innerHTML = " GPS Longitude: "+ photoDetails.gpsLat;
            document.getElementById("lng").innerHTML = " GPS Latitude: "+ photoDetails.gpsLng;
            $('#latlngInput').hide();

            //nearby gallery
            var delta = 0.1;
            var gpsLatMin=photoDetails.gpsLat-delta;
            var gpsLatMax=photoDetails.gpsLat+delta;
            var gpsLngMin=photoDetails.gpsLng-delta;
            var gpsLngMax=photoDetails.gpsLng+delta;  
            uploadGallery(8, "gpsLatMin="+gpsLatMin+"&gpsLatMax="+gpsLatMax+"&gpsLngMin="+gpsLngMin+"&gpsLngMax="+gpsLngMax, "#nearlinks");

        } else {
            $('#mapInfo').hide();
            //document.getElementById("mapInfo").innerHTML = "Coordinates not available";
            $('#latlngInfo').hide();
            $('#nearbydiv').hide();
        }
       

        if(photoDetails.auxTsShot){
          document.getElementById("date").innerHTML = " Taken: "+ new Date(photoDetails.auxTsShot).toLocaleString();  
        } else {
          document.getElementById("date").innerHTML = " Shot date undefined";  
        };
        if(photoDetails.gpsAlt){
          document.getElementById("gpsAlt").innerHTML = " GPS Altitude: "+ photoDetails.gpsAlt;
        }

        //source
        document.getElementById("source").innerHTML = " Source: "+photoDetails.source;
        if(photoDetails.type=='P'){
            document.getElementById("type").innerHTML = " Type: Photo";
        } else {
            document.getElementById("type").innerHTML = ' Type: WebCam <button type="button" class="btn btn-xs btn-info btn-lg">'+
            '<span class="glyphicon glyphicon-play" aria-hidden="true"></span> Start Slideshow</button>';
        }
        
        var status=photoDetails.status;
        $.getJSON("status.json", function( data ) {
            $('#statusMessage').addClass("label-"+data.status[status].level);
            $('#statusMessage').append(data.status[status].message);
        });


        
        if(photoDetails.auxRender){
            $('#viewRender').click( function(){
                window.location='render.php?photoId='+photoDetails.id;
            });
        } else {
            $('#viewRender').hide();
        }
 
        if(photoDetails.auxAlignment){
            $('#switch-peaks').bootstrapSwitch('disabled', false);
            $('#peaksdiv').click( function(){
                if($('#switch-peaks').bootstrapSwitch('state')){
                    viewPeaks(photoDetails);
                     
                } else {
                    $('#peaks-container').empty();
                }
            });
        }

        $(window).resize(function(){
            //TOFIX da capire perche con l img non funziona
            if($('#switch-snow').bootstrapSwitch('state')){
                showSnowMask(photoDetails);
            };
            if($('#switch-peaks').bootstrapSwitch('state')){
                viewPeaks(photoDetails);    
            };
            
        });


        
        if(photoDetails.auxSnowAbsUrlOriginal){
            $('#switch-snow').bootstrapSwitch('disabled', false);
            $('#snowmaskdiv').click( function(){
                if($('#switch-snow').bootstrapSwitch('state')){
                    showSnowMask(photoDetails);

                } else {
                    $('#snow-container').empty();  
                }    
            });
        }

        photoDetails.auxDepthAbsUrlOriginal="sss";
        if(photoDetails.auxDepthAbsUrlOriginal){
            //$('#imageid').click( function(event){
              //  showDepth(event);
                
            //});
/**
            $('#imageid').mousemove(function() {
                $('#imageid').popover({
                    trigger: 'manual',
                    placement: 'top',
                    container: 'body',
                    content: function() {
                       startImageX = $("#imageid").position().left;
                        startImageY = $("#imageid").position().top;
                        imageWidth = $("#imageid").width();
                        imageHeight = $("#imageid").height();
                        var message = "pippo "+ event.pageX+"  "+event.pageY;
                         return message;
                    }
                });
                $('#imageid').popover("show");

            })**/

            $('#imageid').mouseenter(function() {
                $('#collapseInfo').collapse('show');
            });

            $('#imageid').mouseleave(function() {
                $('#collapseInfo').collapse('hide');
            });

            $('#imageid').mousemove(function(event) {
                showDepth(event);
            });
        }




        if(photoDetails.vFov){
          document.getElementById("vFov").innerHTML = " vFov: "+ photoDetails.vFov;
        } else {
          document.getElementById("vFov").innerHTML = " vFov: undefined ";
        }
        if(photoDetails.hFov){
          document.getElementById("hFov").innerHTML = " hFov: "+ photoDetails.hFov;
        } else {
          document.getElementById("hFov").innerHTML = " hFov: undefined ";
        }



        
        if(photoDetails.userId.includes('SWP')){
            document.getElementById("author").innerHTML=" By: JonSnow";
        } else {
            document.getElementById("author").innerHTML=" By: "+photoDetails.userId;
        }
        /** var oid= photoDetails.userId.replace('SWP','');
        $.ajax({
            type:       "GET",
            url:        "php/readUser.php?oid="+oid,
            success:    function(data) {
                document.getElementById("author").innerHTML = " By: "+ data;
            }//end success function
        }); **/
    
        //TODO da aggiornare con i picchi
        uploadGallery(8, "", "#peakslinks");
        uploadGallery(8, "userIds[]="+photoDetails.userId, "#userlinks");
   

    



        
}

function showDepthOld(event){
     
    startImageX = $("#imageid").position().left;
    startImageY = $("#imageid").position().top;
    imageWidth = $("#imageid").width();
    imageHeight = $("#imageid").height();
    $('[data-toggle="popover"]').popover({
        content:"pippo "+ event.pageX+"  "+event.pageY
    });  
}

function showDepth(event){
    startImageX = $("#imageid").position().left;
    startImageY = $("#imageid").position().top;
    imageWidth = $("#imageid").width();
    imageHeight = $("#imageid").height();
    var message = "pippo "+ event.pageX+"  "+event.pageY;
    $('#collapseInfoDiv').html(message);
}


function showSnowMask(photoDetails){
    $('#snow-container').empty();  
    x = $("#imageid").position().left;
    y = $("#imageid").position().top;
    imageWidth = $("#imageid").width();
    imageHeight = $("#imageid").height();
    $("#snow-container").append("<img src='"+photoDetails.auxSnowAbsUrlOriginal+"' class='snowOnPhoto'  height='"+imageHeight+ "' width='"+imageWidth+"'  style='left:"+ x +"px;top:"+ y +"px'></img>");      
}

function viewPeaks(photoDetails){
    $('#peaks-container').empty();
    var numPeaks = photoDetails.auxAlignmentPeaks.length;
    startImageX = $("#imageid").position().left;
    startImageY = $("#imageid").position().top;
    imageWidth = $("#imageid").width();
    imageHeight = $("#imageid").height();
    origImageWidth = photoDetails.hSize;
    origImageHeight = photoDetails.vSize;

    for(var i=0; i<numPeaks; i++) {   
        var p = photoDetails.auxAlignmentPeaks[i];
        var x = startImageX + (p.x * imageWidth /origImageWidth );
        var y = startImageY + (p.y * imageHeight / origImageHeight );
        console.log(x+" - "+y);
        
        $("#peaks-container").append("<img src='images/peak2.png' class='peaksonphoto'  height='28' width='28' title='"+ p.auxName +" (" + p.auxGpsAlt + " m)' class='render-peak' id=peak'"+i+"' style='left:"+ x +"px;top:"+ y +"px'></img>");
    }
    $("#peaks-container").tooltip();
}


$(function(){
    loadPhoto(function (photo) {
        fillPhoto(photo);
    });
    
    $("#switch-peaks").bootstrapSwitch();
    $("#switch-snow").bootstrapSwitch();


});




// ********************************************************************************** STATUS MNGM *********************************************************************************

function isDone(currentStatus, status, mystatusConfig){
    return mystatusConfig.status[currentStatus].step>=mystatusConfig.status[status].step;
}





// ********************************************************************************** HIDE-SHOW PHOTO DETAILS ******************************************************************************************
function hide() {
  if(document.getElementById("hideBtn").innerHTML=="Hide"){
    document.getElementById("photoinfo").style.display = 'none';
    document.getElementById("hideBtn").innerHTML="More";
  } else{
    document.getElementById("hideBtn").innerHTML="Hide";
    document.getElementById("photoinfo").style.display = 'block';
  }
}






