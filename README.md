# Social-Media

Social Media is web application which allow users to create posts with text and media and support user engagement with likes and comments.

User can comments, like and bookmark the posts of other users. With robust security, indivisual user can manipulate the media, comments and bookmaks on their own account.

The project is built using a tech stack consisting of Node.js for the server-side scripting.
Express for handling HTTP requests and routing.
MongoDB for storing and managing the data and project follows REST architectural design pattern.

## Prerequisite
- NodeJs installed on your device.
- A basic understanding of NodeJs, Express, and MongoDB.
- Knowledge of how to set up MongoDB and how to get your connection string.
- Postman or Thunderclient installed.
- Knowledge of using the terminal.
- If you are running this project in the local environment then you need to add .env file in tne root directory with following environment variables
  ```
  BASE_URL=http://localhost:3000
  PORT=3000
  MONGO_URI= [Add MongoDB Connection String]

  JWT_SECRET="SOCIAL-MEDIA-REST-API-App@2024"
  JWT_EXPIRE=1d

  COOKIE_EXPIRES_IN=1
  SMPT_MAIL=[Your gmail from Which Nodemailer middleware utilize to send email]
  SMPT_MAIL_PASSWORD=[Respective gmail account password]
  SMPT_SERVICE=gmail
  ```
  Note :
  - Add proper values to MONGO_URI, SMPT_MAIL and SMPT_MAIL_PASSWORD environment variables as stated in square bracket front of them. Follow the        blogs and documentation mentioned in #Resources section.
  - Change value of "host" key to "localhost:3000" in the swagger.json file.

## Installation
To run this application on your local machine, please follow these steps:

Clone this repository using the following command:
```
$ git clone https://github.com/Vivid26/Social-Media.git
```
Install the required dependencies using the following command:
```
$ npm install 
```
Start the application using the following command:
```
$ npm start 
```
now you will see that server is running at http://localhost:3000

## Usage

Go to [Local Swagger Social Media App Documentation](http://localhost:3000/api-docs/) or [Live Swagger Social Media App Documentation](https://social-media-app-h9hb.onrender.com/api-docs/) and you can check all the application APIs listed.
Follow below journey to know insights of application.
- [ ] Sign-Up
- [ ] Sign-In
- [ ] Add Posts
- [ ] Publish/Archieve Posts
- [ ] Update/Delete Posts
- [ ] Comment on Posts
- [ ] Update/Delete Comments
- [ ] Like/Dislike Posts
- [ ] Bookmark posts
- [ ] Fetch posts based on active user session
- [ ] Fetch all posts
- [ ] Fetch comments based on active user session or for specific post.
- [ ] Get Likes Count for a specific post
- [ ] Get all Bookmarks.
- [ ] Explore Friendship Functionality with sending friend request, see all users friend, toggle friendship, accept/reject friendship.
- [ ] Reset password functionality with 4 digit OTP
- [ ] Admin restricted functionalities.
- [ ] Sign-Out.
- [ ] Sign-Out from all devices.

## Deployment
This project is deployed on Render app hosting service. 
Visit [Social Media App](https://social-media-app-h9hb.onrender.com) to see live hosted app.
Visit [Swagger Social Media App Documentation](https://social-media-app-h9hb.onrender.com/api-docs/) to get more insights of APIs and to know functionality of application.


## Testing 
You can test all APIs mentioned in the swagger documentation locally in the Postman with request url "https://localhost:3000/{end-point-of-request}"   OR
As app is hosted on Reder.com so you can use hosted url for testing purpose directlly in the Postman. for example, "https://social-media-app-h9hb.onrender.com/{end-point-of-request}".


## Lessons I learned while working on this: 

- How to model data
- Mongoose Database Schema Design
- Database Query
- User authentication authorization with JWT
- How to upload image using multer and cloudinary
- How to implement reset password using Nodemailer
- How to document a project APIs using Swagger API
- How to craft a presentable README.md
- How deploy NodeJs app on [Render](https://dashboard.render.com/)

## Resources

#### [How to Send an Email from Your Gmail Account with Nodemailer](https://medium.com/@y.mehnati_49486/how-to-send-an-email-from-your-gmail-account-with-nodemailer-837bf09a7628)
#### [MongoDB documentation for How to create free cluster](https://www.mongodb.com/docs/guides/atlas/cluster/)
#### [Swagger Documentation](https://swagger.io/docs/specification/about/)

# Technologies

<div align="center">

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![VSCode](https://img.shields.io/badge/VSCode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white)
![Swagger](https://img.shields.io/badge/swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=white)
![Postman](https://img.shields.io/badge/postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

</div>

  
