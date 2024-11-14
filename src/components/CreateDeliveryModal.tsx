import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDelivery } from "../fake-db";

const CreateDeliveryModal = (props: {
  x: boolean;
  setX: (x: boolean) => void;
}) => {
  const { x, setX } = props;
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useMutation({
    mutationFn: (opts: {
      name: string;
      status: string;
      deliveryDate: Date;
    }) => addDelivery(opts.name, opts.status, opts.deliveryDate as any as string),
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: async () => {
      console.log("Invalidating query");
      queryClient.invalidateQueries({ queryKey: ["deliveries"] });
      setIsLoading(false);
    },
  });

  const [name, setName] = React.useState("");
  const [status, setStatus] = useState("");
  const [deliveryDate, setDeliveryDate] = React.useState("");

  return (
    <div className="absolute bg-white top-10 left-10 bottom-10 right-10 shadow-xl border-2 border-black">
      <h1 className="text-2xl my-2 flex flex-row">
        <span className="flex-grow">Create delivery</span>
        <button className="btn" onClick={() => setX(false)}>
          X
        </button>
      </h1>
      <div className="flex flex-col gap-2">
        <p>
          <label>Name</label>
          <input
            className="border-2 border-black"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </p>
        <p>
          <label>Status</label>
          <input
            className="border-2 border-black"
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </p>
        <p>
          <label>Delivery date</label>
          <input
            className="border-2 border-black"
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
          />
        </p>

        <button
          className="bg-red-500 text-white p-2"
          onClick={() => {
            mutate({
              name: name,
              status: status,
              deliveryDate: (deliveryDate as unknown) as Date,
            });
          }}
        >
          {isLoading ? "Loading..." : "Create delivery"}
        </button>
      </div>
    </div>
  );
};

export default CreateDeliveryModal;
