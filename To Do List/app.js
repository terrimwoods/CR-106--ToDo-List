var serverURL="http://restclass.azurewebsites.net/API2/Todos";
var todos =[];
//var x =0;

function addToDo(){
    console.log("Adding a new task");
    //get the value from input
   // var text=document.getElemnetById("txt-task").value;
   var text=$("#txt-task").val();
   //if(text= 0; 0<text; text=+);

   var todo={
       text:text,
       user:"Terri",
       state:0//new
   };

   if(text!=""){
    console.log(text);
    $("#txt-task").val("");//cleart the input
        // display
    displayToDo(todo);
   
   }else{
       alert("you have to enter a task");
   }

 // set the focus to the input
   $("#text-task").focus();//clears the input bar after each entry

   //send the object to the backend
   var jsonString=JSON.stringify(todo);
$.ajax({
    url:serverURL,
    type:"POST",
    contentType:"application/json",
    data:jsonString,

    success:function(response){
        console.log("It Worked", response)
    },
    error:function(error){
        console.log("It Failed", error)
    }
    
       
        });
    }



function displayToDo(todo){

    if(todo.state==0){
    //create the list item templates
    var li=`<li id="${todo.id}">${todo.text}<button onclick=markDone(${todo.id})>Done</button>
    </li>`;

    //display the li under the ul
    $("#pending-list").append(li); 
        
        }
        else{
            var li2=`<li>${todo.text}</list>`;
            $("#doneTodos").append(li2);
        }
   
}
 function markDone(id){
     console.log("Item Done",id);
     $("#"+id).remove();
     //find on the todos array the one with id=id
     for(var i=0; i<todos.length;i++){
         if(todos[i].id==id){
             todos[i].state=1;
             displayToDo(todos[i]);
         }
            
        
     }
 }


function loadData(){
    //load data from backend (GET)
    //display todos
    $.ajax({
        url:serverURL,
        type:"GET",
        success:function(res){
            console.log("Server responded");

            for(let i=0;i<res.length; i++){
                if (res[i].user =="Terri"){
                     console.log("this is my list");

                        todos.push(res[i]);
                        displayToDo(res[i]);
                    }
                }
            },
        
        error:function(error){
        
            console.log("Error getting data", error);
        }
    });
}



function init(){
    console.log("Init executed");
    //sensing the user actions/events
    //document.getElementById("btn-add");
    $("#btn-add").click(addToDo);

    $("#txt-task").keypress(function(e){
        console.log(e.key);
        if(e.key==="Enter"){
            console.log("Add a new task");
            addToDo();
        }
    });

    loadData();
}

//when the browser finishes rendering the HTML, execute init
window.onload=init;