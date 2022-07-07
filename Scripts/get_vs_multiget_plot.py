import matplotlib.pyplot as plt 
import numpy as np
from numpy import nan

def autolabel(bars, std, offset):
    """
    Attach a text label above each bar displaying its height
    """
    for bar in bars:
    	height = bar.get_height()
    	barNumber = round(height)
    	# barNumber = '{:.3f}'.format(round(height, 3))
    	# plt.text(bar.get_x() + bar.get_width()*offset, height + std[bars.index(bar)], barNumber, ha='center', va='bottom')
    	# plt.text(bar.get_x() + bar.get_width()*offset, height, barNumber, ha='center', va='bottom')

def main():
	
	rawGetData = []
	rawMulData = []
	meanGetData = []
	meanMulData = []
	stdGet = []
	stdMul = []

	with open('../Data/local/get_rawdata_common.txt') as dataFile:
		for row in dataFile:
			row = row.strip()
			dataRow = np.array(row.split(' '))
			rawGetData.append(dataRow.astype(np.float64))

	with open('../Data/local/multiget_rawdata_common.txt') as dataFile:
		for row in dataFile:
			row = row.strip()
			dataRow = np.array(row.split(' '))
			rawMulData.append(dataRow.astype(np.float64))
	
	for i in range(len(rawGetData)):
		meanGetData.append(np.mean(rawGetData[i]))
		stdGet.append(np.std(rawGetData[i]))
		meanMulData.append(np.mean(rawMulData[i]))
		stdMul.append(np.std(rawMulData[i]))


	plt.rcParams.update({'font.size': 18})
	plt.subplot()
	labels = [5, 10, 50, 100, 500, 1000]
	width = 0.3
	x = np.arange(len(labels))
	getplot = plt.bar(x-width/2, meanGetData, width, yerr=stdGet, label='Get()')
	mulplot = plt.bar(x+width/2, meanMulData, width, yerr=stdMul, label='MultiGet()')
	plt.xticks(range(len(labels)), labels)
	plt.yscale('log')

	plt.xlabel('Number of keys fetched')
	plt.ylabel('Mean latency (ms)')
	# plt.title('Only random keys among \nthe fetched keys')
	# plt.title('A mix of common and random keys \namong the fetched keys')
	plt.title('Only common keys among \nthe fetched keys')
	plt.legend(loc='upper left')

	autolabel(getplot, stdGet, 0.3)
	autolabel(mulplot, stdMul, 0.7)

	plt.tight_layout()
	plt.savefig('get_vs_multiget_common_local_log.png')
	plt.show()


main()