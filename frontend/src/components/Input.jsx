function Input({
  label = "label",
  name = "name",
  placeholder = "placeholder",
  type = "text",
  className = "",
  onChange,
  children,
  value = "",
}) {
  const classNames =
    className +
    " " +
    "md:min-w-[400px] w-full focus:ring-1 focus:ring-[#0d0d0e97] outline-none border-littleBlack/30 rounded-md p-2  bg-transparent placeholder::text-gray-500 border";

  return (
    <label htmlFor={name} className="block">
      <p className="mb-1 text-base text-littleBlack/90">{label}</p>
      {onChange ? (
        <input
          type={type}
          name={name}
          className={classNames}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          required
        />
      ) : (
        <input
          type={type}
          name={name}
          className={classNames}
          placeholder={placeholder}
          required
        />
      )}
      {children && <p className="my-2 text-secondary text-xs">{children}</p>}
    </label>
  );
}

export default Input;
