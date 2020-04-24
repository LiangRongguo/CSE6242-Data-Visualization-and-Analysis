from scipy import stats
import numpy as np
import math


# This method computes entropy for information gain
def entropy(class_y):
    # Input:
    #   class_y         : list of class labels (0's and 1's)

    # TODO: Compute the entropy for a list of classes
    #
    # Example:
    #    entropy([0,0,0,1,1,1,1,1,1]) = 0.92


    ############
    zeroCnt = 0
    oneCnt = 0
    total = len(class_y)

    for label in class_y:
        label = int(label)
        if label == 0:
            zeroCnt = zeroCnt + 1
        if label == 1:
            oneCnt = oneCnt + 1

    if zeroCnt == 0 or oneCnt == 0:
        return 0

    pZero = float(zeroCnt) / total
    pOne = float(oneCnt) / total

    if pZero == 1 or pOne == 1:
        return 0
    else:
        return -(pZero * np.log2(pZero) + pOne * np.log2(pOne))
    ############

    entropy = 0
    return entropy

def partition_classes(X, y, split_attribute, split_val):
    # Inputs:
    #   X               : data containing all attributes
    #   y               : labels
    #   split_attribute : column index of the attribute to split on
    #   split_val       : either a numerical or categorical value to divide the split_attribute
    
    # TODO: Partition the data(X) and labels(y) based on the split value - BINARY SPLIT.
    # 
    # You will have to first check if the split attribute is numerical or categorical    
    # If the split attribute is numeric, split_val should be a numerical value
    # For example, your split_val could be the mean of the values of split_attribute
    # If the split attribute is categorical, split_val should be one of the categories.   
    #
    # You can perform the partition in the following way
    # Numeric Split Attribute:
    #   Split the data X into two lists(X_left and X_right) where the first list has all
    #   the rows where the split attribute is less than or equal to the split value, and the 
    #   second list has all the rows where the split attribute is greater than the split 
    #   value. Also create two lists(y_left and y_right) with the corresponding y labels.
    #
    # Categorical Split Attribute:
    #   Split the data X into two lists(X_left and X_right) where the first list has all 
    #   the rows where the split attribute is equal to the split value, and the second list
    #   has all the rows where the split attribute is not equal to the split value.
    #   Also create two lists(y_left and y_right) with the corresponding y labels.

    '''
    Example:
    
    X = [[3, 'aa', 10],                 y = [1,
         [1, 'bb', 22],                      1,
         [2, 'cc', 28],                      0,
         [5, 'bb', 32],                      0,
         [4, 'cc', 32]]                      1]
    
    Here, columns 0 and 2 represent numeric attributes, while column 1 is a categorical attribute.
    
    Consider the case where we call the function with split_attribute = 0 and split_val = 3 (mean of column 0)
    Then we divide X into two lists - X_left, where column 0 is <= 3  and X_right, where column 0 is > 3.
    
    X_left = [[3, 'aa', 10],                 y_left = [1,
              [1, 'bb', 22],                           1,
              [2, 'cc', 28]]                           0]
              
    X_right = [[5, 'bb', 32],                y_right = [0,
               [4, 'cc', 32]]                           1]

    Consider another case where we call the function with split_attribute = 1 and split_val = 'bb'
    Then we divide X into two lists, one where column 1 is 'bb', and the other where it is not 'bb'.
        
    X_left = [[1, 'bb', 22],                 y_left = [1,
              [5, 'bb', 32]]                           0]
              
    X_right = [[3, 'aa', 10],                y_right = [1,
               [2, 'cc', 28],                           0,
               [4, 'cc', 32]]                           1]
               
    ''' 
    X_left = []
    X_right = []
    
    y_left = []
    y_right = []

    ############


    for i in range(len(X)):

        # Categorical Split Attribute:
        if isinstance(X[i][split_attribute], str):

            if X[i][split_attribute] == split_val:
                X_left.append(X[i])
                y_left.append(y[i])
            else:
                X_right.append(X[i])
                y_right.append(y[i])


        # Numeric Split Attribute:
        else:

            if X[i][split_attribute] <= split_val:
                X_left.append(X[i])
                y_left.append(y[i])
            if X[i][split_attribute] > split_val:
                X_right.append(X[i])
                y_right.append(y[i])


    ############
    
    return (X_left, X_right, y_left, y_right)

    
def information_gain(previous_y, current_y):
    # Inputs:
    #   previous_y: the distribution of original labels (0's and 1's)
    #   current_y:  the distribution of labels after splitting based on a particular
    #               split attribute and split value
    
    # TODO: Compute and return the information gain from partitioning the previous_y labels
    # into the current_y labels.
    # You will need to use the entropy function above to compute information gain
    # Reference: http://www.cs.cmu.edu/afs/cs.cmu.edu/academic/class/15381-s06/www/DTs.pdf
    
    """
    Example:
    
    previous_y = [0,0,0,1,1,1]
    current_y = [[0,0], [1,1,1,0]]
    
    info_gain = 0.45915
    """
    info_gain = 0

    previous_entropy = entropy(previous_y)
    current_entropy_left  = entropy(current_y[0])
    current_entropy_right = entropy(current_y[1])
    length = len(current_y[0]) + len(current_y[1])

    info_gain = previous_entropy - (len(current_y[0]) / length) * current_entropy_left - (len(current_y[1]) / length) * current_entropy_right

    return info_gain


    
def best_split(X, y):
    # Inputs:
    #   X       : Data containing all attributes
    #   y       : labels
    # TODO: For each node find the best split criteria and return the 
    # split attribute, spliting value along with 
    # X_left, X_right, y_left, y_right (using partition_classes)
    '''
    
    NOTE: Just like taught in class, don't use all the features for a node.
    Repeat the steps:

    1. Select m attributes out of d available attributes
    2. Pick the best variable/split-point among the m attributes
    3. return the split attributes, split point, left and right children nodes data 

    '''
    split_attribute = 0
    split_value = 0
    X_left, X_right, y_left, y_right = [], [], [], []
    ### Implement your code here
    #############################################
    information_gain_list = []
    split_value_list = []

    for index in range(len(X[0])):
        best_value = 0
        best_gain = 0

        column = [row[index] for row in X] 
            
        if isinstance(column[0], str):
            for val in set(column): 
                X_left, X_right, y_left, y_right = partition_classes(X, y, index, val)
                gain = information_gain(y,[y_left,y_right])
                if gain > best_gain:
                    best_gain = gain
                    best_value = val
        else: 
            steps = np.linspace(start=np.min(column), stop=np.min(column), num=5, endpoint=False)[1:] 
            for val in steps: 
                X_left, X_right, y_left, y_right = partition_classes(X, y, index, val)
                gain = information_gain(y, [y_left, y_right])
                if gain > best_gain: 
                    best_gain = gain
                    best_value = val
                        
        information_gain_list.append(best_gain)
        split_value_list.append(best_value)
                
    best_split_col = np.argmax(information_gain_list) 
    best_split_value = split_value_list[best_split_col]  

    X_left, X_right, y_left, y_right = partition_classes(X, y, best_split_col, best_split_value) 

    pass

    return best_split_col, best_split_value, X_left, X_right, y_left, y_right
    #############################################

def main():
    print(entropy([0]))
    pass

if __name__ == '__main__':
    main()
