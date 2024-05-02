import React, { useEffect, useState } from "react";
import photo from "../images/ai5.jpg"; // Importation de l'image correctement
import {
  faClover,
  faShare,
  faComment,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const state = useSelector((state) => state.user_login.user.user_id);

  const getPosts = async () => {
      try {
        const user_id = state;
        const response = await axios.post(
          "http://127.0.0.1:8000/users/user_views_posts/",
          { user_id }
        );
        const posts = response.data;
        
        // Pour chaque post, récupérez les likesCount individuellement
        const postsWithLikesCount = await Promise.all(posts.map(async (post) => {
          const likesResponse = await axios.post(
            "http://127.0.0.1:8000/users/get_likes_count/",
            { post_id: post.id }
          );
          const likesCount = likesResponse.data.likes_count;
          // Ajoutez les likesCount au post actuel
          console.log('likesCount ', likesCount)
          post.likesCount = likesCount;
          return post;
        }));
    
        // Mettez à jour l'état des posts avec les likesCount
        setPosts(postsWithLikesCount);
        console.log('posts ::::::;', posts)
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(
          "Une erreur s'est produite lors du chargement des publications."
        );
        setLoading(false);
      }
    };

  useEffect(() => {
    getPosts();
  }, []);

  if (loading) {
    return    <div className="flex items-center justify-center h-20">
                     <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
              </div>
  }
  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className=" w-full mb-5 rounded p-2">
          <div className="flex justify-between mb-2">
            <div className="flex">
              <div>
                <img
                  src={`http://127.0.0.1:8000${post.user.profile_pic}`}
                  className="rounded-full w-8 h-8 mr-1"
                  alt="AI"
                />
              </div>
              <div>
                <div className="text-base	">{post.user.username}</div>
                <div className="text-xs">{post.user.created_at}</div>
              </div>
            </div>
            <div>
              <span> ... </span>{" "}
            </div>
          </div>
          <div className=" h-36 rounded-2xl p-1">
            <img src={`http://127.0.0.1:8000${post.post_pic}`} className=" w-full h-full rounded-2xl " alt="AI" />
          </div>
          <div>
            <button>
              {" "}
              <FontAwesomeIcon className="rounded-full m-1" icon={faThumbsUp} />
            </button>
            <button>
              {" "}
              <FontAwesomeIcon className="rounded-full m-1" icon={faComment} />
            </button>
            <button>
              {" "}
              <FontAwesomeIcon className="rounded-full m-1" icon={faShare} />
            </button>
          </div>
          <div>
            <span className="text-xs">liked by {post.likesCount} personnes</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts;
