import { useForm } from "react-hook-form";
import { isAlphabetic, isEmail, isMobileNumber } from "../../utils/Regex";
import { CustomerRequest } from "./CustomerDetails";

export const RequestCustomer = (props : {setResponse : Function, default? : CustomerRequest}) => {
    
    const {register, handleSubmit, formState: {errors}} = useForm<CustomerRequest>()

    const onSubmit = handleSubmit((data) => {
        props.setResponse(data);
    });

    return (
        <div>
            <p>Customer</p>
            <form className="view" onSubmit={onSubmit} autoComplete="off">
                <div>
                    <label htmlFor="firstName"> First Name </label>
                    <input {... register("firstName", {required : true, pattern: isAlphabetic })} 
                    type="text" name = "firstName" defaultValue={props.default?.firstName}/>
                    {errors.firstName && <p>Customer First Name is required</p>}
                </div>
                <div>
                    <label htmlFor="lastName"> Last Name </label>
                    <input {... register("lastName", {required : true, pattern: isAlphabetic })} 
                    type="text" name = "lastName" defaultValue={props.default?.lastName}/>
                    {errors.lastName && <p>Customer Last Name is required</p>}
                </div>
                <div>
                    <label htmlFor="email"> Email </label>
                    <input {... register("email", {required: true, 
                                                pattern: { value: isEmail,
                                                message: "invalid email address"}})} 
                                                type="text" name="email"
                                                defaultValue={props.default?.email}/>
                    {errors.email && <p>Email is required</p>}
                </div>
                <div>
                    <label htmlFor="mobileNumber"> Mobile Number </label>
                    <input {... register("mobileNumber", {required: true, pattern: {
                                                                        value: isMobileNumber,
                                                                        message: "invalid mobile number"}})} 
                                                                        type="text" name="mobileNumber"
                                                                        defaultValue={props.default?.mobileNumber}/>
                    {errors.mobileNumber && <p>Mobile Number is required</p>}
                </div>
                <div className="submitButton">
                    <input type='button' name="submit" onClick={onSubmit}value={"Submit"} />
                </div>
            </form>
        </div> 
    );
}