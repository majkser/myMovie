export default function Error({ message }) {
  return (
    <div className="text-red-500 text-5xl mx-auto text-center">
      <h2 className="my-4">Error!</h2>
      <p className="my-4">{message}</p>
    </div>
  );
}
