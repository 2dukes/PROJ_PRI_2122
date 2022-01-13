import requests
import pandas as pd

QUERY_URL = "http://localhost:9200/cryptos/_search"

json_part = {"size": 10000}

results = requests.get(QUERY_URL, json=json_part).json()['hits']['hits']

coins = pd.read_csv("files/coins.csv")

ids = coins["id"]

results_ids = list(map(lambda x: x["_source"]["id"], results))

for id in ids:
    if id not in results_ids:
        print(id)
