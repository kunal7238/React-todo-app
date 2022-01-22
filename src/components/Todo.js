import React, { useEffect, useState } from 'react';
import "./style.css";

//get the localstorage data back
const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");  //mytodolist is a key passing in localstorage

    if(lists) {
        return JSON.parse(lists); //convet list to array using parse
    } else {
        return [];
    }
};

const Todo = () => {

    const [inputdata, setInputData] = useState("");
    const [items, setItems] =useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    // add itme function
    const addItem =() =>{
        if(!inputdata){
            alert("please fill the data");
        } else if(inputdata && toggleButton){
            setItems(
                items.map((curElem)=>{
                    if(curElem.id === isEditItem){
                        return{...curElem, name:inputdata}
                    }
                    return curElem;
                })
            );

            setInputData("")
            setIsEditItem(null);
            setToggleButton(false);
        }
        else{
            const myNewInputData = {
                id:new Date().getTime().toString(), //convert id integer into string format using date 
                name: inputdata,
            }
            setItems([...items, myNewInputData]); //spread operator use for access all store data before add new data 
            setInputData(""); // it is call when item is save that is work text area free
        }
        
    };

    //edit the items
    const editItem  = (index)=>{
        const item_todo_edited = items.find((curElem)=>{
            return curElem.id === index;
        });

        setInputData(item_todo_edited.name)
        setIsEditItem(index);
        setToggleButton(true);
    };

    // how to delete item
    const deletItem = (index)=>{
        const updatedItem = items.filter((curElem)=>{
            return curElem.id !== index;  //it return which is not equal to index iten which was delete
        });
        setItems(updatedItem); //it setitem which was not equal to delet item
    };

    // remove all eement
    const removeAll = () =>{
        setItems([]);
    };

    // Adding Local Storage
    useEffect(()=>{
        localStorage.setItem("mytodolist", JSON.stringify(items)) //Json.stringify convert data into string format
    },[items]);

  return <>
      <div className="main-div">
        <div className="child-div">
            <figure>
                <img src="./images/to-do-list.png" alt="todologo" />
                <figcaption>Add Your List Here ✌</figcaption>
            </figure>
            <div className="addItems">
                <input type="text" placeholder="✍   Add Items" className="form-control" onChange={(event) =>setInputData(event.target.value)} value={inputdata} />
                {
                    toggleButton ? (
                        <i className="fa fa-edit add-btn" onClick={ addItem}></i>
                    ) : (
                        <i className="fa fa-plus add-btn" onClick={ addItem}></i>
                    )}
            </div>


            {/* show our items */}
            <div className="showItems">
                {items.map((curElem)=>{
                    return(
                        <div className="eachItem" key={curElem.id}>
                    <h3>{curElem.name}</h3>
                    <div className="todo-btn">
                    <i className="far fa-edit add-btn" onClick={()=> editItem(curElem.id)}></i>
                    <i className="far fa-trash-alt add-btn" onClick={()=> deletItem(curElem.id)}></i>
                    </div>
                </div>
                    )
                })}
            </div>
            {/* remove all button  */}

            <div className="showItems"><button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button></div>
        </div>
      </div>
  </>;
};

export default Todo; 
