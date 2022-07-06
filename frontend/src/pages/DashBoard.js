// libraries
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Component
import NavigationBar from "../components/NavigationBar";
import styled from "styled-components";
import { AiTable } from "../components/AiTable";
import { Title } from "../components/Component";
import { DashboardTable } from "../components/DashboardTable";

const DashBoard = () => { 
  const [totalUser, setToalUser] = useState(1);
  const [todayUser, setTodayUser] = useState(1);
  const [updatedAt, setUpdatedAt] = useState(1);
  const [aiList, setAiList] = useState({aiList : [
    0 : {
      name : "test",
      responseTime : 1,
      accuracy : 1,
      updatedAt: 1}
    ]});

  const navigate = useNavigate();

  const url = process.env.REACT_APP_URL;

  if (localStorage.getItem("jwt") !== null) {
    // navigate(-1);
  }

  // var source = new EventSource(`${url}/dashboard`, {withCredentials: true});
  const source = new EventSource(`http://localhost:8080/dashboard`, {withCredentials: true});

  source.addEventListener("dashboard", async (event) => {
    const parsedData = JSON.parse(event.data);
    setToalUser(parsedData.todayUser);
    setTodayUser(parsedData.todayUser);
    setUpdatedAt(parsedData.updatedAt);
    setAiList(parsedData.aiList);
  })

  const handleClick = (name) => {
    console.log(name);
  };

  return (
    <>
      <NavigationBar/>
      <Title name="대시보드" />

      <h1>totalUser : {totalUser}</h1>
      <h1>todayUser : {todayUser}</h1>
      <h1>updatedAt : {updatedAt}</h1>

      <Container>
        <TableContainer>
          <TableTitle>AI API Status</TableTitle>
          <DashboardTable aiList={aiList.aiList}></DashboardTable>
        </TableContainer>
      </Container>

    </>
  );
}

const Container = styled.div`
width: 100%;
`;

const TableContainer = styled.div`
  margin-top: 100px;
  width: 100%;
  height: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TableTitle = styled.div`
  width: 90%;
  font-size: 40px;
`;


export default DashBoard;