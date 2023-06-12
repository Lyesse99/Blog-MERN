import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get("http://localhost:27017/");
      setPosts(data);
    };
    fetchPosts();
  });

  return (
    <div>
      <Navbar />
      {posts.map((post) => (
        <Card
          key={post._id}
          id={post._id}
          title={post.title}
          author={post.author}
          category={post.category}
        />
      ))}
    </div>
  );
};

export default Home;
