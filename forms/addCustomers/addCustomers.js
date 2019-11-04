addCustomers.onshow=function(){
  drpCompanies.clear()
  let querySelect = "SELECT name FROM customer"
 

  
  if (req1.status == 200) {
    let results = JSON.parse(req1.responseText)
    if (results.length == 0)
        txtResult.value("No companies available.")
    else {        
        let message = ""
        for (i = 0; i <= results.length - 1; i++) {
            message = message + results[i][0] + "\n"
            drpCompanies.addItem(results[i][0])
        }
     } 
  } else {
      lblResponse.value = "Connection failed."
  }
}

drpCompanies.onclick=function(){
  if (typeof(s) == "object") {  
      return 
    } else {
      drpCompanies.value = s 
  
      let querySelect = "SELECT * FROM customer WHERE name = " + '"' + drpCompanies.value + '"' 
      req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=alb75529&pass=@gnes2194&database=alb75529&query=" + querySelect)
      
      if (req1.status == 200) {
          let comResult = JSON.parse(req1.responseText)
            console.log(querySelect)
    } else {
        NSB.MsgBox("Error: " + req1.status);
    }  
  }
}

hamNav.onclick=function(){
    if (typeof(s) == "object") 
       return
  switch(s) {
    case "See Customers":
      ChangeForm(seeCustomer)
      break
    case "Delete Update Customer":
      ChangeForm(deleteUpdateCustomer)
      break
    case "Add Customer":
      ChangeForm(addCustomer)
      break
    }
}

btnAdd.onclick=function(){
  let newName = inptName.value
  let newStreet = inptStreet.value
  let newCity = inptCity.value
  let newState = inptState.value
  let newZip = inptZip.value
  var queryAdd = "INSERT INTO customer (name,street,city,state,zipcode) VALUES ('" + newName + "', '" + newStreet + "', '" + newCity + "', '" + newState + "', '" + newZip + "')"
  req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=alb75529&pass=@gnesB2194&database=alb75529&query=" + queryAdd)
   if (req1.status == 200) { 
        if (req1.responseText == 500) {   
            lblResponse2.value = `${newName} has been successfully added.`
        } else
            NSB.MsgBox("There was an error with adding the new company.")
    } else {
        NSB.MsgBox("Error: " + req1.status);
    }  
}
