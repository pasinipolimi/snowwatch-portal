<html lang="en">
<head>
    <!--[if IE]>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <![endif]-->
    <meta charset="utf-8">
    <title>Snowwatch Image Gallery</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
    
    
  
    <?php include 'php/dependencies/commonsCss.php'; ?>
    <?php include 'php/dependencies/filtersCss.php'; ?>

    <link rel="stylesheet" href="css/gallery.css">

    <style>
      #format { margin-top: 2em; }
    </style>
    
</head>
<body>

    <?php include 'php/navbar.php'; ?>

    <div class="container starter-template2" > 
        <div class="row">
            <div class="col-md-8 well galleryContainer text-center">
                <?php 
                    include 'php/slideshow.php'; 
                    echo generateSlideshow("links1");
                ?>
            </div>
            <div class="col-md-4">
                <?php include 'php/filters.php'; ?>
            </div>
      </div>

    </div>



  <?php include 'php/dependencies/commonsJS.php'; ?>
  <?php include 'php/dependencies/filtersJS.php'; ?>
  
  
  <script src="js/gallery2.js"></script>
  <script>
      $("#gallerypage").addClass("active");
      uploadGallery(200, "", "#links1", "");

      function reloadGallery(){
        uploadGallery(100, computeFilterString(), "#links1", "");
      }
  </script>
  
  

</body> 
</html>
