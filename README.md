# shopCart


Simple node/React aplication to display products, add to a shopcart and apply discounts.

Docker Run:(install and run):

  1: 'docker build -t shopcart .'

  2: 'docker run -it \
        -v ${PWD}:/usr/src/app \
        -v /usr/src/app/node_modules \
        -p 3000:3000 \
        --rm \
        shopcart'

Node Run: (install and run)
Install:
  'npm install'

Run:
  'npm start'

Test
  'npm test'



Available:  http://localhost:3000/
