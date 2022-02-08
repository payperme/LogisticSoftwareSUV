# LogisticSoftwareSUV
Hi,  I'm development a logistic software, all open source and based on JS and HTML, it's a simple project for SUV (UDG Virtual University), for better results I'm trying SCRUM, in a nutshell it's for get better result in less time, do you know developer problems. Please go to README file for a long explanation about HOW TO INSTALL the complete PACKAGE for get your OWN logistic SOFTWARE.
---------
Base package installation:

1. Download VirtualBox (for this purpose) and install, easy.
2. Then, download Debian for official mirror (Debian webpage)
3. Create a virtual machine based on Debian, we only need a Bridge Network, check it on settings.
4. When you finish all the installation process with the VM, we need to install all packages.
5. Install SSH Server (i prefer to work on)
# apt-get install openssh-server
6. Then, install Apache2 (if you like another www server, try it)
# apt-get install apache2
7. Check if the Apache2 server it's correctly working
# systemctl status apache2
8. In this project we need mariaDB, and you can use terminal for create Databases, but for time reasons we need to install PHPmyAdmin
# apt-get install wget php php-cgi php-mysqli php-pear php-mbstring libapache2-mod-php php-common php-phpseclib php-mysql
9. And it's time for mariaDB
# apt-get install mariadb-server mariadb-client
10. Finally, install PHPmyAdmin
# wget https://files.phpmyadmin.net/phpMyAdmin/5.1.2/phpMyAdmin-5.1.2-all-languages.zip
# unzip phpMyAdmin-5.1.2-all-languages.zip
# mv phpMyAdmin-*/ /usr/share/phpmyadmin
# mkdir -p /var/lib/phpmyadmin/tmp
