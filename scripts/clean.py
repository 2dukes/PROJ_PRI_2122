import pandas as pd

coins = pd.read_csv("files/coins_news.csv")

# Removing symbol and name (equal to id)
coins = coins.drop(["symbol", "name"], axis=1)

# Save to file
coins.to_csv("files/clean_coins.csv")