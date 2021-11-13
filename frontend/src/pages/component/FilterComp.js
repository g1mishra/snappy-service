import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';


export default function FilterComp(props) {
    const {setFilterRule,ProffesionValue} = props
    const { register, handleSubmit, reset, errors, setValue, getValues} = useForm();
    
    useEffect(
        ()=>{
            if(ProffesionValue.length > 0) {
                let ProffesionValue1 = ProffesionValue.slice(0,ProffesionValue.length - 1)
                setValue([
                    {Proffesion:ProffesionValue1},
                    {State:"Punjab"},
                    {City:"Jalandhar"}
                ]);
            const data = getValues()
            onSubmit(data);
            }
        // eslint-disable-next-line
    },[ ProffesionValue ])

    const onSubmit = data => setFilterRule(data);
    function resetFunc(){
        reset()
        setFilterRule()
    }
    
    return (
        <div className="filter-form">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Proffesion 
                    <div className="select-wrapper">
                    <select style={{color:errors.Proffesion ? "red" : "" }} name="Proffesion" ref={register({ required: "It's Required" })} >
                        <option value="" className={errors.Proffesion ? "error-option" : ""}
                            disabled={errors.Proffesion ? true : false}>{errors.Proffesion ? errors.Proffesion.message : ""}</option>
                        <option value="Electrician">Electricians</option>
                        <option value="Plumber">Plumbers</option>
                        <option value="Carpenter">Carpenters</option>
                        <option value="Labour">Labours</option>
                        <option value="Painter">Painters</option>
                        <option value="House-Cleaner">House-Cleaners</option>
                        
                    </select>
                    </div>
                </label>
                
                <label> 
                    State 
                    <div className="select-wrapper">
                        <select style={{color:errors.State ? "red" : "" }} name="State" placeholder="State" ref={register({ required: "It's Required" })}>
                        <option className={errors.State ?"error-option" : ""} value=""
                            disabled={errors.State ? true : false}>{errors.State ? errors.State.message : ""}</option>
                        <option value="Punjab">Punjab</option>
                        </select>
                        </div>
                </label>
                
                <label> City
                    <div className="select-wrapper">
                    <select name="City" style={{color:errors.City ? "red" : "" }} placeholder="City" ref={register({ required: "It's Required" })}>
                        <option className={errors.City ? "error-option" : ""} value=""
                            disabled={errors.City ? true : false}>{errors.City ? errors.City.message : ""}</option>
                        <option value="Jalandhar">Jalandhar</option>
                    </select>
                    </div>
                </label>

                <label> 
                    Rating 
                    <div className="select-wrapper">
                    <select name="Rating" placeholder="Rating" ref={register({ required: "It's Required" })}>
                        <option value="0">  </option>
                        <option value="5"> ***** </option>
                        <option value="4"> **** </option>
                        <option value="3"> *** </option>
                        <option value="2"> ** </option>
                        <option value="1"> * </option>
                    </select>
                    </div>
                </label>
                
                <div className="button-filter">
                    <label>
                        <input type="submit" className="form-submit" value="Filter"/>
                    </label>
                    <label>
                        <input type="button" className="form-reset" value="Reset" onClick= {() => resetFunc()}/>
                    </label>
                </div>
                
            </form>
        </div>
    
    )
}

