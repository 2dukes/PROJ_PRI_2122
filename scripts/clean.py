import pandas as pd

coins = pd.read_csv("files/coins_news.csv")

# Removing symbol and name (equal to id)
coins = coins.drop(["symbol", "name"], axis=1)

# Clean unicode characters in news headers and descriptions 
coins.headers = coins.headers.apply(lambda x: str(x).replace('\\xa0',' ').replace('\\u200b', '') if str(x) != "nan" else "")
coins.descriptions = coins.descriptions.apply(lambda x: str(x).replace('\\xa0',' ').replace('\\u200b', '') if str(x) != "nan" else "")

# Save to file
coins.to_csv("files/clean_coins.csv")