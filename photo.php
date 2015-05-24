
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
    

    <script src="libs/bootstrap-switch.js"></script>

    <style>
    #statusMessage
        {   
        display: block;
        text-align: left;
        width: 300px;
        white-space: normal;
        }
   </style>
    <!--miei-->
    <link rel="stylesheet" href="css/gallery.css">
    <link href="http://www.bootstrap-switch.org/docs/css/bootstrap.min.css" rel="stylesheet">
    <link href="http://www.bootstrap-switch.org/docs/css/highlight.css" rel="stylesheet">
    <link href="http://www.bootstrap-switch.org/dist/css/bootstrap3/bootstrap-switch.css" rel="stylesheet">

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

        <div class="row">
            <div class="col-md-8">
               <!-- <img class="img-responsive"  alt="" id="imageid" data-toggle="popover"  data-content="">-->
            
               <img class="img-responsive"  alt="" id="imageid" data-toggle="collapse"  data-target="#collapseInfo" aria-expanded="false" aria-controls="collapseExample">
                <div id="peaks-container"></div>
                <div id="snow-container"></div>

                
                <div class="collapse" id="collapseInfo">
                  <div class="well">
                    <h4> Details </h4>
                    <div id="collapseInfoDiv"></div>
                  </div>
                </div>


                <hr>
                <div class="ratings">
                  <p>
                    <span class="glyphicon glyphicon-star"></span>
                    <span class="glyphicon glyphicon-star"></span>
                    <span class="glyphicon glyphicon-star"></span>
                    <span class="glyphicon glyphicon-star"></span>
                    <span class="glyphicon glyphicon-star-empty"></span>
                    4.0 stars
                  </p>
                </div>
                    <!--<div  class="well col-md-4 col-md-offset-3">
                    
                     <a class="btn btn-social-icon btn-twitter"><i class="fa fa-twitter"></i></a>
                     <a class="btn btn-social-icon btn-facebook"><i class="fa fa-facebook"></i></a>
                     <a class="btn btn-social-icon btn-flickr"><i class="fa fa-flickr"></i></a>
                     <a class="btn btn-social-icon btn-instagram"><i class="fa fa-instagram"></i></a>
                    </div>-->
                <!-- ******************************* REVIEW E COMMENTI ******************************* -->
                <div class="well">
                    <div class="text-right">
                        <a class="btn btn-success">Leave a Review</a>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-md-12">
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star-empty"></span>
                            Samwell Tarly
                            <span class="pull-right">10 days ago</span>
                            <p>This photo is awsome!</p>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-md-12">
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star-empty"></span>
                            Ygritte
                            <span class="pull-right">12 days ago</span>
                            <p>You know nothing, JonSnow!</p>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-md-12">
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star-empty"></span>
                            <span class="glyphicon glyphicon-star-empty"></span>
                            <span class="glyphicon glyphicon-star-empty"></span>
                            Ramsay Bolton
                            <span class="pull-right">15 days ago</span>
                            <p>I've seen some better than this...</p>
                        </div>
                    </div>
                </div>    
            </div> <!-- fine colonna foto-->




            <!-- ************************************************************** COLONNA DESTRA ************************************************************** -->
            <!-- ************************************************************** COLONNA DESTRA ************************************************************** -->
            <div class="col-md-4">
                <div class="well">
                    <h4>Photo Info <button type="button" class="btn btn-default btn-xs col-md-offset-6" onClick="hide()" id="hideBtn">Hide</button></h4>
                    <div id= "photoinfo">
                        <p><span class="glyphicon glyphicon-time" id="date"></span></p>
                        <p><span class="glyphicon glyphicon-user" id="author"></span></p>
                        <p><span class="glyphicon " id="source"></span></p>
                        <p><span class="glyphicon " id="type"></span></p>
                        
                        <div id="mapInfo"><img id="mapImg" ></div>
                    </div>
                </div>

                <div class="well">
                    <h4>SnowWatch</h4>
                    <div id="swinfo" style = "padding-left:20px">
                        <div class="row" style="margin-bottom:15px;">
                            <span class="label label-default" id="statusMessage"></span>
                        </div>
                        <div class="row" d="latlngInfo">
                                <span class="glyphicon" id="lat"></span>
                                <span class="glyphicon" id="lng"></span>
                        </div>
                        <div class="row" style="margin-bottom:15px">
                                <div class="input-group" id="latlngInput">
                                    <input type="text" class="form-control" placeholder="Longitude">
                                    <input type="text" class="form-control" placeholder="Latitude">
                                    <span class="input-group-btn">
                                        <button class="btn btn-info" style="height:68px" type="button">Go!</button>
                                    </span>
                                </div><!-- /input-group -->
                        </div><!-- /.row -->
                        <div class="row" style="margin-bottom:15px">
                                <span class="glyphicon" id= "gpsAlt"></span>
                                <span class="glyphicon" id="hFov"></span>
                                <span class="glyphicon" id="vFov"></span>
                        </div>
                        <div class="row" style="margin-bottom:15px">
                            <div class="col-md-4">
                                <span class="glyphicon" style="padding-top:20px" ><a class="btn btn-success btn-xs" id="viewRender" >Alignment</a></span>
                            </div>        
                            <div class="col-md-4" id="peaksdiv">
                                <div class="row">
                                    Show Peaks:
                                </div>
                                <div class="row">
                                    <input id="switch-peaks" type="checkbox" disabled  data-size="mini" data-on-text="ON" data-off-text="OFF" name="author-checkbox">
                                    <!--<input id="switch-peaks" type="checkbox" checked="" data-size="mini" data-on-text="ON" data-off-text="OFF" name="author-checkbox">-->
                                </div>
                            </div>
                            <div class="col-md-4" id="snowmaskdiv">
                                <div class="row">
                                    Snow Mask:
                                </div>
                                <div class="row">
                                    <input id="switch-snow" type="checkbox" disabled data-size="mini" data-on-text="ON" data-off-text="OFF" name="author-checkbox">
                                </div>
                            </div>         
                        </div>

                    </div>
                </div>

                <div class="well">
                    <h4>Same Peaks</h4>
                    <div class="galleryContainer"><?php echo generateSlideshow("peakslinks", "small");?></div>
                </div>

                <div class="well">
                    <h4>Same User</h4>
                    <div class="galleryContainer"><?php echo generateSlideshow("userlinks", "small"); ?></div>
                </div>

                <div class="well" id="nearbydiv">
                    <h4>Near-by</h4>
                    <p>
                       <div class="galleryContainer"> <?php echo generateSlideshow("nearlinks", "small"); ?></div>
                    </p>
                </div>

            </div> <!-- ******************************* FINE COLONNA DESTRA ******************************* -->
        </div>
    </div>


    
    <!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="//netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
    <script src="//blueimp.github.io/Gallery/js/jquery.blueimp-gallery.min.js"></script>
    <script src="js/bootstrap-image-gallery.js"></script>
<script src="js/highlight.js"></script>-->

    <script src="js/gallery2.js"></script>
    
    <script src="js/photo.js"></script>
    
  </body>
</html>
