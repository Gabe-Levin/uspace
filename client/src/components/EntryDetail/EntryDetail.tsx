import './EntryDetail.scss';
import CommentSection from '../CommentSection/CommentSection';
import { PostType, SpaceDataType } from '../../interfaces/Interfaces';
import DOMPurify from 'dompurify';
import { Menu } from '@mantine/core';
import { Trash, Edit } from 'tabler-icons-react';
import API_SERVICE from '../../Api-Service';
import _ from 'lodash';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface Incoming {
  clickedPost: number;
  spaceData: SpaceDataType;
  spaceOwnerId?: number;
  posts: PostType[];
  setPosts: Function;
}

function EntryDetail(props: Incoming) {
  const post = props.posts[props.clickedPost];
  const username = props.spaceData?.userSpaceRoles[0]?.user?.username;
  const pictureUrl = props.spaceData?.userSpaceRoles[0]?.user?.pictureUrl;
  const comments = props.posts[props.clickedPost]?.comments;
  const { user, isLoading } = useAuth0();
  const [isOwner, setIsOwner] = useState<boolean>(false);

  // check if current user is owner of current space
  const getUser = async () => {
    if (user) {
      // get user by sub
      const foundUser = await API_SERVICE.findUserBySub(user.sub!);
      // check if user is owner
      if (props.spaceOwnerId === foundUser.id) setIsOwner(true);
    }
  };

  if (!isLoading) getUser();

  let date = '';
  if (post) {
    date = new Date(post.createdAt).toLocaleTimeString('en-EN', {
      hour: '2-digit',
      minute: '2-digit',
      year: 'numeric',
      day: '2-digit',
      month: 'short',
    });
  }

  // return empty if no posts exist
  if (!post) {
    return <></>;
  }

  const deletePost = async () => {
    // delete post from db
    await API_SERVICE.deletePostById(post.id);
    // deep clone posts of space
    const clonedPosts = _.cloneDeep(props.posts);
    // find index of deleted post in state
    const indexOfDeletedPost = clonedPosts.findIndex((arrPost) => arrPost.id === post.id);
    // delete post from state
    clonedPosts.splice(indexOfDeletedPost, 1);
    // set posts without deleted one to state
    props.setPosts(clonedPosts);
  };

  const editPost = () => {
    console.log('post edited', post);
  };

  return (
    <div className="entry-detail">
      <div className="entry-detail-top">
        <div className="entry-detail-creator">
          <img className="entry-detail-creator-avatar" src={pictureUrl} alt="Avatar User" />
          <div className="entry-detail-creator-info">
            <div className="name">{username}</div>
            <div className="time">{date}</div>
          </div>
        </div>
        {isOwner && (
          <Menu placement="end">
            <Menu.Label>Settings</Menu.Label>
            <Menu.Item icon={<Edit size={14} />} onClick={editPost}>
              Edit this Post
            </Menu.Item>
            <Menu.Item color="red" icon={<Trash size={14} />} onClick={deletePost}>
              Delete this Post
            </Menu.Item>
          </Menu>
        )}
      </div>
      <div className="entry-detail-content">
        <div
          className="entry-detail-title"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post && post.title),
          }}
        ></div>
        <div className="entry-detail-text">
          {post && (
            // insert rich text content
            // TODO: Check how to insert rich text safely without sanitizing here
            <div
              dangerouslySetInnerHTML={{
                __html: post.content,
              }}
            ></div>
          )}
        </div>
      </div>
      {post &&
        post.tags.length > 1 && ( // if tags are empty, hide this
          <div className="entry-detail-tags">
            <div className="entry-detail-tags-title">Tags</div>
            <div className="entry-detail-tags-wrapper">
              {post &&
                // slice off last whitespace and split tags into array
                post.tags
                  .slice(0, -1)
                  .split(',')
                  .map((tag) => {
                    return (
                      <div key={tag} className="tag done">
                        {tag}
                      </div>
                    );
                  })}
            </div>
          </div>
        )}
      <div className="entry-detail-comments">
        <div className="entry-detail-comments-title">Comments</div>
        <div className="entry-detail-comments-wrapper">
          <CommentSection
            comments={comments}
            postId={post.id}
            posts={props.posts}
            setPosts={props.setPosts}
            clickedPost={props.clickedPost}
            spaceOwnerId={props.spaceOwnerId}
          />
        </div>
      </div>
    </div>
  );
}

export default EntryDetail;
