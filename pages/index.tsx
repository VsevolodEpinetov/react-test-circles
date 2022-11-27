import React, { useState } from 'react'
import styles from '../styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faRotateLeft, faRotateRight} from '@fortawesome/free-solid-svg-icons'

type Circle = {
  x: number;
  y: number;
}

export default function Home() {
  const [deletedCircles, setDeletedCircles] = useState<Circle[]>([])
  const [circles, setCircles] = useState<Circle[]>([]);
  const circleHeight: number = 50;
  const circleWidth: number = 50;

  const createCircle = (e: React.MouseEvent<Element, MouseEvent>): void => {
    setCircles([
      {
        x: e.clientX,
        y: e.clientY,
      },
      ...circles
    ])
  }

  const deleteLastCircle = (): void => {
    if (circles.length > 0) {
      const oldCircle = circles[0];
      setDeletedCircles([
        oldCircle,
        ...deletedCircles
      ]);
      setCircles([
        ...circles.slice(1)
      ])
    }
  }

  const returnACircle = (): void => {
    if (deletedCircles.length > 0) {
      const returnedCircle = deletedCircles[0];
      setCircles([
        returnedCircle,
        ...circles
      ]);
      setDeletedCircles([
        ...deletedCircles.slice(1)
      ])
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.buttons}>
        <button disabled={circles.length === 0} onClick={deleteLastCircle}>
          <FontAwesomeIcon icon={faRotateLeft} />
          <span className={styles.tooltip}>Undo</span>
        </button>
        <button disabled={deletedCircles.length === 0} onClick={returnACircle}>
          <FontAwesomeIcon icon={faRotateRight} />
          <span className={styles.tooltip}>Redo</span>
        </button>
      </div>
      <div className={styles.container} onClick={createCircle} id="container">
        {circles.map((c, id) => <div className={styles.circle} key={`circle-${id}`} style={{ top: `${c.y - circleHeight / 2}px`, left: `${c.x - circleWidth / 2}px` }}></div>)}
      </div>
    </main>
  )
}
