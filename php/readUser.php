<?php
$servername = "localhost";
$username = "swadmin";
$password = "swadmin";
$dbname = "swportal";


$oid=$_GET["oid"];
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT username FROM user WHERE oid=".$oid;
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo $row["username"]. "<br>";
    }
} else {
    echo $oid;
}
$conn->close();
?>