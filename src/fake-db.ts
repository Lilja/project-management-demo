type Delivery = {
  name: string;
  deliveryDate: string;
  status: string;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const db: Delivery[] = [
  {
    name: "Parket",
    deliveryDate: "2024-12-24",
    status: "Pending",
  },
  {
    name: "Kök",
    deliveryDate: "2024-12-24",
    status: "Pending",
  },
  {
    name: "Lister",
    deliveryDate: "2024-12-24",
    status: "Delivered",
  },
  {
    name: "Handtag",
    deliveryDate: "2024-12-24",
    status: "Purchased",
  },
];

export const getDeliveries = async (): Promise<Delivery[]> => {
  console.log("getDeliveries");
  // Sleep between 300-2000 ms to simulate network delay
  await sleep(Math.floor(Math.random() * 1700) + 300);

  // Create a fake list of deliveries
  return db;
};

export const addDelivery = async (
  name: string,
  status: string,
  deliveryDate: string,
): Promise<Delivery> => {
  console.log("addDelivery");
  // Sleep between 300-2000 ms to simulate network delay
  await sleep(Math.floor(Math.random() * 1700) + 300);

  const delivery = {
    name,
    status,
    deliveryDate,
  };

  db.push(delivery);
  console.log("Delivery added", delivery, db.length);

  return delivery;
};
