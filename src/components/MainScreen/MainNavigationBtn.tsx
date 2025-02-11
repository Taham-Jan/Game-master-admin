import { useNavigate } from "react-router-dom";
import { MenuItem } from "../../pages/MainScreen";

const MainNavigationButton: React.FC<{ item: MenuItem }> = ({ item }) => {
  const words = item.text.split(" ");

  const navigate = useNavigate();
  const onButtonClick = () => {
    navigate(item.navigateTo);
  };
  return (
    <button className="navigationButton" onClick={onButtonClick}>
      <img src={item.img} alt={item.text} />
      <label>
        <span>{words[0]}</span>
        {words[1] && <span>{words[1]}</span>}
      </label>
    </button>
  );
};

export default MainNavigationButton;
