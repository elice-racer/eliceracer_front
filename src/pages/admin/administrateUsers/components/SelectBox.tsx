// todo TypeScript 제네릭 설정하기

import styled from "styled-components";

function SelectBox({ options, name, value, onChange }: any) {
  return (
    <Select onChange={onChange} name={name} value={value}>
      {options.map((option: any) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </Select>
  );
}

export default SelectBox;

export const Select = styled.select`
  margin: 0;
  min-width: 0;
  display: block;
  width: 100%;
  padding: 8px 8px;
  font-size: inherit;
  line-height: inherit;
  border: 1px solid;
  border-radius: 4px;
  color: inherit;
  background-color: transparent;
  &:focus {
    border-color: #333;
  }

  /* default 아이콘 숨기기 */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;
