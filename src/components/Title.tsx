const HelloFromReact = () => {
  return (
    <div className="flex items-center justify-center gap-3 p-4 bg-white rounded-lg shadow-md sticky top-0 z-50">
      {/* React Logo as Image */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
        alt="React Logo"
        className="w-10 h-10"
      />

      {/* Title Text */}
      <h1 className="text-3xl font-semibold text-[#61dafb] animate-fade-in">
        Hii, I'm from React
      </h1>
    </div>
  );
};

export default HelloFromReact;
