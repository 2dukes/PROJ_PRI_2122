from evaluate import get_PR_curve_cryptos
from evaluate_news import get_PR_curve_news
import matplotlib.pyplot as plt

# Original
disp1_original = get_PR_curve_cryptos(1, "original")
disp4_original = get_PR_curve_news(4, "original", disp1_original.ax_)
disp5_original = get_PR_curve_news(5, "original", disp4_original.ax_)
disp6_original = get_PR_curve_cryptos(6, "original", disp5_original.ax_)
disp6_original.ax_.set_title(f"Original Configuration - Precision-Recall Curves")
plt.savefig(f'results/original/precision_recall_all.pdf')
plt.savefig(f'results/original/precision_recall_all.png')
plt.show()

# Conf 1
# disp1_conf1 = get_PR_curve_cryptos(1, "1")
# disp4_conf1 = get_PR_curve_news(4, "1", disp1_conf1.ax_)
# disp5_conf1 = get_PR_curve_news(5, "1", disp4_conf1.ax_)
# disp6_conf1 = get_PR_curve_cryptos(6, "1", disp5_conf1.ax_)
# disp6_conf1.ax_.set_title(f"Configuration 1 - Precision-Recall Curves")
# plt.savefig(f'results/1/precision_recall_all.pdf')
# plt.savefig(f'results/1/precision_recall_all.png')
# plt.show()

# Conf 2
# disp1_conf2 = get_PR_curve_cryptos(1, "2")
# disp4_conf2 = get_PR_curve_news(4, "2", disp1_conf2.ax_)
# disp5_conf2 = get_PR_curve_news(5, "2", disp4_conf2.ax_)
# disp6_conf2 = get_PR_curve_cryptos(6, "2", disp5_conf2.ax_)
# disp6_conf2.ax_.set_title(f"Configuration 2 - Precision-Recall Curves")
# plt.savefig(f'results/2/precision_recall_all.pdf')
# plt.savefig(f'results/2/precision_recall_all.png')
# plt.show()

# Conf 3
# disp1_conf3 = get_PR_curve_cryptos(1, "3")
# disp4_conf3 = get_PR_curve_news(4, "3", disp1_conf3.ax_)
# disp5_conf3 = get_PR_curve_news(5, "3", disp4_conf3.ax_)
# disp6_conf3 = get_PR_curve_cryptos(6, "3", disp5_conf3.ax_)
# disp6_conf3.ax_.set_title(f"Configuration 3 - Precision-Recall Curves")
# plt.savefig(f'results/3/precision_recall_all.pdf')
# plt.savefig(f'results/3/precision_recall_all.png')
# plt.show()

# Conf 4
# disp1_conf4 = get_PR_curve_cryptos(1, "4")
# disp4_conf4 = get_PR_curve_news(4, "4", disp1_conf4.ax_)
# disp5_conf4 = get_PR_curve_news(5, "4", disp4_conf4.ax_)
# disp6_conf4 = get_PR_curve_cryptos(6, "4", disp5_conf4.ax_)
# disp6_conf4.ax_.set_title(f"Configuration 4 - Precision-Recall Curves")
# plt.savefig(f'results/4/precision_recall_all.pdf')
# plt.savefig(f'results/4/precision_recall_all.png')
# plt.show()