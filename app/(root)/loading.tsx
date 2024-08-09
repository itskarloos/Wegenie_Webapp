
import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
    <div className="relative mb-4">
      <div className="w-12 h-12 border-4 border-transparent border-t-green-500 border-b-green-500 rounded-full animate-spin"></div>
      <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-green-500 border-b-green-500 rounded-full animate-pulse opacity-50"></div>
    </div>
    <p className="text-lg font-semibold text-gray-700 animate-pulse">Loading...</p>
  </div>
  );
};

export default Loading

