import { React, useState, useEffect } from "react";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useSession } from "next-auth/react";
import Moment from "react-moment";

const Post = ({ id, username, userImg, img, caption }) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setComments(snapshot.docs);
        }
      ),
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(query(collection(db, "posts", id, "likes")), (snapshot) => {
        setLikes(snapshot.docs);
      }),
    [db, id]
  );

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.userId) !== -1
      ),
    [likes]
  );

  const likePost = async () => {
    if (hasLiked)
      await deleteDoc(doc(db, "posts", id, "likes", session?.user?.userId));
    else
      await setDoc(doc(db, "posts", id, "likes", session?.user?.userId), {
        username: session.user.username,
      });
  };

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session?.user?.username,
      userImage: session?.user?.image,
      timestamp: serverTimestamp(),
    });
  };
  return (
    <div>
      {/* post header  */}
      <div className="bg-white my-7 border rounded-sm">
        <div className="flex items-center space-x-2 p-3">
          <img
            className="h-10 w-10 p-[1.5px] border border-red-500 object-cover rounded-full"
            src={userImg}
            alt="user profile"
          />
          <p className="flex-1 font-medium">{username}</p>
          <DotsHorizontalIcon className="h-5 w-5" />
        </div>
        <img
          className="w-full max-h-[700px] object-cover"
          src={img}
          alt="uploaded"
        />

        {/* buttons */}
        <div className="flex justify-between py-5 px-3">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="postIcon text-red-500"
              />
            ) : (
              <HeartIcon onClick={likePost} className="postIcon" />
            )}

            <ChatIcon className="postIcon" />
            <PaperAirplaneIcon className="postIcon rotate-90" />
          </div>
          <div>
            <BookmarkIcon className="postIcon" />
          </div>
        </div>

        {/* likes */}

        {/* caption */}
        <p className="px-3 py-5 truncate">
          {likes.length > 0 && (
            <p className="font-bold mb-1">{likes.length} likes</p>
          )}
          <span className="font-bold mr-1">{username}</span>
          <span> {caption}</span>
        </p>

        {/* comments */}
        {comments.length > 0 && (
          <div className="px-3 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="flex items-center space-x-2 mb-3"
              >
                <img
                  className="h-6 rounded-full p-[1.5px]"
                  src={comment.data().userImage}
                  alt="user"
                />
                <p className="text-sm flex-1">
                  <span className="font-bold mr-2">
                    {comment.data().username}
                  </span>
                  {comment.data().comment}
                </p>
                <Moment fromNow className="pl-2 text-xs">
                  {comment?.data().timestamp?.toDate()}
                </Moment>
              </div>
            ))}
          </div>
        )}
        {/* input box */}
        <form className="flex items-center p-3 space-x-4">
          <EmojiHappyIcon className="h-7" />
          <input
            className="outline-none flex-1"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="Add a comment..."
          />
          <button
            disabled={!comment?.trim()}
            onClick={sendComment}
            className=" disabled:text-gray-400 text-sm text-blue-400 font-semibold cursor-pointer"
            type="submit"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Post;
