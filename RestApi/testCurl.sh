[ ! $PORT ] && { echo 'PORT must be defined for running this test. To know the current port, look at the execution output of launch script....'; };

echo "Get listText" &&
curl -X GET   http://localhost:$PORT/listText | python -m json.tool &&
echo "Waiting for 2 seconds!!!!" &&
sleep 2;

echo "Get listUsers" &&
curl -X GET   http://localhost:$PORT/listUsers | python -m json.tool
