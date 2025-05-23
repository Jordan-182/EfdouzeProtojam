// components/Modal.tsx
import { Link } from "react-router";
import styles from "../styles/Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  link: string;
  linkText?: string;
}

const Modal = ({ isOpen, link }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <h3>Page déjà validée</h3>
      <p>
        Tu as déjà trouvé le mot de passe pour cette page! Rends-toi à la page
        suivante pour continuer l'exploration
      </p>
      <Link to={link}>Page suivante</Link>
    </div>
  );
};

export default Modal;
