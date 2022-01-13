#!/bin/bash

curl -X DELETE "http://localhost:9200/cryptos"
./init.sh original
./run_eval.sh original

curl -X DELETE "http://localhost:9200/cryptos"
./init.sh 1
./run_eval.sh 1

curl -X DELETE "http://localhost:9200/cryptos"
./init.sh 2
./run_eval.sh 2

curl -X DELETE "http://localhost:9200/cryptos"
./init.sh 3
./run_eval.sh 3

curl -X DELETE "http://localhost:9200/cryptos"
./init.sh 4
./run_eval.sh 4
