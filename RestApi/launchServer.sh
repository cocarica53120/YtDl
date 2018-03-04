echo "installation..."
npm install

echo "launching server with nodemon. It allows to restart automatically after modification in code";
./node_modules/nodemon/bin/nodemon.js server.js 


echo "Another mean is simply with node"
#node server.js 
