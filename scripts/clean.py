import pandas as pd

coins = pd.read_csv("files/coins_news.csv")

# Removing symbol and name (equal to id)
coins = coins.drop(["symbol", "name"], axis=1)

# Clean unicode characters in news headers and descriptions 
coins.headers = coins.headers.apply(lambda x: str(x).replace('\\xa0',' ').replace('\\u200b', '') if str(x) != "nan" else "")
coins.descriptions = coins.descriptions.apply(lambda x: str(x).replace('\\xa0',' ').replace('\\u200b', '') if str(x) != "nan" and str(x) != "[]" else "")

# Clean columns with [] values
coins.github = coins.github.apply(lambda x: "" if str(x) == "[]" else str(x))
coins.categories = coins.categories.apply(lambda x: "" if str(x) == "[]" else str(x))
coins.blockchain_site = coins.blockchain_site.apply(lambda x: "" if str(x) == "[]" else str(x))
coins.homepage_link = coins.homepage_link.apply(lambda x: "" if str(x) == "[]" else str(x))

# Save to file
coins.to_csv("files/clean_coins.csv", index=False)