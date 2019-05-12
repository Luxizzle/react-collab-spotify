import { useEffect, useState } from 'react';
import './initialize';
import * as firebase from 'firebase/app';

const db = firebase.database();

const defaultGet = db => db.ref();

/**
 * Pretty janky firebase database hook thing.
 *
 * @param {(ref: any) => any} [get]
 * @param {Function} [onEvent]
 *
 * @returns {[any, firebase.database.Reference]}
 */
export function useFireBaseStore(get = defaultGet, onEvent = () => {}) {
  const [reference, setReference] = useState(null);
  const [data, setData] = useState(null);

  // useEffect(() => {
  //   const ref = db.ref(path);

  //   setReference(ref);

  //   const onRefEvent = (...args) => {
  //     setData(get(reference));
  //     onEvent(...args);
  //   };
  //   const onChildAdded = (...args) => onRefEvent('child_added', ...args);
  //   const onChildChanged = (...args) => onRefEvent('child_changed', ...args);
  //   const onChildMoved = (...args) => onRefEvent('child_moved', ...args);
  //   const onChildRemoved = (...args) => onRefEvent('child_removed', ...args);
  //   const onValueChange = (...args) => onRefEvent('value', ...args);

  //   ref.on('child_added', onChildAdded);
  //   ref.on('child_changed', onChildChanged);
  //   ref.on('child_moved', onChildMoved);
  //   ref.on('child_removed', onChildRemoved);
  //   ref.on('value', onValueChange);

  //   return () => {
  //     ref.off('child_added', onChildAdded);
  //     ref.off('child_changed', onChildChanged);
  //     ref.off('child_moved', onChildMoved);
  //     ref.off('child_removed', onChildRemoved);
  //     ref.off('value', onValueChange);
  //   };
  // }, [path, get]);

  // useEffect(() => {
  //   setData(get(reference));
  // }, [reference, get]);

  useEffect(() => {
    const ref = get(db);

    if (ref) {
      const onValueChange = snapshot => setData(snapshot);

      ref.on('value', onValueChange);

      setReference(ref);

      return () => ref.off('value', onValueChange);
    }
  }, [get]);

  return [data, reference];
}
