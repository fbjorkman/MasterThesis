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

package org.apache.flink.streaming.examples.rocksdbgadget;

import org.apache.flink.api.common.functions.RichFlatMapFunction;
import org.apache.flink.api.common.state.ValueState;
import org.apache.flink.api.common.state.ValueStateDescriptor;
import org.apache.flink.api.common.typeinfo.TypeHint;
import org.apache.flink.api.common.typeinfo.TypeInformation;
import org.apache.flink.configuration.Configuration;
import org.apache.flink.contrib.streaming.state.EmbeddedRocksDBStateBackend;
import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.util.Collector;

public class RocksDBGadget {

    public static final class WorkloadParser extends RichFlatMapFunction<String, String[]>{
        // Workload will be in text format on the form: ID OPERATION KEY VALUE gadget gadgetFile
        @Override
        public void flatMap(String value, Collector<String[]> out) throws Exception {
            out.collect(value.split("\\W+"));
        }
    }

    public static class RocksDBOp extends RichFlatMapFunction<String[], String>{

        ValueState<String> state;

        @Override
        public void flatMap(String[] value, Collector<String> out) throws Exception {
            if(value.length == 6){
                switch (value[1]){
                    case "get":
                        state.value();
                        break;

                    case "put":
                        state.update(value[3]);
                        break;

                    case "delete":
                        state.clear();
                        break;

                    default:
                        break;
                }
            }
        }

        @Override
        public void open(Configuration config){
            ValueStateDescriptor<String> descriptor =
                    new ValueStateDescriptor<>("state",
                            TypeInformation.of(new TypeHint<>() {}));
            state = getRuntimeContext().getState(descriptor);
        }
    }


    public static void main(String[] args) throws Exception {

        final StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
        env.setStateBackend(new EmbeddedRocksDBStateBackend());

        DataStream<String> workLoad = env.readTextFile("/home/fredrik/Documents/SharedUbuntuVM/gadget.log");

        workLoad.flatMap(new WorkloadParser())
                .keyBy(k -> k[2])
                .flatMap(new RocksDBOp());

        env.execute();
    }
}
