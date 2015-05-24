
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    

    <title>SnowWatch Portal</title>

    <?php include 'php/dependencies/commonsCss.php'; ?>
    <?php include 'php/dependencies/commonsJS.php'; ?>    
    
    <link href="libs/kartik-v-bootstrap-fileinput-9f4e4ef/css/fileinput.min.css" media="all" rel="stylesheet" type="text/css" />
    <script src="libs/kartik-v-bootstrap-fileinput-9f4e4ef/js/fileinput.min.js" type="text/javascript"></script>
    <script type="text/javascript" async="" src="libs/ga.js"></script>
    <script>
      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-43092768-1']);
      _gaq.push(['_trackPageview']);
      (function () {
        var ga = document.createElement('script');
        ga.type = 'text/javascript';
        ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ga, s);
      })();
    </script>

   

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

    <?php include 'php/navbar.php'; ?>
    

    <div class="container">

      <div class="starter-template">
        
        <h1>Upload Your Photo</h1>
        <div class="col-xs-6 col-xs-offset-3">
        <form action="" method="POST" enctype="multipart/form-data" id="form1" >
            <input id="input-21" type="file" accept="image/*" style="width:60%" name="uploadFile" >
            <script>
              /* Initialize your widget via javascript as follows */
              $("#input-21").fileinput({
              previewFileType: "image",
              browseClass: "btn btn-success",
              browseLabel: "Pick Image",
              browseIcon: '<i class="glyphicon glyphicon-picture"></i>',
              removeClass: "btn btn-danger",
              removeLabel: "Delete",
              removeIcon: '<i class="glyphicon glyphicon-trash"></i>',
              uploadClass: "btn btn-info",
              uploadLabel: "Upload",
              uploadIcon: '<i class="glyphicon glyphicon-upload"></i>',
              });
            </script>
        </form>
        </div>
      </div>

    </div><!-- /.container -->
    
    <script src="js/upload.js"></script>
    
  </body>
</html>
