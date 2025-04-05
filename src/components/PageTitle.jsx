import Error from "./Error";

export default function PageTitle({ title, error }) {
  return (
    <div className="max-w-4xl mx-auto mt-10 mb-6 px-6 py-6 rounded-lg bg-[#2a2a2a] shadow-md">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <Error message={error} />
    </div>
  );
}
