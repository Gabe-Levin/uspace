import React, { useCallback, useEffect, useState } from 'react';
import './Comment.scss';
import { CommentType, UserType } from '../../interfaces/Interfaces';
import DOMPurify from 'dompurify';

interface Incoming {
  comment: CommentType;
  spaceOwnerId?: number;
}

function Comment(props: Incoming) {
  const { comment } = props;
  const [user, setUser] = useState<UserType>();
  const spaceOwnerId = props.spaceOwnerId || 0;
  const URL = `${process.env.REACT_APP_API}/users/${comment.userId}`;

  const date = new Date(comment.createdAt).toLocaleTimeString('en-EN', {
    // weekday: 'short',
    year: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  // get comment creator / user
  const fetchUser = useCallback(async () => {
    const fetchedUser = await fetch(URL);
    const data = await fetchedUser.json();
    setUser(data);
  }, [URL]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className={spaceOwnerId === comment.userId ? 'comment right' : 'comment'}>
      <div className="comment-avatar">
        <img src={user && user.pictureUrl} alt="User Avatar" />
        <div className="comment-online">&nbsp;</div>
      </div>
      <div className="comment-wrapper">
        <div className="comment-wrapper-top">
          <div className="comment-user">{user && user.username}</div>
          <div className="comment-time">{date}</div>
        </div>
        <div
          className="comment-message"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(comment.content),
          }}
        ></div>
      </div>
    </div>
  );
}

export default Comment;
