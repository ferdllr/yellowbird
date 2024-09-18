import { Body, Get, Patch, Delete, Post, Route, Query, Response, Example } from 'tsoa';
import { PostModel } from '../models/Post';
import { JsonObject } from 'swagger-ui-express';

class PostRequestBody {
  public text!: string;
  public author!: string;
  public likes!: string[];
}

class PostUpdateBody {
  public id!: string;
  public text?: string;
  public author?: string;
  public likes?: string[];
}

@Route('api/Post')
export default class PostController {
  @Post('/create')
  public async create(@Body() body: PostRequestBody): Promise<string> {
    const Post = new PostModel(body);

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
      const Posts = await PostModel.find();
      return Posts;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }

  @Patch('/update')
  public async update(@Body() body: PostUpdateBody): Promise<JsonObject> {
    try {
      const updatedPost = await PostModel.findByIdAndUpdate(body.id, body, { new: true });
      return { result: updatedPost };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }

  @Delete('/delete/:id')
  public async delete(@Query() id: string): Promise<JsonObject> {
    try {
      const Post = await PostModel.findByIdAndDelete(id);
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
      const Post = await PostModel.findById(id);
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