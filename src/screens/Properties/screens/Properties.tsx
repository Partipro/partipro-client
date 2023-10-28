import useProperties from "../hooks/useProperties.tsx";

import("./PropertiesForm.tsx");
import { Outlet, useNavigate } from "react-router-dom";
import FlexColumn from "../../../components/layout/FlexColumn.tsx";
import Grid from "../../../components/layout/Grid.tsx";
import Card from "../../../components/surfaces/Card.tsx";
import { Text } from "../../../components/data-display/Typography.tsx";
import Chip from "../../../components/data-display/Chip.tsx";
import Button from "../../../components/inputs/Button.tsx";
import FlexRow from "../../../components/layout/FlexRow.tsx";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "../../../components/inputs/IconButton.tsx";

function Properties() {
  const [values] = useProperties();
  const navigate = useNavigate();

  return (
    <FlexColumn sx={{ width: "100%" }}>
      {values.properties?.length ? (
        <Grid
          spacing={4}
          containerStyles={{
            height: "inherit",
          }}
          items={values.properties.map((property) => ({
            item: (
              <Card
                fullHeight
                info={
                  <Chip
                    label={
                      { COMMERCIAL: "Comercial", RESIDENTIAL: "Residencial" }[
                        property.type
                      ]
                    }
                    color={
                      { COMMERCIAL: "primary", RESIDENTIAL: "warning" }[
                        property.type
                      ] as "primary" | "warning"
                    }
                  />
                }
                src={
                  property.image
                    ? `${import.meta.env.VITE_ASSETS_URL}/${property.image}`
                    : "https://media.istockphoto.com/id/1128826884/pt/vetorial/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment.jpg?s=170667a&w=0&k=20&c=W1UzMnnyqtdNBowZVk_JtR_dP0xFajvJvYCG5zL4NWU="
                }
                title={property.name}
                actions={
                  <>
                    <Button
                      label="Editar"
                      variant="text"
                      size="small"
                      onClick={() => navigate(`/properties/${property._id}`)}
                    />
                    <IconButton
                      type="error"
                      size="small"
                      icon={<DeleteIcon />}
                      onClick={() => values.deleteProperty(property)}
                    />
                  </>
                }
              >
                <FlexColumn>
                  <FlexRow sx={{ gap: "4px" }}>
                    {property.monthRent && (
                      <Text
                        label={`R$ ${property.monthRent} p/m`}
                        type="secondary"
                        weight="medium"
                      />
                    )}
                    {property.squareMeters && (
                      <Text
                        label={` - ${property.squareMeters}m2`}
                        type="secondary"
                        weight="medium"
                      />
                    )}
                  </FlexRow>
                  <Text
                    label={property.city}
                    type="secondary"
                    weight="medium"
                  />
                  <Text
                    label={property.address}
                    type="secondary"
                    weight="medium"
                  />
                </FlexColumn>
              </Card>
            ),
            xs: 6,
            sm: 4,
            lg: 3,
            xl: 2,
          }))}
        />
      ) : null}
      <Outlet />
    </FlexColumn>
  );
}

export default Properties;
