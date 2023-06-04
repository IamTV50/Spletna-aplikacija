import numpy as np
import h5py
import glob
import cv2
import tensorflow as tf
from lbp import lbp
from hog import hog
import argparse
import os

def CheckUserModel(id):
    images = []
    script_dir = os.path.dirname(os.path.abspath(__file__))
    user_pictures_dir = os.path.join(script_dir, '..', 'user_pictures', '*.jpeg')
    for file in glob.glob(user_pictures_dir):
        img = cv2.imread(file)
        img = cv2.resize(img, (100, 100))
        gray_image = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        lbp_image = lbp(gray_image)
        hog_descriptor = hog(gray_image, 8, 2, 9)
        feature_vector = np.concatenate((lbp_image.flatten(), hog_descriptor))
        images.append(feature_vector)

    images = np.array(images)
    print("Images shape:", images.shape)
    loaded_model = tf.keras.models.load_model("../face_models/"+id+".h5")
    print("Loaded model summary:")
    print(loaded_model.summary())
    expected_input_shape = loaded_model.input_shape[1:]  # Get the input shape tuple excluding batch size

    # Adjust the dimensionality of the feature vectors if necessary
    if images.shape[1] != np.prod(expected_input_shape):
        if images.shape[1] > np.prod(expected_input_shape):
            images = images[:, :np.prod(expected_input_shape)]
        else:
            padding = np.zeros((images.shape[0], np.prod(expected_input_shape) - images.shape[1]))
            images = np.concatenate((images, padding), axis=1)

    print("Adjusted Images shape:", images.shape)

    labels = np.ones(3)

    # Predict the labels for the three images
    three_predictions = loaded_model.predict(images)
    predicted_labels = np.argmax(three_predictions, axis=1)
    accuracy = np.mean(predicted_labels == labels)
    print("Accuracy for the three images:", accuracy)

    # Append the accuracy to an array
    accuracies = []
    accuracies.append(accuracy)

    # Print the array of accuracies
    return accuracies

parser = argparse.ArgumentParser()
parser.add_argument("arg1", type=str, help="First argument")
args = parser.parse_args()
print("arg1 value:", args.arg1)
CheckUserModel(args.arg1)
