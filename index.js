import express from 'express';
import dotenv from 'dotenv';

dotenv.config({
  path: './.env',
});

const app = express();
const port = process.env.PORT || 3000;

// without this, Express app does not accept JSON Payload
app.use(express.json({ limit: '16kb' }));

const arrayOfTea = [];
let teaId = 0;

// Create a tea with POST request
app.post('/teas', (req, res) => {
  const { name, price } = req.body;
  const newTea = {
    id: ++teaId, // Increment first (1 to 2) and then assign the value to id
    name: name,
    price: price,
  };
  arrayOfTea.push(newTea);

  res.status(201).send(newTea);
});

// List all the created teas with GET request
app.get('/teas', (req, res) => {
  res.status(200).send(arrayOfTea);
});

// Get a Specific tea using ID with GET request
app.get('/teas/:teaID', (req, res) => {
  const teaID = parseInt(req.params.teaID);
  const specificTea = arrayOfTea.find((teaObj) => teaObj.id === teaID);

  if (!specificTea) {
    return res.status(404).send('Tea with the given ID - not found');
  }
  return res.status(200).send(specificTea);
});

// Delete a Specific tea using ID with DELETE request
app.delete('/teas/:teaID', (req, res) => {
  const teaID = parseInt(req.params.teaID);
  const indexOfTeaObjToBeDeleted = arrayOfTea.findIndex(
    (teaObj) => teaObj.id === teaID,
  );
  arrayOfTea.splice(indexOfTeaObjToBeDeleted, 1);

  res.status(200).send('Tea is deleted');
});

// Edit a Specific tea using ID and Payload using PUT
app.put('/teas/:teaID', (req, res) => {
  const teaID = parseInt(req.params.teaID);
  const tea = arrayOfTea.find((teaObj) => teaObj.id === teaID);

  if (!tea) {
    return res.status(404).send('tea not found !');
  }

  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;

  res.status(200).send(tea);
});

app.listen(port, () => {
  console.log(`server is listening on port localhost:${port}`);
});
