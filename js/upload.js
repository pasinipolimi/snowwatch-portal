$("#uploadpage").addClass("active");

var $form = $('#form1');
var $fileSelect = $('#input-21');
$form.on( 'submit', function(event) {
          event.preventDefault();
          
          var $btn = $('.btn.btn-info').button('loading');
          var $btn2 = $('.btn.btn-danger').prop('disabled', true);;
          var $btn3 = $('.btn.btn-success').prop('disabled', true);;

          var url = engineHost;
   
          var files = $fileSelect[0].files;
          var formData = new FormData();
          formData.append('uploadFile', files[0]);
          var mediaId="SWP"+makeid();
        debugger;
          var posting = $.ajax( {
              url: 'https://cors-anywhere.herokuapp.com/'+url+'addShot?mediaId='+mediaId+'&tsShot='+(new Date()).toJSON()+"&thumbnails="+encodeURIComponent(JSON.stringify(thumbnails)),
              data: formData,
              processData: false,
              contentType: false,
              type: 'POST'
          } )
          .then( function( ) {
              if(arguments[0].status!="OK"){
                  alert("Unable to upload the photo, try again later");
                  console.log(arguments[0].error);
              } else {
               var posting = $.ajax( {
                  url: 'https://cors-anywhere.herokuapp.com/'+url+'addMedia?id='+mediaId+'2&userId=SWP2&type=P&source=SWP&mainShotId='+arguments[0].result.id,
                  
                  data: formData,
                  processData: false,
                  contentType: false,
                  type: 'GET'
              })
              .then ( function(){
                   if(arguments[0].status!="OK"){
                      alert("Unable to upload the photo, try again later");
                      console.log(arguments[0].error);
                    } else {
                         //window.location='photo.php?args='+encodeURIComponent(JSON.stringify(arguments[0].result));
                         window.location='photo.php?photoId='+mediaId;
                    }
              }).fail( function(){
                  alert("Unable to upload the photo, try again later");
                  console.log(arguments);
              })  
              }       
          } )
          .fail( function() {
              alert("Unable to upload the photo, try again later");
              console.log(arguments);
          });
} );



