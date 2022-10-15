export default function (setError, error) {
  const { name, type, message } = error;
  setError(name, { type, message });
}
