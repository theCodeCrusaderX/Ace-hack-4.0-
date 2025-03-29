import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Problem() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      tipAmount: 0,
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log('11', data);
    

    const API_BASE_URL = 'http://localhost:8000/api/doubt/'; // Replace with your actual API base URL
    
      try {
        const response = await axios.post(`${API_BASE_URL}/problems`, problemData,
        );
        console.log('Problem submitted successfully:', response.data);
        reset(); // Reset the form after successful submission
      
        return response.data;
        navigate(`/doubt/${response.data.doubt._id}`);
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to submit problem');
      }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Post a Problem</h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Back to Dashboard
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Problem Title
            </label>
            <input
              id="title"
              {...register('title', {
                required: 'Title is required',
                minLength: {
                  value: 10,
                  message: 'Title must be at least 10 characters',
                },
                maxLength: {
                  value: 100,
                  message: 'Title must be less than 100 characters',
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Briefly describe your problem"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Detailed Description
            </label>
            <textarea
              id="description"
              {...register('description', {
                required: 'Description is required',
                minLength: {
                  value: 30,
                  message: 'Description must be at least 30 characters',
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Provide as much detail as possible..."
              rows={6}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ... existing category and priority selects ... */}
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Tip Amount (optional)
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  {...register('tipAmount', {
                    min: {
                      value: 0,
                      message: 'Tip amount cannot be negative',
                    },
                    max: {
                      value: 1000,
                      message: 'Maximum tip amount is $1000',
                    },
                  })}
                  className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">USD</span>
                </div>
              </div>
              {errors.tipAmount && (
                <p className="mt-1 text-sm text-red-600">{errors.tipAmount.message}</p>
              )}
            </div>
          </div>



          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => reset()}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Problem'}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Problem Submission Tips</h2>
        <ul className="space-y-2 list-disc pl-5 text-gray-600">
          <li>Be specific about what's not working or what you'd like to see improved</li>
          <li>Include steps to reproduce the issue if reporting a bug</li>
          <li>Add screenshots when possible (you can attach them after submission)</li>
          <li>For feature requests, explain the value it would provide</li>
        </ul>
      </div>
    </div>
  );
}

export default Problem;