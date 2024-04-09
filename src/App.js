import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);

  const [showPosts, setShowPosts] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showAlbums, setShowAlbums] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [error, setError] = useState(null);

  const [postLimit, setPostLimit] = useState(10);
  const [minCharCount, setMinCharCount] = useState(0);
  const [maxCharCount, setMaxCharCount] = useState(1000);

  useEffect(() => {
    fetchPosts();
    fetchComments();
    fetchAlbums();
    fetchPhotos();
  }, [postLimit, minCharCount, maxCharCount]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${postLimit}`);
      const newData = await response.json();
      setPosts(newData.filter(post => post.body.length >= minCharCount && post.body.length <= maxCharCount));
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments?_limit=${postLimit}`);
      const newData = await response.json();
      setComments(newData);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchAlbums = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/albums?_limit=${postLimit}`);
      const newData = await response.json();
      setAlbums(newData);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchPhotos = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=${postLimit}`);
      const newData = await response.json();
      setPhotos(newData);
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePostLimitChange = (e) => {
    setPostLimit(e.target.value);
  };

  const handleMinCharCountChange = (e) => {
    setMinCharCount(e.target.value);
  };

  const handleMaxCharCountChange = (e) => {
    setMaxCharCount(e.target.value);
  };

  return (
      <div className="App">
        <header className="App-header">
          <div className="header-description">
            <h1>Welcome to jsonplaceholder project</h1>
            <p>This project utilizes the jsonplaceholder API to display:</p>
            <ul>
              <li>posts</li>
              <li>comments</li>
              <li>albums</li>
              <li>photos</li>
            </ul>
          </div>
          <div className="header-controls">
            <div className="control-group">
              <label htmlFor="postLimit">Post Limit:</label>
              <input
                  type="number"
                  id="postLimit"
                  value={postLimit}
                  onChange={handlePostLimitChange}
              />
            </div>
            <div className="control-group">
              <label htmlFor="minCharCount">Min Char Count:</label>
              <input
                  type="number"
                  id="minCharCount"
                  value={minCharCount}
                  onChange={handleMinCharCountChange}
              />
            </div>
            <div className="control-group">
              <label htmlFor="maxCharCount">Max Char Count:</label>
              <input
                  type="number"
                  id="maxCharCount"
                  value={maxCharCount}
                  onChange={handleMaxCharCountChange}
              />
            </div>
          </div>
          <div className="buttons-container">
            <button onClick={() => setShowPosts(!showPosts)}>Display posts</button>
            <button onClick={() => setShowComments(!showComments)}>Display comments</button>
            <button onClick={() => setShowAlbums(!showAlbums)}>Display albums</button>
            <button onClick={() => setShowPhotos(!showPhotos)}>Display photos</button>
          </div>
        </header>


        <div className="content-area">
          {error && <p>Error: {error}</p>}
          {showPosts && posts.length > 0 && (
              <div className="table-area">
                <p>Posts:</p>
                <table className="post-table">
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Body</th>
                  </tr>
                  </thead>
                  <tbody>
                  {posts.map((post, index) => (
                      <tr key={index}>
                        <td>{post.id}</td>
                        <td>{post.title}</td>
                        <td>{post.body}</td>
                      </tr>
                  ))}
                  </tbody>
                </table>
              </div>
          )}
          {showComments && comments.length > 0 && (
              <div className="table-area">
                <p>Comments:</p>
                <table className="comment-table">
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>Post ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Body</th>
                  </tr>
                  </thead>
                  <tbody>
                  {comments.map((comment, index) => (
                      <tr key={index}>
                        <td>{comment.id}</td>
                        <td>{comment.postId}</td>
                        <td>{comment.name}</td>
                        <td>{comment.email}</td>
                        <td>{comment.body}</td>
                      </tr>
                  ))}
                  </tbody>
                </table>
              </div>
          )}
          {showAlbums && albums.length > 0 && (
              <div className="table-area">
                <p>Albums:</p>
                <table className="album-table">
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>User ID</th>
                    <th>Title</th>
                  </tr>
                  </thead>
                  <tbody>
                  {albums.map((album, index) => (
                      <tr key={index}>
                        <td>{album.id}</td>
                        <td>{album.userId}</td>
                        <td>{album.title}</td>
                      </tr>
                  ))}
                  </tbody>
                </table>
              </div>
          )}
          {showPhotos && photos.length > 0 && (
              <div className="table-area">
                <p>Photos:</p>
                <table className="photo-table">
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>Album ID</th>
                    <th>Title</th>
                    <th>Photo</th>
                  </tr>
                  </thead>
                  <tbody>
                  {photos.map((photo, index) => (
                      <tr key={index}>
                        <td>{photo.id}</td>
                        <td>{photo.albumId}</td>
                        <td>{photo.title}</td>
                        <td><img src={photo.thumbnailUrl} alt={`Photo ${photo.id}`}/></td>
                      </tr>
                  ))}
                  </tbody>
                </table>
              </div>
          )}
        </div>
      </div>
  );
}

export default App;
