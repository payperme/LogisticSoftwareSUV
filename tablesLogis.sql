CREATE TABLE `logistic`.`ecClient` ( `id_user` INT NOT NULL AUTO_INCREMENT , `userName` TEXT NOT NULL , `streetNum` VARCHAR(10) NOT NULL , `col` VARCHAR(30) NOT NULL , `city` TEXT NOT NULL , `state` VARCHAR(30) NOT NULL , `telNum` TEXT NOT NULL , `cp` INT(6) NOT NULL , `date` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id_user`)) ENGINE = InnoDB; 

CREATE TABLE `logistic`.`parcel data` ( `idParcel` INT NOT NULL AUTO_INCREMENT , `nameParcel` TEXT NOT NULL , `contact` VARCHAR(60) NOT NULL , `deliver` VARCHAR(60) NOT NULL , `timeParcel` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`idParcel`)) ENGINE = InnoDB; 

CREATE TABLE `logistic`.`TrackNumber` ( `idTrackNum` INT NOT NULL AUTO_INCREMENT , `idFuser` INT NOT NULL , `idFparcel` INT NOT NULL , `bill` VARCHAR(15) NOT NULL , `DateTrack` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`idTrackNum`)) ENGINE = InnoDB; 

ALTER TABLE `logistic`.`TrackNumber` ADD INDEX `fk_user` (`idFuser`); 

ALTER TABLE `logistic`.`TrackNumber` ADD INDEX `fk_parcel` (`idFparcel`); 
