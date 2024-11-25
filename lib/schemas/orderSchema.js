export function validateOrder(order) {
    if (!order.customer || !order.products) {
      throw new Error("Missing required fields: customer or products");
    }
  
    const { name, email, phone, street, city, pin, state, country } = order.customer;
  
    if (!name || !email || !phone || !street || !city || !pin || !state || !country) {
      throw new Error("Missing customer details");
    }
  
    if (!Array.isArray(order.products) || order.products.length === 0) {
      throw new Error("Products must be a non-empty array");
    }
  
    order.products.forEach((product) => {
      if (!product.name || !product.price) {
        throw new Error("Each product must have a name and price");
      }
    });
  
    return {
      customer: {
        name,
        email,
        phone,
        street,
        city,
        pin,
        state,
        country,
      },
      products: order.products,
      createdAt: new Date(), // Automatically set the order's creation timestamp
    };
  }
  