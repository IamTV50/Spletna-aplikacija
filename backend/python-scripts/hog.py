import numpy as np

def hog(siva_slika, velikost_celice, velikost_bloka, stevilo_binov):
    visina, sirina = siva_slika.shape
    gx = np.zeros_like(siva_slika, dtype=np.float32)
    gy = np.zeros_like(siva_slika, dtype=np.float32)

    # Izračunaj odvode v smeri x in y za sliko
    gx[:, :-1] = np.diff(siva_slika, n=1, axis=1)
    gy[:-1, :] = np.diff(siva_slika, n=1, axis=0)

    # Izračunaj magnitudo in smer gradienta
    velikost_gradienta = np.sqrt(gx ** 2 + gy ** 2)
    usmerjenost_gradienta = np.arctan2(gy, gx) * (180.0 / np.pi) % 180.0

    # Izračunaj število celic v x in y smeri
    stevilo_celic_x = sirina // velikost_celice
    stevilo_celic_y = visina // velikost_celice

    # Ustvari histogram za celice
    histogram = np.zeros((stevilo_celic_y, stevilo_celic_x, stevilo_binov))

    # Iteriraj čez celice in izračunaj histogram za vsako celico
    for y in range(stevilo_celic_y):
        for x in range(stevilo_celic_x):
            zacetek_y = y * velikost_celice
            konec_y = (y + 1) * velikost_celice
            zacetek_x = x * velikost_celice
            konec_x = (x + 1) * velikost_celice

            # Izberi del gradienta in smeri za trenutno celico
            celicni_gradient = velikost_gradienta[zacetek_y:konec_y, zacetek_x:konec_x]
            celicna_usmerjenost = usmerjenost_gradienta[zacetek_y:konec_y, zacetek_x:konec_x]

            # Izračunaj histogram za trenutno celico
            hist, _ = np.histogram(celicna_usmerjenost, bins=stevilo_binov, range=(0, 180),
                                   weights=celicni_gradient)

            # Shrani histogram v matriko histogramov
            histogram[y, x, :] = hist / np.sqrt(np.sum(hist ** 2) + 1e-6)

    # Izračunaj parametre za bloke
    korak_bloka = velikost_celice // velikost_bloka
    stevilo_blokov_x = (stevilo_celic_x - velikost_bloka) // korak_bloka + 1
    stevilo_blokov_y = (stevilo_celic_y - velikost_bloka) // korak_bloka + 1

    # Ustvari HOG deskriptor za bloke
    hog_descriptor = np.zeros((stevilo_blokov_y, stevilo_blokov_x, velikost_bloka, velikost_bloka, stevilo_binov))

    # Iteriraj čez bloke in izračunaj HOG deskriptor za vsak blok
    for y in range(stevilo_blokov_y):
        for x in range(stevilo_blokov_x):
            zacetek_y = y * korak_bloka
            konec_y = zacetek_y + velikost_bloka
            zacetek_x = x * korak_bloka
            konec_x = zacetek_x + velikost_bloka

            # Izberi del histograma za trenutni blok
            blokovni_histogram = histogram[zacetek_y:konec_y, zacetek_x:konec_x, :]
            hog_descriptor[y, x, :, :, :] = blokovni_histogram / np.sqrt(np.sum(blokovni_histogram ** 2) + 1e-6)

    # Vrni HOG deskriptor v ravni obliki
    return hog_descriptor.flatten()