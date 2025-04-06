export default function Error({ message }) { //Show an error if message is not null
    return (
      <>
        {message && (
          <p className="text-red-500 mt-2 font-medium">{message}</p>
        )}
      </>
    );
  }
  