echo "Login Successful"
cd /var/www/html/
sudo git reset --hard HEAD
sudo git pull origin master
sudo npm install
sudo npm run build
echo "FrontEnd Deploy Successfully ...."
