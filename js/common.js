function retrieveUrl(photo1, index){
	var urls = new Array();
	urls[0]=photo1.auxFileAbsUrlSmall;
	urls[1]=photo1.auxFileAbsUrlMedium;
	urls[2]=photo1.auxFileAbsUrlLarge;
	urls[3]=photo1.auxFileAbsUrlOriginal;
    var i = index;
	
	while (! urls[i] && i<urls.length) {
    	i++;
	}
	return urls[i];


}

function goodMod(number, n) {
    return ((number%n)+n)%n;
}


// ********************************************************************************** LOAD PHOTO ******************************************************************************************        
var photo;
function loadPhoto(callback){

if(queryString.photoId){
    $.ajax( {
        //url: 'https://cors-anywhere.herokuapp.com/'+engineHost+'searchMedia?ids[]='+queryString.photoId,
        url: engineHost+'searchMedia?detailLevel=full&ids[]='+queryString.photoId,
        dataType: 'jsonp',
        
    })
    .then ( function(){
        if(arguments[0].status=="OK"){
            var photo;
            if(arguments[0].result[0]){
                photo=arguments[0].result[0];
                callback( photo );
            } else {
                $(container).html("<h4>Photo not exists</h4>");
                console.log("No photo for the specified id" );
            }
        } else{
            //TODO: brutto che prima carica la pagina poi fa nullo
            $(container).html("<h4>Photo not exists</h4>");
            console.log("Error reading photo detail: " + arguments[0].error);
        }
    })
    .fail(function(){
        $(container).html("<h4>Photo not exists</h4>");
        console.log("Error reading photo detail: " + arguments);
    });
} else {
    photo=decodeURIComponent(queryString.args);
    fillPhoto( JSON.parse(decodeURIComponent(queryString.args)) );
}   
return photo;
}



function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < 5; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }