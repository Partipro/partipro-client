import { Outlet, useNavigate } from "react-router-dom";
import FlexColumn from "../../../components/layout/FlexColumn.tsx";
import useQuery from "../../../hooks/useQuery.tsx";
import getProperties from "../services/getProperties.ts";
import Grid from "../../../components/layout/Grid.tsx";
import Card from "../../../components/surfaces/Card.tsx";
import { Text } from "../../../components/data-display/Typography.tsx";
import Chip from "../../../components/data-display/Chip.tsx";
import Button from "../../../components/inputs/Button.tsx";

function Properties() {
  const navigate = useNavigate();

  const { data: properties } = useQuery({
    autoStart: true,
    queryKey: ["name", ""],
    service: getProperties,
  });
  return (
    <FlexColumn sx={{ width: "100%" }}>
      {properties?.length ? (
        <Grid
          spacing={4}
          items={properties.map((property) => ({
            item: (
              <Card
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
                  property.photo ||
                  "https://media.istockphoto.com/id/1128826884/pt/vetorial/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment.jpg?s=170667a&w=0&k=20&c=W1UzMnnyqtdNBowZVk_JtR_dP0xFajvJvYCG5zL4NWU="
                }
                title={property.name}
                actions={
                  <>
                    <Button
                      label="Edit"
                      variant="text"
                      onClick={() => navigate(property._id)}
                    />
                  </>
                }
              >
                <FlexColumn>
                  {property.monthRent && (
                    <Text
                      label={`R$ ${property.monthRent} p/m`}
                      type="secondary"
                      weight="medium"
                    />
                  )}
                  <Text
                    label={property.city}
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
