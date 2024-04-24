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
import cancelContract from "../services/cancelContract.ts";
import { Text } from "../../../components/data-display/Typography.tsx";
import Renter from "../../../models/Renter.ts";
import sendContract from "../services/sendContract.ts";

type UseContractsProps = {
  isCreating?: boolean;
  contracts?: Paginated<PropertyContract>;
  contract?: PropertyContract;
  createContract: (data: CreatePropertyContractProps) => void;
  fetchContracts: (data: ContractsSearchParams) => void;
  handleCancelContract: (contractId: string) => void;
  handleSendContract: (contract: PropertyContract) => void;
};

function useContracts() {
  const navigate = useNavigate();

  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 15,
    props: { current: 1, total: 0 },
  });
  const [searchParams, setSearchParams] = useState({});

  const { notification, dialog } = useNotification();

  const { data: contracts, refetch: fetchContracts } = useQuery({
    autoStart: true,
    queryKey: ["params", { ...pagination, ...searchParams }],
    service: getContracts,
  });

  useEffect(() => {
    if (contracts?.total) {
      setPagination((prev) => ({
        ...prev,
        props: { total: contracts.total, current: 1 },
      }));
    }
  }, [contracts]);

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

  const [doSendContract] = useMutation({
    service: sendContract,
    onSuccess: () => {
      fetchContracts();
      notification({
        message: "Contrato enviado com sucesso",
        type: "success",
      });
    },
  });

  const [doCancel] = useMutation({
    service: cancelContract,
    onSuccess: () => {
      fetchContracts();
      notification({
        message: "Contrato cancelado com sucesso",
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
  };

  const handleCancelContract = (contractId: string) => {
    dialog({
      saveButton: {
        onClick: () => {
          doCancel.mutate(contractId);
        },
        label: "Confirmar",
      },
      content: (
        <Text label="Você tem certeza que deseja cancelar este contrato?" />
      ),
      cancelButton: {
        label: "Cancelar",
      },
    });
  };

  const handleSendContract = (contract: PropertyContract) => {
    dialog({
      saveButton: {
        onClick: () => {
          doSendContract.mutate(contract._id);
        },
        label: "Confirmar",
      },
      content: (
        <Text
          label={`Você tem certeza que deseja enviar o contrato para o inquilino? (${
            (contract.renter as Renter).name
          })`}
        />
      ),
      cancelButton: {
        label: "Cancelar",
      },
    });
  };

  const values = useMemo<UseContractsProps>(
    () => ({
      contracts,
      // contract,
      isCreating: doCreate.isLoading,
      fetchContracts: handleFetchContracts,
      createContract,
      handleCancelContract,
      handleSendContract,
    }),
    [contracts, doCreate.isLoading],
  );

  return [values];
}

export default useContracts;
