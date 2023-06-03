import numpy as np

def lbp(image):
    neighbors_indices = np.array([
        (-1, -1), (-1, 0), (-1, 1),
        (0, -1),           (0, 1),
        (1, -1),  (1, 0),  (1, 1)
    ])

    h, w = image.shape
    padded_image = np.pad(image, pad_width=1, mode='edge')
    neighbors_values = np.zeros((h, w, 8), dtype=image.dtype)

    # Izračunaj vrednosti sosedov za vsako slikovno točko
    for i, (dy, dx) in enumerate(neighbors_indices):
        neighbors_values[..., i] = padded_image[1 + dy : h + 1 + dy, 1 + dx : w + 1 + dx]

    center = image
    binary_pattern = (neighbors_values >= center[..., np.newaxis]).astype(int)
    powers_of_two = np.array([1, 2, 4, 8, 16, 32, 64, 128], dtype=np.uint8)
    lbp_values = np.sum(binary_pattern * powers_of_two, axis=-1)
    lbp_image = np.zeros_like(image, dtype=np.uint8)
    
    # Pretvori vrednosti LBP v slikovno obliko
    lbp_image = lbp_values

    return lbp_image