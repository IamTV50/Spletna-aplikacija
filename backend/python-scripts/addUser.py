import logging
import os
import numpy as np
import h5py
import glob
import cv2
from sklearn.model_selection import train_test_split
import tensorflow as tf
from lbp import lbp
from hog import hog

def NewUSerModel(id):
    labels = []
    for i in range(560):
        if i<530:
            labels.append(0)
        else:
            labels.append(1)

    labels = np.array(labels)
    with h5py.File('face_models/basemodel.h5', 'r') as f:
        data = f['basemodel'][:]

    data=np.array(data)
    images = []
    g=0
    for file in glob.glob("user_pictures/*"):  
        if g<30:
            img=cv2.imread(file)
            img = cv2.resize(img, (100, 100))
            gray_image = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            lbp_image = lbp(gray_image)
            hog_descriptor = hog(gray_image, 8, 2, 9)
            feature_vector = np.concatenate((lbp_image.flatten(), hog_descriptor))
            images.append(feature_vector)
        g=g+1

    images=np.array(images)
    data=np.vstack((data, images))
    # Split data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(data, labels, train_size=0.9, random_state=80, stratify=labels)
    # One-hot encode labels
    num_classes = len(np.unique(labels))
    y_train_encoded = tf.keras.utils.to_categorical(y_train, num_classes)
    y_test_encoded =  tf.keras.utils.to_categorical(y_test, num_classes)

    # Define neural network architecture
    model = tf.keras.models.Sequential([
        tf.keras.layers.Dense(128, activation='relu', input_shape=(X_train.shape[1],)),
        tf.keras.layers.Dropout(0.2),
        tf.keras.layers.Dense(64, activation='relu'),
        tf.keras.layers.Dropout(0.2),
        tf.keras.layers.Dense(num_classes, activation='softmax')  # Update the number of output units
    ])

    # Compile model
    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

    # Train model
    model.fit(X_train, y_train_encoded, epochs=10, batch_size=32, validation_data=(X_test, y_test_encoded))

    # Evaluate model
    test_loss, test_acc = model.evaluate(X_test, y_test_encoded)
    model.save("models/"+id+".h5")
    return "Added"