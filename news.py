# pip3 install pygooglenews --upgrade
from pygooglenews import GoogleNews

# pip3 install newspaper3k
from newspaper import Article

import sys

gn = GoogleNews()

def getNewsLink(coin_name, index = 0):
    search = gn.search(coin_name)
    return search['entries'][index]['link']

current_index = 0

def getNewsText(coin_name, index = 0):
    global current_index
    news_link = getNewsLink(coin_name, index)
    article = Article(news_link)
    article.download()
    article.parse()

    text = article.text
    if (len(text) < 500):
        current_index += 1
        getNewsText(coin_name, current_index)

    return {"title": article.title, "text": article.text}


print(getNewsText(sys.argv[1])["text"])
