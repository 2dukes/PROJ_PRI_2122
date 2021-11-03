import pandas as pd

coins = pd.read_csv("files/coins.csv")
news = pd.read_csv("files/news.csv")

coins_news = pd.merge(coins, news, on="id", how="outer")
coins_news.to_csv("files/coins_news.csv", index=False)