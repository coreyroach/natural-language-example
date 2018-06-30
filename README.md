Natural Language Processing API Example
=======================================

This is a simple API to test the Natural Language Processing/Understanding offerings from Watson and Google.


Getting Started
---------------
 - Create a [Google Natural Language](https://cloud.google.com/natural-language/docs/quickstart) project.
 - Create a [Watson Natural Language Understanding](https://www.ibm.com/watson/services/natural-language-understanding/) Project.
 - Duplicate `src/.env.sample` to `src/.env`.
 - Add the path to the Google application credentials JSON file to the `src/.env` file. 
 - Add the Watson project credentials to the `src/.env` file.
 - Set your preferred port number in the `src/.env` file.


```sh
# Install dependencies
npm install

# Start development live-reload server
npm run dev

# Start production server:
npm start
```
Docker Support
--------------
```sh
# Build your docker
docker build -t nlp/api-service .

# run your docker
docker run -p 8080:8080 nlp/api-service 

```
Sample POST
-----------
```sh
# run with port 8080 with either /api/google or /api/watson
# Replace example.com with your preferred site.
curl -X POST \
  http://localhost:8080/api/google \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{
	"url": "https://example.com"
}'
```

License
-------

MIT
