-- ################################
-- ### Load Data. DO NOT CHANGE ###
-- ################################
yellow_raw = LOAD 's3://nyc-tlc/trip data/yellow_tripdata_2019*' USING PigStorage(',') AS (vendor:int, pickup_datetime:chararray, dropoff_datetime:chararray, passenger_count:int, trip_distance:float, ratecode:int, store_and_fwd_flag:chararray, PULocationID:int, DOLocationID:int, payment_type:int, fare_amount:float, extra:float, tip_amount:float, tolls_amount:float, improvement_surcharge:float, total_amount:float, congestion_surcharge:float);
yellow = FILTER yellow_raw by pickup_datetime != 'tpep_pickup_datetime';

green_raw = LOAD 's3://nyc-tlc/trip data/green_tripdata_2019*' USING PigStorage(',') AS (vendor: int, pickup_datetime:chararray, dropoff_datetime:chararray, store_and_fwd_flag:chararray, ratecode:int, PULocationID:int, DOLocationID:int, passenger_count:int, trip_distance:float, fare_amount:float, extra:float, mta_tax:float, tip_amount:float, tolls_amount:float, ehail_fee:float, improvement_surcharge:float, total_amount:float, payment_type:int, trip_type:int, congestion_surchage:float);
green = FILTER green_raw BY pickup_datetime != 'lpep_pickup_datetime';

locations_raw = LOAD 's3://nyc-tlc/misc/taxi _zone_lookup.csv' USING PigStorage(',') AS (LocationID:int, Borough:chararray, Zone:chararray, service_zone:chararray);
locations = FOREACH locations_raw GENERATE $0, REPLACE($1, '"', '') AS Borough, REPLACE($2, '"', '') AS Zone;
-- ################################

-- ################################
-- ### Put additional code below:
-- ################################
