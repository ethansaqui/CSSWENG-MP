import { useState, useEffect } from "react";
import { createAPIEndpoint } from "../../api";
import { ENDPOINTS } from "../../api/endpoints";
import { EditButton } from "../../style/EditButton";
import { ModalWrapper } from "../base/ModalBase";
import { Customer, CustomerRequest } from "./CustomerDetails";
import { RequestCustomer } from "./RequestCustomer";


export const UpdateCustomer = (props : {customer : Customer, observer : Function}) => {
    const [data, setData] = useState<CustomerRequest>();
    const [isVisible, setIsVisible] = useState<boolean>(false);
    
    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.updateCustomer).post(data, {id: props.customer.id})
        .then(function (response) {
            props.observer();
            setIsVisible(false);
        })
        .catch(function (error) {
            console.log(error);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return (
        <EditButton>
          <ModalWrapper front={"Edit"} isVisible={isVisible} setIsVisible={setIsVisible}>
            <RequestCustomer setResponse={setData} 
                default={{
                    firstName: props.customer.name.firstName, 
                    lastName: props.customer.name.lastName, 
                    ...props.customer
                }}
                />
          </ModalWrapper>
        </EditButton>
    )
}