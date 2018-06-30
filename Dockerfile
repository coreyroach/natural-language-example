FROM java:7-jdk

RUN apt-get update && apt-get install -y curl sudo build-essential

# Install Node
RUN curl -sL https://deb.nodesource.com/setup_9.x | bash -
RUN apt-get install -y nodejs

WORKDIR /project

COPY package.json ./
COPY package-lock.json ./

RUN npm install

EXPOSE 8080