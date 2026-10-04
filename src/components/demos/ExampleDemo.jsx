import { useState } from 'react';
import styles from './ExampleDemo.module.css';

export default function ExampleDemo() {
  const [petals, setPetals] = useState(0);

  return (
    <div className={styles.demo}>
      <button type="button" onClick={() => setPetals(petals + 1)}>
        Add a petal
      </button>
      <span className={styles.count}>Petals: {petals}</span>
    </div>
  );
}
