-- DROP DATABASE IF EXISTS test_db;   
-- CREATE DATABASE IF NOT EXISTS test_db;   
USE rfid; 

DROP TABLE IF EXISTS school; 

CREATE TABLE IF NOT EXISTS school 
  ( 
     _id          INT(6) AUTO_INCREMENT PRIMARY KEY, 
     owner_name   VARCHAR(25) NOT NULL, 
     owner_email  VARCHAR(100) NOT NULL, 
     owner_phone  VARCHAR(15) NOT NULL, 
     school_name  VARCHAR(227) UNIQUE NOT NULL, 
     school_email VARCHAR(100) UNIQUE NOT NULL, 
     school_phone VARCHAR(15) UNIQUE NOT NULL, 
     password     CHAR(60) NOT NULL, 
     address      VARCHAR(227) NOT NULL, 
     city         VARCHAR(227) NOT NULL, 
     state        VARCHAR(227) NOT NULL, 
     country      VARCHAR(25) NOT NULL, 
     status       ENUM('Active', 'InActive') DEFAULT 'Active', 
     created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
     updated_at   DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ); 


-- alter table school modify _id int(5) NOT NULL AUTO_INCREMENT 
