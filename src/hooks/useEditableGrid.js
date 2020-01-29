import React, { useState, useEffect } from "react";

let FocusFieldValue = "";

function useEditableGrid(
  data,
  submitCallback,
  hiddenFields,
  saveMethod = "onBlur"
) {
  const [Values, setValues] = useState([]);
  const [Elements, setElements] = useState([]);

  useEffect(() => {
    setValues(data);
  }, [data]);

  useEffect(() => {
    createElements(Values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Values]);

  const createElements = Values => {
    let _Elements = [];

    Values.forEach((obj, index) => {
      let row = [];
      for (const prop in obj) {
        row.push(
          <input
            name={prop}
            key={`${prop}${obj.id}`}
            type={hiddenFields.indexOf(prop) > -1 ? "hidden" : "text"}
            value={obj[prop]}
            onFocus={e => onFocusField(e)}
            onChange={e => handleChange(e, index)}
            onBlur={e => onBlurField(e, index)}
          />
        );
      }
      _Elements.push(<div key={`row${index}`}>{row}</div>);
    });

    setElements(_Elements);
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    const name = e.target.name;

    let _Values = [...Values];
    _Values[index][name] = value;
    setValues(_Values);
  };

  const onFocusField = e => {
    e.target.select();
    FocusFieldValue = e.target.value;
  };

  const onBlurField = e => {
    if (saveMethod === "onBlur") {
      if (`${FocusFieldValue}` !== `${e.target.value}`) {
        submitCallback(Values);
      }
    }
    FocusFieldValue = "";
  };

  const handleSubmit = e => {
    submitCallback(Values);
  };

  return [Elements, handleSubmit];
}

export default useEditableGrid;
