-- DROP DATABASE IF EXISTS rfid;
-- CREATE DATABASE IF NOT EXISTS rfid;   

USE rfid; 

DROP TABLE IF EXISTS school; 

CREATE TABLE IF NOT EXISTS school 
  ( 
     _id          INT(6) AUTO_INCREMENT PRIMARY KEY, 
     school_name  VARCHAR(227) UNIQUE NOT NULL, 
     school_email VARCHAR(100) UNIQUE NOT NULL, 
     password     CHAR(60) NOT NULL, 
     school_phone VARCHAR(20) NOT NULL, 
     address      VARCHAR(227) NOT NULL, 
     city         VARCHAR(227) NOT NULL, 
     region       VARCHAR(227) NOT NULL, 
     country      VARCHAR(25) NOT NULL, 
     status       ENUM('Active', 'InActive') DEFAULT 'Active', 
     role         ENUM('Admin', 'SuperUser') DEFAULT 'SuperUser',
     created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
     updated_at   DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ); 


-- alter table school modify _id int(5) NOT NULL AUTO_INCREMENT 
