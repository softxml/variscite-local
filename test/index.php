<?php
// Include the UserProfile class
require_once 'UserProfile.php';

// Create a new UserProfile object
$user = new UserProfile("John Doe", "john.doe@example.com", 30);

// Call a method of the UserProfile class
echo $user->getUserDetails(); // Outputs: Name: John Doe, Email: john.doe@example.com, Age: 30

// Change the email using setEmail method
$user->setEmail("john.newemail@example.com");

// Call the getUserDetails method again to see the updated email
echo "\n";
echo $user->getUserDetails(); // Outputs: Name: John Doe, Email: john.newemail@example.com, Age: 30
?>
