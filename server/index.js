const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const nodemailer = require('nodemailer')
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const app = express()
const port = process.env.PORT || 8000

// middlewares
const corsConfig = {
  origin: '',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}
app.use(cors(corsConfig))
app.options('', cors(corsConfig))
app.use(express.json())

// Decode JWT
function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).send({ message: 'unauthorized access' })
  }
  const token = authHeader.split(' ')[1]

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
    if (err) {
      return res.status(403).send({ message: 'Forbidden access' })
    }
    console.log(decoded)
    req.decoded = decoded
    next()
  })
}

// Send Email
const sendMail = (emailData, email) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  })

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: emailData?.subject,
    html: `<p>${emailData?.message}</p>`,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

// Database Connection
const uri = process.env.DB_URI
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
})

async function run() {
  try {
    const homesCollection = client.db('aircnc-db').collection('homes')
    const usersCollection = client.db('aircnc-db').collection('users')
    const bookingsCollection = client.db('aircnc-db').collection('bookings')

    // Verify Admin
    const verifyAdmin = async (req, res, next) => {
      const decodedEmail = req.decoded.email
      const query = { email: decodedEmail }
      const user = await usersCollection.findOne(query)

      if (user?.role !== 'admin') {
        return res.status(403).send({ message: 'forbidden access' })
      }
      console.log('Admin true')
      next()
    }

    // Save user email & generate JWT
    app.put('/user/:email', async (req, res) => {
      const email = req.params.email
      const user = req.body

      const filter = { email: email }
      const options = { upsert: true }
      const updateDoc = {
        $set: user,
      }
      const result = await usersCollection.updateOne(filter, updateDoc, options)

      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d',
      })
      console.log(result)
      res.send({ result, token })
    })

    // Get All User
    app.get('/users', verifyJWT, verifyAdmin, async (req, res) => {
      const query = {}
      const cursor = usersCollection.find(query)
      const users = await cursor.toArray()
      res.send(users)
    })

    // Get A Single User
    app.get('/user/:email', verifyJWT, async (req, res) => {
      const email = req.params.email
      const decodedEmail = req.decoded.email

      if (email !== decodedEmail) {
        return res.status(403).send({ message: 'forbidden access' })
      }
      const query = { email: email }
      const user = await usersCollection.findOne(query)
      res.send(user)
    })

    // Get All Homes
    app.get('/homes', async (req, res) => {
      const query = {}
      const cursor = homesCollection.find(query)
      const homes = await cursor.toArray()
      res.send(homes)
    })

    // Get All Homes for host
    app.get('/homes/:email', verifyJWT, async (req, res) => {
      const email = req.params.email
      const decodedEmail = req.decoded.email

      if (email !== decodedEmail) {
        return res.status(403).send({ message: 'forbidden access' })
      }
      const query = {
        'host.email': email,
      }
      const cursor = homesCollection.find(query)
      const homes = await cursor.toArray()
      res.send(homes)
    })

    // Get Single Home
    app.get('/home/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const home = await homesCollection.findOne(query)
      res.send(home)
    })

    // Delete a home
    app.delete('/home/:id', verifyJWT, async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const result = await homesCollection.deleteOne(query)
      res.send(result)
    })

    // Update A Home
    app.put('/homes', verifyJWT, async (req, res) => {
      const home = req.body
      console.log(home)

      const filter = {}
      const options = { upsert: true }
      const updateDoc = {
        $set: home,
      }
      const result = await homesCollection.updateOne(filter, updateDoc, options)
      res.send(result)
    })

    // Post A Home
    app.post('/homes', verifyJWT, async (req, res) => {
      const home = req.body
      console.log(home)
      const result = await homesCollection.insertOne(home)
      res.send(result)
    })

    // Get search result
    app.get('/search-result', async (req, res) => {
      const query = {}
      const location = req.query.location
      if (location) query.location = location

      console.log(query)
      const cursor = homesCollection.find(query)
      const homes = await cursor.toArray()
      res.send(homes)
    })

    // Get Bookings
    app.get('/bookings', verifyJWT, async (req, res) => {
      let query = {}
      const email = req.query.email
      if (email) {
        query = {
          guestEmail: email,
        }
      }
      const cursor = bookingsCollection.find(query)
      const bookings = await cursor.toArray()
      res.send(bookings)
    })

    // Get a single booking
    app.get('/booking/:id', verifyJWT, async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const booking = await bookingsCollection.findOne(query)
      res.send(booking)
    })

    // Save bookings
    app.post('/bookings', verifyJWT, async (req, res) => {
      const booking = req.body
      console.log(booking)
      const result = await bookingsCollection.insertOne(booking)

      console.log('result----->', result)
      sendMail(
        {
          subject: 'Booking Successful!',
          message: `Booking Id: ${result?.insertedId}, TransactionId: ${booking.transactionId}`,
        },
        booking?.guestEmail
      )
      res.send(result)
    })

    // Create Payment Intent
    app.post('/create-payment-intent', verifyJWT, async (req, res) => {
      const price = req.body.price
      console.log(price)
      const amount = parseFloat(price) * 100

      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount,
          currency: 'usd',
          payment_method_types: ['card'],
        })
        res.send({ clientSecret: paymentIntent.client_secret })
      } catch (err) {
        console.log(err)
      }
    })

    // Cancel a booking
    app.delete('/booking/:id', verifyJWT, async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const result = await bookingsCollection.deleteOne(query)
      res.send(result)
    })

    console.log('Database Connected...')
  } finally {
  }
}

run().catch(err => console.error(err))

app.get('/', (req, res) => {
  res.send('Server is running... in session')
})

app.listen(port, () => {
  console.log(`Server is running...on ${port}`)
})
