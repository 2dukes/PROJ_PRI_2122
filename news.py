# pip3 install pygooglenews --upgrade
from pygooglenews import GoogleNews

# pip3 install newspaper3k
from newspaper import Article

gn = GoogleNews()

def getNewsLink(coin_name):
    search = gn.search(coin_name)
    return search['entries'][0]['link']

def getNewsText(coin_name):
    news_link = getNewsLink(coin_name)
    article = Article(news_link)
    article.download()
    article.parse()
    return {"title": article.title, "text": article.text}

print(getNewsText("ethereum")["text"])
