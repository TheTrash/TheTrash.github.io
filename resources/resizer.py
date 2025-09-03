import os
from PIL import Image

# 📂 cartella con le immagini
input_folder = "images"

# 📏 dimensione target
TARGET_SIZE = (1280, 720)

def resize_and_crop(img, size):
    """Ridimensiona e ritaglia l'immagine mantenendo il rapporto d'aspetto."""
    img_ratio = img.width / img.height
    target_ratio = size[0] / size[1]

    if img_ratio > target_ratio:
        # Troppo larga → ridimensiona in base all’altezza
        new_height = size[1]
        new_width = int(new_height * img_ratio)
    else:
        # Troppo alta → ridimensiona in base alla larghezza
        new_width = size[0]
        new_height = int(new_width / img_ratio)

    img = img.resize((new_width, new_height), Image.LANCZOS)

    # Ritaglio centrale
    left = (new_width - size[0]) // 2
    top = (new_height - size[1]) // 2
    right = left + size[0]
    bottom = top + size[1]

    return img.crop((left, top, right, bottom))


def process_images(folder):
    for filename in os.listdir(folder):
        if filename.lower().endswith((".png", ".jpg", ".jpeg", ".webp")):
            if "profile_pic" in filename:
                print(f"🔹 Ignorata {filename} (profile_pic)")
                continue

            filepath = os.path.join(folder, filename)
            with Image.open(filepath) as img:
                if img.size == TARGET_SIZE:
                    print(f"✅ {filename} già 1280x720")
                    continue

                print(f"🔄 Conversione {filename} ({img.size} → {TARGET_SIZE})")
                new_img = resize_and_crop(img, TARGET_SIZE)

                # Sovrascrive l'immagine
                new_img.save(filepath)
                print(f"💾 Salvata {filename} come {TARGET_SIZE}")

process_images(input_folder)
