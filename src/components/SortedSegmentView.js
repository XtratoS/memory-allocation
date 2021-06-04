import React from 'react';
import ReactTooltip from 'react-tooltip';
import {
  OLD_PROCESS,
  HOLE,
  NEW_PROCESS
} from '../helpers/constants';

export default function SortedSegment(props) {

  return (
    <div className={
        `${'m-0 p-0 row text-center justify-content-center align-items-center '
        }${props.type === OLD_PROCESS ? ' bg-warning text-dark ' : ''
        }${props.type === HOLE ? 'bg-success' : ''
        }${props.type === NEW_PROCESS ? 'bg-primary' : ''}`
      } style={{
        ...props.style,
        position: 'absolute',
        top: `${props.start}px`,
        width: '100%',
        height: `${props.size}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
      }}>
        <div className='col' style={{position: 'relative'}}>
          <span>{props.text}</span>
          <ReactTooltip
            backgroundColor='#dc3545'
          />
          {props.type === OLD_PROCESS &&
            <span
              data-tip='De-allocate'
              style={{
                position: 'absolute',
                right: 10
              }}
              onClick={() => {
                props.deallocateSelf();
              }}
            >
              <i
                className='fas fa-minus-circle text-danger'
              ></i>
          </span>}
        </div>
    </div>
  )
}