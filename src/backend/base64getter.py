import base64

# Read the file as binary
with open("./src/backend/menu.db", "rb") as file:
    binary_data = file.read()

# Encode the binary data to Base64
base64_encoded = base64.b64encode(binary_data).decode("utf-8")
print(base64_encoded)