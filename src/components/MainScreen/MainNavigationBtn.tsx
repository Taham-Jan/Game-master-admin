import { useNavigate } from "react-router-dom";
import { MenuItem } from "../../pages/MainScreen";

const MainNavigationButton: React.FC<{
  item: MenuItem;
  onButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "submit" | "reset" | "button" | undefined;
}> = ({ item, onButtonClick, type = "button" }) => {
  const words = item.text.split(" ");

  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onButtonClick) {
      onButtonClick(event);
    } else {
      navigate(item.navigateTo);
    }
  };
  return (
    <button type={type} className="navigationButton" onClick={handleClick}>
      <img src={item.img} alt={item.text} />
      <label>
        <span>{words[0]}</span>
        {words[1] && <span>{words[1]}</span>}
      </label>
    </button>
  );
};

export default MainNavigationButton;
