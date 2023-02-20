FROM node:18.14.0-alpine

#Making and specifying directory
WORKDIR /main/app

#Copy all necessary files
COPY . .

#Install all deps
RUN npm install

#Build JS from TS
RUN npm run build

#Start the application
CMD ["npm", "start"]