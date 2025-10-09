const DashboardManager = () => {
  return (
    <>
      <div className="mt-10 flex items-center gap-5 justify-around">
        <div className="shadow-sm w-65 h-35 rounded-lg text-center">
          <span className="text-gray-500">Tổng doanh thu</span>
        </div>
        <div className="shadow-sm w-65 h-35 rounded-lg text-center">
          <span className="text-gray-500">Người dùng mới</span>
        </div>
        <div className="shadow-sm w-65 h-35 rounded-lg text-center">
          <span className="text-gray-500">Đơn hàng chờ xử lý</span>
        </div>
        <div className="shadow-sm w-65 h-35 rounded-lg text-center">
          <span className="text-gray-500">Đơn hàng đag giao</span>
        </div>
      </div>
      <div className=" mr-7 ml-7 mt-10 flex items-center justify-between text-center">
        <div className="shadow-sm w-180 h-110 rounded-lg">
          <span className="text-gray-500">Thống kê doanh thu</span>
        </div>
        <div className="shadow-sm w-115 h-110 rounded-lg text-center">
          <span className="text-gray-500">Thống kê người dùng</span>
        </div>
      </div>
    </>
  );
};

export default DashboardManager;
