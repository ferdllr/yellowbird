import { Body, Get, Patch, Delete, Post, Route, Query, Response, Example } from 'tsoa';
import { LikeModel } from '../models/Like';
import { JsonObject } from 'swagger-ui-express';

class LikeRequestBody {
  public author!: string;
  public user!: string;
}

class LikeUpdateBody {
  public id!: string;
  public author?: string;
  public user?: string;
}

@Route('api/Like')
export default class LikeController {
  @Post('/create')
  public async create(@Body() body: LikeRequestBody): Promise<string> {
    const Post = new LikeModel(body);

    try {
      await Post.save();
      return 'OK';
    } catch (error) {
      return JSON.stringify(error);
    }
  }

  @Get('/getAll')
  public async getAll(): Promise<JsonObject> {
    try {
      const Posts = await LikeModel.find();
      return Posts;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }

  @Patch('/update')
  public async update(@Body() body: LikeUpdateBody): Promise<JsonObject> {
    try {
      const updatedLike = await LikeModel.findByIdAndUpdate(body.id, body, { new: true });
      return { result: updatedLike };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }

  @Delete('/delete/:id')
  public async delete(@Query() id: string): Promise<JsonObject> {
    try {
      const Post = await LikeModel.findByIdAndDelete(id);
      return { data: Post };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }

  @Get('/getById')
  public async getById(@Query() id: string): Promise<JsonObject> {
    try {
      const Post = await LikeModel.findById(id);
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