import { useQuery } from "@tanstack/react-query";
import { getDeliveries } from "../fake-db";
import { useEffect, useState } from "react";
import CreateDeliveryModal from "./CreateDeliveryModal";

const ListDeliveries = () => {
  const [actualDeliveries, setDeliveries] = useState<any>([]);
  const [showModal, setShowModal] = useState(false);

  const { data: deliveries } = useQuery({
    queryKey: ["deliveries"],
    queryFn: getDeliveries,
  });

  useEffect(() => {
    console.log("UseEffect");
    if (deliveries) {
      setDeliveries(deliveries);
    }
  }, [deliveries]);

  if (!deliveries) {
    return <div>Loading...</div>;
  }

  return (
    <div className="font-mono flex flex-col gap-4">
      <h1 className="text-center text-3xl">Deliveries</h1>
      <ul className="grid grid-cols-2 text-center">
        {actualDeliveries.map((delivery) => (
          <li key={delivery.name}>
            {delivery.name} - {delivery.status}
          </li>
        ))}
      </ul>
      <div>
        <button className="btn" onClick={() => setShowModal(true)}>
          Add Delivery
        </button>
      </div>
      {showModal && <CreateDeliveryModal x={showModal} setX={setShowModal} />}
    </div>
  );
};

export default ListDeliveries;
