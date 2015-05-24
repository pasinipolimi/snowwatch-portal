<?php
function generateSlideshow($id, $class) {
$html ='<div id="'.$id.'" class="preview'.$class.' text-center"></div>
    <div class="modal fade" data-backdrop="false" id="imagemodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
      <div class="modal-dialog" width="75%">
        <div class="modal-content">
          <div class="modal-body text-center">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>  
            <div class="row">
              <img src="" id="imagepreview" style="width: 500px;" >
            </div>
            <div class="row" style="margin-top:20px">
              <button type="button" id="mediaMoreButton" class="btn btn-default more" >
                <i class="glyphicon glyphicon-list" id="more"></i>More
              </button>
            </div>
          </div>
          <!--<div class="modal-footer text-center">        
          </div>-->
        </div>
      </div>
    </div>';
    
    return $html;
  }
?>
