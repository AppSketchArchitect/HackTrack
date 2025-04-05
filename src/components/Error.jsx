export default function Error({ message }) {
    return (
      <>
        {message && (
          <p className="text-red-500 mt-2 font-medium">{message}</p>
        )}
      </>
    );
  }
  