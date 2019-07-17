#! /bin/bash

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"filename":"'$1'","filepath":"'$2'","domainPath":"'$3'"}' \
  http://localhost:1985/startRec