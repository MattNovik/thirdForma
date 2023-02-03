import './index.scss';
import StudservisForm from './StudservisForm';

const ThirdForm = ({ jsonData }) => {
  const data = JSON.parse(jsonData);
  return <StudservisForm data={data} />;
};

export default ThirdForm;
