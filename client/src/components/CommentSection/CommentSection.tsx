import React, { useState } from 'react';
import './CommentSection.scss';
import { CommentType, CreateCommentType, PostType } from '../../interfaces/Interfaces';
import DOMPurify from 'dompurify';
import Comment from '../Comment/Comment';
import { useAuth0 } from '@auth0/auth0-react';
import _ from 'lodash';

interface Incoming {
  clickedPost: number;
  comments: CommentType[];
  spaceOwnerId?: number;
  postId: number;
  posts: PostType[];
  setPosts: Function;
}

function CommentSection(props: Incoming) {
  const [newComment, setNewComment] = useState('');
  const comments = props.comments;

  const { user } = useAuth0();
  const URL = process.env.REACT_APP_API + '/comments';
  const URL_SUB = process.env.REACT_APP_API + '/usersBySub';

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    setNewComment(event.currentTarget.value);
  };

  const fetchUser = async () => {
    if (user) {
      const fetchedUser = await fetch(URL_SUB + `/${user.sub}`);
      const data = await fetchedUser.json();
      return data.id;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const saveComment = DOMPurify.sanitize(newComment);
    setNewComment(''); // reset input

    // prevent users from submitting whitespace and empty forms
    if (!saveComment.length || saveComment.trim() === '') return; // prevent empty submits

    if (props.postId) {
      const commentData = {
        content: saveComment,
        userId: await fetchUser(),
        postId: props.postId,
      };

      createComment(commentData);
    }
  };
  // post comment to DB
  const createComment = async (data: CreateCommentType) => {
    const res = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const comment = await res.json();

    // deep clone all posts
    const clonedPosts = _.cloneDeep(props.posts);
    // find post to add the new comment to
    const postToAddCommentTo = clonedPosts.find((post) => post.id === data.postId);

    // push comment to right post
    postToAddCommentTo?.comments.push(comment);
    // overwrite posts state with the cloned posts incl. the new comment
    props.setPosts(clonedPosts);
  };

  return (
    <div className="comments">
      <div className="comments-wrapper">
        {comments &&
          comments.map((comment) => <Comment key={comment.id} comment={comment} spaceOwnerId={props.spaceOwnerId} />)}
      </div>
      <div className="comments-form">
        <form onSubmit={handleSubmit}>
          <input type="text" value={newComment} onChange={handleInput} name="comment" />
          <button type="submit"></button>
        </form>
      </div>
    </div>
  );
}

export default CommentSection;
