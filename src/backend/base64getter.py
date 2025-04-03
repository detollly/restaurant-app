import base64

# Read the file as binary
with open("./src/backend/menu.db", "rb") as file:
    binary_data = file.read()

# Encode the binary data to Base64
base64_encoded = base64.b64encode(binary_data).decode("utf-8")

# Setup Base64 database to be read
output = open("./src/backend/database.js", "w")
output.write('export default function getDatabase() { ' + f'return \"{base64_encoded}\"' + ' };')
