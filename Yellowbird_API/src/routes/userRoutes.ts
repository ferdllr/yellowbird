import express, { Request, Response } from 'express';
import UserController from '../controllers/userController';

const router = express.Router();
const controller = new UserController();

router.post('/create', async (req: Request, res: Response) => {
  const response = await controller.create(req.body);
  return res.status(response === 'OK' ? 200 : 400).send(response);
});

router.get('/getAll', async (req: Request, res: Response) => {
  const response = await controller.all();
  return res.status(response.error ? 400 : 200).send(response);
});

router.patch('/update', async (req: Request, res: Response) => {
  const response = await controller.update(req.body);
  return res.status(response.error ? 400 : 200).send(response);
});

router.delete('/delete/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const response = await controller.delete(id);
  return res.status(response.error ? 400 : 200).send(response);
});

router.get('/getByEmail', async (req: Request, res: Response) => {
  const email = req.query.email as string;
  const response = await controller.getByEmail(email);
  return res.status(response.error ? 400 : 200).send(response);
});

router.get('/getById', async (req: Request, res: Response) => {
  const response = await controller.getById(req.query.id as string);
  return res.status(response.error ? 400 : 200).send(response);
});

router.post('/login', async (req: Request, res: Response) => {
  const response = await controller.login(req.body);
  return res.status(response.error ? 400 : 200).send(response);
});

export default router;