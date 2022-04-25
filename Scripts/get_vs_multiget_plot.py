import matplotlib.pyplot as plt 
import numpy as np

def autolabel(bars, offset):
    """
    Attach a text label above each bar displaying its height
    """
    for bar in bars:
        height = bar.get_height()
        plt.text(bar.get_x() + bar.get_width()*offset, 1.05*height,
                round(height, 4), ha='center', va='bottom')

def main():
	
	rawData = []
	meanGetData = []
	meanMulData = []
	stdGet = []
	stdMul = []

	with open('MasterThesis/Data/get_vs_multiget_rawdata.txt') as dataFile:
		for row in dataFile:
			dataRow = np.array(row.split(','))
			rawData.append(dataRow.astype(np.float64))
	
	for i in range(len(rawData)):
		if i%2 == 0:
			meanGetData.append(np.mean(rawData[i]))
			stdGet.append(np.std(rawData[i]))
		else:
			meanMulData.append(np.mean(rawData[i]))
			stdMul.append(np.std(rawData[i]))

	plt.subplot()
	labels = [5, 10, 100, 1000, 10000]
	width = 0.3
	x = np.arange(len(labels))
	getplot = plt.bar(x-width/2, meanGetData, width, yerr=stdGet, label='Get()')
	mulplot = plt.bar(x+width/2, meanMulData, width, yerr=stdMul, label='MultiGet()')
	plt.xticks(range(len(labels)), labels)
	plt.yscale('log')

	plt.xlabel('Number of keys fetched')
	plt.ylabel('Mean latency (ms)')
	plt.legend(loc='upper left')

	autolabel(getplot, 0.05)
	autolabel(mulplot, 0.8)

	plt.tight_layout()
	plt.savefig('get_vs_multiget_plot.png')
	plt.show()


main()