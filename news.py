# pip3 install pygooglenews --upgrade
from pygooglenews import GoogleNews

# pip3 install newspaper3k
from newspaper import Article

import requests
import pandas as pd
import time

gn = GoogleNews()

def getNewsLink(coin_name):
    search = gn.search(coin_name)
    return search['entries'][0]['link'] if "link" in search["entries"][0] else ""


def getNews(coin_name):
    news_link = getNewsLink(coin_name)
    article = Article(news_link)
    article.download()
    article.parse()

    return {"title": article.title, "text": article.text}

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


coins_ids = getCoinIds()

rows = []

count = 0

for id in coins_ids:
    print(f"Current id: {id}")
    count += 1
    progress = count / len(coins_ids) * 100

    print(str(progress) + "%")


    news_data = getNews(id)

    data = {"id": id, "news_title": news_data["title"], "news_text": news_data["text"]}

    rows.append(data)

# create dataframe
df = pd.json_normalize(rows)

df.to_csv('news.csv', index=False, encoding='utf-8')

