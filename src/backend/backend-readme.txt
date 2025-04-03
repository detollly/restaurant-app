This folder is setup to emulate the backend of the website.

The project was developed with a server-based backend that is unlikely to stay up. 

'backend' is set up to preserve the website's functionality locally with minimal changes to the code.


FauxExpress.js:
Created to the emulate the interface of the node package Express.

server.js:
This is a local emulation of the server. SQL.js is used to handle the database.

menu.db:
Not used directly by server.js , but is the database used by the backend.
(the image field values have been modified to reference local image locations) *

base64getter:
Converts menu.db into Base64 for use by SQL.js within server.js 

database.js:
This contains a function returning the predefined Base64 representation of menu.db.
It can be updated to reference the Base64 representation of an updated Menu.js

--

* Images are now stored locally in public/backend/images.

index.html is also modified to load a SQL.js .wasm CDN.