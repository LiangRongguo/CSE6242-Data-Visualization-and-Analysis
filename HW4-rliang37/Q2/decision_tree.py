import numpy as np 
import ast
import operator
from scipy.stats import mode
from util import entropy, information_gain, partition_classes, best_split


class DecisionTree(object):
    def __init__(self, max_depth=10):
        # Initializing the tree as an empty dictionary or list, as preferred
        self.tree = {}
        self.max_depth = max_depth
        pass
    	
    def learn(self, X, y, par_node = {}, depth=0):
        # TODO: Train the decision tree (self.tree) using the the sample X and labels y
        # You will have to make use of the functions in utils.py to train the tree

        # Use the function best_split in util.py to get the best split and 
        # data corresponding to left and right child nodes
        
        # One possible way of implementing the tree:
        #    Each node in self.tree could be in the form of a dictionary:
        #       https://docs.python.org/2/library/stdtypes.html#mapping-types-dict
        #    For example, a non-leaf node with two children can have a 'left' key and  a 
        #    'right' key. You can add more keys which might help in classification
        #    (eg. split attribute and split value)
        ### Implement your code here
        #############################################

        entropy_y = entropy(y)

        if len(X) == 0 or len(y) == 0:
            self.tree['state'] = 'leaf'
            self.tree['result'] = 0
            return
        
        if len(set(y)) == 1:
            # if all same in y
            self.tree['state'] = 'leaf'
            self.tree['result'] = y[0]
            return
        
        y_dist = {}
        for yi in y:
            if yi in y_dist.keys():
                y_dist[yi] += 1
            else:
                y_dist[yi] = 1

        y_max_val = 0
        y_max_count = 0

        for k, v in y_dist.items():
            if v > y_max_count:
                y_max_val = k
                y_max_count = v

        all_same = True
        for i in range(1, len(X)):
            if X[i] == X[i-1]:
                continue
            else:
                all_same = False
                break

        if all_same or depth == self.max_depth:
            self.tree['state'] = 'leaf'
            self.tree['result'] = y_max_val
            return
        

        split_column, split_value, X_left, X_right, y_left, y_right = best_split(X, y)

        self.tree['state'] = "parent"
        self.tree['result'] = "null"

        self.tree['split_attr'] = split_column
        self.tree['split_val'] = split_value
        
        self.tree['left'] = DecisionTree()
        self.tree['left'].learn(X_left, y_left, self, depth+1)
        
        self.tree['right'] = DecisionTree()
        self.tree['right'].learn(X_right, y_right, self, depth+1) 

 
    def classify(self, record):
        # TODO: classify the record using self.tree and return the predicted label
        if self.tree['state']=='leaf':
            return self.tree['result']
        
        else:
            attribute = record[self.tree['split_attr']]
            value = self.tree['split_val']
            
            if isinstance(attribute, str): 
                if attribute == value:
                    return self.tree['left'].classify(record)
                else:
                    return self.tree['right'].classify(record)
            else:
                if attribute <= value:
                    return self.tree['left'].classify(record)
                else:
                    return self.tree['right'].classify(record)

        pass
        #############################################
