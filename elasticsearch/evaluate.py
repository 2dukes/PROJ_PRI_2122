### PART 1
# SETUP
import matplotlib.pyplot as plt
from sklearn.metrics import PrecisionRecallDisplay
import numpy as np
import json
import requests
import pandas as pd
import sys

query_num = sys.argv[1]

QRELS_FILE = f"queries/query{query_num}-relevant.txt"
QUERY_URL = "http://localhost:9200/cryptos/_search"
QUERY_FILE = f"queries/query{query_num}.es"

file_string = ""
with open(QUERY_FILE, "r") as query_file:
    file_string = "".join(query_file.read().splitlines(True)[1:])
    

query_json = json.loads(file_string)

# Read qrels to extract relevant documents
relevant = list(map(lambda el: el.strip(), open(QRELS_FILE).readlines()))
# Get query results from Solr instance

results = requests.get(QUERY_URL, json=query_json).json()['hits']['hits']

# Calculate precision and recall values as we move down the ranked list
precision_values = [
    len([
        doc 
        for doc in results[:idx]
        if doc['_source']['id'] in relevant
    ]) / idx 
    for idx, _ in enumerate(results, start=1)
]

recall_values = [
    len([
        doc for doc in results[:idx]
        if doc['_source']['id'] in relevant
    ]) / len(relevant)
    for idx, _ in enumerate(results, start=1)
]

### PART 2

# METRICS TABLE
# Define custom decorator to automatically calculate metric based on key
metrics = {}
metric = lambda f: metrics.setdefault(f.__name__, f)

@metric
def ap(results, relevant):
    """Average Precision"""
    precision_values = [
        len([
            doc 
            for doc in results[:idx]
            if doc['_source']['id'] in relevant
        ]) / idx 
        for idx in range(1, len(results))
    ]
    return sum(precision_values)/len(precision_values)

@metric
def p3(results, relevant, n=3):
    """Precision at N"""
    return len([doc for doc in results[:n] if doc['_source']['id'] in relevant])/n

@metric
def f1(_, __):
    precision = precision_values[-1]
    recall = recall_values[-1]
    return (2 * precision * recall) / (precision +  recall)

@metric
def p(_, __):
    return precision_values[-1]

@metric
def r(_, __):
    return recall_values[-1]

def calculate_metric(key, results, relevant):
    return metrics[key](results, relevant)

# Define metrics to be calculated
evaluation_metrics = {
    'ap': 'Average Precision',
    'p3': 'Precision at 3 (P@3)',
    'p' : 'Precision',
    'r' : 'Recall',
    'f1': 'F1 Measure'
}
# Calculate all metrics and export results as LaTeX table
df = pd.DataFrame([['Metric','Value']] +
    [
        [evaluation_metrics[m], calculate_metric(m, results, relevant)]
        for m in evaluation_metrics
    ]
)

with open(f'results/results{query_num}.tex','w') as tf:
    tf.write(df.to_latex())

### PART 3

# PRECISION-RECALL CURVE
precision_recall_match = {k: v for k,v in zip(recall_values, precision_values)}

# Extend recall_values to include traditional steps for a better curve (0.1, 0.2 ...)
recall_values.extend([step for step in np.arange(0.1, 1.1, 0.1) if step not in recall_values])
recall_values = sorted(set(recall_values))

# Extend matching dict to include these new intermediate steps
for idx, step in enumerate(recall_values):
    if step not in precision_recall_match:
        if recall_values[idx-1] in precision_recall_match:
            precision_recall_match[step] = precision_recall_match[recall_values[idx-1]]
        else:
            precision_recall_match[step] = precision_recall_match[recall_values[idx+1]]

disp = PrecisionRecallDisplay([precision_recall_match.get(r) for r in recall_values], recall_values)
disp.plot()
disp.ax_.set_title(f"Query {query_num} Precision-Recall Curve")
plt.savefig(f'results/precision_recall{query_num}.pdf')
