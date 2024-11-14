import { useQuery } from "@tanstack/react-query";
import { getDeliveries } from "../fake-db";
import { useEffect, useState } from "react";

const ListDeliveries = () => {
  const [actualDeliveries, setDeliveries] = useState<any>([]);

  const { data: deliveries } = useQuery({
    queryKey: ["deliveries"],
    queryFn: getDeliveries,
  });

  if (!deliveries) {
    return <div>Loading...</div>;
  }

  return (
    <div className="font-mono flex flex-col gap-4">
      <h1 className="text-center text-3xl">Deliveries</h1>
      <ul className="grid grid-cols-2 text-center">
        {deliveries.map((delivery) => (
          <li key={delivery.name}>
            {delivery.name} - {delivery.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListDeliveries;
