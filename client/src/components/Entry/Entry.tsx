import './Entry.scss';
import { PostType } from '../../interfaces/Interfaces';
import DOMPurify from 'dompurify';

interface Incoming {
  post: PostType;
  setClickedPost: Function;
  index: number;
  activePostId: number;
  setActivePostId: Function;
}

function Entry(props: Incoming) {
  const { post } = props;

  const changeDetails = () => {
    props.setClickedPost(props.index);
    props.setActivePostId(props.index);
  };

  // format date to show MONTH DAY
  const date = new Date(post.createdAt).toLocaleDateString('en-EN', {
    month: 'short',
    day: 'numeric',
  });

  // remove html tags and only allow certain character amount
  const content = post.content.replace(/(<([^>]+)>)/gi, '').slice(0, 90) + '...';

  // cut title if too long
  const shapeTitle = (title: string) => {
    if (title.length > 35) return title.slice(0, 35) + '...';
    return title;
  };

  return (
    <div className={props.activePostId === props.index ? 'entry active' : 'entry'} onClick={changeDetails}>
      <div className="entry-left">
        <div className="entry-left-date">{date}</div>
      </div>
      <div className="entry-right">
        <div
          className="entry-right-title"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(shapeTitle(post.title)),
          }}
        ></div>
        <div className="entry-right-text">{content}</div>
        {post.comments && post.comments.length > 0 && (
          <div className="entry-right-tags">
            <div className="comment-tag">{post.comments.length} comments</div>
            {/* <div className="attachment-tag">1 attachment</div> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Entry;
