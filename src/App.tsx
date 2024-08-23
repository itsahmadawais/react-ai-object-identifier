import React, { useState, useEffect } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import ImageUpload from './components/ImageUpload';
import CaptionDisplay from './components/CaptionDisplay';
import '@tensorflow/tfjs-backend-webgl';
import * as tf from '@tensorflow/tfjs';
import './index.css';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const [caption, setCaption] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null); // State to store the image URL

  useEffect(() => {
    const loadModel = async () => {
      await tf.setBackend('webgl');  // Set the backend to WebGL
      await tf.ready();              // Ensure the backend is ready
      const loadedModel = await mobilenet.load();
      setModel(loadedModel);
      setIsLoaded(true);             // Mark as loaded
      console.log('Model loaded');   // Log when the model is loaded
    };
    loadModel();
  }, []);

  const handleImageUpload = async (file: File) => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);

    const img = document.createElement('img');
    img.src = url;
    console.log('Image loaded, src:', img.src); // Log the image source

    img.onload = async () => {
      console.log('Image onload event fired'); // Log when image onload event fires

      if (model) {
        console.log('Running classification...'); // Log before running classification

        try {
          const predictions = await model.classify(img);
          const generatedCaption = predictions.map(p => p.className).join(', ');
          setCaption(generatedCaption);
          console.log('Caption generated:', generatedCaption); // Log the generated caption
        } catch (error) {
          console.error('Error during classification:', error); // Log any error during classification
        }
      } else {
        console.log('Model not yet loaded'); // Log if the model is not yet loaded
      }
    };

    img.onerror = () => {
      console.error('Image failed to load'); // Log if the image fails to load
    };
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center text-white">
      {!isLoaded ? (
        <div className="flex flex-col items-center">
          <div className="loader mb-4"></div>
          <p className="text-lg">Configuring model...</p>
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-bold mb-8">AI-Powered Object Identifier</h1>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <ImageUpload onImageUpload={handleImageUpload} />
          </div>

          {imageUrl && (
            <div className="mt-8 flex flex-col items-center w-full max-w-xs">
              <div className="w-full h-64 overflow-hidden rounded-lg shadow-xl mb-4 border-2 border-[#8e44ad]">
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  className="w-full h-full object-cover"
                />
              </div>
              <CaptionDisplay caption={caption} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
