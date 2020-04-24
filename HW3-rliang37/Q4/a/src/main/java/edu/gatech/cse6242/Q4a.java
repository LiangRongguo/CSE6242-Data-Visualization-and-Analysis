package edu.gatech.cse6242;

import java.io.*;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.io.*;
import org.apache.hadoop.mapreduce.*;
import org.apache.hadoop.util.*;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;


public class Q4a {

    public static class DifferenceMapper extends Mapper<Object, Text, Text, IntWritable>{

        private Text nodeSource = new Text();
        private Text nodeTarget = new Text();

        private IntWritable outdegree = new IntWritable(1);
        private IntWritable indegree = new IntWritable(-1);

        public void map(Object key, Text value, Context context) throws IOException, InterruptedException {
            
            String[] data = value.toString().split("\\s+");

            nodeSource.set(data[0]);
            nodeTarget.set(data[1]);

            context.write(nodeSource, outdegree);
            context.write(nodeTarget, indegree);
        }
    }

    public static class DIfferenceReducer extends Reducer<Text, IntWritable, Text, IntWritable> {

        private Text node = new Text();
        private IntWritable difference = new IntWritable();

        public void reduce(Text key, Iterable<IntWritable> values, Context context) throws IOException, InterruptedException {
            int result = 0;

            for (IntWritable value: values) {
                result += value.get();
            }

            node.set(key);
            difference.set(result);

            context.write(key, difference);
        }
    }

    public static class CountMapper extends Mapper<Object, Text, IntWritable, IntWritable>{

        private IntWritable difference = new IntWritable();
        private IntWritable id = new IntWritable();

        public void map(Object key, Text value, Context context) throws IOException, InterruptedException {

            String[] data = value.toString().split("\\t");

            id.set(Integer.parseInt(data[0]));
            difference.set(Integer.parseInt(data[1]));
            
            context.write(difference, id);
        }
    }

    public static class CountReducer extends Reducer<IntWritable, IntWritable, IntWritable, IntWritable> {

        private IntWritable difference = new IntWritable();
        private IntWritable count = new IntWritable();

        public void reduce(IntWritable key, Iterable<IntWritable> values, Context context) throws IOException, InterruptedException {
            int sum = 0;
            for (IntWritable v: values) {
                sum += 1;
            }

            count.set(sum);
            difference.set(key.get());
            
            context.write(difference, count);
        }
    }


    public static void main(String[] args) throws Exception {

        /* TODO: Update variable below with your gtid */
        final String gtid = "rliang37";

        Configuration conf = new Configuration();

        Job job = Job.getInstance(conf, "Q4a_1");

        /* TODO: Needs to be implemented */
        job.setJarByClass(Q4a.class);
        job.setMapperClass(DifferenceMapper.class);
        job.setReducerClass(DIfferenceReducer.class);
        //job.setCombinerClass(TokenizerReducer.class);
        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(IntWritable.class);

        FileInputFormat.addInputPath(job, new Path(args[0]));
        FileOutputFormat.setOutputPath(job, new Path("intermediate"));
        job.waitForCompletion(true);


        Job job2 = Job.getInstance(conf, "Q4a_2");

        job2.setJarByClass(Q4a.class);
        job2.setMapperClass(CountMapper.class);
        job2.setReducerClass(CountReducer.class);
        //job2.setCombinerClass(TokenizerReducer2.class);
        job2.setOutputKeyClass(IntWritable.class);
        job2.setOutputValueClass(IntWritable.class);

        FileInputFormat.addInputPath(job2, new Path("intermediate"));
        FileOutputFormat.setOutputPath(job2, new Path(args[1]));
        System.exit(job2.waitForCompletion(true) ? 0 : 1);
    }
}