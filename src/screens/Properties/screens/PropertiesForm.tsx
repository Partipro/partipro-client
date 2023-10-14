import { useNavigate, useParams } from "react-router-dom";
import Dialog from "../../../components/feedback/Dialog.tsx";
import TextField from "../../../components/inputs/TextField.tsx";

function PropertiesForm() {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <Dialog
      title={params.id ? "Edit Property" : "Create Property"}
      open
      onClose={() => navigate(-1)}
    >
      <form style={{ width: "100%" }}>
        <TextField name="Name" label="Name" value={123} />
      </form>
    </Dialog>
  );
}

export default PropertiesForm;
