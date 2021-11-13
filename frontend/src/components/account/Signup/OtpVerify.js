import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

export default function OtpVerify(props) {
    const api_key = "6734206f-8cf2-11ea-9fa5-0200cd936042"
    const { register, handleSubmit, errors,setError } = useForm({mode: "onBlur"});
    const [sendOtp,setsendOtp] = useState();
    const onSubmit = data => {
        if(sendOtp){
            fetch(`https://2factor.in/API/V1/${api_key}/SMS/VERIFY/${sendOtp["Details"]}/${data.otp}`)
            .then(response => response.json())
            .then( data => {
                if(data.Status === "Success"){
                    setsendOtp();
                    props.setmobileVerified(true);
                }
            })
        }
        else{
            fetch(`https://2factor.in/API/V1/${api_key}/SMS/+91${props.mobilenumber}/AUTOGEN`)
            .then(response => response.json())
            .then( data => data.Status === "Success" ? 
                  setsendOtp(data) : 
                  props.setError("Mobilenumber","Mobilenumber","Phone number is not valid") )
          } 
        
    }

    return (
        <div>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="otp" name="Otp" ref={register({required: true})} />
                    {errors.Otp && <p>name can't be blank or lass than 3 char</p>}
                <input type="submit" id="form-submit" value="Signup" />
            </form>
            {/*   */}
      {/*  */}
        </div>
    )
}
