#! /bin/bash

kill -2 $1

sleep 2

if ps -p $1 > /dev/null
then
   echo "fail"
   # $1 still running
else
   echo "done"
   # $1 kill success
fi