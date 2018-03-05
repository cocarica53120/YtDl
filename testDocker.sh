
docker run centos_ytdl sh -c 'youtube-dl --help' && 
{ echo "#######" && echo 'test of youtube-dl --help in docker container : SUCCESS' && exit 0; } ||
{ echo "#######" && echo 'test of youtube-dl --help in docker container : FAILURE' && exit 1;};
 
