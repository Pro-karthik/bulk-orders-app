const { PrismaClient } =  require('@prisma/client')
const prisma = new PrismaClient()



exports.getOrderDetails = async (req, res) => {
  try {
    // Total Orders
    const totalOrders = await prisma.order.count();

    // Status Counts
    const statusCounts = await prisma.order.groupBy({
      by: ['status'],
      _count: true,
    });

    const statusMap = {};
    statusCounts.forEach(sc => {
      statusMap[sc.status] = sc._count;
    });

    // All Orders (to calculate revenue & monthly stats)
    const allOrders = await prisma.order.findMany();

    let totalRevenue = 0;
    const ordersByMonthMap = {};

    allOrders.forEach(order => {
      const items = order.items;
      const orderRevenue = items.reduce(
        (sum, item) => sum + (item.total ?? item.price * item.quantity),
        0
      );
      totalRevenue += orderRevenue;

      const date = new Date(order.createdAt);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      if (!ordersByMonthMap[key]) {
        ordersByMonthMap[key] = { orders: 0, revenue: 0 };
      }

      ordersByMonthMap[key].orders += 1;
      ordersByMonthMap[key].revenue += orderRevenue;
    });

    const ordersByMonth = Object.entries(ordersByMonthMap).map(([month, data]) => ({
      month,
      ...data,
    }));

    const orderStatusDistribution = [
      { name: 'Pending', value: statusMap['Pending'] || 0 },
      { name: 'In Progress', value: statusMap['InProgress'] || 0 },
      { name: 'Delivered', value: statusMap['Delivered'] || 0 },
    ];

    return res.json({
      totalOrders,
      pendingOrders: statusMap['Pending'] || 0,
      inProgressOrders: statusMap['InProgress'] || 0,
      deliveredOrders: statusMap['Delivered'] || 0,
      totalRevenue,
      ordersByMonth,
      orderStatusDistribution,
    });
  } catch (err) {
    console.error('Error fetching admin stats:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}