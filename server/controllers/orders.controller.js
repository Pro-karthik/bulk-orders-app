const { PrismaClient } =  require('@prisma/client')
const prisma = new PrismaClient()


exports.createOrder = async (req, res) => {
  try {
    const { buyerName, buyerContact, deliveryAddress, items } = req.body;
    if (!buyerName || !buyerContact || !deliveryAddress || !items || !Array.isArray(items)) {
      return res.status(400).json({ error: 'Invalid input. Please fill all fields correctly.' });
    }

    const newOrder = await prisma.order.create({
      data: {
        buyerName,
        buyerContact,
        deliveryAddress,
        items,
        accountId: req.user.id, 
      },
    });

    return res.status(201).json(newOrder);
  } catch (error) {
    console.error('Create Order Error:', error);
    return res.status(500).json({ error: 'Failed to create order' });
  }
}


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


exports.getOrderDetailsById = async (req, res) => {
  const orderId = req.params.orderId;
  try{
      const order = await prisma.order.findUnique({
        where : {id : Number(orderId)}
      })
      if(!order){
        return res.status(404).json({error : 'Order not found'})
      }
      return res.status(200).json(order)
  }
  catch(err){
    console.error('Error fetching order details:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}


exports.getAllOrders = async (req, res) => {
  try {
    if (req.user) {
      // If it's a logged-in user, fetch only their orders
      const userOrders = await prisma.order.findMany({
        where: {
          accountId: req.user.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return res.status(200).json(userOrders);
    } else if (req.admin) {
    
      const allOrders = await prisma.order.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });

      return res.status(200).json(allOrders);
    } else {
      return res.status(401).json({ error: 'Unauthorized access' });
    }
  } catch (error) {
    console.error('Get All Orders Error:', error);
    return res.status(500).json({ error: 'Failed to fetch orders' });
  }
};


exports.updateOrderStatus = async (req, res) => {
     const {orderId} = req.params
     const {status} = req.body
     try{
        const order = await prisma.order.update({
          where : {id : Number(orderId)},
          data : {status}
        })
        return res.status(200).json(order)
     }
     catch(err){
        console.error('Error updating order status:', err);
        res.status(500).json({ error: 'Internal server error' });
     }
}

