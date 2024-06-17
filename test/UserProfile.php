<?php
class UserProfile {
    // Properties
    private $name;
    private $email;
    private $age;

    // Constructor
    public function __construct($name, $email, $age) {
        $this->name = $name;
        $this->email = $email;
        $this->age = $age;
    }

    // Method to get user details
    public function getUserDetails() {
        return "Name: $this->name, Email: $this->email, Age: $this->age";
    }

    // Method to set user email
    public function setEmail($email) {
        $this->email = $email;
    }

    // Method to get user name
    public function getName() {
        return $this->name;
    }

    // Method to get user email
    public function getEmail() {
        return $this->email;
    }

    // Method to get user age
    public function getAge() {
        return $this->age;
    }
}
?>
