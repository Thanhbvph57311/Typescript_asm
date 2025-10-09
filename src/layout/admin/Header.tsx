const Header = () => {
  return (
    <>
      <div className="shadow-sm w-320 overflow-x h-20 flex justify-between">
        <div className="font-bold mt-5 ml-20">Chào mừng quản trị viên!</div>
        <div className="mr-20 mt-5">
          <form className="flex gap-2">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="shadow-inner bg-gray-100 p-1 rounded-lg focus:outline-none"
            />
            <button className="bg-blue-400 rounded pl-1 pr-1 cursor-pointer">
              Tìm kiếm
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Header;
