hadoop jar ./target/q1-1.0.jar edu.gatech.cse6242.Q1 ./data/trip1.csv ./data/q1output1
hadoop fs -getmerge ./data/q1output1/ q1output1.tsv
hadoop fs -rm -r ./data/q1output1
