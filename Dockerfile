FROM keymetrics/pm2:latest-alpine

# Bundle APP files
COPY backend backend/
COPY package.json .
COPY pm2.json .
COPY .env .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production

# Expose the listening port of your app
EXPOSE 8000

# # Show current folder structure in logs
# RUN ls -al -R

CMD [ "pm2-runtime", "start", "pm2.json" ]