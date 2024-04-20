import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import PropertyContract from "../../../models/PropertyContract.ts";
import { Paginated } from "../../../models/Paginated.ts";
import useQuery from "../../../hooks/core/useQuery.tsx";
import getContracts, {
  ContractsSearchParams,
} from "../services/getContracts.ts";
import postContract, {
  CreatePropertyContractProps,
} from "../services/postContract.ts";
import { useNotification } from "../../../context/NotificationContext.tsx";
import useMutation from "../../../hooks/core/useMutation.tsx";

type UseContractsProps = {
  contracts?: Paginated<PropertyContract>;
  contract?: PropertyContract;
  createContract: (data: CreatePropertyContractProps) => void;
  fetchContracts: (data: ContractsSearchParams) => void;
};

function useContracts() {
  const navigate = useNavigate();

  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 15,
    props: { current: 1, total: 0 },
  });
  const [searchParams, setSearchParams] = useState({});

  const { notification } = useNotification();

  const { data: contracts, refetch: fetchContracts } = useQuery({
    autoStart: true,
    queryKey: ["params", { ...pagination, ...searchParams }],
    service: getContracts,
  });

  useEffect(() => {
    fetchContracts();
  }, []);

  const [doCreate] = useMutation({
    service: postContract,
    onSuccess: () => {
      fetchContracts();
      notification({
        message: "Contrato registrada com sucesso",
        type: "success",
      });
      navigate("/contracts");
    },
  });

  const createContract = (values: CreatePropertyContractProps) => {
    doCreate.mutate(values);
  };

  const handleFetchContracts = (data: ContractsSearchParams) => {
    Object.keys(data).forEach((key) => {
      if (data[key as keyof ContractsSearchParams] === "") {
        delete data[key as keyof ContractsSearchParams];
      }
    });
    setSearchParams(data);
    fetchContracts();
  };

  const values = useMemo<UseContractsProps>(
    () => ({
      contracts,
      // contract,
      fetchContracts: handleFetchContracts,
      createContract,
    }),
    [contracts],
  );

  return [values];
}

export default useContracts;
