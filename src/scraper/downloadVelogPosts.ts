import { downloadJsonFile } from '../utils/download';
import { Post } from '../types';

export const downloadVelogPosts = async (posts: Post[]) => {
  posts.forEach(async (post) => {
    await downloadJsonFile(`${post.createdAt}_${post.title}`, post);
  });
};
