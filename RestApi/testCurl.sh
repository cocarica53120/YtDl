[ ! $PORT ] && { echo 'PORT must be defined for running this test. To know the current port, look at the execution output of launch script....'; };

function getListText() {
	echo "Get listText" &&
	curl -X GET http://localhost:$PORT/listText | python -m json.tool
};

function getListUsers() {
	echo "Get listUsers" &&
	curl -X GET http://localhost:$PORT/listUsers | python -m json.tool
}

function downloadYoutube() {
	echo "Download youtube"
	curl -X POST http://localhost:$PORT/api/start_download -d "{ link: 'https://www.youtube.com/watch?v=Rter-Np-Td0' }"; 
}
