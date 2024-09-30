import React, { useState } from 'react';  // Import useState for managing file uploads
import exampleImage from './raks.jpg';   // Import the example image
import exampleVideo from './raks.mp4';  // Import the example video

function Pic() {
  // State to store selected image and video
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  // Handle image file selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);  // Store the selected image file
  };

  // Handle video file selection
  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);  // Store the selected video file
  };

  // Handle form submission for file uploads
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (image) formData.append('image', image);  // Append the image to formData
    if (video) formData.append('video', video);  // Append the video to formData

    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      console.log(result);  // Log the server response (for example purposes)
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <div>
      <h1>ArtWork Showcase</h1>
      <img
        src={exampleImage}  // Example image source
        alt="Example"
        style={{ width: '300px', height: 'auto' }}  // Correctly closed style object
      />

      <div>
        <video width="400" controls>
          <source src={exampleVideo} type="video/mp4" />
        </video>
      </div>

      <h2>Artwork Title<br></br> Silence of Love</h2>
      <p>Size: 80 x 60 cm</p>
      <p>Materials: Oil and flour on canvas</p>
      <p>Year of Creation: 2023</p>

      <h2>Artwork Description</h2>
      <p>
        This work represents personal reflection and connection with nature, specifically
        the forest. Each viewer projects their own psychological landscape, recalling
        childhood memories or recent encounters with nature, and the forest offers
        everyone a neutral space for reflection and self-discovery.
        The art captivates the viewer, fostering a deeper connection with nature
        and inviting personal and collective reflection.
      </p>

      {/* File Upload Form */}
      <h2>Upload Your Own Image or Video</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Upload Image:
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
        </div>
        <div>
          <label>
            Upload Video:
            <input type="file" accept="video/*" onChange={handleVideoChange} />
          </label>
        </div>
        <button type="submit">Upload</button>
      </form>

      {/* Preview of Selected Image and Video */}
      <div>
        {image && (
          <div>
            <h3>Selected Image:</h3>
            <img
              src={URL.createObjectURL(image)}
              alt="Selected"
              style={{ width: '200px', height: 'auto' }}
            />
          </div>
        )}
        {video && (
          <div>
            <h3>Selected Video:</h3>
            <video width="300" controls>
              <source src={URL.createObjectURL(video)} type="video/mp4" />
            </video>
          </div>
        )}
      </div>
    </div>
  );
}

export default Pic;
