FROM node:14

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install
RUN npm install -g nodemon
RUN npm rebuild bcrypt --build-from-source
# Bundle app source
COPY . .

EXPOSE 3000

CMD ["nodemon", "app.js"]
