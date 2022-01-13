#!/bin/bash
python3 evaluate.py 1 $1
python3 evaluate.py 6 $1
python3 evaluate_news.py 4 $1
python3 evaluate_news.py 5 $1