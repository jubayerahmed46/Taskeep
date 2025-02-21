function Header({ text, count }) {
  return (
    <div
      className={` flex gap-2 justify-center bg-[#3F51B5]  shadow-md rounded-md p-2 text-white uppercase text-center`}
    >
      {text}{" "}
      <span className="flex justify-center items-center bg-white rounded-full h-5 aspect-square text-sm">
        {count}
      </span>
    </div>
  );
}

export default Header;
