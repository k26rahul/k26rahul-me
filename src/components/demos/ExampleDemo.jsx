import { useState } from 'react';
import styles from './ExampleDemo.module.css';

export default function ExampleDemo() {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.demo}>
      <button type="button" onClick={() => setCount(count + 1)}>
        Increment counter
      </button>
      <span className={styles.count}>Count: {count}</span>
    </div>
  );
}
