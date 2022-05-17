# bank-slip-service

# Description
{{ Proof of Concept }} This service is responsible by persisting Bank Slips (we call that "Boleto" in portuguese) and find the respective slip. 
During the persisting and finding phases the slip is validated acording the rules of the two known types: Title and Agreement. You cannot persist the data if it's not valid.

# Requirements

1. Node.js (v14.19.1)
2. AWS CLI V2

# How to develop

1. Run: `npm install`
2. Deploy the lambda resources: `npm run deploy` this will ensure that AWS resources were created.
3. Run: `npm run dev`. This will run serverless offline in your environment connected to resources in cloud.

# Resources:

- Postman Collection at **./docs/bank-slip.postman_collection.json**