FROM node:alpine
WORKDIR /projects
COPY . .
RUN npm i
EXPOSE 8000
CMD ["npm", "start"]