

//$(function (slice, filters) {
function uploadGallery( slice, filters, linksid ){
    'use strict';
    // Load demo images from flickr:
    $.ajax({
        url: engineHost+'searchMedia?'+filters,
        dataType: 'jsonp'
    }).done(function (result) {
        var linksContainer = $(linksid).empty();
        var baseUrl;
        if(result.result.length==0){
            linksContainer.append("No media found");
        }
        
        $.each(result.result.slice(0,slice), function (index, photo) {
            
            baseUrl=retrieveUrl(photo, 0);
            
            var newnode=$('<div/>').append(
                $('<a/>').append(
                    $('<img> ')
                    .prop('src', baseUrl)
                    .prop('style', "background: rgb(255, 255, 255);")
                    .attr('p_id', photo.id)
                    .attr('src_large',retrieveUrl(photo, 3))
                ).prop('href', "#" ).addClass('ancore'))
            .prop('class','preview_thumb_area' );

            linksContainer.append(newnode);
            

        });
        $(".ancore").on("click", function() {
            $('#imagepreview').attr('src', $(this).children('img').attr('src_large')); 
            $('#mediaMoreButton').attr('photoId',$(this).children('img').attr('p_id') ); 
            $('#imagemodal').modal('show'); 
            $('#mediaMoreButton').click(function(){
                window.location.href="photo.php?photoId="+$(this).attr('photoId');
            })
        }); 
    });

};
