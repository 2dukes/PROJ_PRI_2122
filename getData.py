import requests
import pandas as pd
import time

def has_numbers(inputString):
    return any(char.isdigit() for char in inputString)

def getCoinIds():
    r = requests.get("https://api.coingecko.com/api/v3/coins/list")
    if r.status_code != 200:
        print("Error while getting coin ids")
        return
    data = r.json()

    ids = []
    for obj in data:
        id = obj["id"]
        if (not has_numbers(id)):
            ids.append(obj["id"])

    return ids

rows = []

def getData(coin_id):
    status_code = 0

    # The API has a limit of requests per minute
    while status_code != 200:
        r = requests.get('https://api.coingecko.com/api/v3/coins/' + coin_id + '?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false')
        if r.status_code != 200:
            print("Sleeping for 15 seconds...")
            time.sleep(15)
        status_code = r.status_code

    data = r.json()

    all_time_high = data["market_data"]["ath"]["usd"] if "usd" in data["market_data"]["ath"] else ""
    current_price = data["market_data"]["current_price"]["usd"] if "usd" in data["market_data"]["current_price"] else ""
    market_cap = data["market_data"]["market_cap"]["usd"] if "usd" in data["market_data"]["market_cap"] else ""
    price_change_percentage_1y = data["market_data"]["price_change_percentage_1y"] if "price_change_percentage_1y" in data["market_data"] else ""
    price_change_percentage_7d = data["market_data"]["price_change_percentage_7d"] if "price_change_percentage_7d" in data["market_data"] else ""
    price_change_percentage_30d = data["market_data"]["price_change_percentage_30d"] if "price_change_percentage_30d" in data["market_data"] else ""
    all_time_high_date = data["market_data"]["ath_date"]["usd"] if "usd" in data["market_data"]["ath_date"] else ""

    data = {"id": data["id"],"symbol": data["symbol"],"name": data["name"],"block_time_in_minutes": data["block_time_in_minutes"],"hashing_algorithm": data["hashing_algorithm"],"categories": data["categories"],"genesis_date": data["genesis_date"],"developer_score": data["developer_score"],"community_score": data["community_score"],"liquidity_score": data["liquidity_score"],"description": data["description"]["en"], "homepage_link": list(filter(lambda x: x != "", data["links"]["homepage"])), "blockchain_site": list(filter(lambda x: x != "", data["links"]["blockchain_site"])), "subreddit_url": data["links"]["subreddit_url"], "github": data["links"]["repos_url"]["github"], "image_url": data["image"]["large"], "all_time_high(usd)": all_time_high, "all_time_high_date": all_time_high_date, "market_cap": market_cap, "current_price": current_price, "price_change_percentage_1y": price_change_percentage_1y, "price_change_percentage_30d": price_change_percentage_30d, "price_change_percentage_7d": price_change_percentage_7d}
    
    rows.append(data)


coins_ids = getCoinIds()
progress = 0

for id in coins_ids:
    progress += 1
    percentage = progress / len(coins_ids) * 100
    print(str(percentage) + "%")
    getData(id)

# create dataframe
df = pd.json_normalize(rows)
df.to_csv('./files/coins.csv', index=False, encoding='utf-8')