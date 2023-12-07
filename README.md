This branch contains the login and sign up code for Plypicker Data Panel.

###This below written content is the brief about the code in each and every file


Starting the Backend:-
npm init -y
npm i express mongoose jsonwebtoken express-unless mongoose-unique-validator dotenv
(required modules)
.env file setup 
index.js
Importing all the required modules
 

Creating connection for mongodb
 
Using express.json for accessing the information in json format
  

Using unless function for checking the token (it is valid or not)
 
Check for bypassing the pages which do not need token
 
Initialing the routes and error handling from the middlewares
 
Listening to port and starting the server
 

auth.js (in middlewares folder)
importing jsonwebtoken
  



authenticating token using headers and giving erros if any , also verifying the tokens from the SECRET_KEY included in .env file (who ever has access to the key can generate token)
 
function authenticateToken(req, res, next) { ... }: This is a middleware function in Node.js that takes three parameters: req (the request object), res (the response object), and next (a callback function that passes control to the next middleware in the stack).
1.	const authHeader = req.headers["authorization"];: It retrieves the value of the Authorization header from the incoming HTTP request's headers.
2.	const token = authHeader && authHeader.split(' ')[1];: This line attempts to extract the token from the Authorization header. It checks if authHeader exists (truthy) and then splits it by spaces (' ') into an array of strings.
   
Generating the token by creating a function which contains jwt.sign() function
jwt.sign() contains 3 parts Header, Payload, and Signature.
•	Payload: It takes a payload object (often containing information like user ID, roles, expiration time, etc.) that needs to be encoded into the token.
•	Secret or Private Key: It also takes a secret or private key, which is used to sign the token. This key is essential for verifying the authenticity of the token later.
•	Options (Optional): Additionally, it can take options such as the token's expiration time, algorithm to be used for signing, etc.
 
User_control.js
Requiring the modules bcryptjs and user_services file
creating register and login using salt and hash present in bcryptjs 
 
Creating userProfile because the  authenticateToken function can only bypass login and register present in index.js file 
 
User-route.js
Requiring the userController file and express module .
Created variable router which runs on express (.Router()) function .
Not routing all the three => login, register, user-profile 
  
User_model.js
Importing mongoose module and mongoose-unique-validator(for finding duplicate entries such as email)
Creating model for login page 
•	userSchema.set("toJSON", {...}) is setting up a transformation for the JSON serialization of your user objects.
•	The transform function is applied to the returnedObject before it's sent to the client side.
•	returnedObject._id.toString() converts the _id field from an ObjectId to a string and assigns it to a new field id in the returned object.
•	delete returnedObject._id removes the _id field from the returned object.
•	delete returnedObject.__v removes the __v field, which is used by Mongoose for versioning.
•	delete returnedObject.password removes the password field from the returned object, presumably for security reasons so that sensitive data isn't sent to the client side.
 

