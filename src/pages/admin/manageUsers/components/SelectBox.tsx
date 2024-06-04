// todo TypeScript 제네릭 설정하기

function SelectBox({ options }: any) {
  return (
    <select>
      {options.map((option: any) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
}

export default SelectBox;
