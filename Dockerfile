FROM 6.2

USER root
ENV CLOUD_SDK_REPO="cloud-sdk-jessie"
RUN curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
RUN echo "deb http://packages.cloud.google.com/apt $CLOUD_SDK_REPO main" >> /etc/apt/sources.list
RUN apt-get update && apt-get install google-cloud-sdk

USER node

WORKDIR /code

RUN npm set progress=false
ADD package.json /code
RUN npm install

ADD index.js /code

ADD docker /docker
RUN /docker/init.sh

EXPOSE 3000

CMD npm run start
