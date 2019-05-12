import { useEffect, useState } from 'react';
import './initialize';
import * as firebase from 'firebase/app';

const db = firebase.database();

/**
 * Pretty janky firebase database hook thing.
 *
 * @param {string} [path] The database ref path.
 * @param {Function} [onEvent]
 */
export function useFireBaseStore(path, onEvent) {
  const [reference, setReference] = useState(null);
  const [, forceUpdate] = useState(null);

  useEffect(() => {
    const ref = db.ref(path);

    setReference(ref);

    const onRefEvent = (...args) => onEvent(...args);
    const onChildAdded = (...args) => onRefEvent('child_added', ...args);
    const onChildChanged = (...args) => onRefEvent('child_changed', ...args);
    const onChildMoved = (...args) => onRefEvent('child_moved', ...args);
    const onChildRemoved = (...args) => onRefEvent('child_removed', ...args);
    const onValueChange = (...args) => onRefEvent('value', ...args);

    ref.on('child_added', onChildAdded);
    ref.on('child_changed', onChildChanged);
    ref.on('child_moved', onChildMoved);
    ref.on('child_removed', onChildRemoved);
    ref.on('value', onValueChange);

    return () => {
      ref.off('child_added', onChildAdded);
      ref.off('child_changed', onChildChanged);
      ref.off('child_moved', onChildMoved);
      ref.off('child_removed', onChildRemoved);
      ref.off('value', onValueChange);
    };
  }, [path]);

  return {
    hasReference: Boolean(reference),

    reference,
  };
}
