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

package org.apache.flink.streaming.examples.rocksdbcount;

import org.apache.flink.api.common.functions.FlatMapFunction;
import org.apache.flink.api.common.functions.RichFlatMapFunction;
import org.apache.flink.api.common.state.ValueState;
import org.apache.flink.api.common.state.ValueStateDescriptor;
import org.apache.flink.api.common.typeinfo.TypeHint;
import org.apache.flink.api.common.typeinfo.TypeInformation;
import org.apache.flink.configuration.Configuration;
import org.apache.flink.contrib.streaming.state.EmbeddedRocksDBStateBackend;
import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.streaming.api.windowing.assigners.TumblingProcessingTimeWindows;
import org.apache.flink.streaming.api.windowing.time.Time;
import org.apache.flink.util.Collector;

public class RocksDBWordSum {

    public static final class Tokenizer implements FlatMapFunction<String, Integer>{

        @Override
        public void flatMap(String value, Collector<Integer> out) {
            String[] tokens = value.toLowerCase().split("\\W+");
            out.collect(tokens.length);
        }
    }

    public static class RocksSum extends RichFlatMapFunction<Integer, Integer> {

        ValueState<Integer> stateSum;

        @Override
        public void flatMap(Integer value, Collector<Integer> out) throws Exception {
            if (stateSum.value() == null){
                stateSum.update(value);
            } else{
                stateSum.update(stateSum.value() + value);
            }
        }

        @Override
        public void open(Configuration config) {
            ValueStateDescriptor<Integer> descriptor =
                    new ValueStateDescriptor<>("sum",
                            TypeInformation.of(new TypeHint<>() {
                            }));
            stateSum = getRuntimeContext().getState(descriptor);
        }
    }

  public static void main(String[] args) throws Exception {

      final StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

      env.setStateBackend(new EmbeddedRocksDBStateBackend());

      DataStream<String> text = env.readTextFile("/home/fredrik/Documents/ScalableML/lab2/snil_data/SNLI_Corpus/snli_1.0_train.csv");

      DataStream<Integer> count = text
              .flatMap(new Tokenizer())
              .keyBy(k -> k)
              .window(TumblingProcessingTimeWindows.of(Time.milliseconds(500)))
              .sum(0)
              .keyBy(k -> 0)
              .flatMap(new RocksSum());

      env.execute("RocksDBWordSum");
  }
}
