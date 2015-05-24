
$('.btn-group').on('input', 'change', function(){
  debugger;
   var checkbox = $(this);
   var label = checkbox.parent('label');
   if (checkbox.is(':checked'))  {
      label.addClass('active');
   }
   else {
      label.removeClass('active');
   }
});

$('.btn-group').button();


$('#checkwc2').on('change', function() {
   reloadGallery(); 
});

$('#checkp2').on('change', function() {
    reloadGallery();
});


$('#datepicker').datepicker({
        orientation: 'top',
        clearBtn: true
    }
);
$('#datepicker').on('changeDate', function() {
      reloadGallery();
}
);


$(".filters input[name='author-checkbox']").bootstrapSwitch();

var slider = new Slider('#ex7', {});
$("#ex7-enabled").click(function() {
  if(this.checked) {
    slider.enable();
    reloadGallery(); 
  } else {
    slider.disable();
  }
});
$('#ex7').on('slideStop', function (){
  reloadGallery(); 
});

$('#switch-onText').on('switchChange.bootstrapSwitch', function(event, state) {
     reloadGallery(); 
});

function computeFilterString(){
  
  var filters="";
  if(!$('#checkwc2').is(':checked')){
    filters+="types[]=W&";
  }
  if(!$('#checkp2').is(':checked')){
    filters+="types[]=P&";
  }
  if($('#checkwc2').is(':checked') && $('#checkp2').is(':checked')){
    //TOFIX bruttisimo che se non ci sono tipi selezionati fa lo stesso la richiesta
    filters+="types[]=T&";
  }

  if($('#startdate').val()){
  filters+="tsShotMin=  "+new Date($('#startdate').val()).toISOString()+"&";  
  }
  if($('#enddate').val()){
  filters+="tsShotMax=  "+new Date($('#enddate').val()).toISOString()+"&";  
  }
  
  if(! $('#switch-onText').bootstrapSwitch('state')){
   filters+="userIds[]=SWP2&";   
  }
  
  if($("#ex7-enabled").is(':checked')){
    var alts=$('#ex7').attr('value').split(',');
    filters+="gpsAltMin="+alts[0]+"&";   
    filters+="gpsAltMax="+alts[1]+"&";   
  }
  return filters;
}




