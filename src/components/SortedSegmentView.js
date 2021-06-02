import React, { useEffect } from 'react';
import {
  OLD_PROCESS,
  HOLE,
  NEW_PROCESS
} from '../helpers/constants';

export default function SortedSegment(props) {
  useEffect(() => {
    // console.log('props', props);
  }, []);

  return (
    <div className={
        ((props.type === OLD_PROCESS && "bg-warning") ||
        (props.type === HOLE && "bg-success") ||
        (props.type === NEW_PROCESS && "bg-primary")) + 
        props.index === 0 && " rounded-top"
      } style={{
        position: 'absolute',
        top: `${props.start}px`,
        width: '100%',
        height: `${props.size}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
      }}>
        {props.text}
    </div>
  )
}