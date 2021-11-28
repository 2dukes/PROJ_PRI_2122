#!/bin/bash

# Feed Elastic Search
curl -X POST http://localhost:9200/cryptos/_bulk -H 'Content-Type: application/json' --data-binary @final_json.json