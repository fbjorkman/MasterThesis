/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.apache.flink.streaming.examples.rocksdbgettest;

import org.apache.flink.api.common.functions.FlatMapFunction;
import org.apache.flink.api.common.functions.RichFlatMapFunction;
import org.apache.flink.api.common.state.MapState;
import org.apache.flink.api.common.state.MapStateDescriptor;
import org.apache.flink.api.common.state.ValueState;
import org.apache.flink.api.common.state.ValueStateDescriptor;
import org.apache.flink.api.common.typeinfo.TypeHint;
import org.apache.flink.api.common.typeinfo.TypeInformation;
import org.apache.flink.configuration.Configuration;
import org.apache.flink.contrib.streaming.state.EmbeddedRocksDBStateBackend;
import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.util.Collector;

import java.util.ArrayList;
import java.util.Arrays;

public class RocksDBGetTest {
    private static final int[] NUM_OF_KEYS = {5, 10, 100, 1000, 10000};
    private static final int NUM_OF_RUNS = 1000;
    private static final int TOTAL_KEYS = NUM_OF_KEYS[NUM_OF_KEYS.length-1];

    public static ArrayList<String> keys;

    public static final class GetTest extends RichFlatMapFunction<Integer, Integer> {

        MapState<String, String> state;

        @Override
        public void open(Configuration config) throws Exception {
            MapStateDescriptor<String, String> descriptor =
                    new MapStateDescriptor<>("getTest",
                            TypeInformation.of(new TypeHint<>() {}),
                            TypeInformation.of(new TypeHint<>() {}));
            state = getRuntimeContext().getMapState(descriptor);

            for(int i = 0; i < TOTAL_KEYS; i++){
                state.put(keys.get(i), "value" + i);
            }


        }

        @Override
        public void flatMap(Integer value, Collector<Integer> out) throws Exception {

        }
    }

    public static void main(String[] args) throws Exception {
        ArrayList<Integer> fetchAmount = new ArrayList<>();
        keys = new ArrayList<>();

        for(int i : NUM_OF_KEYS){
            fetchAmount.add(i);
        }

        for(int i = 0; i < TOTAL_KEYS; i++){
            keys.add("key" + i);
        }


        final StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
        env.setStateBackend(new EmbeddedRocksDBStateBackend());
        env.setParallelism(1);

        DataStream<Integer> numFetches = env.fromCollection(fetchAmount)
                .keyBy(k -> 0)
                .flatMap(new GetTest());

        env.execute("RocksDBGetTest");


    }
}
