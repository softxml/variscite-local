<?php




$servername = "localhost";
$username = "variscite_main";        // Replace with your MySQL username
$password = "Ostrovsky@77";        // Replace with your MySQL password
$dbname = "cawkdgckkt";          // Replace with your MySQL database name
$port = 3306;

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully!";
$conn->close();
?>
