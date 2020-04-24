package edu.gatech.cse6242;

import java.io.*;
import java.math.*;
import java.text.*;

import org.apache.hadoop.fs.Path;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.io.*;
import org.apache.hadoop.mapreduce.*;
import org.apache.hadoop.util.*;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;


public class Q4b {

    public static class AverageMapper extends Mapper<Object, Text, Text, Text>{

        private Text passengerCount = new Text();
        private Text totalFare = new Text();

        public void map(Object key, Text value, Context context) throws IOException, InterruptedException {
            
            String[] data = value.toString().split("\\s+");

            passengerCount.set(data[2]);
            totalFare.set(data[3]);

            context.write(passengerCount, totalFare);
        }
    }

    public static class AverageReducer extends Reducer<Text, Text, Text, Text> {

        private Text passengerCount = new Text();
        private Text average = new Text();

        public void reduce(Text key, Iterable<Text> values, Context context) throws IOException, InterruptedException {
            int num = 0;
            double sum = 0;

            for (Text value: values) {
                sum += Double.parseDouble(value.toString());
                num += 1;
            }

            double avg = sum / num;
            //avg = new BigDecimal(avg).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
            NumberFormat df = new DecimalFormat("#.00");
            String avgg = df.format(avg);
            average.set(avgg);
            passengerCount.set(key);

            context.write(passengerCount, average);
        }
    }

    public static void main(String[] args) throws Exception {

        /* TODO: Update variable below with your gtid */
        final String gtid = "rliang37";

        Configuration conf = new Configuration();

        Job job = Job.getInstance(conf, "Q4b");

        job.setJarByClass(Q4b.class);
        job.setMapperClass(AverageMapper.class);
        job.setReducerClass(AverageReducer.class);
        //job2.setCombinerClass(TokenizerReducer2.class);
        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(Text.class);

        FileInputFormat.addInputPath(job, new Path(args[0]));
        FileOutputFormat.setOutputPath(job, new Path(args[1]));
        System.exit(job.waitForCompletion(true) ? 0 : 1);
    }
}