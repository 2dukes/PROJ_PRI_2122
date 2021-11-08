import pandas as pd
import json

# Read news.json obtained from CoinMarketCap Scraping and convert it to CSV.
with open('./files/news.json', 'r') as f:
  jsonDataStr = f.read()

data = json.loads(jsonDataStr)
news = pd.json_normalize(data)
news.to_csv('./files/news.csv', index=False, encoding='utf-8')

coins = pd.read_csv("files/coins.csv")

coins_news = pd.merge(coins, news, on="id", how="outer")
coins_news.to_csv("files/coins_news.csv", index=False)