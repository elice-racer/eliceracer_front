import styled from "styled-components";

function EditInput({ onChange, data, placeholder }: any) {
  return (
    <>
      {data ? (
        <TextInput onChange={onChange} type="text" placeholder={data} value={data} name="comment" />
      ) : (
        <TextInput onChange={onChange} type="text" placeholder={placeholder} value={data} name="comment" />
      )}
    </>
  );
}

export default EditInput;

const TextInput = styled.input`
  border: none;
`;
