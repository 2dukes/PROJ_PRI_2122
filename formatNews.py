import json
import pandas as pd

with open('./files/news.json', 'r') as f:
  jsonDataStr = f.read()

data = json.loads(jsonDataStr)
df = pd.json_normalize(data)
df.to_csv('./files/news.csv', index=False, encoding='utf-8')