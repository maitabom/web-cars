import InputProps from "./input.props";

function InputField(props: InputProps) {
  return (
    <div className="mb-3">
      <input className="w-full border-2 rounded-md h-11 px-2" {...props.register(props.name, props.rules)} {...props} />
      {props.error && <p className="my-1 text-red-500">{props.error}</p>}
    </div>
  );
}

export default InputField;
