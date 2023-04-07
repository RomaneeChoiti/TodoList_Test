import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "./store/store";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  let food = useSelector((state) => state.food);
  let dispatch = useDispatch();
  //Item 추가
  const [newItem, setNewItem] = useState("");
  //id값 증가
  const getNextId = () => {
    const lastItem = food[food.length - 1];
    return lastItem ? lastItem.id + 1 : 0;
  };

  useEffect(() => {
    axios.get("http://localhost:4000/foodList").then((response) => {
      dispatch(add(response.data));
    });
  }, [dispatch]);

  return (
    <div className="App">
      <div className="board">
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>음식</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {food.map((a, i) => (
              <tr key={i}>
                <td className="fs-4">{food[i].id}</td>
                <td className="fs-4">{food[i].name}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => {
                      dispatch(remove(food[i].id));
                    }}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="음식을 입력해주세요"
            alue={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => {
              dispatch(add({ id: getNextId(), name: newItem, count: 1 }));
            }}
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
