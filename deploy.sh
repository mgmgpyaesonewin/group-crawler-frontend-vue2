ssh ubuntu@52.148.79.239
cd /var/www/html/
sudo git pull origin master
sudo npm run build
cd /api.gcrawler.site
sudo npm run build
pm2 restart main