import Product, { IProduct } from '../models/product';
import { Router, Request, Response } from 'express';
import auth, { IRequest } from '../middleware/auth';

const router = Router();

//Create a product
router.post('/products', auth, async (req: IRequest, res: Response) => {
  const product = new Product({
    ...req.body,
    owner: req.user && req.user._id,
  });

  try {
    await product.save();
    res.status(201).send(product);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Get all the product from db
router.get('/products', (req: IRequest, res: Response) => {
  Product.find({}, function(err, products) {
    if (err) {
      res.status(500).send();
    } else {
      res.status(201).send(products);
    }
  });
});

// Get a product by id
router.get('/products/:id', (req: IRequest, res: Response) => {
  const _id = req.params.id;

  Product.findById(_id)
    .then(product => {
      if (!product) {
        return res.status(404).send();
      }

      res.send(product);
    })
    .catch(e => {
      res.status(500).send();
    });
});

// Update a product by id
router.patch('/products/:id', auth, async (req: IRequest, res: Response) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'price', 'image', 'brand', 'description'];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const product = await Product.findByIdAndUpdate(
      {
        _id: req.params.id,
        owner: req.user && req.user._id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).send();
    }

    res.send(product);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete a product by id
router.delete('/products/:id', auth, async (req: IRequest, res: Response) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      owner: req.user && req.user._id,
    });

    if (!product) {
      res.status(404).send();
    }

    res.send(product);
  } catch (e) {
    res.status(500).send();
  }
});

export default router;
