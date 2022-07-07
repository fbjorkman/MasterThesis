#!/bin/bash

cd examples
make rocksdb_fill_keys
make rocksdb_get_test
make rocksdb_get_test_mixed

./rocksdb_fill_keys
./rocksdb_get_test
./rocksdb_get_test_mixed