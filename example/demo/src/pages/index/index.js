import styles from './style.less'
import { useEffect } from 'react'
import store from './store'
import { observer } from 'mobx-react-lite'

function Index() {
  const { count } = store
  useEffect(() => {

   
  }, [])
  return (
    <div className={styles.index}>
      <p>{count}</p>
      <button
        onClick={() => {
          console.log(e)
        }}
      >
        +
      </button>
    </div>
  )
}

export default observer(Index)
