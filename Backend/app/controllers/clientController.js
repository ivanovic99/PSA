const Client = require('../models/Client');


async function getAllClients(req, res) {
   try {
      const clients = await Client.find();
      res.json(clients);
   } catch (err) {
      res.json({ message: err });
   }
}

async function addClient(req, res) {

   const { CUIL, name, email, phone, country, city, address } = req.body;

   const client = new Client({
      CUIL: CUIL,
      name: name,
      email: email,
      phone: phone,
      country: country,
      city: city,
      address: address,
   });
   try {
      const savedClient = await client.save();
      res.json(savedClient);
   } catch (err) {
      res.json({ message: err });
   }
}

async function getClientById(req, res) {
   try {
      const client = await Client.findById(req.params.id);
      res.json(client);
   } catch (err) {
      res.json({ message: err });
   }
}

async function updateClientById(req, res) {
   try {
      const updatedClient = await Client.updateClientById(
         req.params.id,
         {
            $set: {
               CUIL: req.body.CUIL,
               name: req.body.name,
               email: req.body.email,
               phone: req.body.phone,
               country: req.body.country,
               city: req.body.city,
               address: req.body.address,
            }
         }
      );
      res.json(updatedClient);
   } catch (err) {
      res.json({ message: err });
   }
}

async function deleteClientById(req, res) {
   try {
      const removedClient = await Client.findByIdAndRemove(req.params.id);
      res.json(removedClient);
   } catch (err) {
      res.json({ message: err });
   }
}



module.exports = {
   getAllClients,
   addClient,
   getClientById,
   updateClientById,
   deleteClientById,
}
