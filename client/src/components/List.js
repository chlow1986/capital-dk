import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useLocation, Link} from 'react-router-dom';
import {format, parseJSON} from 'date-fns';

import {loadList} from '../store/actions';
import { PAGE_LIMIT } from '../common/Constants';

const List = ()=>{
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(1);
  const dataState = useSelector(state=>{return state.data || {}});
  const data = dataState.data || [];
  const totalCount = dataState.count || 0;
  const totalPage = (totalCount / PAGE_LIMIT);

  useEffect(()=>{
    dispatch(loadList(current));  
  }, [current])

  const prev = ()=>{
    setCurrent(prev=>{
      const newPage = prev -1;
      if(newPage > 0){
        return newPage;
      }else{
        return prev;
      }
    })
  }

  const next = ()=>{
    setCurrent(prev=>{
      const newPage = prev +1;
      if(newPage <= totalPage){
        return newPage;
      }else{
        return prev;
      }
    })
  }

  return (
    <div className="list-container">
      <div style={{overflow: 'auto', flex: 1}}>
        <table style={{background: '#fff', color: '#000'}}>
          <thead style={{border: 'solid 1px #000'}}><tr><td>id</td><td>Field 1</td><td>Field 2</td><td>Field 3</td><td>Field 4</td><td>Field 5</td><td>Field 6</td><td>Field 7</td><td>Field 8</td><td>Field 9</td><td>Field 10</td><td>Active</td><td width={300}>Effective On</td><td>Expiry</td></tr></thead>
          <tbody>
            {
              data.length > 0 ?
              data.map(item=>{
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.field1}</td>
                    <td>{item.field2}</td>
                    <td>{item.field3}</td>
                    <td>{item.field4}</td>
                    <td>{item.field5}</td>
                    <td>{item.field6}</td>
                    <td>{item.field7}</td>
                    <td>{item.field8}</td>
                    <td>{item.field9}</td>
                    <td>{item.field10}</td>
                    <td>{item.activeInd}</td>
                    <td style={{minWidth: 90}}>{format(parseJSON(item.effectiveOn), 'yyyy-MM-dd')}</td>
                    <td style={{minWidth: 90}}>{item.expiryOn && format(parseJSON(item.expiryOn), 'yyyy-MM-dd')}</td>
                  </tr>
                )
              })
              :
              <tr>
                <td colSpan={14} style={{textAlign: 'center'}}>No data</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      <div className="list-footer">
        <div><button onClick={prev}>Prev</button></div>
        <div>{current} / {totalPage}</div>
        <div><button onClick={next}>Next</button></div>
      </div>
    </div>
  )
}

export default List;