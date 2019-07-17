#! /bin/bash

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"pid":'$1'}' \
  http://localhost:1985/stopRec