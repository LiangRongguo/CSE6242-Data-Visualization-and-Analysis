hadoop jar ./target/q1-1.0.jar edu.gatech.cse6242.Q1 ./data/trip2.csv ./data/q1output2
hadoop fs -getmerge ./data/q1output2/ q1output2.tsv
hadoop fs -rm -r ./data/q1output2
