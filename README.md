# WASIT

## tech
  - node.js
  - express.js
  - typescript
  - prisma

## typescript
  - folder -> ./src

## to run for development
  - npm run dev

## functionalities:
   1. Only admins can add products & delete products
   2. all authenticated users can get product
   3. users can all products to the cart and get all products

## Programming Paradigms
   - functional programming
   - object oriented programming

## principles
   - SOLID
   - DRY
   - YAGNI

## Design patterns
   - Singleton
   - MVC


## structure of src files 
  ./src/
  - MVC (controllers, _, models)
  - Errors: It has a custome error with additional capabilites (status code, message list)
  - JWT: for dealing with jwt tokens
  - middleware: general middlewares, permissions (to guard the urls)
  - prisma: it has additional prisma 
  - types: for new types are made
  - uploading_files: dealing with uploading images to the server and store it
  - validatores: it has validations of requests are divided depend on controllers
  