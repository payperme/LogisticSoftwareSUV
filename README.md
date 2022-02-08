# LogisticSoftwareSUV
Hi,  I'm development a logistic software, all open source and based on JS and HTML, it's a simple project for SUV (UDG Virtual University), for better results I'm trying SCRUM, in a nutshell it's for get better result in less time, do you know developer problems. Please go to README file for a long explanation about HOW TO INSTALL the complete PACKAGE for get your OWN logistic SOFTWARE.
---------
## Base package installation:

1. Download VirtualBox (for this purpose) and install, easy [Virtual Box](https://www.virtualbox.org/).
2. Then, download Debian for official mirror [ISO Image](https://www.debian.org/download).
3. Create a virtual machine based on Debian, we only need a Bridge Network, check it on settings.
4. When you finish all the installation process with the VM, we need to install all packages.
5. Install SSH Server (i prefer to work on)
```
# apt-get install openssh-server
```
6. Then, install Apache2 (if you like another www server, try it)
```
# apt-get install apache2
```
7. Check if the Apache2 server it's correctly working
```
# systemctl status apache2
```
8. In this project we need mariaDB, and you can use terminal for create Databases, but for time reasons we need to install PHPmyAdmin
```
# apt-get install wget php php-cgi php-mysqli php-pear php-mbstring libapache2-mod-php php-common php-phpseclib php-mysql
```
9. And it's time for mariaDB
```
# apt-get install mariadb-server mariadb-client
```
10. Install PHPmyAdmin
```
# wget https://files.phpmyadmin.net/phpMyAdmin/5.1.2/phpMyAdmin-5.1.2-all-languages.zip
# unzip phpMyAdmin-5.1.2-all-languages.zip
# mv phpMyAdmin-*/ /usr/share/phpmyadmin
# mkdir -p /var/lib/phpmyadmin/tmp
# chown -R www-data:www-data /var/lib/phpmyadmin
# mkdir /etc/phpmyadmin/
# cp /usr/share/phpmyadmin/config.sample.inc.php  /usr/share/phpmyadmin/config.inc.php
# apt-get install pwgen -y
# pwgen -s 32 1
```
Output
```
eWb5N6kMJyJAhHM0cfpEMYQoYxueyU1T
```
Edit config file
```
# nano /usr/share/phpmyadmin/config.inc.php
$cfg['blowfish_secret'] = 'eWb5N6kMJyJAhHM0cfpEMYQoYxueyU1T';
```
Add the next line on directories
```
$cfg['TempDir'] = '/var/lib/phpmyadmin/tmp';
```
11. Configure Apache2 server
```
nano /etc/apache2/conf-enabled/phpmyadmin.conf
```
and add the next content to the file _phpmyadmin.conf_
```
Alias /phpmyadmin /usr/share/phpmyadmin

<Directory /usr/share/phpmyadmin>
    Options SymLinksIfOwnerMatch
    DirectoryIndex index.php

    <IfModule mod_php5.c>
        <IfModule mod_mime.c>
            AddType application/x-httpd-php .php
        </IfModule>
        <FilesMatch ".+\.php$">
            SetHandler application/x-httpd-php
        </FilesMatch>

        php_value include_path .
        php_admin_value upload_tmp_dir /var/lib/phpmyadmin/tmp
        php_admin_value open_basedir /usr/share/phpmyadmin/:/etc/phpmyadmin/:/var/lib/phpmyadmin/:/usr/share/php/php-gettext/:/usr/share/php/php-php-gettext/:/usr/share/javascript/:/usr/share/php/tcpdf/:/usr/share/doc/phpmyadmin/:/usr/share/php/phpseclib/
        php_admin_value mbstring.func_overload 0
    </IfModule>
    <IfModule mod_php.c>
        <IfModule mod_mime.c>
            AddType application/x-httpd-php .php
        </IfModule>
        <FilesMatch ".+\.php$">
            SetHandler application/x-httpd-php
        </FilesMatch>

        php_value include_path .
        php_admin_value upload_tmp_dir /var/lib/phpmyadmin/tmp
        php_admin_value open_basedir /usr/share/phpmyadmin/:/etc/phpmyadmin/:/var/lib/phpmyadmin/:/usr/share/php/php-gettext/:/usr/share/php/php-php-gettext/:/usr/share/javascript/:/usr/share/php/tcpdf/:/usr/share/doc/phpmyadmin/:/usr/share/php/phpseclib/
        php_admin_value mbstring.func_overload 0
    </IfModule>

</Directory>

# Authorize for setup
<Directory /usr/share/phpmyadmin/setup>
    <IfModule mod_authz_core.c>
        <IfModule mod_authn_file.c>
            AuthType Basic
            AuthName "phpMyAdmin Setup"
            AuthUserFile /etc/phpmyadmin/htpasswd.setup
        </IfModule>
        Require valid-user
    </IfModule>
</Directory>

# Disallow web access to directories that don't need it
<Directory /usr/share/phpmyadmin/templates>
    Require all denied
</Directory>
<Directory /usr/share/phpmyadmin/libraries>
    Require all denied
</Directory>
<Directory /usr/share/phpmyadmin/setup/lib>
    Require all denied
</Directory>
```
