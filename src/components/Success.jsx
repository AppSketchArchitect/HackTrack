export default function Success({ message }) { //Show an success message if message is not null
    return (
      <>
        {message && (
          <p className="text-green-500 mt-2 font-medium">{message}</p>
        )}
      </>
    );
  }
  