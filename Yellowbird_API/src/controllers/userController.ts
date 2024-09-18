import { Body, Get, Patch, Delete, Post, Route, Query } from 'tsoa';
import { UserModel } from '../models/User';
import { JsonObject } from 'swagger-ui-express';
import bcrypt from "bcrypt"
import { sign } from 'jsonwebtoken';

interface UserRequestBody {
  name: string
  email: string;
  password: string;
  posts: string[];
}

interface UserUpdateBody {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  posts?: string[];
}

interface LoginRequestBody {
  email: string;
  password: string;
}

@Route('api/User')
export default class UserController {
  @Post('/create')
  public async create(@Body() body: UserRequestBody): Promise<string> {
    const hashedPass = await bcrypt.hash(body.password, 10);

    const user = new UserModel({
      name: body.name,
      email: body.email,
      password: hashedPass
    });

    try {
      await user.save();
      return 'OK';
    } catch (error) {
      return JSON.stringify(error);
    }
  }

    @Post('/login')
  public async login(@Body() body: LoginRequestBody): Promise<JsonObject> {
    try {
      const user = await UserModel.findOne({ email: body.email });
      if (!user) {
        return { error: 'Email ou senha incorretos' };
      }
      const passwordMatch = await bcrypt.compare(body.password, user.password);
      if (!passwordMatch) {
        return { error: 'Email ou senha incorretos' };
      }
      const secretKey = process.env.SECRET_KEY || ""
      const jwtToken = await sign({
        _id: user.id,
        email: user.email,
        name: user.name,
      }, secretKey)
      return { message: 'Login bem-sucedido', token: jwtToken };
    } catch (error: any) {
      return { error: error.message as string };
    }
  }

  @Get('/getAll')
  public async all(): Promise<JsonObject> {
    try {
      const users = await UserModel.find();
      return users;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }

  @Patch('/update')
  public async update(@Body() body: UserUpdateBody): Promise<JsonObject> {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(body.id, body, { new: true });
      const secretKey = process.env.SECRET_KEY || ""
      const jwtToken = await sign({
        _id: body.id,
        email: body.email,
        name: body.name,
      }, secretKey)
      return { result: updatedUser, token: jwtToken };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }

  @Delete('/delete/:id')
  public async delete(id: string): Promise<JsonObject> {
    try {
      const user = await UserModel.findByIdAndDelete(id);
      return { data: user };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }
  @Get('/getByEmail')
  public async getByEmail(@Query() email: string): Promise<JsonObject> {
    try {
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        return { error: 'User not found' };
      }
      return user;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }

  @Get('/getById')
  public async getById(@Query() id: string): Promise<JsonObject> {
    try {
      const Post = await UserModel.findById(id);
      if (!Post) {
        return { error: 'Post not found' };
      }
      return Post;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }



}