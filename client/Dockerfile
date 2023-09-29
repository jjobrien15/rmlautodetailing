
#Choosing node image
FROM node:alpine
#Choose Working directory
WORKDIR /client
#Copy package.json
COPY package.json .
#Install all our packages
RUN npm install
#Copy reamining files
COPY . .
CMD ["npm", "run" , "dev"]
EXPOSE 3000