import React from "react";
import Select from "react-select";

const ReactSelect = (props) => {
  const {
    name,
    label,
    options,
    initialValue,
    handleChange,
    isClearable,
    isMulti,
    isSearchable,
    disabled,
    customHandle,
  } = props;

  const onChange = (selectedOption) => {
    if (handleChange) {
      handleChange(
        name,
        selectedOption
          ? isMulti
            ? selectedOption.map((o) => o.value)
            : selectedOption.value
          : null
      );
    }
    if (customHandle && selectedOption) {
      customHandle(
        isMulti ? selectedOption.map((o) => o.value) : selectedOption.value
      );
    }
  };
  const defaultSelectedValue =
    isMulti && Array.isArray(initialValue)
      ? options.filter((option) =>
          initialValue.some((val) => option.value === val)
        )
      : options.find((option) => option.value === initialValue);

  const commonProps = {
    key: `my_unique_select_key__${
      isMulti ? defaultSelectedValue?.toString() : defaultSelectedValue
    }`,
    isClearable: isClearable,
    isSearchable: isSearchable,
    isMulti: isMulti,
    isDisabled: disabled,
    name: name,
    options: options,
    onChange: onChange,
    defaultValue: defaultSelectedValue,
    value: defaultSelectedValue,
    components: {
      IndicatorSeparator: () => null,
    },
    placeholder: "Select",
  };

  return (
    <>
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
        </label>
      )}

      <Select {...commonProps} />
    </>
  );
};

export { ReactSelect };
