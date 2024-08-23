import * as yup from 'yup'
import { useState } from 'react';
import './App.css'


function App() {

  const [formData, setFormData]=useState({
    firstName: '',
    lastName: '',
    email: '',
    msg: '',
    query: '',
    ruleAccepted: false,
  })
  
const [success, setSuccess] = useState('')
const [errorObject, setErrorObject] = useState({})

const userSchema = yup.object().shape(
  {
    firstName: yup.string().min(4, "This field requires at least 4 letters").required("This field is required"),
    lastName: yup.string().min(4, "This field requires at least 4 letters").required("This field is required"),
    email: yup.string().email("Please enter a valid email Address").required("This field is required"),
    msg: yup.string().required("This field is required"),
    query: yup.string().required("Please select a query type"),
    ruleAccepted: yup.boolean().oneOf([true]).required("To submit this form, please concent to being contacted"),
  }
)

async function testValidation(){
  try {

    setSuccess('')

    const response = await userSchema.validate(formData, {
      abortEarly: false,
    })
    console.log(response, "Is a Valid Object")
    setSuccess('Message Sent!')
  } catch (err){
    var errors = {}
    err.inner.forEach((error)=>{
      console.log(`${error.path} : ${error.message}`)
      errors[error.path] = error.message
    })
    setErrorObject(errors)
    console.log(errors)
  }
}

  function handleOnSubmit(event){
    testValidation()
    event.preventDefault();
  }
  
  function handleOnChange(event){
    const keyName = event.target.name
    var keyValue = event.target.value
    const type = event.target.type

    if (type == "checkbox"){
      keyValue = event.target.checked
    }

    setFormData({
      ...formData,
      [keyName]: keyValue,
    })
  }

  return (
    <>
      <container className='container'>
      {success && 
      <container className='success_msg'>
        <div className='success_header'>
        <img src="/public/icon-success-check.svg" alt="tick" className='tick' />
        {success}
        </div>
        <span>Thanks for completing the form. We'll be in touch soon!</span>
      </container>}
        <form className="form" onSubmit={handleOnSubmit}>
          <h1 className="contact">Contact Us</h1>
          <div className="name">
            <div className='name-field'>
                <label className="fname" htmlFor="firstName">
                  First Name
                  <span className='astrik'>*</span>
                </label>
                  <input
                    className={
                      errorObject.firstName
                        ? "input_error"
                        : "name_input"
                    }
                    id="firstName"
                    onChange={handleOnChange}
                    value={formData.firstName}
                    type="text"
                    name="firstName"
                  />
                {errorObject.firstName ? (
                  <span className='error'>{errorObject.firstName}</span>                  
                ) : null}                
            </div>

            <div className='name-field'>
              <label className="fname" htmlFor="lastName">
                Last Name 
                <span className='astrik'>*</span>
              </label>
              <input
                className={
                  errorObject.firstName
                    ? "input_error"
                    : "name_input"
                }
                id="lastName"
                onChange={handleOnChange}
                value={formData.lastName}
                type="text"
                name="lastName"
              />
              {errorObject.lastName ? 
              <span className='error'>
                {errorObject.lastName}
              </span> 
                : null}
            </div>
          </div>

          <div className="email-field">
            <label htmlFor="email">
              Email Address 
              <span className='astrik'>*</span>
            </label>
            <input
              className={
                errorObject.firstName
                  ? "input_error"
                  : "name_input"
              }
              id="email"
              onChange={handleOnChange}
              value={formData.email}
              type="email"
              name="email"
            />
            {errorObject.email ? 
            <span className='error'>
              {errorObject.email}
            </span> : null}
          </div>

          <div className="email-field">
            <label>
              Query Type <span className='astrik'>*</span>
            </label>

            <div className="query-field">
              <div className="Enquiry-field">
                <label htmlFor="Enquiry" className="query-input">
                  <input
                    id="Enquiry"
                    type="radio"
                    name="query"
                    onChange={handleOnChange}
                    value="Enquiry"
                  />
                  General Enquiry
                </label>
                {errorObject.query ? 
                <span className='query_error'>
                  {errorObject.query}
                </span> : null}
              </div>

              <div className="Enquiry-field">
                <label htmlFor="Support" className="query-input">
                  <input
                    id="Support"
                    type="radio"
                    name="query"
                    onChange={handleOnChange}
                    value="Support"
                  />
                  Support Request
                </label>
              </div>
            </div>
          </div>

          <div className="email-field">
            <label className="msg" htmlFor="msg">
              Message <span className='astrik'>*</span>
            </label>
              <textarea
                className={
                      errorObject.firstName
                        ? "input_msg_error"
                        : "msg_input"
                    }
                name="msg"
                value={formData.msg}
                onChange={handleOnChange}
                placeholder="Please enter your message"
              ></textarea>
            {errorObject.msg ? 
            <span className='error'>
              {errorObject.msg}
            </span> : null}
          </div>

          <label className='rule'>
            <input
              // required
              name="ruleAccepted"
              type="checkbox"
              onChange={handleOnChange}
              checked={formData.ruleAccepted}
            />
            I consider to being contacted by the team 
            <span className='rule_astrik'>*</span>
          </label>
          {errorObject.ruleAccepted ? (
            <span className='error'>{errorObject.ruleAccepted}</span>
          ) : null}

          <button
            className="submit_btn"            
            type="submit"
            disabled={!formData.ruleAccepted}
            >Submit 
            </button>        
        </form>        
      </container>
    </>
  );
}

export default App
