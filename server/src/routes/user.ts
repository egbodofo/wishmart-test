import User from '../models/user';
import { Router, Request, Response } from 'express';
import auth, { IRequest } from '../middleware/auth';

const router = Router();

// Create user
router.post('/users', async (req: Request, res: Response) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// Login route
router.post(
  '/users/login',
  async (req: Request, res: Response): Promise<void> => {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    if (!user) {
      res.status(400).send();
    }
    res.send({ user, token });
  }
);

// Log out route
router.post(
  '/users/logout',
  auth,
  async (req: IRequest, res: Response): Promise<void> => {
    try {
      if (req.user) {
        req.user.tokens = req.user.tokens.filter((token: string) => {
          return token !== req.token;
        });
        await req.user.save();
      }

      res.send();
    } catch (e) {
      res.status(500).send();
    }
  }
);

export default router;
