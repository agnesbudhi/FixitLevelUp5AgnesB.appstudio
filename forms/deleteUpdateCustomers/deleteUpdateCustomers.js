let name = ""
let oldName = ""

deleteUpdateCustomers.onshow=function(){
  drpCompanies.clear()
  let querySelect = "SELECT name FROM customer"
  req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=alb75529&pass=@gnesB2194&database=alb75529&query=" + querySelect)
  
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
            txtResult.value = comResult[0][0] + '\n'  + comResult[0][1] + '\n' + comResult[0][2]  + " " + comResult[0][3]
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

btnDelete.onclick=function(){
  let nameDelete = oldName
  let queryDelete = ""DELETE FROM customer WHERE name = " + '"' + nameDelete + '"'
  req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=alb75529&pass=@gnesB2194&database=alb75529&query=" + queryDelete);
  if (req1.status == 200) {
    if (req1.responseText == 500) {
      let results = JSON.parse(req1.responseText)
      name = name.replace(nameDelete, "")
      txtResult1.value = name
      NSB.MsgBox("You have successfully deleted " + customerNameDel)
    } else
      NSB.MsgBox("There was an error deleting the company's name.")
  } else 
    NSB.MsgBox("Error: " + req1.status);
}

btnUpdate.onclick=function(){
  newName = inptUpdate.value
  let queryUpdate = "UPDATE customer SET name =" + '"' + newName + '"' + " WHERE name = " + '"' + oldName + '"'
  req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=alb75529&pass=@gnesB2194&database=alb75529&query=" + queryUpdate);
  if (req1.status == 200) {
    if (req1.responseText == 500) {
      let results = JSON.parse(req1.responseText)
      name = name.replace(oldName, newName)
      txtResult1.value = name
    } else
      NSB.MsgBox("There was an error updating the company's name.")
  } else 
    NSB.MsgBox("Error: " + req1.status);
}
   