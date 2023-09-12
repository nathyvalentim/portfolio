import Modal from 'react-modal';
import styles from './styles.module.scss';

import { FiX } from 'react-icons/fi'

import { OrderItemProps } from '../../pages/dashboard'

interface ModalOrderProps{
  isOpen: boolean;
  onRequestClose: () => void;
  orders: OrderItemProps[];
  handleFinishOrder: (id: string) => void;
}

export function ModalOrder({ isOpen, onRequestClose, orders, handleFinishOrder  }: ModalOrderProps){

  const customStyles = {
    content:{
      top: '50%',
      bottom: 'auto',
      left: '50%',
      right: 'auto',
      padding: '30px',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#1d1d2e'
    }
  };

  return(
   <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    style={customStyles}
   >

    <button
    type="button"
    onClick={onRequestClose}
    className="react-modal-close"
    style={{ background: 'transparent', border:0 }}
    >
      <FiX size={45} color="#f34748" />
    </button>

    <div className={styles.container}>

      <h2>Detalhes do pedido</h2>
      <span className={styles.table}>
        Mesa: <strong>{orders[0].orders.table}</strong>
      </span>

      {orders.map( item => (
        <section key={item.id} className={styles.containerItem}>
          <span>{item.amount} - <strong>{item.products.name}</strong></span>
          <span className={styles.description}>
            {item.products.description}
          </span>
        </section>
      ))}


      <button className={styles.buttonOrder} onClick={ () => handleFinishOrder(orders[0].order_id) }>
        Concluir pedido
      </button>


    </div>

   </Modal>
  )
}