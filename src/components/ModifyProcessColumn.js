import React, { useEffect, useState } from 'react';
import ModifySegmentForm from './ModifySegmentForm';

export default function ModifyProcessColumn(props) {

  const [tempProcessName, setTempProcessName] = useState(props.process.name);

  useEffect(() => {}, [props.process]);

  useEffect(() => {
    setTempProcessName(props.process.name);
  }, [props.process]);

  const submitProcess = () => {
    let newProcess = {
      name: tempProcessName,
      segments: [...props.process.segments]
    };
    props.updateProcess(newProcess);
  }

  const addNewSegment = () => {
    let newProcess = {
      name: tempProcessName,
      segments: [...props.process.segments, {name: '', size: 0}]
    };
    props.updateProcess(newProcess);
  }

  const setSegments = (newSegments) => {
    let newProcess = {
      name: tempProcessName,
      segments: [...newSegments]
    };
    props.updateProcess(newProcess);
  }

  return (<>
    <div className="h4">Insert/Modify Process</div>
    <div className="my-4">
      <div>
      <button className="mb-3 mx-1 btn btn-primary" onClick={() => {
        props.addProcess();
        // setTempProcessName(props.process.name);
      }} disabled={props.holeCount < 1}>Add Process</button>
        <button className="mb-3 mx-1 btn btn-danger" onClick={() => {
          props.removeProcess();
          // setTempProcessName(props.process.name);
        }} disabled={props.processCount <= 1}>Deallocate Process</button>
      </div>
      <label
        className="form-label"
        htmlFor="process-name"
      >
        Process Name
      </label>
      <div className="input-group">
        <input
          id="process-name"
          className="form-control"
          type="text"
          value={tempProcessName}
          onChange={(event) => {setTempProcessName(event.target.value)}}
          onKeyUp={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              submitProcess();
            }
          }}
          disabled={props.holeCount === 0}
        />
        <button
          className="btn btn-success"
          onClick={submitProcess}
          disabled={props.holeCount === 0}
        >
          Save
        </button>
      </div>
    </div>
    <div className="mt-4">
      <button
        className="btn btn-primary"
        onClick={addNewSegment}
        disabled={props.holeCount === 0}
      >
        Add Segment
      </button>
    </div>
    {props.process.segments.map((segment, index) => (<ModifySegmentForm
      key={index}
      index={index}
      segment={segment}
      setSegment={(newSegment) => {
        let newSegments = [...props.process.segments];
        newSegments[index] = newSegment;
        setSegments(newSegments);
      }}
      removeSelf={() => {
        let newSegments = props.process.segments;
        newSegments.splice(index, 1);
        setSegments(newSegments);
      }}
    />))}
  </>)
}