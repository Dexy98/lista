import React, { useState, useEffect } from "react";
import "./App.css";
import PageTitle from "./components/PageTitle";

function ToDoList() {
  const [textItem, setTextItem] = useState("");
  const [itemList, addItemList] = useState([]);

  useEffect(() => {
    const storedList = localStorage.getItem("itemList");
    if (storedList) {
      addItemList(JSON.parse(storedList));
    }
  }, []);

  const onChangeItem = (e) => {
    setTextItem(e.target.value);
  };

  const addItemToList = () => {
    if (textItem.trim() === "") {
      return;
    }

    addItemList((prevItemList) => [
      ...prevItemList,
      {
        item: textItem,
        key: Date.now(),
        id: Math.random() * 1000,
        completed: false,
      },
    ]);

    localStorage.setItem("itemList", JSON.stringify([...itemList, { item: textItem, key: Date.now(), id: Math.random() * 1000, completed: false }]));
    setTextItem(""); 

  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addItemToList();
      localStorage.setItem("itemList", JSON.stringify([...itemList, { item: textItem, key: Date.now(), id: Math.random() * 1000, completed: false }]));
    }

  };

  const deleteItemOnList = (id) => {
    let newList = itemList.filter((el) => el.id !== id);
    addItemList(newList);
    localStorage.setItem("itemList", JSON.stringify(newList));
  };

  const CompleteItem = (id) => {
    addItemList(
      itemList.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        }
        localStorage.setItem("itemList", JSON.stringify(itemList));
        return item;
      })
    );
  };

  return (
    <div className="ToDo">
      <div className="app mt-2">
        <div className="header">
          <PageTitle />
          <input
            className="input"
            type="text"
            value={textItem}
            onChange={onChangeItem}
            onKeyPress={handleKeyPress}
            placeholder="Il tuo prossimo evento..."
          />
          <button onClick={addItemToList} className="btn">
            Aggiungi
          </button>
        </div>
        {itemList.map((el) => (
          <ul key={el.key} className="ListItem">
            <li className={`testoItem ${el.completed ? "completed" : ""}`}>
              {el.item}
            </li>
            <div className="button">
              <button
                className="btnItem mr-1"
                onClick={() => CompleteItem(el.id)}
              >
                ✔
              </button>

              <button
                className="btnItem mr-1"
                onClick={() => deleteItemOnList(el.id)}
              >
                ❌
              </button>
            </div>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default ToDoList;