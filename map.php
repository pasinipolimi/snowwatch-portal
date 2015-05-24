<html lang="${LanguageISOCtxParam}">
	<head>
		<title>World Map</title>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    	<meta charset="utf-8">
		<meta name="description" content="">
    	<meta name="author" content="">
    

    	
  <?php include 'php/dependencies/commonsCss.php'; ?>
	<?php include 'php/dependencies/filtersCss.php'; ?>
	<link href="css/mappadada.css" rel="stylesheet">
  
  <?php include 'php/dependencies/commonsJS.php'; ?>
    	
	

		<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAiUJC2WiuszJkkHhoqH4nXHBs3skyr62o&libraries=geometry&sensor=false"></script>
		<script src="js/worldMap.js"></script>
		<script src="libs/richmarker.js"></script>

		<style>

			.thumbdiv_big {
        		background-size: contain;
        		background-repeat: no-repeat;
        		background-position: center center;
        		width:100px; 
        		height:100px;
        		z-index: 2;
        		border:2px solid #fff;
        	}
        	.thumbdiv_small {
        
        		background-size: contain;
        		background-repeat: no-repeat;
        		background-position: center center;
        		width:40px; 
        		height:40px;
        		z-index: 1;
        		border:2px solid #fff;
        	} 
		</style>

		<link href="skin/square/red.css" rel="stylesheet">
	</head>
<body class="bootstrap-default">

	
	<?php include 'php/navbar.php';  ?>
    <script>$("#mappage").addClass("active");</script>

    
	<!--<div class="starter-template">-->
		<div class="container container-fixed-top-padding">
			<div class="row">
				<div class="col-md-12">
					<div id="main-content" role="main">
						<div class="container_12">
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="map-canvas"></div>
		<div class="col-md-4 pull-right" style="padding-top: 100px;">
                <?php include 'php/filters.php'; ?>
         </div>

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
    </div>



	
	<?php include 'php/dependencies/filtersJS.php'; ?>

	<script src="js/gallery2.js"></script>
  	<script>
        function reloadGallery(){
            reloadMap($('#map-canvas'));
        }
  </script>


</body>
</html>