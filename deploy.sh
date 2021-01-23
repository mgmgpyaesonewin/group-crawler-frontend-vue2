echo "Login Successful"
echo "Backup Data ...."
mongodump --db bindez --gzip --archive > /home/ubuntu/backup/dump_`date +"%d-%m-%Y"`.gz
echo "Database Backup Successful...."
cd /var/www/html/
sudo git reset --hard HEAD
sudo git pull origin master
sudo npm install
sudo npm run build
echo "FrontEnd Deploy Successfully ...."
cd ~/api.gcrawler.site/
git pull origin main
npm run build
pm2 restart main
echo "API Deploy Successfully ...."