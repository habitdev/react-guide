export default function Input({ label, id, error, ...props }) {
  return (
    <div className='control'>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        {...props}
      />
      {error && <p className='control-error'>{error}</p>}
    </div>
  );
}
