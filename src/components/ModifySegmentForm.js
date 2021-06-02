import { useState, useEffect } from 'react';

export default function Segment(props) {
  const [name, setName] = useState(props.segment.name);
  const [size, setSize] = useState(props.segment.size);

  useEffect(() => {
    setName(props.segment.name);
    setSize(props.segment.size);
  }, [props.segment]);

  return (<>
    <div className="input-group row m-auto mt-3">
      <div className="col">
        <label
          className="form-label mb-0"
          htmlFor="segment-name"
        >
          Name
        </label>
        <input
          id="segment-name"
          className="form-control"
          type="text"
          value={name}
          onChange={(event) => {setName(event.target.value)}}
        />
      </div>
      <div className="col">
        <label
          className="form-label mb-0"
          htmlFor="segment-size"
        >
          Size
        </label>
        <input
          id="segment-size"
          className="form-control"
          type="number"
          min={1}
          value={size}
          onChange={(event) => {setSize(event.target.value)}}
        />
      </div>
    </div>
    <div className="row m-auto p-0">
      <div className="col input-group justify-content-between">
        <button
          className="mt-1 btn btn-success w-80"
          onClick={() => {
            props.setSegment({
              name,
              size: parseInt(size)
            })}}
        >
          Save Segment
        </button>
        <button
          className="mt-1 btn btn-danger w-20"
          onClick={props.removeSelf}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  </>)
}