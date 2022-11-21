import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { DeleteContainer } from "../../style/DeleteButton";
import { Vehicle } from "./VehicleDetails";

export const DeleteVehicle = (props : {vehicle : Vehicle, observer : Function}) => {
    const onSubmit = () => {
        createAPIEndpoint(ENDPOINTS.deleteVehicle).delete({"id" : props.vehicle.id})
            .then((response) => {
                props.observer();
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
      <DeleteContainer>
        <button onClick={onSubmit}><i></i></button>
      </DeleteContainer> 
    );
}