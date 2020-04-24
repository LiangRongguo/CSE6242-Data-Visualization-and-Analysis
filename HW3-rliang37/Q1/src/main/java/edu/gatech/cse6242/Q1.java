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


public class Q1 {
/* TODO: Update variable below with your gtid */
    final String gtid = "rliang37";

    public static class TargetMapper extends Mapper<Object, Text, Text, Text> {
        private Text output1 = new Text();
        private Text output2 = new Text();

        public void map(Object key, Text value, Context context) throws IOException, InterruptedException {
            String[] data = value.toString().split(",");

            if (data.length == 4) {
                String pickup = data[0];
                String distance = data[2];
                String fare = data[3];

                output1 = new Text(pickup);
                output2 = new Text(distance + "," + fare);

                context.write(output1, output2);
            }

        }
    }

    public static class TripReducer extends Reducer<Text, Text, Text, Text> {
        private Text result = new Text();

        public void reduce(Text key, Iterable<Text> values, Context context) throws IOException, InterruptedException {
            int totalNoOfTrips = 0;
            double totalFare = 0;

            for (Text value: values) {
                String[] data = value.toString().split(",");

                if (data[0].equals("0")) continue;
                totalNoOfTrips += 1;
                totalFare += Double.parseDouble(data[1]);
            }

            totalFare = new BigDecimal(totalFare).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
            NumberFormat df = new DecimalFormat("#.00");
            String tf = df.format(totalFare);
            result = new Text(Integer.toString(totalNoOfTrips) + "," + tf);
            context.write(key, result);
        }
    }

    public static void main(String[] args) throws Exception {
        Configuration conf = new Configuration();
        Job job = Job.getInstance(conf, "Q1");

        /* TODO: Needs to be implemented */
        job.setJarByClass(Q1.class);
        job.setMapperClass(TargetMapper.class);
        //job.setCombinerClass(TripReducer.class);
        job.setReducerClass(TripReducer.class);
        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(Text.class);

        FileInputFormat.addInputPath(job, new Path(args[0]));
        FileOutputFormat.setOutputPath(job, new Path(args[1]));
        System.exit(job.waitForCompletion(true) ? 0 : 1);
    }
}
