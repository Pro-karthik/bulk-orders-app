

const StatCard = ({ title, value, icon, color }) => (
  <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow w-full sm:w-[48%] lg:w-[19%]">
  <div className={`p-3 rounded-full text-white ${color}`}>{icon}</div>
  <div>
    <p className="text-sm text-gray-500">{title}</p>
    <h2 className="text-xl font-bold">{value}</h2>
  </div>
</div>
);

export default StatCard;