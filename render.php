
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    

    <title>SnowWatch Portal - Photo Details</title>


    <?php include 'php/dependencies/commonsCss.php'; ?>
    <?php include 'php/dependencies/commonsJS.php'; ?>
    


    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/warpingMatcher.css">
    <link href="https://gitcdn.github.io/bootstrap-toggle/2.2.0/css/bootstrap-toggle.min.css" rel="stylesheet">
    
    <script src="js/config.js" type="text/javascript"></script>

    <script  type="text/javascript">
        var queryString = function () {
            var query_string = {};
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i=0;i<vars.length;i++) {
              var pair = vars[i].split("=");
              if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = pair[1];
              } else if (typeof query_string[pair[0]] === "string") {
                  var arr = [ query_string[pair[0]], pair[1] ];
                  query_string[pair[0]] = arr;
              } else {
                  query_string[pair[0]].push(pair[1]);
              }
            } 
            return query_string;
        } ();
        
    </script>
    <?php 
        include 'php/slideshow.php'; 
    ?>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

    <?php 
      include 'php/navbar.php'; 
    ?>

    

    <div class="container starter-template2" id="container" >
    <ol class="breadcrumb" aria-label="breadcrumbs">
        <li class="active">Alignment</li>
    </ol>
    <div class="row">
        <div class="col-md-12">
            <div id="main-content" role="main">
                <div class="container_12">
                    <div class="grid_12 alpha omega agrd_24">
                        <div class="alert alert-dismissable fade in alert-success ">
                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                            The image has been automatically aligned, in order to provide the best solution.
                            Decide wheather you are satisfied with this alignment or not.
                            In case you are not satisfied manually align the image, following the instructions below.
                        </div>
                    </div>
                    <div class="clear"></div>
                    <div class="grid_12 alpha omega agrd_24">
                        <div class="alert alert-info ">
                            1 - Drag the panorama background according to the mountain photo, matching a mountain peak with its related one on the render. <br>
                            2 - Once they are perfectly aligned click on this peak.<br>
                            3 - Match every other peak contained in the photo by clicking on the peak and dragging the selection to a valid peak on the render. ('Shift' + 'Click' to delete a peak).<br>
                            4 - Once you have saved the alignment, press 'Continue' in order to see the peaks on the image.
                            <br>
                            <br> 
                            <p>
                                <a title="Pin Panorama" id="ln17" class="  btn btn-default" href="page8.do">
                                Pin Panorama</a>
                                <a title="Reset" id="ln18" class="  btn btn-default" href="page8.do" style="display: none;">
                                Reset</a>
                                <a title="Save Alignment" id="ln14" class="  btn btn-default" href="page8.do">
                                Save Alignment</a>
                            </p>
                        </div>
                    </div>
                    <div class="clear"></div>
                    <div class="grid_12 alpha omega agrd_24">
                        <div class="panel panel-success successAlign" style="display: none;">
                            <div class="panel-heading">
                                <h2 class="panel-title">
                                    The Alignment Has Been Saved
                                </h2>
                            </div>
                            <div class="panel-body">
                                <div class="EntryUnit ">
                                    <input type="hidden" name="enu3Key" value="" id="enu3Key">
                                    <input type="hidden" name="fld12" value="10" id="fld12">
                                    <div class="form-group form-btn">
                                        <button title="Continue" onclick="$('#page6FormBean')[0].target='_self'" class="btn  btn-success " id="button:ln32" name="button:ln32" type="submit" value="Continue">
                                        Continue</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
        </div>
    </div>
    <hr>
    <div class="warpingArea"></div>
</div>
</div>








    
    <script src="js/render.js"></script>
    <script src="//code.jquery.com/ui/1.11.3/jquery-ui.js"></script>  

    <script type="text/javascript" src="libs/underscore-min.js"></script> 
    <script src="js/jquery.warpingMatcher.js"></script>
    <script type="text/javascript" src="libs/point.js"></script> 
    <script type="text/javascript" src="libs/matrix22.js"></script>  
    <script type="text/javascript" src="libs/deformation.js"></script>
    <script type="text/javascript" src="libs/interpolation.js"></script>  
    <script type="text/javascript" src="libs/point_definer.js"></script>
    
  </body>
</html>
