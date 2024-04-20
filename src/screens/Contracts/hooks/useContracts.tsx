import { useEffect, useMemo, useState } from "react";
import PropertyContract from "../../../models/PropertyContract.ts";
import { Paginated } from "../../../models/Paginated.ts";
import useQuery from "../../../hooks/core/useQuery.tsx";
import getContracts from "../services/getContracts.ts";

type UseContractsProps = {
  contracts?: Paginated<PropertyContract>;
  contract?: PropertyContract;
};

function useContracts() {
  const [pagination, setPagination] = useState({ page: 1, pageSize: 15 });
  // const { notification, dialog } = useNotification();

  const { data: contracts, refetch: fetchContracts } = useQuery({
    autoStart: true,
    queryKey: ["params", { ...pagination }],
    service: getContracts,
  });

  useEffect(() => {
    fetchContracts();
  }, []);

  // const [doCreate] = useMutation({
  //   service: postProperty,
  //   onSuccess: () => {
  //     fetchContracts();
  //     notification({
  //       message: "Propriedade registrada com sucesso",
  //       type: "success",
  //     });
  //     navigate("/properties");
  //   },
  // });

  // const createProperties = (values: CreatePropertyProps) => {
  //   doCreate.mutate(values);
  // };

  // const handleFetchContracts = (data: RentersSearchParams) => {
  //   Object.keys(data).forEach((key) => {
  //     if (data[key as keyof RentersSearchParams] === "") {
  //       delete data[key as keyof RentersSearchParams];
  //     }
  //   });
  //   setSearchParams(data);
  //   fetchContracts();
  // };

  const values = useMemo<UseContractsProps>(
    () => ({
      contracts,
      // contract,
    }),
    [contracts],
  );

  return [values];
}

export default useContracts;
