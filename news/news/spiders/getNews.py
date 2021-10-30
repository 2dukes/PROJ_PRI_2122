import scrapy
import time
import requests
import re
from scrapy_selenium import SeleniumRequest
from selenium import webdriver
from requests.models import Request

coinURLs = []

class NewsSpider(scrapy.Spider):
  name = "news"
  allowed_urls = ["https://coinmarketcap.com/"]

  start_urls = coinURLs
  # start_urls = [
  #   'https://coinmarketcap.com/currencies/forefront/news/',
  #   'https://coinmarketcap.com/currencies/decred/news/',
  #   'https://coinmarketcap.com/currencies/nftlootbox/news/',
  #   'https://coinmarketcap.com/currencies/sun-token/news/'
  # ] 

  def parse(self, response):
    numberOfNews = 3
    selectors = response.css('.svowul-5 .svowul-0')[:numberOfNews]
    coinIdSearch = re.search('https://coinmarketcap.com/currencies/(.*?)/news', response.url)
  
    if coinIdSearch and response.css('button.active span::text').get() == 'Latest News':
      coinId = coinIdSearch.group(1)
      yield {
        'id': coinId,
        'headers': [re.sub(u"(\u2018|\u2019)", "'", header) for header in selectors.css('.svowul-2 h3::text').getall()],
        'descriptions': [re.sub(u"(\u2018|\u2019)", "'", description) for description in selectors.css('.svowul-2 p::text').re(r'(^.*\.(?=\s)|^.*\.$)')],
        'urls': [ "https://coinmarketcap.com" + url if url[0] == "/" else url for url in selectors.css('::attr(href)').getall()]
      }
      
    # with open("response.html", "wb") as f:
    #   f.write(response.css('h3::text').getall())

def has_numbers(inputString):
  return any(char.isdigit() for char in inputString)

def getCoinNewsURL():
  r = requests.get("https://api.coingecko.com/api/v3/coins/list")
  if r.status_code != 200:
      print("Error while getting coin ids.")
      return
  data = r.json()

  for obj in data:
    coinId = obj["id"]
    if not has_numbers(coinId):
      coinURLs.append(f"https://coinmarketcap.com/currencies/{coinId}/news")

getCoinNewsURL()
# print(coinURLs[:10])