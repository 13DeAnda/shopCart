# shopCart


Simple node/React aplication to display products, add to a shopcart and apply discounts.


Install:
  'npm install'

Run:
  'npm start'

Test
  'npm test'


Docker (install and run):

  1: 'docker build -t shopcart .'

  2: 'docker run -it \
        -v ${PWD}:/usr/src/app \
        -v /usr/src/app/node_modules \
        -p 3000:3000 \
        --rm \
        shopcart'



Available:  http://localhost:3000/
