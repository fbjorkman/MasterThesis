#!/bin/bash

cd /home/fredrik/Documents/rocksdb/examples
make rocksdb_get_test_mixed
for i in {1..5}
do
	./rocksdb_get_test_mixed
done