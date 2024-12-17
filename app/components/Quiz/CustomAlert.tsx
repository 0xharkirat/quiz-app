interface CustomAlertProps {
    onClose: () => void;
  }
  
  export default function CustomAlert({ onClose }: CustomAlertProps) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
          <h2 className="text-orange-600 text-xl font-bold mb-4">Warning</h2>
          <p className="text-gray-700 mb-4">
            We recommend to review the course material before continuing.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary text-white rounded-full hover:bg-inversePrimary hover:text-primary transition duration-200"
          >
            OK
          </button>
        </div>
      </div>
    );
  }
  