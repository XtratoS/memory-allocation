import React, {  useState } from 'react';

export default function InsertHoleColumn(props) {
  const [holeStartAddress, setHoleStartAddress] = useState('0');
  const [holeSize, setHoleSize] = useState('1');

  const submitHole = () => {
    let parsedHoleStart = parseInt(holeStartAddress);
    let parsedHoleSize = parseInt(holeSize);

    if (isNaN(parsedHoleStart) || isNaN(parsedHoleSize)) {
      alert(`You must insert a valid hole parameters`);
      return false;
    }
    let res = props.submitHole(parsedHoleStart, parsedHoleSize);
    if (res === true) {
      setHoleStartAddress('0');
      setHoleSize('1');
    }
  }

  return (<>
    <div className="h4">Insert Hole</div>
    <div className="my-4">
      <label
        className="form-label"
        htmlFor="holeStart"
      >
        Starting Address
      </label>
      <input
        id="holeStart"
        className="form-control"
        type="number"
        min={0}
        value={holeStartAddress}
        ref={props.autoFocusCallbackRef}
        onChange={(event) => {
          if (parseInt(event.target.value) < 0) return false;
          setHoleStartAddress(event.target.value)
        }}
      />
    </div>
    <div className="mb-4">
      <label
        className="form-label"
        htmlFor="holeSize"
      >
        Size
      </label>
      <input
        id="holeSize"
        className="form-control"
        type="number"
        min={1}
        value={holeSize}
        onChange={(event) => {
          if (parseInt(event.target.value) < 1) return false;
          setHoleSize(event.target.value);
        }}
        onKeyUp={(event) => {
          if (event.key === 'Enter') {
            submitHole();
          }
        }}
      />
    </div>
    <button
      className="btn btn-primary"
      onClick={submitHole}
    >
      Insert Hole
    </button>
  </>)
}
