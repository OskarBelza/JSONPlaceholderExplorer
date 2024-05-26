import React, { useState, useCallback } from 'react';
import './App.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

// Custom hook to fetch data from a given URL and set the state
const useFetchData = (url, setState, options = {}) => {
  const fetchData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url.split('/').pop()}`);
      }
      const newData = await response.json();
      if (options.filter) {
        setState(options.filter(newData));
      } else {
        setState(newData);
      }
    } catch (error) {
      console.error("Error caught: ", error.message);
      NotificationManager.error(error.message, 'Error', 5000);
    }
  };

  return fetchData;
};

const App = () => {
  // State variables to store fetched data
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);

  // State variables to control the current view and filter settings
  const [currentView, setCurrentView] = useState('');
  const [postLimit, setPostLimit] = useState(10);
  const [minCharCount, setMinCharCount] = useState(100);
  const [maxCharCount, setMaxCharCount] = useState(500);

  // URLs for fetching data with applied limits
  const fetchPostsUrl = `https://jsonplaceholder.typicode.com/posts?_limit=${postLimit}`;
  const fetchCommentsUrl = `https://jsonplaceholder.typicode.com/comments?_limit=${postLimit}`;
  const fetchAlbumsUrl = `https://jsonplaceholder.typicode.com/albums?_limit=${postLimit}`;
  const fetchPhotosUrl = `https://jsonplaceholder.typicode.com/photos?_limit=${postLimit}`;

  // Filter function for posts based on character count
  const postFilter = useCallback(
      (data) => data.filter(post => post.body.length >= minCharCount && post.body.length <= maxCharCount),
      [minCharCount, maxCharCount]
  );

  // Fetch functions for each type of data, using the custom hook
  const fetchPosts = useFetchData(fetchPostsUrl, setPosts, { filter: postFilter });
  const fetchComments = useFetchData(fetchCommentsUrl, setComments);
  const fetchAlbums = useFetchData(fetchAlbumsUrl, setAlbums);
  const fetchPhotos = useFetchData(fetchPhotosUrl, setPhotos);

  // Handler for changing the current view and fetching data accordingly
  const handleViewChange = async (view) => {
    setCurrentView(view);
    switch(view) {
      case 'posts':
        await fetchPosts();
        break;
      case 'comments':
        await fetchComments();
        break;
      case 'albums':
        await fetchAlbums();
        break;
      case 'photos':
        await fetchPhotos();
        break;
      default:
        break;
    }
  };

  // Debounce function to limit the rate of function execution
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Handlers for changing the limits and filter settings with debounce
  const handlePostLimitChange = debounce((e) => {
    setPostLimit(parseInt(e.target.value));
  }, 300);

  const handleMinCharCountChange = debounce((e) => {
    setMinCharCount(parseInt(e.target.value));
  }, 300);

  const handleMaxCharCountChange = debounce((e) => {
    setMaxCharCount(parseInt(e.target.value));
  }, 300);

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
                  defaultValue={postLimit}
                  onChange={handlePostLimitChange}
              />
            </div>
            <div className="control-group">
              <label htmlFor="minCharCount">Min Char Count:</label>
              <input
                  type="number"
                  id="minCharCount"
                  defaultValue={minCharCount}
                  onChange={handleMinCharCountChange}
              />
            </div>
            <div className="control-group">
              <label htmlFor="maxCharCount">Max Char Count:</label>
              <input
                  type="number"
                  id="maxCharCount"
                  defaultValue={maxCharCount}
                  onChange={handleMaxCharCountChange}
              />
            </div>
          </div>
          <div className="buttons-container">
            <button onClick={() => handleViewChange('posts')}>Display posts</button>
            <button onClick={() => handleViewChange('comments')}>Display comments</button>
            <button onClick={() => handleViewChange('albums')}>Display albums</button>
            <button onClick={() => handleViewChange('photos')}>Display photos</button>
          </div>
        </header>

        <div className="content-area">
          {currentView === 'posts' && posts.length > 0 && (
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
          {currentView === 'comments' && comments.length > 0 && (
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
          {currentView === 'albums' && albums.length > 0 && (
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
          {currentView === 'photos' && photos.length > 0 && (
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
                        <td>
                          <img src={photo.thumbnailUrl} alt={`${photo.title}`} />
                        </td>
                      </tr>
                  ))}
                  </tbody>
                </table>
              </div>
          )}
        </div>
        <NotificationContainer />
      </div>
  );
};

export default App;
