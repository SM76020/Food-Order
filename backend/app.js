import fs from 'node:fs/promises';
import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/meals', async (req, res) => {
  try {
    const meals = await fs.readFile('./data/available-meals.json', 'utf8');
    res.json(JSON.parse(meals));
  } catch (error) {
    console.error('Error fetching the meals data:', error);
    res.status(500).json({ message: 'Failed to fetch meals' });
  }
});

app.get('/orders', async (req, res) => {
  try {
    const orders = await fs.readFile('./data/orders.json', 'utf8');
    res.json(JSON.parse(orders));
  } catch (error) {
    console.error('Error fetching the orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

// Endpoint to fetch pending orders
app.get('/orders/pending', async (req, res) => {
  try {
    const orders = await fs.readFile('./data/orders.json', 'utf8');
    const allOrders = JSON.parse(orders);

    // Assuming pending orders don't have an "approved" status yet
    const pendingOrders = allOrders.filter(order => !('approved' in order));

    res.status(200).json(pendingOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders.' });
  }
});

// Endpoint to update order approval status
app.patch('/orders/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const { approved } = req.body;

    const orders = await fs.readFile('./data/orders.json', 'utf8');
    const allOrders = JSON.parse(orders);

    const orderIndex = allOrders.findIndex(order => order.id === orderId);

    if (orderIndex !== -1) {
      allOrders[orderIndex].approved = approved;
      await fs.writeFile('./data/orders.json', JSON.stringify(allOrders, null, 2));

      res.status(200).json({ message: `Order ${approved ? 'approved' : 'rejected'} successfully.` });
    } else {
      res.status(404).json({ message: 'Order not found.' });
    }
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Failed to update order.' });
  }
});

app.post('/orders', async (req, res) => {
  try {
    console.log('Received order data:', req.body);

    const orderData = req.body;
    if (!orderData || !orderData.items || orderData.items.length === 0) {
      console.error('Missing order items:', orderData);
      return res.status(400).json({ message: 'Missing order items.' });
    }

    const requiredFields = ['email', 'name', 'address', 'pincode'];
    for (let field of requiredFields) {
      if (!orderData.customer[field] || orderData.customer[field].trim() === '') {
        console.error(`Missing field: ${field} in order data`, orderData);
        return res.status(400).json({ message: `Missing data: ${field} is missing.` });
      }
    }

    // Generate a random 5-digit order ID
    const generateOrderId = () => {
      return Math.floor(10000 + Math.random() * 90000).toString(); // Generates a number between 10000 and 99999
    };

    const newOrder = { ...orderData, id: generateOrderId() };
    const orders = await fs.readFile('./data/orders.json', 'utf8');
    const allOrders = JSON.parse(orders);
    allOrders.push(newOrder);
    await fs.writeFile('./data/orders.json', JSON.stringify(allOrders, null, 2));

    res.status(201).json({ message: 'Order created!', id: newOrder.id });
  } catch (error) {
    console.error('Error creating the order:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
});

app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: 'Not found' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
