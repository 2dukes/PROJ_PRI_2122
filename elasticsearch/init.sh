#!/bin/bash

# Specify mappings
curl -XPUT "http://localhost:9200/cryptos" -H 'Content-Type: application/json' --data-binary '@new_config.json'

# Feed Elastic Search
curl -X POST "http://localhost:9200/cryptos/_bulk" -H 'Content-Type: application/json' --data-binary '@subset_dataset.json'