import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
const GoBackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <button onClick={handleGoBack}><BiArrowBack /></button>
    </div>
  );
}

export default GoBackButton;