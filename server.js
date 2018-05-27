
var Regex=require("regex");
var mongoose=require("mongoose");

  client=require("socket.io").listen(8080).sockets;

var schema=mongoose.Schema;

var chat=new schema({
    name : String,
    msg :String
})
var chat=mongoose.model("chat",chat);
mongoose.connect("mongodb://baymax19:baymax19@ds133920.mlab.com:33920/chat",function(err,db)
{
    if(err)
        throw err;
   //console.log("data is note inserted and connected"+ db)   
    
    var col=db.collection("chat");
   
    // console.log(col.msg);
    client.on("connection",function(socket)
    {


        sendStatus=function(s)
        {
                 socket.emit("status",s)
                 {       
                     
                 };
                //  client.emit("status",s)
                //  {

                //  };
                
        }
        col.find().limit(100).sort({_id :1}).toArray(function(err,data)
        {

            if(err)
                throw err;
            socket.emit("output",data);    
        })

        socket.on("input",function(data)
        {
           
            var whiteSpace=/^\s*$/g;
            // console.log(name1+" "+msg)
            //console.log("data"+whiteSpace.test(data.name)+""+whiteSpace.test(data.msg));

            if(!(whiteSpace.test(data.name)) && !(whiteSpace.test(data.msg)))
            {
                col.save({ name :data.name, msg:data.msg})
                {
                    // console.log([data])    
                    client.emit("output",[data]) 
                    sendStatus({
                        msg : "Msg Sent",
                        clear :true
                    })    
                } 
                

            }
            else
            {
                sendStatus("Enter the Required Name  or Required Message");
            }
           

        })
    })
    
})  


