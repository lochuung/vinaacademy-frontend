
export function PaymentResultLoading() {
    return (
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 md:p-8 flex justify-center items-center">
        <div className="text-center p-6">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

