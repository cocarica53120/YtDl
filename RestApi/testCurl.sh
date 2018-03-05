echo "Get listText" &&
curl -X GET   http://localhost:8081/listText | python -m json.tool &&
echo "Waiting for 2 seconds!!!!" &&
sleep 2;

echo "Get listUsers" &&
curl -X GET   http://localhost:8081/listUsers | python -m json.tool
