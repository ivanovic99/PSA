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

   try {
      const client = await Client.create({
         CUIL: CUIL,
         name: name,
         email: email,
         phone: phone,
         country: country,
         city: city,
         address: address,
      });
      const savedClient = await client.save();
      res.json(savedClient);
   } catch (err) {
      console.log(err);
      res.json({ message: "Error", err });
   }
}

async function getClientById(req, res) {
   try {
      const { id } = req.params;
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
         console.log("Invalid ID for client");
         return res.json({ message: "Client not found" });
     }
      const client = await Client.findById(id);
      if (!client) {
         return res.json({ message: "Client not found" });
      }
      res.json(client);
   } catch (err) {
      res.json({ message: err });
   }
}

async function updateClientById(req, res) {
   try {
      const { CUIL, name, email, phone, country, city, address } = req.body;
      const { id } = req.params;
      const updatedClient = await Client.findByIdAndUpdate(
         id,
         {
            CUIL: CUIL,
            name: name,
            email: email,
            phone: phone,
            country: country,
            city: city,
            address: address,
         },
         { new: true }
      );
      if (!updatedClient) {
         return res.json({ message: "Client not found" });
      }
      res.json(updatedClient);
   } catch (err) {
      res.json({ message: err });
   }
}

async function deleteClientById(req, res) {
   try {
      const removedClient = await Client.findByIdAndRemove(req.params.id);
      if (!removedClient) {
         return res.json({ message: "Client not found" });
      }
      res.json(removedClient);
   } catch (err) {
      res.json({ message: err });
   }
}


async function getProductsOfClientById(req, res) {
   try {
      const client = await Client.findById(req.params.id).populate('productVersions');
      res.json(client.products);
   } catch (err) {
      res.json({ message: err });
   }
}

async function addProductToClientById(req, res) {
   try {
      const client = await Client.findById(req.params.id);
      const version = await Version.findById(req.params.versionId);
      const updatedClient = await client.addProductVersion(version);
      res.json(updatedClient);
   } catch (err) {
      res.json({ message: err });
   }
}

async function getProductOfClientById(req, res) {
   try {
      const version = await Version.findById(req.params.versionId);
      res.json(version);
   } catch (err) {
      res.json({ message: err });
   }
}

async function editProductOfClientById(req, res) {
   try {
      const client = await Client.findById(req.params.id);
      const oldVersion = await Version.findById(req.params.versionId);
      const { newVersionId } = req.body;
      const newVersion = await Version.findById(newVersionId);
      const updatedClient = await client.editProductVersion(oldVersion, newVersion);
      res.json(updatedClient);
   } catch (err) {
      res.json({ message: err });
   }
}

async function deleteProductOfClientById(req, res) {
   try {
      const client = await Client.findById(req.params.id);
      const version = await Version.findById(req.params.versionId);
      const updatedClient = await client.removeProductVersion(version);
      res.json(updatedClient);
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
   getProductsOfClientById,
   addProductToClientById,
   getProductOfClientById,
   editProductOfClientById,
   deleteProductOfClientById,
}
