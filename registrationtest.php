<?php

/*** begin our session ***/
session_start();

/*** set a form token ***/
$form_token = md5( uniqid('auth', true) );

/*** set the session form token ***/
$_SESSION['form_token'] = $form_token;
$pp="aaa";

?>

 

<html>
<head>
<title>PHPRO Login</title>
</head>

<body>
<!--<script type="text/javascript"> 
	 var p= "<?php echo $pp; ?>";
    alert( p); 
    
  </script> -->
<h2>Add user</h2>
<form action="adduser_submit.php" method="post">
<fieldset>
<p>
<label for="phpro_username">Username</label>
<input type="text" id="phpro_username" name="phpro_username" value="" maxlength="20" />
</p>
<p>
<label for="phpro_password">Password</label>
<input type="text" id="phpro_password" name="phpro_password" value="" maxlength="20" />
</p>
<p>
<input type="hidden" name="form_token" value="<?php echo $form_token; ?>" />
<input type="submit" value="&rarr; Login" />
</p>
</fieldset>
</form>



<div class="grid_6 omega agrd_12">
<div class="panel panel-default ">
	<div class="panel-heading">
		<h2 class="panel-title">
			Login
		</h2>
	</div>
	<div class="panel-body">
<div class="EntryUnit ">
	<input type="hidden" name="enu2Key" value="" id="enu2Key">
	<div class="form-horizontal ">
	    
		
				
				<div class="form-group ">
					  <label for="fld13" class="control-label col-md-2">Username *</label>
					<div class="controls col-md-10">
					<input type="text" name="fld13" size="25" value="" id="fld13" class="wr-submitButtons:ln7  form-control ">
					
					</div>
				</div>
				
				<div class="form-group ">
					  <label for="fld25" class="control-label col-md-2">Password *</label>
					<div class="controls col-md-10">
					<input type="password" name="fld25" size="25" value="" id="fld25" class="wr-submitButtons:ln7 form-control ">
					
					</div>
				</div>
	</div>
	<div class="row"><div class="col-md-offset-2 col-md-10">
		<div class="form-group form-btn">
<button title="Login" onclick="$('#page4FormBean')[0].target='_self'" class="btn  btn-default " id="button:ln7" name="button:ln7" type="submit" value="Login">
			Login</button>
		</div>
	</div></div>
</div>	
	</div>
</div>
</div>





</body>
</html>