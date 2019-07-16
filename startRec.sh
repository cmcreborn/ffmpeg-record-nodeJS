#! /bin/bash

ffmpeg -i "rtmp://$2" $1.mp4 & echo $!

