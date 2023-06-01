import numpy as np
import h5py
import glob
import cv2
import tensorflow as tf
from lbp import lbp
from hog import hog

def CheckUserModel(id):
    images = []
    for file in glob.glob("check_user/*"):
        img = cv2.imread(file)
        img = cv2.resize(img, (100, 100))
        gray_image = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        lbp_image = lbp(gray_image)
        hog_descriptor = hog(gray_image, 8, 2, 9)
        feature_vector = np.concatenate((lbp_image.flatten(), hog_descriptor))
        images.append(feature_vector)

    images = np.array(images)
    loaded_model = tf.keras.models.load_model("models/"+id+".h5")
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
