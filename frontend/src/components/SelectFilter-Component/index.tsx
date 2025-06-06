// **Importações

// **Estilos
import "./style.css";

// **Types
import type { optionType } from "../../types/selectFilters";

// **Props
interface SelectFilterProps {
  options: optionType[];
  value: string;
  onChange: (value: string) => void;
}

export const SelectFilterComponent: React.FC<SelectFilterProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="select-filter-component"
    >
      {options.map((option) => (
        <option className="select-filter-component-option" key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
