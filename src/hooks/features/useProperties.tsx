import { useEffect, useMemo } from "react";
import useQuery from "../core/useQuery.tsx";
import { useNavigate, useParams } from "react-router-dom";
import useMutation from "../core/useMutation.tsx";
import { useNotification } from "../../context/NotificationContext.tsx";
import { Text } from "../../components/data-display/Typography.tsx";
import getProperties from "../../screens/Properties/services/getProperties.ts";
import getPropertyById from "../../screens/Properties/services/getPropertyById.ts";
import updatePropertyService, {
  UpdatePropertyProps,
} from "../../screens/Properties/services/updateProperty.ts";
import postProperty, {
  CreatePropertyProps,
} from "../../screens/Properties/services/postProperty.ts";
import Property from "../../models/Property.ts";
import deletePropertySerivice from "../../screens/Properties/services/deleteProperty.ts";

type UsePropertiesProps = {
  properties?: Property[];
  property?: Property;
  fetchProperties?: () => void;
  createProperties: (data: CreatePropertyProps) => void;
  deleteProperty: (data: Property) => void;
  updateProperty: ({
    id,
    values,
  }: {
    id: string;
    values: UpdatePropertyProps;
  }) => void;
};

function useProperties() {
  const navigate = useNavigate();
  const params = useParams();

  const { notification, dialog } = useNotification();

  const { data: properties, refetch: fetchProperties } = useQuery({
    autoStart: true,
    queryKey: ["name", ""],
    service: getProperties,
  });

  const { data: property, refetch: fetchById } = useQuery({
    autoStart: false,
    queryKey: ["id", params.id],
    service: getPropertyById,
  });

  const [doCreate] = useMutation({
    service: postProperty,
    onSuccess: () => {
      fetchProperties();
      notification({
        message: "Propriedade registrada com sucesso",
        type: "success",
      });
      navigate("/properties");
    },
  });

  const [doUpdate] = useMutation({
    service: updatePropertyService,
    onSuccess: () => {
      fetchProperties();
      notification({
        message: "Propriedade atualizada com sucesso",
        type: "success",
      });
      navigate("/properties");
    },
  });

  const [doDelete] = useMutation({
    service: deletePropertySerivice,
    onSuccess: () => {
      fetchProperties();
      notification({
        message: "Propriedade deletada com sucesso",
        type: "success",
      });
    },
  });

  const createProperties = (values: CreatePropertyProps) => {
    doCreate.mutate(values);
  };
  const updateProperty = ({
    id,
    values,
  }: {
    values: UpdatePropertyProps;
    id: string;
  }) => {
    doUpdate.mutate({ id, data: values });
  };

  const deleteProperty = (property: Property) => {
    dialog({
      saveButton: {
        onClick: () => {
          doDelete.mutate(property._id);
        },
        label: "Confirmar",
      },
      content: (
        <Text
          label={`Você tem certeza que deseja excluir esta propriedade? (${property.name})`}
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

  const values = useMemo<UsePropertiesProps>(
    () => ({
      properties,
      fetchProperties,
      property,
      createProperties,
      updateProperty,
      deleteProperty,
    }),
    [properties, property],
  );

  return [values];
}

export default useProperties;
