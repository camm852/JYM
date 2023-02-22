
# JYM

Fashion e-commerce which has a payment gateway in payu test mode. All the data can be found in the bd.json file.

### Clarifications:

- It does not have a record.


- The login is simulated, you must enter one of the two emails found in the bd.json.


- It does not have the crud of the products because a backend is needed that saves the image in a bucket.




## Installation

Install and run json-server 

```bash
  npm install -g json-server
  json-server -p 5000 --watch bd.json
```

Install dependencies of the project and run it.

```bash
  npm ci
  json-server -p 5000 --watch bd.json
  npm run
```

![inicio](https://res.cloudinary.com/daboamwpv/image/upload/v1677097697/Captura_de_pantalla_2023-02-22_111307_afkave.jpg)


![inicio](https://res.cloudinary.com/daboamwpv/image/upload/v1677097682/Captura_de_pantalla_2023-02-22_151928_mkt4mr.jpg)

![login](https://res.cloudinary.com/daboamwpv/image/upload/v1677097689/Captura_de_pantalla_2023-02-22_111348_ul9hmd.jpg)


![admin](https://res.cloudinary.com/daboamwpv/image/upload/v1677097802/Captura_de_pantalla_2023-02-22_152847_wnxzl3.jpg)

![add](https://res.cloudinary.com/daboamwpv/image/upload/v1677097802/Captura_de_pantalla_2023-02-22_152900_tfbubq.jpg)

![edit](https://res.cloudinary.com/daboamwpv/image/upload/v1677097802/Captura_de_pantalla_2023-02-22_152920_pzh4wp.jpg)

![payment response](https://res.cloudinary.com/daboamwpv/image/upload/v1677097682/Captura_de_pantalla_2023-02-22_151625_oren7y.jpg)

![product](https://res.cloudinary.com/daboamwpv/image/upload/v1677097682/Captura_de_pantalla_2023-02-22_151649_bqp7lu.jpg)

![dashboard](https://res.cloudinary.com/daboamwpv/image/upload/v1677097802/Captura_de_pantalla_2023-02-22_152937_muzksi.jpg)


![cart](https://res.cloudinary.com/daboamwpv/image/upload/v1677098026/Captura_de_pantalla_2023-02-22_153313_mdkmtu.jpg)

![checkout](https://res.cloudinary.com/daboamwpv/image/upload/v1677098026/Captura_de_pantalla_2023-02-22_153324_ht3rw1.jpg)

## Enviroments

#### VITE_API_URL: URL API

## Parameteres payu

The parameters are by default for test mode.


#### VITE_TRACKING_ID: 'UA-253670120-1' 
#### VITE_PAYMENT_URL: "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/"
#### VITE_DOMAIN = "http://localhost:3000"

#### VITE_MERCHANT_ID: "508029"
#### VITE_ACCOUNT_ID: "512321"
#### VITE_API_KEY: "4Vj8eK4rloUd272L48hsrarnUA"
#### VITE_MODE: "1"

