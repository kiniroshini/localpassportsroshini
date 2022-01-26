

function loadData(records=[]){
console.log(records)
table_data=``;
for (let i=0; i<(records.length);i++){ //for each record in records; i = each record
    console.log(records[i]);
    x=i+1
    table_data +=`<tr>`;
    table_data +=`<td>${x}</td>`
    table_data +=`<td>${records[i].name}</td>`
    table_data +=`<td>${records[i].age}</td>`
    table_data +=` <td>${records[i].city}</td>`
    table_data +=` <td>
    <a href="edit.html?id=${records[i]._id}"><button style="border-radius: 3px;box-shadow: 0 8px 8px 0 rgba(0,0,0,0.2), 0 6px 8px 0 rgba(0,0,0,0.19);background-color: #4CAF50;width:40%">edit</button></a> | 
   <button onclick='deleteData("${records[i]._id}","${records[i].name}");'style="border-radius: 3px;box-shadow: 0 8px 8px 0 rgba(4,5,6,0.2), 0 6px 8px 0 rgba(0,0,0,0.19);background-color: #FF0000;color: #ffffff;width:45%">delete</button>
    </td>`
    table_data+=`</tr>`;
}
document.getElementById("table_data").style.border = "purple";

document.getElementById('table_data').innerHTML = table_data;
}


function getData(){ // this is an ajax call
    fetch('https://mfa-rk.herokuapp.com/student') //fetch the url from where i need the data the data is an array of jsons  //when i dont give anything as second args, by default it is get request
    .then((response)=>response.json()) //i cannot just show array of json, hence make the response in json format
    .then((data)=>{ //then take the data and perform whatever is inside these curly braces
    console.table(data) //gives a very beautiful tabular form of the collection in the console
    loadData(data); //sara data take in here

    })
}
function postData(){
    console.log("post data");
    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var city = document.getElementById('city').value;
    data = {name:name, age:age, city:city} 
   fetch('https://mfa-rk.herokuapp.com/student',{ //you can fetch data input by user and then post it into the database in atlas. we have to specify which method we are using, post for example
       method: "POST",
       headers: {
           'Accept' : 'application/json',
           'Content-Type' : 'application/json'
       },
       body: JSON.stringify(data)
   })
   .then((response)=>response.json())
   .then((data)=>{
       console.log(data);
window.location.href = 'index.html';
   })
    
}
function deleteData(id, name) {
    // alert(`name: ${name}, id: ${id}`);
    user_input = confirm(`Are you sure you want to delete ${name} record?`);
    if (user_input) {
      fetch('https://mfa-rk.herokuapp.com/student', {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "id": id }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          window.location.href = "index.html";
        });
    }
  }
function  getDataById(id){
    api_url='https://mfa-rk.herokuapp.com/student'
    fetch(`${api_url}/${id}`)
       
        .then((response) => response.json())
        .then((data) => {
            document.getElementById('id').value= data[0]._id;
            document.getElementById('name').value= data[0].name;
            document.getElementById('age').value= data[0].age;
            document.getElementById('city').value= data[0].city;

         // console.log(data);
         // window.location.href = "index.html";
        });
    }
    function putData() {
        api_url='https://mfa-rk.herokuapp.com/student'
        var id = document.getElementById("id").value;
        var name = document.getElementById("name").value;
        var age = document.getElementById("age").value;
        var city = document.getElementById("city").value;
        
        data = {id:id, name: name, age: age, city: city};
        console.log(data);
        fetch(api_url, {
            method: "PUT",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => { 
            console.table(data);
            window.location.href = "index.html";
        })
    }