const express = require('express');
const req = require('express/lib/request');


const app = express();
const port = 3010;

let person = {
  firstName: "Damodar",
  lastName: "Garugu",
  age: 24,
  gender: "male",
  isMember: true,
};

app.get("/person", (req,res)=> {
  res.json(person)
});
//get fullname
function getPersonFullName(person)
{
  return person.firstName + " "+person.lastName;
}
app.get("/person/fullname", (req,res)=> {
  let fullname = getPersonFullName(person);
  res.json({fullname: fullname});
});
//get gender and firstname
function getFirstNameGender(person)
{
  return {
    firstName: person.firstName,
    gender: person.gender,
  };
}
app.get("/person/firstname-gender",(req,res) => {
   
  let firstNameGender = getFirstNameGender(person);
  res.json(firstNameGender);

});
//update the age 
function getAge(person)
{
  return person.age+5;
}
function updateAge(person)
{
  person.age=person.age+5;
}
app.get("/person/age-increment",(req,res)=>{
  let incrementAge = updateAge(person);
  res.json(person);
})
//membership and fullname
function getFullNameMembershipCheck(person)
{
  return {
    fullname: getPersonFullName(person),
    isMember: person.isMember
  };
}
app.get("/person/fullname-isMember",(req,res)=>
{
  let fullnameMember = getFullNameMembershipCheck(person);
  res.json(fullnameMember);
})
// discount on membership
function getFinalPrice(cartTotal)
{
  if(person.isMember === true)
  {
    return cartTotal=cartTotal-(10*cartTotal/100);
  }
  else return cartTotal;
}
app.get("/person/final-price",(req,res)=>
{
  let cartTotal = parseFloat(req.query.cartTotal);
  let finalPrice = getFinalPrice(cartTotal);
  console.log(finalPrice);
  res.send(finalPrice.toString())
})

//calculate shipping charges
function getShippingCharges(cartTotal,isMember)
{
  if(cartTotal>500 & isMember === true)
  {
     return 0;
  }
  else return 99;
}
app.get("/person/shipping-cost",(req,res)=> {
  let cartTotal = parseFloat(req.query.cartTotal);
  let shippingCost = getShippingCharges(cartTotal,person.isMember);
  console.log(shippingCost);
  //res.send(shippingCost.toString());
  res.json({shippingCost: shippingCost.toFixed(2)});
 
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
