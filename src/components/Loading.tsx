const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen loading">
      <div className="flex space-x-2 animate-pulse">
        <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
        <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
        <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
      </div>
    </div>
  );
};

export default Loading;
