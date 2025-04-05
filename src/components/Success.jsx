export default function Success({ message }) {
    return (
      <>
        {message && (
          <p className="text-green-500 mt-2 font-medium">{message}</p>
        )}
      </>
    );
  }
  