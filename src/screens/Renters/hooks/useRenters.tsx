import { useEffect, useMemo } from "react";
import Renter from "../../../models/Renter.ts";
import useQuery from "../../../hooks/useQuery.tsx";
import getRenters from "../services/getRenters.ts";
import getRenterById from "../services/getRenterById.ts";
import { useNavigate, useParams } from "react-router-dom";
import useMutation from "../../../hooks/useMutation.tsx";
import postRenterService, {
  CreateRenterProps,
} from "../services/postRenter.ts";
import updateRenterService, {
  UpdateRenterProps,
} from "../services/updateRenter.ts";
import { useNotification } from "../../../context/NotificationContext.tsx";
import deleteRenterService from "../services/deleteRenter.ts";
import { Text } from "../../../components/data-display/Typography.tsx";

type UseRentersProps = {
  renters?: Renter[];
  renter?: Renter;
  fetchRenters?: () => void;
  createRenter: (data: CreateRenterProps) => void;
  deleteRenter: (data: Renter) => void;
  updateRenter: ({
    id,
    values,
  }: {
    id: string;
    values: UpdateRenterProps;
  }) => void;
};

function useRenters() {
  const navigate = useNavigate();
  const params = useParams();

  const { notification, dialog } = useNotification();

  const { data: renters, refetch: fetchRenters } = useQuery({
    autoStart: true,
    queryKey: ["name", ""],
    service: getRenters,
  });

  const { data: renter, refetch: fetchById } = useQuery({
    autoStart: false,
    queryKey: ["id", params.id],
    service: getRenterById,
  });

  const [doCreate] = useMutation({
    service: postRenterService,
    onSuccess: () => {
      fetchRenters();
      notification({
        message: "Locatário registrado com sucesso",
        type: "success",
      });
      navigate(-1);
    },
  });

  const [doUpdate] = useMutation({
    service: updateRenterService,
    onSuccess: () => {
      fetchRenters();
      notification({
        message: "Locatário atualizada com sucesso",
        type: "success",
      });
      navigate(-1);
    },
  });

  const [doDelete] = useMutation({
    service: deleteRenterService,
    onSuccess: () => {
      fetchRenters();
      notification({
        message: "Locatário deletada com sucesso",
        type: "success",
      });
    },
  });

  const createRenter = (values: CreateRenterProps) => {
    doCreate.mutate(values);
  };
  const updateRenter = ({
    id,
    values,
  }: {
    values: UpdateRenterProps;
    id: string;
  }) => {
    doUpdate.mutate({ id, data: values });
  };

  const deleteRenter = (renter: Renter) => {
    dialog({
      saveButton: {
        onClick: () => {
          doDelete.mutate(renter._id);
        },
        label: "Confirmar",
      },
      content: (
        <Text
          label={`Você tem certeza que deseja excluir este locatário? (${renter.name})`}
        />
      ),
      cancelButton: {
        label: "Cancelar",
      },
    });
  };

  useEffect(() => {
    if (params.id) {
      fetchById({ queryKey: ["id", params.id] });
    }
  }, [params.id]);

  const values = useMemo<UseRentersProps>(
    () => ({
      renters,
      fetchRenters,
      renter,
      createRenter,
      updateRenter,
      deleteRenter,
    }),
    [renters, renter],
  );

  return [values];
}

export default useRenters;
