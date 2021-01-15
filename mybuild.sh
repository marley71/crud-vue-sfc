#npm run build &&
#sleep 1 &&
while inotifywait -e create ../../public/dist/index.html ; do echo 'fatto'; done


