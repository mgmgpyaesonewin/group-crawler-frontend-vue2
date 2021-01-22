cd /var/www/html/
sudo git pull origin master
sudo npm run build
cd ~/api.gcrawler.site/
git pull origin main
npm run build
pm2 restart main