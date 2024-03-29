import React, {useState, useEffect} from 'react';
import { getAll, post, put, deleteById, validateEmail} from './memdb.js'
import './App.css';

function App(props) {
  let blankCustomer = { "id": -1, "name": "", "email": "", "password": "" };
  const [customers, setCustomers] = useState([]);
  const [formObject, setFormObject] = useState(blankCustomer);
  const [isValidEmail, setIsValidEmail] = useState(true);

  let mode = (formObject.id >= 0) ? 'Update' : 'Add';
  useEffect(() => { getCustomers() }, []);
  
  // Declare the getCustomers() method.
  const getCustomers =  function(){
    setCustomers(getAll());
  }
  // Declare the handleListClick() method.
  const handleListClick = function(item){
    // Checking if the user selected the same record from
    // the customer list  twice or more
    if (formObject.hasOwnProperty('id') && item.id != formObject.id) {
      setFormObject(item);
    }else{
    // Cleaning up the adding form
      setFormObject(blankCustomer);
    }
  }  

  // Declare the handleInputChange() method.
  const handleInputChange = function (event) {
    const name = event.target.name;
    const value = event.target.value;
    if (name == 'email' && !validateEmail(formObject.email)) {
      setIsValidEmail(false);
    }else{
      setIsValidEmail(true);
    }
    let newFormObject = {...formObject}
    newFormObject[name] = value;
    // Cleaning up the adding form
    setFormObject(newFormObject);
  }

  // Declare the onCancelClick() method.
  let onCancelClick = function () {
    // Cleaning up the adding form
    setFormObject(blankCustomer);
  }

  // Declare the onDeleteClick() method.
  let onDeleteClick = function () {
    // Adding the email validation to avoid inserting wrong data.
    if (formObject.name.length === 0 && 
      formObject.email.length === 0 &&
      formObject.password.length === 0) {
      alert('You must select at least one record from the customer list before you try to delete');
    }
    else{
      if(formObject.id >= 0){
      // Deleting the selected register from the Customelist
        deleteById(formObject.id);
      }
      // Cleaning up the adding form
      setFormObject(blankCustomer);
    }
  }

  // Declare the onSaveClick() method.
  let onSaveClick = function () {
   
      // adding the nonempty records validation to avoid 
      // the insertion of the blank record.
      if (formObject.name.length === 0 &&
          formObject.email.length === 0 && 
          formObject.password.length === 0) {
        alert('You must fill at least one field before you save the form');
      }
      else{
         // Adding the email validation to avoid inserting wrong data.
        if (formObject.email.length !== 0 && !validateEmail(formObject.email)) {
          alert("Enter correct email address!")
          
        } else{
          // Adding the new record send it by the user
          if (mode === 'Add') {
            // Adding the new register.
            post(formObject);
          }
          if (mode === 'Update') {
            // Saving the new data for the register that is being updated
            put(formObject.id, formObject);
          }
          // Cleaning up the adding form
          setFormObject(blankCustomer);
        }
    }
  }


  return (
    <React.Fragment>
      <h2>Basic React app</h2>
      <div className="boxed" >
        <h4>Customer List</h4>
        <table id="customer-list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Pass</th>
            </tr>
          </thead>
          <tbody>
            {
            // Building the customerList section.
            customers.map(
              (item, index) => {
                return (<tr key={item.id}
                className={ (item.id === formObject.id )?'selected': ''}
                onClick={()=>handleListClick(item)} 
                >
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.password}</td>
                </tr>);
              }
            )}
          </tbody>
        </table>
      </div>
      <div className="boxed">
        <div>
          <h4>{mode}</h4>
        </div>
        <form >
          {
            // Building the customerList section.
          }
          <table id="customer-add-update" >
            <tbody>
              <tr>
                <td className={'label'} >Name:</td>
                <td><input
                  type="text"
                  name="name"
                  onChange={(e) => handleInputChange(e)}
                  value={formObject.name}
                  placeholder="Customer Name"
                  required /></td>
              </tr>
              <tr>
                <td className={'label'} >Email:</td>
                <td><input
                  type="email"
                  name="email"
                  className={`input-email ${ !isValidEmail ? "wrong-email" : ""}`}
                  onChange={(e) => handleInputChange(e)}
                  value={formObject.email}
                  placeholder="name@company.com" /></td>
              </tr>
              <tr>
                <td className={'label'} >Pass:</td>
                <td><input
                  className={'password-field-hide'}
                  type="text"
                  name="password"
                  onChange={(e) => handleInputChange(e)}
                  value={formObject.password}
                  placeholder="password" /></td>
              </tr>
              <tr className="button-bar">
                <td colSpan="2">
                  <input type="button" value="Delete" onClick={onDeleteClick} />
                  <input type="button" value="Save" onClick={onSaveClick} />
                  <input type="button" value="Cancel" onClick={onCancelClick} />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </React.Fragment>
  );
}

export default App;
