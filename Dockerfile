FROM node:6.2.2

ENV CLOUD_SDK_REPO="cloud-sdk-jessie"
RUN curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
RUN echo "deb http://packages.cloud.google.com/apt $CLOUD_SDK_REPO main" >> /etc/apt/sources.list
RUN apt-get update && apt-get install google-cloud-sdk

RUN useradd -u 501 -g 20 node
RUN mkdir /home/node
RUN chown node /home/node

WORKDIR /code
RUN chown node /code

USER node

RUN npm set progress=false
ADD package.json /code
RUN npm install

ADD index.js /code

ADD docker /docker
RUN /docker/init.sh

EXPOSE 3000

CMD npm run start
