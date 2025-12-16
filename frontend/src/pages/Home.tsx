

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          AI Health & Wellness Concierge
        </h1>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg text-gray-600 mb-6">
            Your personal AI-powered health and wellness assistant
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
