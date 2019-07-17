#! /bin/bash

# 確認資料夾路徑是否存在
if [ ! -x "$1" ]; then
mkdir -p "$1"
sleep 1
fi

ffmpeg -i "rtmp://$3" $1$2.mp4 & echo $!

