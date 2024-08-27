import styled from "styled-components";

function Spinner() {
  return (
    <Container>
      <LoadingSpinner></LoadingSpinner>
    </Container>
  );
}

export default Spinner;

const Container = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  height: 80px;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 10px solid #f3f3f3;
  border-radius: 50%;
  animation: spinner 1.5s linear infinite;
`;
/*
@keyframes spinner{
 0% {
    transform :rotate(0deg)
 }
 100% {
    transform: rotate(360deg);
 }
}
 */
