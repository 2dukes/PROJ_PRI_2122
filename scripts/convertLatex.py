import sys

file_to_convert = sys.argv[1]

split_path = file_to_convert.split("/")

config_num = split_path[-2]
query_num = split_path[-1].split(".")[0][-1]

old_content = None
with open(file_to_convert, "r") as file:
    old_content = file.read()
    
relevant_lines = old_content.split("\n")[5:10]
new_lines = [] 
for line in relevant_lines:
    new_lines.append(line[3:])
    
initial_part = "\\begin{figure}[h]\n\\begin{center}\n\\begin{tabular}{lll}\n\\toprule\n{}                      Metric &         Value \\\\\n\midrule\n"
final_part = "\n\\bottomrule\n\end{tabular}\n\end{center}\n\caption{Query " + query_num + " Metrics in configuration " + config_num + "}\n\label{fig:query_" + query_num + "_metrics_config_" + config_num + "}\n\end{figure}"

with open(file_to_convert, "w") as file:
    file.write(initial_part + "\n".join(new_lines) + final_part)